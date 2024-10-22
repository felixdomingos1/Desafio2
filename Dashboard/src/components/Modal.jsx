import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../utils/uri';
import { toast, ToastContainer } from 'react-toastify';

const Modal = ({ filial, onClose, onRefresh }) => {
  const [nome, setNome] = useState(filial ? filial.nome : '');
  const [localizacao, setLocalizacao] = useState(filial ? filial.localizacao : '');
  const [telefone, setTelefone] = useState(filial ? filial.telefone : '');
  const [email, setEmail] = useState(filial ? filial.email : '');
  const [empresaId, setEmpresaId] = useState(0); 
  const [tipoId, setTipoId] = useState(0); 
  const [foto, setFoto] = useState(null);
  const [tipos, setTipos] = useState([]); // Novo estado para armazenar os tipos de filiais

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${SERVER_URL}/empresas/${1}`)
      console.log(response.data);
      setEmpresaId(response.data.id);
    };

    const getDataFilias = async () => {
      const response = await axios.get(`${SERVER_URL}/tipos`); // Ajuste para o endpoint correto
      console.log(response.data);
      setTipos(response.data); // Armazena a lista de tipos de filiais
    };

    getData();
    getDataFilias();
  }, []); // Adicionei o array de dependências

  const handleSubmit = async (e) => {
    e.preventDefault();
    let methodologi = filial ? 'PUT' : 'POST';
    let url;

    if (methodologi === 'PUT') {
      url = `${SERVER_URL}/filial/${filial.id}`;
    } else {
      url = `${SERVER_URL}/filial`;
    }

    try {
      const response = await fetch(`${url}`, {
        method: methodologi,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          localizacao,
          telefone,
          email,
          empresaId,
          tipoFilialId:tipoId,
        }),
      });
      if (!response.ok) throw new Error('Erro ao salvar filial');
      
      toast.success(`Filial ${filial ? 'atualizada' : 'criada'} com sucesso!`); // Notificação de sucesso
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
          {filial ? 'Editar Filial' : 'Criar Nova Filial'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nome da Filial</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Localização</label>
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Campo de seleção para o tipo de filial */}
          <div className="mb-4">
            <label className="block mb-2">Tipo de Filial</label>
            <select
              value={tipoId}
              onChange={(e) => setTipoId(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="" disabled>
                Selecione um tipo
              </option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
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
              {filial ? 'Salvar Alterações' : 'Criar'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Modal;
