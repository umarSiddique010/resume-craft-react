import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './fonts.css';
import App from './App.jsx';
import InputFieldProvider from './context/UserInputContext/InputFieldContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <InputFieldProvider>
        <App />
      </InputFieldProvider>
    </BrowserRouter>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  </StrictMode>,
);
