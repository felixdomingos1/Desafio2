import React, { useEffect, useState } from "react";
import Heading from "../../common/Heading";
import axios from "axios";
import "./hero.css";

const Hero = () => {
  const [filiais, setFiliais] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("");
  const [filteredFiliais, setFilteredFiliais] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchFiliais();
    fetchTipos();
  }, []);

  useEffect(() => {
    const results = filiais.filter(filial =>
      (filial.localizacao ? filial.localizacao.toLowerCase().includes(searchLocation.toLowerCase()) : false) &&
      (filial.nome ? filial.nome.toLowerCase().includes(searchType.toLowerCase()) : false)
    );
    setFilteredFiliais(results);
    // Abre o popup se houver resultados
    setIsPopupOpen(results.length > 0);
  }, [searchLocation, searchType, filiais]);

  const fetchFiliais = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/filiais`);
      setFiliais(response.data);
      setFilteredFiliais(response.data);
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
  };

  const fetchTipos = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/tipos`);
      setTipos(response.data);
    } catch (error) {
      console.error('Erro ao buscar tipos de filiais:', error);
    }
  };

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Pesquise por uma Filial' subtitle='Encontre uma das Filiais da Luz Kabir.' />

          <form className='flex'>
            <div className='box'>
              <span>Cidade</span>
              <input
                type='text'
                placeholder='Localização'
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <div className='box'>
              <span>Tipo de Filial</span>
              <input
                type='text'
                placeholder='Tipo de Filial'
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              />
            </div>
            <button className='btn1' type="button" onClick={() => setIsPopupOpen(filteredFiliais.length > 0)}>
              <i className='fa fa-search'></i>
            </button>
          </form>

          {isPopupOpen && (
            <div className="results absolute top-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              {filteredFiliais.length > 0 ? (
                filteredFiliais.map(filial => (
                  <div key={filial.id} className="result-item p-2 border-b last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{filial.nome}</h3>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">Nenhuma filial encontrada.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Hero;
