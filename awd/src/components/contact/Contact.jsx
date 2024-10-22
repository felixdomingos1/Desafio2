import React from "react"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact mb'>
        <Back name='Contata Nos' title='Conseguir ajuda' cover={img} />
        <div className='container'>
          <form className='shadow'>
            <h4>Preencha os formulários</h4> <br />
            <div>
              <input type='text' placeholder='Nome Completo' />
              <input type='text' placeholder='Email' />
            </div>
            <input type='text' placeholder='Assunto' />
            <textarea cols='30' rows='10'></textarea>
            <button>Enviar</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
