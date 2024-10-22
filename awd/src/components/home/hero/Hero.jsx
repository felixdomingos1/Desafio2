import React from "react"
import Heading from "../../common/Heading"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Pesquise por uma Filial' subtitle='Encontre uma das Filiais da Luz Kabir.' />

          <form className='flex'>
            <div className='box'>
              <span>Cidade</span>
              <input type='text' placeholder='Localização' />
            </div>
            <div className='box'>
              <span>Tipo de Filial</span>
              <input type='text' placeholder='Tipo de Filial' />
            </div> 
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Hero
