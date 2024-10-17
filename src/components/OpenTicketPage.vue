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

        <b-form-group label="Problema*" label-for="problema">
          <b-form-select v-model="problema" id="problema">
            <option value="" disabled>Selecione o seu problema:</option>
            <option value="Arcondicionado">Ar condicionado</option>
            <option value="Projetores">Projetores</option>
            <option value="CaixadeSom">Caixa de som</option>
            <option value="Iluminaçãodoambiente">Iluminação do ambiente</option>
            <option value="Mobiliário">Mobiliário</option>
            <option value="ComputadoresePerifericos">Computadores e periféricos</option>
            <option value="SoftwareseProgramasEspecíficos">Softwares e programas específicos</option>
            <option value="DisposiçãoDosEquipamentosnoAmbiente">Disposição dos equipamentos no ambiente</option>
            <option value="Internet">Internet</option>
            <option value="Outro">Outro</option>
          </b-form-select>
        </b-form-group>

        <!-- Campo de texto para 'Softwares e programas específicos' ou 'Outro' -->
        <b-form-group v-if="problema === 'SoftwareseProgramasEspecíficos' || problema === 'Outro'" label="Descreva o problema específico" label-for="descricaoProblema">
          <b-form-input v-model="descricaoProblema" id="descricaoProblema" placeholder="Digite mais detalhes sobre o problema"></b-form-input>
        </b-form-group>

        <!-- Botão de seleção de máquina unificado -->
    

        <b-form-group label="Bloco da sala*" label-for="blocodasala">
          <b-form-select v-model="blocodaSala" id="blocodasala" @change="updateSalas">
            <option value="" disabled>Selecione um Bloco da sala</option>
            <option v-for="bloco in Object.keys(blocos)" :key="bloco" :value="bloco">{{ bloco }}</option>
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


      <!-- Componente de seleção de lugares -->
      <div v-if="mostrarSelecionarLugar" class="lugar-selection">
        <h2>Escolha o seu lugar</h2>
        <div class="sala">
          <div 
            v-for="lugar in lugares" 
            :key="lugar.id" 
            class="lugar" 
            :class="{ selecionado: lugar.selecionado }"
            @click="toggleSelecao(lugar.id)"
            :style="{ gridColumn: lugar.coluna, gridRow: lugar.fileira }"
          >
            {{ lugar.fileira }}-{{ lugar.coluna }}
          </div>
        </div>
        <button class="btn-submit" @click="confirmarSelecao">Confirmar Seleção</button>
      </div>
       <!-- Box para mostrar os dados selecionados -->
       <div class="selected-report">
        <h3>Relatório Selecionado</h3>
        <p><strong>Problema:</strong> {{ problema }}</p>
        <p><strong>Bloco da Sala:</strong> {{ blocodaSala }}</p>
        <p><strong>Número da Sala:</strong> {{ numerodaSala }}</p>
        <p v-if="problema === 'ComputadoresePerifericos'"><strong>Lugar Selecionado:</strong> {{ lugarSelecionado }}</p>
        <p v-if="problema === 'SoftwareseProgramasEspecíficos' || problema === 'Outro'"><strong>Descrição do Problema:</strong> {{ descricaoProblema }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { BForm, BFormGroup, BFormSelect, BButton } from 'bootstrap-vue-3';
import axios from 'axios';

export default {
  components: {
    BForm,
    BFormGroup,
    BFormSelect,
    BButton,
  },
  data() {
    return {
      problema: '',
      blocodaSala: '',
      numerodaSala: '',
      lugarSelecionado: '',
      mostrarSelecionarLugar: false,
      lugares: [],
      salas: [],
      blocos: {},
      descricaoProblema: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    problema(newValue) {
      if (newValue === 'ComputadoresePerifericos' || newValue === 'SoftwareseProgramasEspecíficos') {
        this.openLugarSelection();
      } else {
        this.mostrarSelecionarLugar = false; // Esconde a seleção de lugares se for outro problema
      }
    }
  },
  methods: {
    fetchData() {
      const apiEndpoints = [
        'http://localhost:3000/blocos',
      ];

      axios.get(apiEndpoints[0])
        .then(response => {
          this.blocos = response.data;
          console.log('Blocos carregados:', this.blocos);
        })
        .catch(error => {
          console.error('Erro ao carregar blocos:', error);
          Swal.fire('Erro', 'Não foi possível carregar os blocos.', 'error');
        });
    },
    updateSalas(value) {
      this.salas = this.blocos[value] || [];
      this.numerodaSala = '';
    },
    openLugarSelection() {
      this.mostrarSelecionarLugar = true;
      this.inicializarLugares();
    },
    inicializarLugares() {
      const numFileiras = 7;
      const numLugaresPorFileira = [1, 7, 7, 7, 7, 7, 7];

      this.lugares = [];
      numLugaresPorFileira.forEach((numLugares, i) => {
        for (let j = 0; j < numLugares; j++) {
          this.lugares.push({
            id: `${i}-${j}`,
            fileira: i + 1,
            coluna: j + 1,
            selecionado: false,
          });
        }
      });
    },
    toggleSelecao(id) {
      const lugar = this.lugares.find(l => l.id === id);
      if (lugar) {
        this.lugares.forEach(l => l.selecionado = false);
        lugar.selecionado = true;
      }
    },
    confirmarSelecao() {
      const selecionados = this.lugares.filter(l => l.selecionado);
      if (selecionados.length === 0) {
        Swal.fire('Erro', 'Por favor, selecione um lugar.', 'error');
        return;
      }
      const lugaresSelecionados = selecionados.map(l => `${l.fileira}-${l.coluna}`).join(', ');
      this.lugarSelecionado = lugaresSelecionados;
      this.mostrarSelecionarLugar = false; // Feche a seleção
    },
    reportProblem() {
      if (this.blocodaSala && this.numerodaSala && this.problema) {
        if (this.problema === 'ComputadoresePerifericos' && !this.lugarSelecionado) {
          Swal.fire('Erro', 'Por favor, selecione um lugar.', 'error');
          return;
        }
        Swal.fire('Problema Reportado', 'Obrigado por reportar o problema!', 'success');
      } else {
        Swal.fire('Erro', 'Por favor, preencha todos os campos obrigatórios.', 'error');
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
.lugar-selection {
  border: 1px solid #ccc;
  padding: 45px;
  margin-top: 20px;
  border-radius: 10px;
}

.sala {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.lugar {
  border: 1px solid #000;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.lugar.selecionado {
  background-color: #007bff;
  color: white;
}

.btn-submit {
  margin-top: 10px;
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
  position: relative;

  justify-content: center;
  align-items: center;
  position: fixed; /* Permite que acompanhe a rolagem da página */
  height: 100%; /* Faz com que ocupe 100% da altura da tela */
  overflow: hidden; /* Garante que as bolhas fiquem dentro do lado esquerdo */
  z-index: 1; /* Mantém a camada do lado esquerdo acima do conteúdo da direita */
}


/* Lado direito - Formulário de registro */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  flex-direction: column; /* Adiciona flex-direction para empilhar elementos verticalmente */
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Caixa de registro */
.login-box {
  width: 85%;
  max-width: 400px;
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
  background-color: #02298A;
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

/* Estilo da caixa de relatório selecionado */
.selected-report {
  width: 22%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  margin-top: 20px;
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
    height: 30vh;
  }

  .right-side {
    height: auto;
  }

  .login-box {
    width: 90%;
  }
}

/* Bubbles Animation */
.bubbles {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  animation: bubble 5s infinite;
}

.bubble:nth-child(1) {
  width: 60px;
  height: 60px;
  left: 10%;
  bottom: -100px;
  animation-duration: 7s;
}

.bubble:nth-child(2) {
  width: 100px;
  height: 100px;
  left: 30%;
  bottom: -150px;
  animation-duration: 9s;
}

.bubble:nth-child(3) {
  width: 80px;
  height: 80px;
  left: 50%;
  bottom: -200px;
  animation-duration: 6s;
}

.bubble:nth-child(4) {
  width: 120px;
  height: 120px;
  left: 70%;
  bottom: -250px;
  animation-duration: 8s;
}

.bubble:nth-child(5) {
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
