<template>
  <div>
    <!-- Tela de Login -->
    <div class="login-container">
      <div class="left-side">
        <img src="/images/ST.png" alt="Logotipo" />
        <img src="/images/circulos.png" alt="Circles" class="corner-img" />
        
        <!-- Bubbles Animation (opcional) -->
        <div class="bubbles">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>

      <div class="right-side">
        <div class="login-box">
          <h2>Bem-vindo!</h2>
          <input type="text" placeholder="Usuário" v-model="usuario" aria-label="Usuário" />
          <p v-if="usuarioInvalido" class="error-text">Usuário inválido!</p>
          <div class="password-container">
            <input :type="passwordFieldType" placeholder="Senha" v-model="password" aria-label="Senha" />
            <i @click="togglePasswordVisibility" class="password-icon">
              <span v-if="passwordFieldType === 'password'">
                <img src="/images/olho.png" alt="Olho" class="eye-icon" />
              </span>
              <span v-else>
                <img src="/images/fechado.png" alt="Fechado" class="eye-icon" />
              </span>
            </i>
          </div>
          <p v-if="senhaInvalida" class="error-text">Senha inválida!</p>
          <button @click="login" :disabled="isLoading">
            <span v-if="isLoading">Carregando...</span>
            <span v-else>Login</span>
          </button>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Certifique-se de que o axios está importado
import Swal from 'sweetalert2'; // Mantenha a importação do SweetAlert2

export default {
  data() {
    return {
      usuario: '',
      password: '',
      usuarioInvalido: false,
      senhaInvalida: false,
      passwordFieldType: 'password',
      isLoading: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    async login() {
      this.usuarioInvalido = !this.usuario.trim();
      this.senhaInvalida = !this.password.trim();

      if (this.usuarioInvalido || this.senhaInvalida) return;

      this.isLoading = true;

      try {
        // Verifica se é admin com senha 123456
        if (this.usuario === 'user' && this.password === '123456') {
          this.$router.push('/openticketpage'); // Redireciona para a tela de Kanban
          return;
        }
        if (this.usuario === 'noa' && this.password === '123456') {
          this.$router.push('/sidebar'); // Redireciona para a tela de Kanban
          return;
        }
        
        // Se não for admin, continua com a chamada normal à API
        const response = await axios.post('/usuarios/login', {
          usuario: this.usuario,
          password: this.password,
        });

        if (response.data.success) {
          this.$router.push('/openticketpage'); // Redireciona para a tela de Kanban
        } else {
          this.senhaInvalida = true;
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: error.response ? error.response.data.message || 'Usuário ou senha inválidos!' : 'Erro de conexão. Tente novamente mais tarde.',
        });
      } finally {
        this.isLoading = false;
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

/* Container de login */
.login-container {
  display: flex;
  height: 100vh;
  position: relative;
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

/* Lado direito - Formulário de login */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Caixa de login */
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

/* Estilo dos inputs */
.login-box input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #b2b0b0;
  border-radius: 15px;
  box-sizing: border-box;
}

.login-box input:hover {
  border-color: #0056b3;
  box-shadow: 0 0 5px rgba(0, 86, 179, 0.5);
}

/* Botão de login */
.login-box button {
  width: 100%;
  padding: 11px;
  background-color: #02298A;
  color: rgb(255, 255, 255);
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
.eye-icon {
  width: 20px; /* Ajuste para um tamanho menor */
  height: 20px; /* Ajuste para um tamanho menor */
  cursor: pointer;
}


/* Responsividade */
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

/* Contêiner e ícone da senha */
.password-container {
  position: relative;
}

.password-container input {
  padding-right: 40px;
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
  user-select: none;
  transition: color 0.3s, transform 0.3s;
}

.password-icon:hover {
  color: #000;
  transform: scale(1.2);
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
