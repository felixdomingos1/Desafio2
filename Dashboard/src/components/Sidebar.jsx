import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaUser, FaBox, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>Luz Kabir</h1>
      <ul className='flex flex-col mt-5 text-xl'>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white mt-2'}`
            }
          >
            <FaTachometerAlt />
            <span className='hidden md:inline'>Dashboard</span>
          </NavLink>
        </li> 
        <li>
          <NavLink 
            to="/filiais" 
            className={({ isActive }) => 
              `flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white mt-2'}`
            }
          >
            <FaUsers />
            <span className="hidden md:inline ">Filiais</span>
          </NavLink>
        </li> 
        <li>
          <NavLink 
            to="/tipos-filiais" 
            className={({ isActive }) => 
              `flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-600 hover:text-white mt-2'}`
            }
          >
            <FaUsers />
            <span className="hidden md:inline ">Tipos de Filiais</span>
          </NavLink>
        </li> 
      </ul>
    </div>
  )
}

export default Sidebar;
