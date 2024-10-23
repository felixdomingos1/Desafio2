import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapSection from '../map/mapSection';

// Componente Popup
const Popup = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <img
            className="profile-image"
            src={`http://localhost:3300/uploads/${data.image}`}
            alt={data.nome}
          />
          <h4 className="profile-name">{data.nome}</h4>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Localização:</strong> {data.localizacao}</p>
          <p><strong>Telefone:</strong> {data.telefone}</p>
          <p><strong>Tipo:</strong> {data.type}</p>
        </div>

        {/* Renderizando o mapa */}
        <MapSection location={data.localizacao} />

        <button className="close-button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

const RecentCard = () => {
  const [list, setFiliais] = useState([]);
  const [selectedFilial, setSelectedFilial] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchFiliais();
  }, []);

  const fetchFiliais = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/filiais`);
      setFiliais(response.data);
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
  };

  const openPopup = (filial) => {
    setSelectedFilial(filial);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedFilial(null);
  };

  if (!list.length) {
    return null;
  }

  return (
    <>
      <div className='content grid3 mtop'>
        {list.map((val, index) => {
          const { image, email, localizacao, nome, telefone, type } = val;
          return (
            <div className='box shadow' key={index} onClick={() => openPopup(val)}>
              <div className='img h-40'>
                <img 
                  src={`http://localhost:3300/uploads/${image}`} 
                  alt={nome}
                  style={{height:300}}
                />
              </div>
              <div className='text'>
                <div className='category flex'>
                  <span style={{ background: email === "For Sale" ? "#25b5791a" : "#ff98001a", color: email === "For Sale" ? "#25b579" : "#ff9800" }}>{email}</span>
                  <i className='fa fa-heart'></i>
                </div>
                <h4>{nome}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {localizacao}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{telefone}</button> <label htmlFor=''></label>
                </div>
                <span>{type}</span>
              </div>
            </div>
          );
        })}
      </div>

      {isPopupOpen && (
        <Popup data={selectedFilial} onClose={closePopup} />
      )}
    </>
  );
};

export default RecentCard;
