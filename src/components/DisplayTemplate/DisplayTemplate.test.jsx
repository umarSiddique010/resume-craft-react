import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Display from './DisplayTemplate';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import resumeInitialState from '../../context/UserInputContext/reducer/resumeInitialState';
import { toast } from 'react-toastify';

// --- MOCKING DEPENDENCIES ---

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
    dismiss: vi.fn(),
  },
}));

const mocks = vi.hoisted(() => {
  return {
    html2canvas: vi.fn(() =>
      Promise.resolve({ toDataURL: () => 'data:image/png;base64,fake' }),
    ),
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

vi.mock('./BoldAccentTemplate/BoldAccentTemplate', () => ({
  default: () => <div>Bold Accent Template Content</div>,
}));
vi.mock('./StandardTemplate/StandardTemplate', () => ({
  default: () => <div>Standard Template Content</div>,
}));
vi.mock('./ClassicTemplate/ClassicTemplate', () => ({
  default: () => <div>Classic Template Content</div>,
}));
vi.mock('./ATSFriendlyTemplate/ATSFriendlyTemplate', () => ({
  default: () => <div>ATS Friendly Content</div>,
}));

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

const MockProvider = ({ children }) => (
  <InputFieldContext.Provider value={[resumeInitialState, vi.fn()]}>
    {children}
  </InputFieldContext.Provider>
);

describe('DisplayTemplate Component', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    delete window.location;
    window.location = {
      ...originalLocation,
      href: 'http://localhost:3000/resumeCrafted',
    };
    mockNavigate.mockClear();
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('renders Bold Accent Template by default', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    expect(
      screen.getByText('Bold Accent Template Content'),
    ).toBeInTheDocument();
    expect(screen.getByText('Download as PDF')).toBeInTheDocument();
  });

  it('switches to Classic Template when selected', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    const select = screen.getByLabelText(/Select Template/i, {
      selector: 'select#templates',
    });
    fireEvent.change(select, { target: { value: 'classicTemplate' } });

    expect(screen.getByText('Classic Template Content')).toBeInTheDocument();
    expect(
      screen.queryByText('Bold Accent Template Content'),
    ).not.toBeInTheDocument();
  });

  it('switches to ATS Template and shows PDF download button', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    const select = screen.getByLabelText(/Select Template/i, {
      selector: 'select#templates',
    });
    fireEvent.change(select, { target: { value: 'atsFriendlyTemplate' } });

    expect(screen.getByText('Download ATS Template')).toBeInTheDocument();
    expect(screen.queryByText('Download as PDF')).not.toBeInTheDocument();
  });

  it('navigates back to /home when "Edit Resume" is clicked', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    fireEvent.click(screen.getByText('Edit Resume'));
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('triggers PDF download logic when Download as PDF is clicked', async () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    fireEvent.click(screen.getByText('Download as PDF'));

    await waitFor(() => {
      expect(mocks.html2canvas).toHaveBeenCalled();
      expect(mocks.jsPDF).toHaveBeenCalled();
    });
  });

  it('updates font and fires toast when font selector changes', () => {
    render(
      <MockProvider>
        <Display />
      </MockProvider>,
    );

    const option = screen.getByText('Roboto');
    const select = option.closest('select');
    fireEvent.change(select, { target: { value: 'robotoFont' } });

    expect(toast.success).toHaveBeenCalledWith(
      expect.stringContaining('Roboto'),
    );
  });

  it('hides controls when not on /resumeCrafted', () => {
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

    expect(screen.queryByText('Edit Resume')).not.toBeInTheDocument();
    expect(screen.queryByText('Download as PDF')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Select Template/i)).not.toBeInTheDocument();
  });
});
