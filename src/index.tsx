import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import "./styles/index.css"
import "./styles/responsive.css"
import { Main } from './components/main';
import { ProtectedRoute } from './components/ProtectedRoute';
import App from './App';

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


