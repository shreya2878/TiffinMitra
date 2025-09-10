import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from './context/AppContext.jsx';

// ✅ Backend URL define karo yaha
const backendUrl = "http://localhost:5000";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* ✅ Pass backendUrl to AppContextProvider */}
    <AppContextProvider backendUrl={backendUrl}>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
