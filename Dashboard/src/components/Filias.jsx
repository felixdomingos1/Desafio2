import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from './Modal'; 
import { SERVER_URL } from '../utils/uri';
import { ToastContainer } from 'react-toastify';

const Filias = () => {
  const [filiais, setFiliais] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFilial, setSelectedFilial] = useState(null);

  const fetchFiliais = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/filiais`);
      setFiliais(response.data);
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
  };

  const deleteFilial = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/filial/${id}`);
      fetchFiliais();
    } catch (error) {
      console.error('Erro ao deletar filial:', error);
    }
  };

  const handleOpenModal = (filial = null) => {
    setSelectedFilial(filial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFilial(null);
  };

  useEffect(() => {
    fetchFiliais();
  }, []);

  return (
    <div className='grow p-8'>
      {/* Cabeçalho */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Gerenciar Filiais</h1>
        <button
          className='bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 flex items-center'
          onClick={() => handleOpenModal()}
        >
          <FaPlus className='mr-2' /> Nova Filial
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-100 text-gray-600'>
            <tr>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Nome</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Localização</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>email</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Telefone</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filiais.map((filial) => (
              <tr key={filial.id} className="border-b">
                <td className='py-4 px-6 text-gray-700'>{filial.nome}</td>
                <td className='py-4 px-6 text-gray-700'>{filial.localizacao}</td>
                <td className='py-4 px-6 text-gray-700'>{filial.email}</td>
                <td className='py-4 px-6 text-gray-700'>{filial.telefone}</td>
                <td className='py-4 px-6'>
                  <div className='flex space-x-4'>
                    <button
                      className='text-indigo-600 hover:text-indigo-800 transition-colors'
                      onClick={() => handleOpenModal(filial)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className='text-red-600 hover:text-red-800 transition-colors'
                      onClick={() => deleteFilial(filial.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal
          filial={selectedFilial}
          onClose={handleCloseModal}
          onRefresh={fetchFiliais}
        />
      )}
        <ToastContainer />
    </div>
  );
};

export default Filias;
