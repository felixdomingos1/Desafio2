// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ThemeContextProvider from './context/ThemeContextProvider';
import AuthContextProvider from './context/AuthContext';
import Inicio from './pages/Inicio/Inicio';
import Entrar from './pages/Entrar/Entrar';
import Cadastrar from './pages/Cadastrar/Cadastrar';
import PrivateRoute from './components/PrivateRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Filias from './components/Filias';
import TiposDeFilias from './components/Tipos';
import Recuperar from './pages/RecuperarSenha/Recuperar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/asdda" element={<Inicio />} />
            <Route path="/entrar" element={<Entrar />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/esqueci-senha" element={<Recuperar />} />
            <Route 
              path="/dashboard" 
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
                    <Navbar />
                    <Dashboard />
                  </div>
                </div>
              } 
            />
            <Route 
              path="/filiais" 
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
                    <Navbar />
                    <Filias /> 
                  </div>
                </div>
              } 
            />
            <Route 
              path="/tipos-filiais" 
              element={
                <div className="flex">
                  <Sidebar />
                  <div className="grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
                    <Navbar />
                    <TiposDeFilias /> 
                  </div>
                </div>
              } 
            />
          </Routes>
        </Router>

      <ToastContainer />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
