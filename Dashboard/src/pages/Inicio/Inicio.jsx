import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Importação do carrossel de imagens, como react-slick, por exemplo
import Slider from 'react-slick';

const Inicio = () => {
    const [filiais, setFiliais] = useState([]);
    const [produtos, setProdutos] = useState([]);

    // Dados fictícios para teste
    const mockFiliais = [
      { id: 1, nome: "Filial 1", endereco: "Rua A, 123" },
      { id: 2, nome: "Filial 2", endereco: "Av. B, 456" },
    ];

    const mockProdutos = [
      { id: 1, nome: "Produto 1", descricao: "Descrição do Produto 1" },
      { id: 2, nome: "Produto 2", descricao: "Descrição do Produto 2" },
    ];

    useEffect(() => {
      const fetchFiliais = async () => {
        try {
          setFiliais(mockFiliais);
        } catch (error) {
          console.error("Erro ao buscar filiais:", error);
        }
      };

      const fetchProdutos = async () => {
        try {
          setProdutos(mockProdutos);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      };

      fetchFiliais();
      fetchProdutos();
    }, []);

    const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    const filiaisIsValid = Array.isArray(filiais);
    const produtosIsValid = Array.isArray(produtos);

    return (
      <div className="min-h-screen w-full flex flex-col">
        {/* Navegação */}
        <nav className="bg-[#0077b5] p-4">
          <ul className="flex justify-around text-white">
            <li><a href="#filiais" className="hover:text-orange-500">Filiais</a></li>
            <li><a href="#produtos" className="hover:text-orange-500">Produtos</a></li>
            <li><a href="#servicos" className="hover:text-orange-500">Serviços</a></li>
            <li><a href="#testemunhas" className="hover:text-orange-500">Testemunhas</a></li>
            <li><a href="#contato" className="hover:text-orange-500">Contato</a></li>
          </ul>
        </nav>

        {/* Carrossel de Imagens */}
        <section className="mb-8">
          <Slider {...carouselSettings}>
            <div><img src="/imagens/carrossel1.jpg" alt="Imagem 1" className="w-full h-64 object-cover" /></div>
            <div><img src="/imagens/carrossel2.jpg" alt="Imagem 2" className="w-full h-64 object-cover" /></div>
            <div><img src="/imagens/carrossel3.jpg" alt="Imagem 3" className="w-full h-64 object-cover" /></div>
          </Slider>
        </section>

        {/* Seção de Filiais */}
        <section id="filiais" className="p-6 bg-gray-100">
          <h2 className="text-2xl mb-4 text-[#0077b5]">Nossas Filiais</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {filiaisIsValid ? (
              filiais.map((filial) => (
                <li key={filial.id} className="border-b py-2">
                  <h3 className="text-xl text-[#0077b5]">{filial.nome}</h3>
                  <p>{filial.endereco}</p>
                </li>
              ))
            ) : (
              <p>Erro ao carregar filiais.</p>
            )}
          </ul>
        </section>

        {/* Seção de Produtos */}
        <section id="produtos" className="p-6">
          <h2 className="text-2xl mb-4 text-[#0077b5]">Nossos Produtos</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {produtosIsValid ? (
              produtos.map((produto) => (
                <li key={produto.id} className="border p-4 bg-gray-50 shadow-md hover:bg-[#0077b5] hover:text-white transition duration-300">
                  <h3 className="text-lg">{produto.nome}</h3>
                  <p>{produto.descricao}</p>
                </li>
              ))
            ) : (
              <p>Erro ao carregar produtos.</p>
            )}
          </ul>
        </section>

        {/* Seção de Serviços */}
        <section id="servicos" className="p-6 bg-gray-100">
          <h2 className="text-2xl mb-4 text-[#0077b5]">Nossos Serviços</h2>
          <p>Descrição detalhada dos serviços oferecidos pela empresa...</p>
        </section>

        {/* Seção de Testemunhas */}
        <section id="testemunhas" className="p-6">
          <h2 className="text-2xl mb-4 text-[#0077b5]">O que dizem nossos clientes</h2>
          <ul>
            <li className="border-b py-2">
              <p>"Serviço excelente, recomendo!" - Cliente 1</p>
            </li>
            <li className="border-b py-2">
              <p>"Produtos de alta qualidade." - Cliente 2</p>
            </li>
          </ul>
        </section>

        {/* Seção de Contato */}
        <section id="contato" className="p-6 bg-gray-100">
          <h2 className="text-2xl mb-4 text-[#0077b5]">Entre em Contato</h2>
          <p>Email: contato@empresa.com.br</p>
          <p>Telefone: (11) 1234-5678</p>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.685893629861!2d13.317716474174969!3d-8.90876539143451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f70043fdf107%3A0x4b91c9bdc7f40a21!2sLUZ%20kabir!5e0!3m2!1spt-PT!2sao!4v1729593203208!5m2!1spt-PT!2sao" 
          width="100%" 
          height="450" 
          style={{border:0}} 
          allowfullscreen="" 
          loading="lazy"
          title="Mapa"
          ></iframe>
        </section>

        {/* Footer */}
        <footer className="bg-[#0077b5] text-white p-4 text-center mt-auto">
          <p>© 2024 Empresa. Todos os direitos reservados.</p>
          <p>Endereço: Av. Principal, 1234 - Cidade, Estado</p>
          <p>Email: suporte@empresa.com.br | Telefone: (11) 98765-4321</p>
        </footer>
      </div>
    );
};

export default Inicio;
