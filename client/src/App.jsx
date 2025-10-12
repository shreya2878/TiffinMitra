import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextProvider } from './context/AppContext'; // ✅ import context provider

const App = () => {
  return (
    <AppContextProvider>  {/* ✅ Wrap everything in context */}
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}  
          newestOnTop={false}      
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/email-verify' element={<EmailVerify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
        </Routes>
      </div>
    </AppContextProvider>
  );
}

export default App;
