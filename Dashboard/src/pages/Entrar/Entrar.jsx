import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.jfif';
import { Link, useNavigate } from 'react-router-dom';

const Entrar = () => {
  const { login } = useContext(AuthContext);
  const [telefone, settelefone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    try {
      await login(telefone, password);
      navigate('/dashboard')
      // console.log(telefone, password);
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
        <h2 className="text-xl mb-4">Entrar</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="telefone"
            value={telefone}
            onChange={(e) => settelefone(e.target.value)}
            className="border border-gray-300 mb-4 p-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 mb-4 p-2 w-full"
            required
          />
          <button 
            type="submit" 
            className={`bg-[#0077B5] text-white p-2 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="flex flex-col items-center mt-4">
          {/* <Link to="/cadastrar" className="text-blue-500 hover:underline mb-2">
            Não tem uma conta? Cadastre-se
          </Link> */}
          <Link to="/esqueci-senha" className="text-blue-500 hover:underline">
            Esqueci minha senha
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entrar;
