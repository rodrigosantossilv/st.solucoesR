<template>
  <div class="register-container">
    <div class="left-side">
      <img src="/images/ST.png" alt="Logotipo"/>
      <img src="/images/circulos.png" alt="Circles" class="corner-img"/>
      
      <!-- Bubbles Animation -->
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
    </div>

    <div class="right-side">
      <div class="register-box">
        <h2>Cadastrar</h2>

        <form @submit.prevent="handleSubmit">
          <input type="text" v-model="nome" placeholder="Nome completo" required />
          <input type="text" v-model="instituicao" placeholder="Instituição de ensino" required />
          <input type="text" v-model="cep" placeholder="CEP" v-mask="'###.###.###-##'" @blur="fetchCep" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="email" v-model="confirmEmail" placeholder="Confirmar email" required />
          <div class="password-container">
            <input :type="senhaFieldType" v-model="senha" placeholder="Senha" required @paste.prevent />
            <i @click="toggleSenhaVisibility" class="password-icon">
              <span v-if="senhaFieldType === 'password'">
                <img src="/images/olho.png" alt="Olho" class="eye-icon" />
              </span>
              <span v-else>
                <img src="/images/fechado.png" alt="Fechado" class="eye-icon" />
              </span>
            </i>
          </div>

          <div class="password-container">
            <input :type="confirmSenhaFieldType" v-model="confirmSenha" placeholder="Confirmar senha" required @paste.prevent />
            <i @click="toggleConfirmSenhaVisibility" class="password-icon">
              <span v-if="confirmSenhaFieldType === 'password'">
                <img src="/images/olho.png" alt="Olho" class="eye-icon" />
              </span>
              <span v-else>
                <img src="/images/fechado.png" alt="Fechado" class="eye-icon" />
              </span>
            </i>
          </div>

          <button type="submit">Cadastrar</button>

          <div v-if="feedback" :class="{'text-success': isSuccess, 'text-danger': !isSuccess}" class="mt-2">
            {{ feedback }}
          </div>
        </form>

        <div class="text-center mt-3">
          <p class="mb-0">
            Já tem uma conta? 
            <router-link to="login" class="btn btn-link">Login</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      instituicao: '',
      cep: '',
      email: '',
      confirmEmail: '',
      senha: '',
      confirmSenha: '',
      feedback: '',
      isSuccess: false,
      senhaFieldType: 'password',
      confirmSenhaFieldType: 'password',
    };
  },
  methods: {
    handleSubmit() {
      this.feedback = '';
      this.isSuccess = false;

      if (!this.email.includes('@')) {
        this.feedback = 'Email inválido';
        this.isSuccess = false;
        return;
      }

      if (this.email !== this.confirmEmail) {
        this.feedback = 'Os emails não coincidem';
        this.isSuccess = false;
        return;
      }

      if (this.senha.length < 8) {
        this.feedback = 'A senha deve ter pelo menos 8 caracteres';
        this.isSuccess = false;
        return;
      }

      if (this.senha !== this.confirmSenha) {
        this.feedback = 'As senhas não coincidem';
        this.isSuccess = false;
        return;
      }

      this.feedback = 'Cadastro realizado com sucesso!';
      this.isSuccess = true;
    },

    fetchCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 8) { // Corrigido para 8 caracteres
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              this.feedback = 'CEP não encontrado';
              this.isSuccess = false;
            } else {
              // Preencher os campos adicionais se necessário
              console.log(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
            }
          })
          .catch(() => {
            this.feedback = 'Erro ao buscar CEP';
            this.isSuccess = false;
          });
      }
    },
    
    toggleSenhaVisibility() {
      this.senhaFieldType = this.senhaFieldType === 'password' ? 'text' : 'password';
    },
    
    toggleConfirmSenhaVisibility() {
      this.confirmSenhaFieldType = this.confirmSenhaFieldType === 'password' ? 'text' : 'password';
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
.register-container {
  display: flex;
  height: 100vh;
  position: relative; /* Necessário para a posição absoluta das bolhas */
}

/* Lado esquerdo - Imagem com gradiente */
.left-side {
  flex: 1;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Lado direito - Formulário de registro */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Necessário para a posição absoluta das bolhas */
}

/* Caixa de registro */
.register-box {
  width: 85%;
  max-width: 400px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Estilo do título */
.register-box h2 {
  margin-bottom: 20px;
  text-align: center;
  color:  #0738b3;
}

/* Estilo dos inputs */
.register-box input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

/* Botão de registro */
.register-box button {
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
.register-box button:hover {
  background-color: #2059ea;
}

/* Estilo do link */
.register-box .btn-link {
  color: rgb(8, 91, 143);
  text-decoration: none;
}

.register-box .btn-link:hover {
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
  .register-container {
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

/* Contêiner e ícone da senha */
.password-container {
  position: relative;
}

.password-container input {
  padding-right: 40px; /* Ajuste para o espaço do ícone */
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
  user-select: none; /* Impede a seleção do texto do ícone */
  transition: color 0.3s, transform 0.3s;
}

.password-icon:hover {
  color: #000; /* Cor do ícone ao passar o mouse */
  transform: scale(1.2); /* Aumenta o tamanho do ícone ao passar o mouse */
}

/* Animação das bolhas */
.bubbles {
  position: absolute;
  bottom: 0;
  left: 0; /* Move as bolhas para o lado esquerdo */
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

/* Ajuste das bolhas */
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

/* Responsividade */
@media (max-width: 768px) {
  .register-container {
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

.eye-icon {
  width: 30px; /* Ajuste para o tamanho desejado */
  height: 30px; /* Ajuste para o tamanho desejado */
  cursor: pointer;
}
</style>
