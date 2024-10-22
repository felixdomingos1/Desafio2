import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Modal from './Modal';
import ModalTipoFilial from './ModalTipoFilial'; // Importe o novo modal
import { SERVER_URL } from '../utils/uri';
import { ToastContainer } from 'react-toastify';

const TiposDeFilias = () => {
  const [tipos, setTipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalTipo, setShowModalTipo] = useState(false); // Estado para o modal de tipo
  const [selectedFilial, setSelectedFilial] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null); // Estado para o tipo selecionado

  const fetchTipos = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/tipos`);
      setTipos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de filiais:', error);
    }
  };

  const deleteTipo = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/tipos/${id}`);
      fetchTipos();
    } catch (error) {
      console.error('Erro ao deletar tipo de filial:', error);
    }
  };

  const handleOpenModalTipo = (tipo = null) => {
    setSelectedTipo(tipo);
    setShowModalTipo(true);
  };

  const handleCloseModalTipo = () => {
    setShowModalTipo(false);
    setSelectedTipo(null);
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  return (
    <div className='grow p-8'>
      {/* Cabeçalho */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Gerenciar Tipos de Filiais</h1>
        <button
          className='bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 flex items-center'
          onClick={() => handleOpenModalTipo()}
        >
          <FaPlus className='mr-2' /> Novo Tipo de Filial
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-100 text-gray-600'>
            <tr>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Nome</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Descrição</th>
              <th className='py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((tipo) => (
              <tr key={tipo.id} className="border-b">
                <td className='py-4 px-6 text-gray-700'>{tipo.nome}</td>
                <td className='py-4 px-6 text-gray-700'>{tipo.descricao}</td>
                <td className='py-4 px-6'>
                  <div className='flex space-x-4'>
                    <button
                      className='text-indigo-600 hover:text-indigo-800 transition-colors'
                      onClick={() => handleOpenModalTipo(tipo)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className='text-red-600 hover:text-red-800 transition-colors'
                      onClick={() => deleteTipo(tipo.id)}
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

      {showModalTipo && (
        <ModalTipoFilial
          tipo={selectedTipo}
          onClose={handleCloseModalTipo}
          onRefresh={fetchTipos}
        />
      )}
        <ToastContainer />
    </div>
  );
};

export default TiposDeFilias;
