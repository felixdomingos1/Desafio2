import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.jfif';
import { Link, useNavigate } from 'react-router-dom';

const Recuperar = () => {
  const { login } = useContext(AuthContext);
  const [telefone, settelefone] = useState('');
  const [Email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    try {
        alert("Ainda nn podemos Recuperar as Senhas")
      } catch (err) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-300-50">
      <div className="flex flex-col items-center bg-white p-6 rounded  w-96">
        <img src={logo} alt="Luz Kabir Logo" className="w-32 mb-4" />
        <h2 className="text-xl mb-4">Recuperar</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="Email"
            placeholder="coloque o seu Email de cadastro"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 mb-4 p-2 w-full"
            required
          />
          <button 
            type="submit" 
            className={`bg-[#0077B5] text-white p-2 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading}
          >
            {loading ? 'Recuperando...' : 'Recuperar Senha'}
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          <Link to="/entrar" className="text-blue-500 hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recuperar;
