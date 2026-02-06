import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Display from './DisplayTemplate';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import resumeInitialState from '../../context/UserInputContext/reducer/resumeInitialState';
import { toast } from 'react-toastify';

// --- MOCKING DEPENDENCIES ---

// Mock Navigation (used for 'Edit Resume' button)
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock Toast Notifications
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// Mock Heavy Libraries (html2canvas & jsPDF)
// Using vi.hoisted to ensure mocks are initialized before imports
const mocks = vi.hoisted(() => {
  return {
    html2canvas: vi.fn(() =>
      Promise.resolve({ toDataURL: () => 'data:image/png;base64,fake' }),
    ),
    // Standard function used for jsPDF so 'new' keyword works
    jsPDF: vi.fn(function () {
      return {
        internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
        addImage: vi.fn(),
        addPage: vi.fn(),
        save: vi.fn(),
      };
    }),
  };
});

vi.mock('html2canvas', () => ({ default: mocks.html2canvas }));
vi.mock('jspdf', () => ({ default: mocks.jsPDF }));

// Mock Child Template Components (keeps test isolated)
vi.mock('./StandardTemplate/StandardTemplate', () => ({
  default: () => <div>Standard Template Content</div>,
}));
vi.mock('./ClassicTemplate/ClassicTemplate', () => ({
  default: () => <div>Classic Template Content</div>,
}));
vi.mock('./ATSFriendlyTemplate/ATSFriendlyTemplate', () => ({
  default: () => <div>ATS Friendly Content</div>,
}));

// Mock @react-pdf/renderer components
vi.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: ({ children }) => (
    <button>{children({ loading: false })}</button>
  ),
  PDFViewer: ({ children }) => <div>PDF Viewer: {children}</div>,
  Document: ({ children }) => <div>{children}</div>,
  Page: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <div>{children}</div>,
  View: ({ children }) => <div>{children}</div>,
  StyleSheet: { create: () => {} },
}));

// Mock Context Provider
const MockProvider = ({ children }) => (
  <InputFieldContext.Provider value={[resumeInitialState, vi.fn()]}>
    {children}
  </InputFieldContext.Provider>
);

describe('DisplayTemplate Component', () => {
  const originalLocation = window.location;

  // Setup: Force URL to be '/resumeCrafted' so controls are visible by default
  beforeEach(() => {
    delete window.location;
    window.location = {
      ...originalLocation,
      href: 'http://localhost:3000/resumeCrafted',
    };
    mockNavigate.mockClear();
  });

  // Teardown: Restore original window.location
  afterEach(() => {
    window.location = originalLocation;
  });

  it('renders standard template by default', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    expect(screen.getByText('Standard Template Content')).toBeInTheDocument();
    expect(screen.getByText('Download as PDF')).toBeInTheDocument();
  });

  it('switches to Classic Template when selected', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    // Select Classic Template from dropdown
    const select = screen.getByLabelText(/Select Template/i, {
      selector: 'select#templates',
    });
    fireEvent.change(select, { target: { value: 'classicTemplate' } });

    // Verify Classic Template renders and Standard is removed
    expect(screen.getByText('Classic Template Content')).toBeInTheDocument();
    expect(
      screen.queryByText('Standard Template Content'),
    ).not.toBeInTheDocument();
  });

  it('switches to ATS Template and shows PDF Viewer', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    // Select ATS Template
    const select = screen.getByLabelText(/Select Template/i, {
      selector: 'select#templates',
    });
    fireEvent.change(select, { target: { value: 'atsFriendly' } });

    // Verify PDF Viewer appears and download button changes
    expect(screen.getByText(/PDF Viewer:/i)).toBeInTheDocument();
    expect(screen.getByText('Download ATS Template')).toBeInTheDocument();
  });

  it('navigates back to editing when "Edit Resume" is clicked', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    const editBtn = screen.getByText('Edit Resume');
    fireEvent.click(editBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('triggers PDF download logic for standard templates', async () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    const downloadBtn = screen.getByText('Download as PDF');
    fireEvent.click(downloadBtn);

    // Wait for async PDF generation mocks to be called
    await waitFor(() => {
      expect(mocks.html2canvas).toHaveBeenCalled();
      expect(mocks.jsPDF).toHaveBeenCalled();
    });
  });

  it('updates font state when font selector changes', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    // Locate font selector via option text
    const option = screen.getByText('Roboto');
    const select = option.closest('select');

    fireEvent.change(select, { target: { value: 'robotoFont' } });

    // Verify toast notification confirms font change
    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining('Roboto'),
    );
  });

  it('hides buttons and controls when NOT on /resumeCrafted (Preview Mode)', () => {
    // Override URL to simulate Home page (Preview Mode)
    delete window.location;
    window.location = {
      ...originalLocation,
      href: 'http://localhost:3000/home',
    };

    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    // Content should render, but controls should be hidden
    expect(screen.getByText('Standard Template Content')).toBeInTheDocument();
    expect(screen.queryByText('Edit Resume')).not.toBeInTheDocument();
    expect(screen.queryByText('Download as PDF')).not.toBeInTheDocument();

    const select = screen.queryByLabelText(/Select Template/i);
    expect(select).not.toBeInTheDocument();
  });
});
