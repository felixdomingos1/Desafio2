import React from "react"
import { featured } from "../../data/Data"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const FeaturedCard = () => {
  
  const [featured, setTipos] = useState([]);

  useEffect(() => {
    fetchFiliais();
  }, []);

  const fetchFiliais = async () => {
    try {
      const response = await axios.get(`http://localhost:3300/tipos`);
      setTipos(response.data);
    } catch (error) {
      console.error('Erro ao buscar filiais:', error);
    }
  };

  return (
    <>
      <div className='content grid5 mtop'>
        {featured.map((items, index) => (
          <div className='box' key={index}>
            <img src={items.cover} alt='' />
            <h4>{items.nome}</h4>
            <label>{items.descricao}</label>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
