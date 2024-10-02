<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="imagem-ajustada" alt="Descrição da Imagem">
        <h1 class="text-center">Dashboard</h1>
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Opções</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarTodos" href="#">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Pendente')" href="#">Pendentes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Andamento')" href="#">Andamentos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCategoria('Concluído')" href="#">Concluídos</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" href="#">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" href="#">Cadastra aluno</router-link>
          </li>
        </ul>
      </div>

      <!-- Kanban Board -->
      <div class="kanban-board d-flex justify-content-around flex-grow-1 p-3">
        <!-- Coluna Pendente -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'"
          id="pendente"
          class="kanban-column"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-danger text-white p-2 text-center">Pendente</h3>
          <div
            v-for="chamado in chamadosPendentes"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p><strong>{{ chamado.assunto }}</strong></p>
            <p><em>Responsável: {{ chamado.responsavel }}</em></p>
            <div class="tags">
              <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge badge-info">{{ etiqueta }}</span>
            </div>
            <div v-if="chamado.relacionados.length" class="related">
              <p><strong>Chamados Relacionados:</strong></p>
              <ul>
                <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
              </ul>
            </div>
            <div class="comments mt-3">
              <p><strong>Comentários:</strong></p>
              <ul>
                <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
              </ul>
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <!-- Coluna Andamento -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'"
          id="andamento"
          class="kanban-column"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-primary text-white p-2 text-center">Andamento</h3>
          <div
            v-for="chamado in chamadosAndamento"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p><strong>{{ chamado.assunto }}</strong></p>
            <p><em>Responsável: {{ chamado.responsavel }}</em></p>
            <div class="tags">
              <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge badge-info">{{ etiqueta }}</span>
            </div>
            <div v-if="chamado.relacionados.length" class="related">
              <p><strong>Chamados Relacionados:</strong></p>
              <ul>
                <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
              </ul>
            </div>
            <div class="comments mt-3">
              <p><strong>Comentários:</strong></p>
              <ul>
                <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
              </ul>
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <!-- Coluna Concluído -->
        <div
          v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'"
          id="concluido"
          class="kanban-column"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        >
          <h3 class="kanban-header bg-success text-white p-2 text-center">Concluído</h3>
          <div
            v-for="chamado in chamadosConcluidos"
            :key="chamado.id"
            class="kanban-item bg-light p-3 my-2"
            draggable="true"
            @dragstart="drag($event, chamado)"
          >
            <p><strong>{{ chamado.assunto }}</strong></p>
            <p><em>Responsável: {{ chamado.responsavel }}</em></p>
            <div class="tags">
              <span v-for="etiqueta in chamado.etiquetas" :key="etiqueta" class="badge badge-info">{{ etiqueta }}</span>
            </div>
            <div v-if="chamado.relacionados.length" class="related">
              <p><strong>Chamados Relacionados:</strong></p>
              <ul>
                <li v-for="relacionado in chamado.relacionados" :key="relacionado">{{ relacionado }}</li>
              </ul>
            </div>
            <div class="comments mt-3">
              <p><strong>Comentários:</strong></p>
              <ul>
                <li v-for="comentario in chamado.comentarios" :key="comentario">{{ comentario }}</li>
              </ul>
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário" @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chamados: [],
      categoriaVisivel: null,
      mostrarTodosChamados: true,
      novoComentario: '',
    };
  },
  computed: {
    chamadosPendentes() {
      return this.chamados.filter(chamado => chamado.status === 'Pendente');
    },
    chamadosAndamento() {
      return this.chamados.filter(chamado => chamado.status === 'Andamento');
    },
    chamadosConcluidos() {
      return this.chamados.filter(chamado => chamado.status === 'Concluído');
    }
  },
  methods: {
    async carregarChamados() {
      // Simulação de chamada a uma API
      const resposta = await fetch('URL_DA_API'); // Substitua pela URL da sua API
      this.chamados = await resposta.json();
    },
    mostrarTodos() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
    },
    mostrarCategoria(categoria) {
      this.categoriaVisivel = categoria;
      this.mostrarTodosChamados = false;
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event, chamado) {
      event.dataTransfer.setData('chamado', JSON.stringify(chamado));
    },
    drop(event) {
      event.preventDefault();
      const chamado = JSON.parse(event.dataTransfer.getData('chamado'));
      // Lógica para manipular o chamado após o drop
    },
    adicionarComentario(chamado) {
      if (this.novoComentario.trim()) {
        chamado.comentarios.push(this.novoComentario);
        this.novoComentario = '';
      }
    }
  },
  mounted() {
    this.carregarChamados();
  }
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

/* Cabeçalho */
header {
    width: 100%;
    background: #0575E6;
    display: flex;
    align-items: center; /* Alinha a imagem e o texto verticalmente */
    padding: 10px; /* Adiciona algum espaço interno */
    box-sizing: border-box; /* Inclui o padding e border na largura e altura */
}

/* Contêiner para a imagem e o texto */
.header-content {
    display: flex;
    align-items: center; /* Alinha a imagem e o texto verticalmente no centro */
}

/* Ajuste da imagem no cabeçalho */
.imagem-ajustada {
    width: 90px; /* Ajuste o tamanho conforme necessário */
    height: auto; /* Mantém a proporção da imagem */
    margin-right: 10px; /* Espaço entre a imagem e o texto */
}

/* Estilo do título no cabeçalho */
header h1 {
    color: white; /* Define a cor do texto */
    margin: 0; /* Remove a margem padrão */
    font-size: 1.5rem; /* Ajuste o tamanho da fonte conforme necessário */
}

/* Sidebar (Dashboard) */
.sidebar {
    width: 250px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
}

/* Kanban Board */
.kanban-board {
    display: flex;
    flex-grow: 1;
    gap: 20px;
}

/* Kanban Column */
.kanban-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Kanban Header */
.kanban-header {
    width: 100%;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 8px;
}

/* Kanban Item */
.kanban-item {
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}
/* Efeito hover para links na sidebar */
.sidebar .nav-link {
    transition: background-color 0.3s, color 0.3s; /* Transição suave para as propriedades */
}

.sidebar .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.2); /* Cor de fundo ao passar o mouse */
    color: #fff; /* Cor do texto ao passar o mouse */
}
/* Estilo para o link ativo */
.sidebar .nav-link.active {
    background-color: rgba(255, 255, 255, 0.4); /* Cor de fundo para o link ativo */
    color: #fff; /* Cor do texto para o link ativo */
}


</style>
