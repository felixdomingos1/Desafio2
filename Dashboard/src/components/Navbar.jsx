import React, { useContext, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeCotext } from '../context/ThemeContextProvider';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { SERVER_URL } from '../utils/uri';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeCotext);
    const { isAuthenticated } = useAuth();
    const [userData, setUserData] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false); 
    const [token, settoken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            fetchUserData(decodedToken.userId); 
        }
    }, [token]);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/admin/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserData(response.data); 
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
        }
    };

    const handlePopupToggle = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleLogout = () => {
        settoken(null);
        localStorage.removeItem('token');
        navigate('/entrar');
    };

    return (
        <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
            <h1 className='text-2xl'>Dashboard</h1>
            <div className='flex items-center w-[20%] relative'> {/* Adicione relative aqui para o popup */}
                <button className='text-2xl text-dark' onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
                <div className='flex flex-col ml-3 cursor-pointer' onClick={handlePopupToggle}>
                    {isAuthenticated ? (
                        <>
                            <span className='text-sm'>{userData.nome || 'Nome do Usuário'}</span>
                            <span className='text-sm'>Admin</span>
                        </>
                    ) : (
                        <span className='text-sm'>Usuário Desconhecido</span>
                    )}
                </div>
                {isPopupOpen && (
                    <div className='absolute top-12  cursor-pointer right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg dark:bg-gray-800 dark:border-gray-600'>
                        <button
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                            onClick={() => { /* Lógica para ver perfil */ }}
                        >
                            Ver Perfil
                        </button>
                        <button
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                            onClick={handleLogout}
                        >
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
