<template>
    <div class="intro-container">
        <!-- Cabeçalho principal contendo o logotipo e o título -->
        <div class="intro-header">
            <!-- Logotipo da empresa -->
            <img src="/images/ST.um.png" alt="Logotipo" class="logo" />
        </div>

     
        <!-- Container para os botões de login e cadastro -->
        <div class="intro-buttons">
            <!-- Botão de Login -->
            <router-link to="/login">
                <button type="button" class="btn btn-outline-light ">Login</button>
            </router-link>
            <!-- Botão de Cadastro -->
          
        </div>
        <!-- SVG animado das ondas -->
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <!-- Definição do caminho da onda -->
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <!-- Grupo de ondas animadas -->
            <g class="parallax">
                <!-- Ondas com diferentes opacidades -->
                <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
        </svg>
        <!-- Nome da empresa ou marca -->
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: "IntroAnimation",
};
</script>

<style scoped>
/* Reset básico para remover margens e espaçamentos padrão do navegador */
body,
html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
    /* Fonte padrão do site */
}

/* Estilo do container principal que envolve todo o conteúdo */
.intro-container {
    position: relative;
    /* Necessário para posicionamento absoluto dos elementos filhos */
    text-align: center;
    /* Centraliza o conteúdo dentro do container */
    background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
    /* Fundo gradiente */
    color: white;
    /* Cor do texto em branco */
    height: 100vh;
    /* Altura da tela cheia */
    overflow: hidden;
    /* Esconde o conteúdo que ultrapassa os limites do container */
}

/* Estilo do cabeçalho que envolve o logotipo e o título */
.intro-header {
    width: 100%;
    /* Largura completa da tela */
    margin: 0;
    padding: 0;
    display: flex;
    /* Flexbox para alinhamento do conteúdo */
    justify-content: center;
    /* Centraliza horizontalmente */
    align-items: center;
    /* Centraliza verticalmente */
    text-align: center;
    flex-direction: column;
    /* Empilha o logotipo e o título verticalmente */
}

/* Estilo da imagem do logotipo, ajustando o tamanho */
.logo {
    width: 25%;
    /* Ajuste o tamanho conforme necessário */
    /* height: auto; Mantém a proporção da imagem */
}

/* Estilo do container dos botões de login e cadastro */
.intro-buttons {
    display: flex;
    /* Flexbox para alinhar os botões em linha */
    justify-content: center;
    /* Centraliza os botões horizontalmente */
    gap: 15px; /* Define o espaçamento entre os botões */
    margin-top: 2px;
    /* Adiciona espaçamento acima dos botões */
}

.intro-buttons button {
    background: rgb(7, 50, 192);
    background: linear-gradient(0deg, rgb(5, 58, 204) 0%, rgb(3, 79, 220) 100%);
    width: 150px;
    height: 45px;
    line-height: 40px; /* Ajustado para ficar centralizado */
    padding: 0;
    border:#02298A; /* Remove a borda padrão */
    color: white; /* Cor do texto */
    text-align: center; /* Centraliza o texto dentro do botão */
    cursor: pointer; /* Muda o cursor para indicar que é clicável */
    border-radius: 10px; /* Arredonda os cantos do botão */
    transition: all 0.3s ease-in-out; /* Transição suave para todas as propriedades */
}

.intro-buttons button:hover {
    background: rgb(2,126,251);
    color: black;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(216, 235, 243) 100%);
    transform: scale(1.05); /* Aumenta o tamanho do botão */
    box-shadow: 3 8px 8px rgba(0,0,0,0.3); /* Adiciona sombra para efeito de elevação */
}

/* Estilo das ondas animadas na parte inferior */
.waves {
    position: absolute;
    /* Posiciona as ondas na parte inferior da tela */
    bottom: 0;
    left: 50%;
    /* Centraliza horizontalmente */
    width: 100vw;
    /* Largura completa da tela */
    height: 15vh;
    /* Altura das ondas */
    margin-bottom: -7px;
    /* Ajusta a posição para sobrepor a parte inferior */
    min-height: 100px;
    max-height: 150px;
    transform: translateX(-50%);
    /* Centraliza o SVG */
}

/* Animação das ondas */
.parallax>use {
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    /* Movimento suave e infinito das ondas */
}

/* Definição dos tempos de animação para cada camada de onda */
.parallax>use:nth-child(1) {
    animation-delay: 2s;
    animation-duration: 70s;
}

.parallax>use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 70s;
}

.parallax>use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 53s;
}

.parallax>use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

/* Keyframes da animação que move as ondas */
@keyframes move-forever {
    0% {
        transform: translateX(-90%) translateY(0);
    }

    /* Posição inicial da onda */
    100% {
        transform: translateX(85%) translateY(-10px);
    }

    /* Posição final da onda */
}

/* Estilo do nome da empresa ou marca na parte inferior */
.empressa {
    margin-top: 150px;
    /* Espaçamento superior */
    color: rgb(255, 255, 255);
    /* Cor do texto em branco */
}
</style>