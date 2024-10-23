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
  const [image, setImage] = useState(null);
  const [tipos, setTipos] = useState([]); 
  
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
      const response = await axios.get(`${SERVER_URL}/tipos`);  
      console.log(response.data);
      setTipos(response.data);  
    };

    getData();
    getDataFilias();
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();  
    formData.append('nome', nome);
    formData.append('localizacao', localizacao);
    formData.append('telefone', telefone);
    formData.append('email', email);
    formData.append('empresaId', empresaId);
    formData.append('tipoFilialId', tipoId);
  
    if (image) { 
      formData.append('foto', image);   
    }

    if (!image) { 
      toast.error('Adicione Uma imagem e Tente novamente.');  
      throw new Error("Imagem Required")
    }

    let methodologi = filial ? 'PUT' : 'POST';
    let url = filial ? `${SERVER_URL}/filial/${filial.id}` : `${SERVER_URL}/filial`;
  
    try {
      const response = await axios({
        method: methodologi,
        url,
        data:formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response) throw new Error('Erro ao salvar Tipo');
      toast.success(`Filial ${filial ? 'atualizada' : 'criada'} com sucesso!`); 
      await onRefresh();  
      onClose();  
    } catch (error) {
      console.error('Erro ao salvar filial:', error);
      toast.error('Erro ao salvar filial. Tente novamente.');  
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
          <div className="mb-2">
            <label className="block mb-2">Nome da Filial</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2">Localização</label>
            <input
              type="text"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block mb-2">Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="mb-2">
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
          <div className="mb-2">
              <label className="block mb-2">Tipo de Filial</label>
              <select
                value={tipoId}
                onChange={(e) => setTipoId(e.target.value)}
                className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">
                  Selecione um tipo
                </option>
                {tipos.length > 0 ? (
                  tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nome}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Nenhum tipo disponível
                  </option>
                )}
              </select>
            </div>

          <div className="mb-2">
            <label className="block mb-2">Imagem da Filial</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
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
