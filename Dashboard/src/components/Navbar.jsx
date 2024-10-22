// src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeCotext } from '../context/ThemeContextProvider';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { SERVER_URL } from '../utils/uri';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeCotext);
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          
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

    console.log(userData);
    
    return (
        <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
            <h1 className='text-2xl'>Dashboard</h1>
            <div className='flex items-center w-[20%]'>
                <button className='text-2xl text-dark' onClick={toggleTheme}>
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
                <div className='flex flex-col ml-3'>
                    {isAuthenticated ? (
                        <>
                            <span className='text-sm'>{userData.nome || 'Nome do Usuário'}</span>
                            <span className='text-sm'>Admin</span>
                        </>
                    ) : (
                        <span className='text-sm'>Usuário Desconhecido</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
