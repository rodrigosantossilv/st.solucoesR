<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="imagem-ajustada" alt="Descrição da Imagem">
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Opções</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white"  @click="home" href="#">Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="chamadosTi" href="#">Chamados Ti</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="chamadosManuntencao" href="#">Chamados Manuntencao</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCadastro" to="#">Cadastro</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarLista" to="#">Tabela</a>
          </li>

        </ul>
      </div>

      <!-- Kanban Board -->
      <div class="kanban-board d-flex justify-content-around flex-grow-1 p-3">

        <!-- Tabela de usuários cadastrados -->
<div v-if="mostrarTabela" class="tabela-container">
  <h2>Tabela de Usuários</h2>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="aluno in chamados" :key="aluno.id">
        <td>{{ aluno.nome }}</td>
        <td>{{ aluno.email }}</td>
        <td>
          <button @click="editarAluno(aluno.id)" class="btn btn-warning">Editar</button>
          <button @click="removerAluno(aluno.id)" class="btn btn-danger">Remover</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
        
        <!-- Formulário para cadastrar novo aluno -->
        <div v-if="mostrarFormulario" class="form-container">
          <h2>Cadastrar usuário</h2>
          <form @submit.prevent="cadastrarAluno">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input type="text" id="nome" v-model="novoAluno.nome" required>
            </div>
            <div class="form-group">
              <label for="email">Telefone:</label>
              <input type="text	" id="telefone" v-model="novoAluno.telefone" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="novoAluno.email" required>
            </div>
            <div class="form-group">
              <label for="email">Confirmar Email:</label>
              <input type="email" id="email" v-model="novoAluno.email" required>
            </div>
            <div class="form-group">
              <label for="senha">Senha:</label>
              <input type="senha" id="semha" v-model="novoAluno.senha" required>
            </div>
            <div class="form-group">
              <label for="senha"> Confirmar Senha:</label>
              <input type="senha" id="semha" v-model="novoAluno.senha" required>
            </div>
            <div class="form-group">
              <label>Tipo de Usuário:</label>
              <div class="radio-group">
                <input type="radio" id="estudante" value="ESTUDANTE" v-model="novoAluno.tipoUsuario">
                <label for="estudante">Estudante</label>
                

                <input type="radio" id="tecnico" value="TI" v-model="novoAluno.tipoUsuario">
                <label for="tecnico">Técnico de TI</label>
                <input type="radio" id="Docente" value="DOCENTE" v-model="novoAluno.tipoUsuario">
                <label for="tecnico">Docente</label>
                <input type="radio" id="tecnico" value="MANUTENCAO" v-model="novoAluno.tipoUsuario">
                <label for="tecnico">Técnico de Manuteção</label>
                
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>



          <!-- TABELAS DO KANBAN-->
        <div v-show="mostrarTodosChamados || categoriaVisivel === 'Analise'" id="Analise" class="kanban-column"
  @drop="drop($event)" @dragover="allowDrop($event)">
  <h3 class="kanban-header bg-secondary text-white p-2 text-center">Analise</h3>
  <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
    draggable="true" @dragstart="drag($event, chamado)">
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
      <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
        @keyup.enter="adicionarComentario(chamado)">
    </div>
  </div>
</div>

        <div v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'" id="pendente" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-danger text-white p-2 text-center">Pendente</h3>
          <div v-for="chamado in chamadosPendentes" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <div v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'" id="andamento" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-primary text-white p-2 text-center">Andamento</h3>
          <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <div v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'" id="concluido" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-success text-white p-2 text-center">Concluído</h3>
          <div v-for="chamado in chamadosConcluidos" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>


          <!-- TABELAS DO KANBAN mostrarChamadosManutençao  -->
        
          <div v-show="mostrarChamadosManutençao  || categoriaVisivel === 'Analise'" id="Analise" class="kanban-column"
  @drop="drop($event)" @dragover="allowDrop($event)">
  <h3 class="kanban-header bg-secondary text-white p-2 text-center">Analise</h3>
  <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
    draggable="true" @dragstart="drag($event, chamado)">
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
      <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
        @keyup.enter="adicionarComentario(chamado)">
    </div>
  </div>
</div>

        <div v-show="mostrarChamadosManutençao   || categoriaVisivel === 'Pendente'" id="pendente" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-danger text-white p-2 text-center">Pendente</h3>
          <div v-for="chamado in chamadosPendentes" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <div v-show="mostrarChamadosManutençao   || categoriaVisivel === 'Andamento'" id="andamento" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-primary text-white p-2 text-center">Andamento</h3>
          <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>

        <div v-show="mostrarChamadosManutençao  || categoriaVisivel === 'Concluído'" id="concluido" class="kanban-column"
          @drop="drop($event)" @dragover="allowDrop($event)">
          <h3 class="kanban-header bg-success text-white p-2 text-center">Concluído</h3>
          <div v-for="chamado in chamadosConcluidos" :key="chamado.id" class="kanban-item bg-light p-3 my-2"
            draggable="true" @dragstart="drag($event, chamado)">
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
              <input type="text" v-model="novoComentario" placeholder="Adicionar comentário"
                @keyup.enter="adicionarComentario(chamado)">
            </div>
          </div>
        </div>



      </div>
    </div>

  </div>         <!-- Ultima div (Templete)-->

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      chamados: [],
      categoriaVisivel: null,
      mostrarTodosChamados: true,
      mostrarFormulario: false,
      mostrarTabela: false, // Controla a visibilidade da tabela
      mostrarChamadosManutençao : false,

      novoAluno: {
        senha: '',
        nome: '',
        email: '',
        telefone: '',
        confirmarEmail: '',
        confirmarSenha: '',
        tipoUsuario: ''
      }
    };
  },
  methods: {
    async carregarChamados() {
      // Simulação de chamada a uma API
            try {

      const resposta = await fetch('URL_DA_API'); // Substitua pela URL da sua API
      this.chamados = await resposta.json();
    } catch (erro) {
        console.error('Erro ao carregar os chamados:', erro);
      }
    },
    
    chamadosTi() {
      this.categoriaVisivel = null;
      this.mostrarTabela = false; // Esconder a tabela
      this.mostrarTodosChamados = true;
      this.mostrarFormulario = false; // Esconde o formulário
      this.mostrarChamadosManutençao = false
    },
    chamadosManuntencao() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = false;
      this.mostrarChamadosManutençao = true
      this.mostrarFormulario = false; // Esconde o formulário
      this.mostrarTabela = false; // Esconde a tabela
    },
    mostrarCadastro() {
      this.mostrarFormulario = true; // Mostra o formulário
      this.categoriaVisivel = null; // Reseta a categoria visível
      this.mostrarTodosChamados = false; // Esconde todos os itens
      this.mostrarTabela = false; // Esconde a tabela
      this.mostrarChamadosManutençao = false
    },
    mostrarLista() {
      this.mostrarTabela = true; // Mostra a tabela
      this.mostrarFormulario = false; // Esconde o formulário
      this.categoriaVisivel = null; // Reseta a categoria visível
      this.mostrarTodosChamados = false; // Atualiza se necessário
      this.mostrarChamadosManutençao = false
    },
    cadastrarAluno() {
      // Lógica para cadastrar o aluno
      this.chamados.push({ ...this.novoAluno, id: this.chamados.length + 1 }); // Simulação
      this.novoAluno = { senha: '', nome: '', email: '', telefone: '', confirmarEmail: '', confirmarSenha: '' };
    },
    editarAluno(id) {
      // Lógica para editar o aluno
      console.log('Editar aluno com ID:', id);
    },
    removerAluno(id) {
      this.chamados = this.chamados.filter(aluno => aluno.id !== id);
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
  methods: {
    async carregarChamados() {
      // Simulação de chamada a uma API
      const resposta = await fetch('URL_DA_API'); // Substitua pela URL da sua API
      this.chamados = await resposta.json();
    },
    chamadosTi() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
      this.mostrarFormulario = false; // Esconde o formulário
    },
    chamadosManuntencao() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
      this.mostrarFormulario = false; // Esconde o formulário
    },
    mostrarCadastro() {
      this.mostrarFormulario = true; // Mostra o formulário
      this.categoriaVisivel = false; // Reseta a categoria visível
      this.mostrarTodosChamados = false; // Esconde todos os itens
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
    },


    async cadastrarAluno() {
      // Resetar o formulário
      const dadosUsuario = ({
        nome_completo:this.novoAluno.nome,
        senha:this.novoAluno.senha,
        email:this.novoAluno.email,
        telefone:this.novoAluno.telefone,
        setor_id:this.novoAluno.setor_id,
        instituicao:'Senai',	
        ocupacao:this.novoAluno.tipoUsuario,
        
        });
        const token = localStorage.getItem("token")

       const resposta = await axios.post('http://localhost:3000/auth/register', dadosUsuario, {
       
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          } )
       
      
      this.novoAluno = { nome: '', email: '', telefone: '', tipoUsuario: '', senha: ''
      };
      this.mostrarFormulario = true; 



      if (resposta.status === 201  && this.carregarChamados){
        alert('Aluno cadastrado com sucesso!');
      }
      else{
        alert('Erro ao cadastrar o aluno');
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
body,
html {
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
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.tabela-container {
  width: 100%;
}
/* Contêiner para a imagem e o texto */
.header-content {
  display: flex;
  align-items: center;
}

/* Ajuste da imagem no cabeçalho */
.imagem-ajustada {
  width: 90px;
  height: auto;
  margin-right: 10px;
}

/* Estilo do título no cabeçalho */
header h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
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
  transition: background-color 0.3s, color 0.3s;
}

.sidebar .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* Estilo para o link ativo */
.sidebar .nav-link.active {
  background-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

/* Form container, same as login box */
.form-container {
  max-width: 900px;
  margin: 100px auto;
  padding: 200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Form headings */
.form-container h2 {
  margin-bottom: 50px;
  height: 2px;
  color: #333;
}

/* Input fields */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

/* Button */
.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #0575E6;
  border: none;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #045bb5;
}

/* Error message styling (for invalid email or short password) */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
}

/* Basic body reset */
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  /* Match the background with login page */
}
/* Aligning and styling the radio buttons */
.radio-group {
  display: flex;
  align-items: center;
  gap: 20px; /* Space between the radio buttons */
}

.radio-group input[type="radio"] {
  margin-right: 5px; /* Space between radio button and its label */
}

</style>
