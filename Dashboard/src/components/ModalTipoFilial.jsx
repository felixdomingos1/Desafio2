import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../utils/uri';
import { toast, ToastContainer } from 'react-toastify';

const ModalTipoFilial = ({ tipo, onClose, onRefresh }) => {
  const [nome, setNome] = useState(tipo ? tipo.nome : '');
  const [descricao, setDescricao] = useState(tipo ? tipo.descricao : '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const methodologi = tipo ? 'PUT' : 'POST';
    const url = tipo ? `${SERVER_URL}/tipos/${tipo.id}` : `${SERVER_URL}/tipos`;

    try {
      const response = await axios({
        method: methodologi,
        url,
        data: {
          nome,
          descricao,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response) throw new Error('Erro ao salvar Tipo');
      toast.success(`Filial ${tipo ? 'atualizada' : 'criada'} com sucesso!`); 
      await onRefresh(); // Atualiza a lista de filiais
      onClose(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao salvar filial:', error);
      toast.error('Erro ao salvar filial. Tente novamente.'); // Notificação de erro
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {tipo ? 'Editar Tipo de Filial' : 'Criar Novo Tipo de Filial'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nome do Tipo de Filial</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {tipo ? 'Salvar Alterações' : 'Criar'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ModalTipoFilial;
