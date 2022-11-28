import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { Main } from './pages/main';
import App from './App';
import './index.css';
import { ProtectedRoute } from './components/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<ProtectedRoute> <Main /> </ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>
);


