import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RegistrosContextProvider } from './context/RegistrosContex';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <RegistrosContextProvider>
    <App />
    </RegistrosContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

