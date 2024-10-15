<template>
  <div class="sala-container">
    <!-- Lado esquerdo com imagem e gradiente -->
    <div class="left-side">
 
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
    </div>

    <!-- Lado direito com o formulário -->
    <div class="right-side">
      <div class="sala-box">
        <h2 class="sala-titulo">Escolha o seu lugar</h2>
        <div class="sala">
          <div 
            v-for="lugar in lugares" 
            :key="lugar.id" 
            class="lugar" 
            :class="{ selecionado: lugar.selecionado }"
            :data-index="lugar.id" 
            @click="toggleSelecao(lugar.id)"
            :style="{ gridColumn: lugar.coluna, gridRow: lugar.fileira }"
          >
            {{ lugar.fileira }}-{{ lugar.coluna }}
          </div>
        </div>
        <button class="btn-submit" @click="confirmarSelecao">Confirmar Seleção</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      lugares: [], // Todos os lugares combinados em uma única lista
    };
  },
  mounted() {
    this.inicializarLugares();
  },
  methods: {
    inicializarLugares() {
      const numFileiras = 7; // Total de fileiras
      const numLugaresPorFileira = [1, 7, 7, 7, 7, 7, 7]; // Lugares por fileira

      // Criar a estrutura de lugares
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
      // Desmarcar todos os lugares antes de marcar o novo
      this.lugares.forEach(lugar => (lugar.selecionado = false));

      // Marcar o lugar clicado
      const lugar = this.lugares.find(lugar => lugar.id === id);
      if (lugar) {
        lugar.selecionado = true;
        this.salvarSelecao();
      }
    },
    salvarSelecao() {
      const lugaresSelecionados = this.lugares
        .filter(lugar => lugar.selecionado)
        .map(lugar => lugar.id);
      console.log('Lugares selecionados:', lugaresSelecionados);
      // Aqui você pode adicionar o código para salvar a informação, por exemplo, enviar para um servidor
    },
    confirmarSelecao() {
      const lugarSelecionado = this.lugares.find(lugar => lugar.selecionado);

      if (lugarSelecionado) {
        // Exibe o SweetAlert informando o sucesso da seleção
        Swal.fire({
          title: 'Sucesso!',
          text: `Você selecionou o computador ${lugarSelecionado.fileira}-${lugarSelecionado.coluna}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redireciona para a página /openticketpage
            this.$router.push('/openticketpage');
          }
        });
      } else {
        // Caso não tenha nenhum lugar selecionado
        Swal.fire({
          title: 'Erro!',
          text: 'Por favor, selecione um lugar antes de confirmar.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  },
};
</script>

<style scoped>
/* Reset básico */
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
}

/* Container de seleção */
.sala-container {
  display: flex;
  height: 100vh;
}

/* Lado direito - Formulário de seleção */
.right-side {
  flex: 2;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Caixa de seleção */
.sala-box {
  width: 85%;
  max-width: 500px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Estilo do título */
.sala-box h2 {
  margin-bottom: 20px;
  text-align: center;
  color: blue;
}

/* Sala de seleção - grid */
.sala {
  display: grid;
  grid-template-columns: repeat(7, 50px);
  gap: 10px;
  margin-bottom: 20px;
}

/* Estilo dos lugares */
.lugar {
  width: 50px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 10px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Lugar selecionado */
.lugar.selecionado {
  background-color: #00ccff;
  color: white;
}

/* Botão de confirmação */
.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: rgb(8, 91, 143);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Efeito hover no botão */
.btn-submit:hover {
  background-color: rgb(11, 55, 135);
}

/* Responsividade */
@media (max-width: 768px) {
  .sala-container {
    flex-direction: column;
  }

  .right-side {
    flex: 1;
  }
}
</style>
