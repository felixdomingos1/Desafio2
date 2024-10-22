import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Tem Alguma Pergunta ?</h1>
              <p>Nós ajudamos lhe a encontrar o que procura.</p>
            </div>
            <button className='btn5'>Contacta nos</button>
          </div>
        </div>
      </section>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo.jfif' alt='' />
              <h2>Precisas de Ajuda?</h2>
              <p>Receba novas atualizações sobre nossos serviços mensalmente</p>
              <div className='input flex'>
                <input type='email' placeholder='Coloque seu Email' />
                <button>Subscreva</button>
              </div>
            </div>
          </div>

        </div>
      </footer>
      <div className='legal'>
        <span>© {new Date().getFullYear()} - Luz Kabir - Todos os direitos reservados.</span>
      </div>
    </>
  )
}

export default Footer
