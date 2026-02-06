# <img height="25" src="./public/favicon.png"> Resume Craft

![Resume Craft Banner](https://placehold.co/1200x300/183b4e/ffffff?text=Resume+Craft)

**Resume Craft** is a powerful, client-side React application designed to help users build professional, aesthetically pleasing, and ATS-friendly resumes effortlessly. Powered by modern web technologies, it offers real-time previewing, smart input handling, and diverse export options.

## 🚀 Features

### 🎨 Professional Templates

Choose from three distinct, professionally designed templates tailored to different industry needs:

1.  **Standard Template:** A modern, visual layout featuring skill-level dots and a clean, two-column grid. Perfect for creative and tech roles.
2.  **Classic Template:** A traditional, formal layout focusing on hierarchy and readability. Ideal for corporate, legal, and academic roles.
3.  **ATS-Friendly Template:** A parsing-optimized, text-based layout generated using `@react-pdf/renderer`. This ensures maximum compatibility with Applicant Tracking Systems.

### ⚡ Core Functionality

- **Real-Time Preview:** Instantly see changes as you type with a split-screen view.
- **Smart Forms:** Interactive inputs for Education, Experience, Skills, and more, including dynamic country/state/city selection via `country-state-city`.
- **Privacy Focused:** No database required. All data resides locally in the browser context during the session.
- **High-Quality Export:** Download resumes as high-resolution PDFs using `html2canvas` + `jspdf` (Visual) or native PDF generation (ATS).
- **Customization:** Toggle specific sections on/off and choose from multiple font styles (Roboto, Playwrite, etc.).

---

## 🛠 Tech Stack

This project leverages a modern, opinionated stack for performance and developer experience:

- **Core:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** CSS Modules (Scoped styling)
- **Routing:** React Router DOM v7
- **State Management:** React Context API + `useReducer`
- **PDF Generation:**
  - `@react-pdf/renderer` (for ATS layout)
  - `html2canvas` & `jspdf` (for Visual layouts)
- **Utilities:** `country-state-city` (Location logic), `react-toastify` (Notifications)

---

## 🧪 Testing Strategy

We maintain rigorous code quality standards using **Vitest**. The project boasts **100% Code Coverage** across reducer logic and UI components.

- **Unit Testing:** Granular tests for `resumeReducer` to ensure state integrity (CRUD operations on resume fields).
- **Component Testing:** Testing Library (`@testing-library/react`) integration to verify DOM rendering, user interactions, and conditional logic.
- **Integration Testing:** Verifying workflows from input to display context updates.

### Running Tests

To execute the test suite:

```bash
npm run test
```

To generate a coverage report:

```bash
npm run coverage
```

---

## ⚙️ CI/CD & Quality Assurance

This repository employs a robust CI/CD pipeline and local quality checks to ensure stability.

### Local Quality Gates (Husky)

We use **Husky** and **lint-staged** to enforce quality before every commit:

1.  **Linting:** Runs `eslint` to catch syntax and logic errors.
2.  **Formatting:** Runs `prettier` to ensure consistent code style.

### GitHub Actions Workflow

On every push or pull request, our automated workflow triggers:

1.  **Lint:** Checks code compliance with ESLint rules.
2.  **Test:** Runs the full Vitest suite to ensure no regressions.
3.  **Build:** Attempts a production build via Vite to verify deployability.

_Note: The build only passes if linting and testing succeed._

---

## 🚀 Setup Instructions

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/umarSiddique010/resume-craft.git
    cd resume-craft
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
src/
├── assets/                 # Static images and icons
├── components/
│   ├── DisplayTemplate/    # Resume renderers (Standard, Classic, ATS)
│   ├── HomePage/           # Main split-screen container
│   ├── UserInput/          # Input forms (Personal, Educations, Skills, etc.)
│   └── WelcomePage/        # Landing page
├── context/
│   └── UserInputContext/   # Global State (Context + Reducer)
├── App.jsx                 # Main Routing Logic
└── main.jsx                # Entry point
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

**Please ensure all tests pass (`npm run test`) before submitting.**

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

_Crafted by [Md Umar Siddique](https://github.com/umarSiddique010)_
