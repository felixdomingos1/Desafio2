import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { dataLine, dataBar } from '../assets/chartData'
import {Line, Bar} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
import { SERVER_URL } from '../utils/uri';
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)

const Dashboard = () => {
  const [tipos, setTipos] = useState([]);
  const [filiais, setFiliais] = useState([]);
    
  const fetchTipos = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/tipos`);
      setTipos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de filiais:', error);
    }
  };
  const fetchFiliais = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/filiais`);
      setFiliais(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de filiais:', error);
    }
  };
  
  useEffect(() => {
    fetchTipos();
    fetchFiliais()
  });

  return (
    <div className='grow p-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6'>
            <Card icon={<FaBox />} title="Tipos" value={tipos.length > 0 ? tipos.length : 0}/>
            <Card icon={<FaUsers />} title="Filiais" value={filiais.length > 0 ? filiais.length : 0}/>
            {/* <Card icon={<FaCog />} title="Difinições" value="11"/> */}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Visitantes</h3>
                <Line data={dataLine} />
            </div>
            <div className='bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md'>
                <h3 className='text-lg font-semibold mb-4'>Produtos</h3>
                <Bar data={dataBar} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard