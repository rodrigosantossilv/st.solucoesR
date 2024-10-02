<template>
  <div class="login-container">
    <div class="left-side">
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <img src="/images/ST.png" alt="Logotipo" />
      <img src="/images/circulos.png" alt="Circles" class="corner-img" />
    </div>

    <div class="right-side">
      <div class="login-box">
        <h2>Olá, Informe seu problema</h2>

      <!-- Modificação na parte do problema -->
<b-form-group label="Problema*" label-for="problema">
  <b-form-select v-model="problema" id="problema">
    <option value="" disabled>Selecione o seu problema:</option>
    <option value="Arcondicionado">Ar condicionado</option>
    <option value="Projetores">Projetores</option>
    <option value="CaixadeSom">Caixa de som</option>
    <option value="Iluminaçãodoambiente">Iluminação do ambiente</option>
    <option value="Mobiliário">Mobiliário</option>
    <option value="ComputadoresePerifericos">Computadores e periféricos</option> <!-- Adicionada esta opção -->
    <option value="SoftwareseProgramasEspecíficos">Softwares e programas específicos</option>
    <option value="DisposiçãoDosEquipamentosnoAmbiente">Disposição dos equipamentos no ambiente</option>
    <option value="Internet">Internet</option>
    <option value="Outro">Outro</option>
  </b-form-select>
</b-form-group>

<!-- Lógica para selecionar Máquina -->
<b-form-group v-if="problema === 'Computadoresdolaboratório' || problema === 'ComputadoresePerifericos'" label="Selecionar Máquina" label-for="SelecionarMaquina">
  <b-button id="SelecionarMaquina" variant="primary" @click="navigateToLugar">
    Selecionar Máquina
  </b-button>
</b-form-group>

        <b-form-group label="Bloco da sala*" label-for="blocodasala">
          <b-form-select v-model="blocodaSala" id="blocodasala" @change="updateSalas">
            <option value="" disabled>Selecione um Bloco da sala</option>
            <option value="BlocoA">Bloco A</option>
            <option value="BlocoB">Bloco B</option>
            <option value="BlocoC">Bloco C</option>
            <option value="BlocoD">Bloco D</option>
            <option value="BlocoE">Bloco E</option>
            <option value="BlocoF">Bloco F</option>
            <option value="BlocoG">Bloco G</option>
            <option value="BlocoH">Bloco H</option>
          </b-form-select>
        </b-form-group>

        <b-form-group v-if="blocodaSala" label="Selecionar sala*" label-for="sala">
          <b-form-select v-model="numerodaSala" id="sala">
            <option value="" disabled>Selecione a Sala</option>
            <option v-for="sala in salas" :key="sala" :value="sala">{{ sala }}</option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary" @click="reportProblem">
          Relatar Problema
        </b-button>

        <div class="text-center mt-3">
          <router-link to="/" class="btn btn-link">Voltar à página inicial</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { BForm, BFormGroup, BFormTextarea, BFormSelect, BButton } from 'bootstrap-vue-3';

export default {
  components: {
    BForm,
    BFormGroup,
    BFormTextarea,
    BFormSelect,
    BButton,
  },
  data() {
    return {
      problema: '',
      Outro: '',
      blocodaSala: '',
      numerodaSala: '',
      salas: [],
      numeroComputadorSelecionado: null, // Valor para armazenar o número do computador
      blocos: {
        BlocoA: [
          "Lab. de acionamento mezanino - Térreo",
          "Eletrotécnica - Térreo",
          "Hidráulica e pneumática - Térreo",
          "Automação industrial - Térreo",
          "Automação predial - Térreo",
        ],
        BlocoB: ["Lab. Química - Térreo"],
        BlocoC: [
          "Lab. Mecânica industrial - Térreo",
          "Lab. de Hidráulica e Pneumática - Térreo",
          "Lab. Torno - Térreo",
        ],
        BlocoD: [
          "Laboratório - Térreo",
          "Sala 01 - Térreo",
          "Lab Maker - Térreo",
        ],
        BlocoE: [
          "Sala 01 - Térreo",
          "Sala 1.1 - Térreo",
          "Sala 1.2 - Térreo",
          "Sala 02 - Térreo",
          "Sala 03 - Térreo",
          "Sala 04 - Térreo",
          "Sala 05 - Térreo",
          "Sala 06 - Térreo",
          "Sala 6.1 - Térreo",
          "Sala 07 - Térreo",
          "Sala 08 - Térreo",
          "Predial (S.9) - Térreo",
          "Sala 10 - Térreo",
        ],
        BlocoF: [
          "Sala 01 - 1° Andar",
          "Sala 02 - 1° Andar",
          "Sala 03 - 1° Andar",
          "Sala 04 - 1° Andar",
          "Sala 05 - 1° Andar",
          "Sala 06 - 1° Andar",
          "Sala 07 - 1° Andar",
          "Sala 08 - 1° Andar",
          "Sala 09 - 1° Andar",
          "Sala 10 - 1° Andar",
          "Sala 11 - 2° Andar",
          "Sala 12 - 2° Andar",
          "Sala 13 - 2° Andar",
          "Sala 14 - 2° Andar",
          "Sala 15 - 2° Andar",
          "Sala 16 - 2° Andar",
          "Sala 17 - 2° Andar",
          "Sala 18 - 2° Andar",
          "Sala 19 - 2° Andar",
          "Sala 20 - 2° Andar",
        ],
        BlocoG: ["Mecânica automotiva - Térreo"],
        BlocoH: [
          "Setor teórica de Empilhadeira - Térreo",
          "Sala de Planta EMI - Térreo",
          "Planta de processamento de cereais, raízes e derivados - Térreo",
        ],
      },
    };
  },
  mounted() {
    // Recebe o número do computador pela rota
    const numeroComputador = this.$route.params.numeroComputador;
    if (numeroComputador) {
      this.numeroComputadorSelecionado = numeroComputador;
    }
  },
  methods: {
    updateSalas(value) {
      this.salas = this.blocos[value] || [];
      this.numerodaSala = '';
    },
    navigateToLugar() {
      this.$router.push('/lugar'); // Navegar para a página Lugares.vue
    },
    reportProblem() {
      if (this.blocodaSala && this.numerodaSala && this.problema) {
        // Lógica para enviar o problema
        Swal.fire('Problema Relatado', 'Seu problema foi relatado com sucesso!', 'success');
      } else {
        Swal.fire('Erro', 'Preencha todos os campos obrigatórios.', 'error');
      }
    },
  },
};
</script>


<style scoped>
/* Reset básico */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

/* Container de registro */
.login-container {
  display: flex;
  height: 100vh;
  position: relative; /* Necessário para a posição absoluta das bolhas */
}

/* Lado esquerdo - Imagem com gradiente e bolhas */
.left-side {
  flex: 1;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* Garante que as bolhas fiquem dentro do lado esquerdo */
}

/* Lado direito - Formulário de registro */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Caixa de registro */
.login-box {
  width: 85%;
  max-width: 600px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Estilo do título */
.login-box h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #0738b3;
}

/* Estilo dos inputs e textarea */
.login-box input,
.login-box textarea,
.login-box select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

/* Botão de envio */
.login-box button {
  width: 100%;
  padding: 11px;
  background-color:  #02298A;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Efeito de hover no botão */
.login-box button:hover {
  background-color: #2059ea;
}

/* Estilo do link */
.login-box .btn-link {
  color: rgb(8, 91, 143);
  text-decoration: none;
}

.login-box .btn-link:hover {
  text-decoration: underline;
}

/* Imagem no canto */
.corner-img {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 750px;
  height: auto;
}

/* Responsividade adicional */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-side {
    display: none;
  }

  .right-side {
    flex: 1;
  }

  .corner-img {
    display: none;
  }
}

/* Animação das bolhas no lado esquerdo */
.bubbles {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1; /* Garante que as bolhas fiquem atrás do conteúdo principal */
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2); /* Cor sutil para as bolhas */
  animation: bubble 5s infinite; /* Animação contínua */
}

/* Ajuste das bolhas no lado esquerdo */
.left-side .bubbles .bubble:nth-child(1) {
  width: 60px;
  height: 60px;
  left: 10%;
  bottom: -100px;
  animation-duration: 7s;
}

.left-side .bubbles .bubble:nth-child(2) {
  width: 100px;
  height: 100px;
  left: 30%;
  bottom: -150px;
  animation-duration: 9s;
}

.left-side .bubbles .bubble:nth-child(3) {
  width: 80px;
  height: 80px;
  left: 50%;
  bottom: -200px;
  animation-duration: 6s;
}

.left-side .bubbles .bubble:nth-child(4) {
  width: 120px;
  height: 120px;
  left: 70%;
  bottom: -250px;
  animation-duration: 8s;
}

.left-side .bubbles .bubble:nth-child(5) {
  width: 90px;
  height: 90px;
  left: 80%;
  bottom: -300px;
  animation-duration: 10s;
}

@keyframes bubble {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) scale(0);
    opacity: 0;
  }
}

</style>
