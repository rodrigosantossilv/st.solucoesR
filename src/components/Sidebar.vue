<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
        </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Opções</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="home" href="#">Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="chamadosTi" href="#"
              >Chamados Ti</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="chamadosManuntencao" href="#"
              >Chamados Manuntencao</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarCadastro" to="#"
              >Cadastro</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" @click="mostrarTabela" href="#"
              >Tabela</a
            >
          </li>
          <li class="nav-item">
  <a class="nav-link text-white" @click="mostrarSala" href="#">
    Adicionar Salas
  </a>
</li>
        </ul>

<!-- Tabela para cadastrar sala e mostrar salas cadastradas -->
</div>
<div v-if="mostrarCadastrosala" class="table-container p-3">
  <!-- Formulário para cadastro de sala -->
<form @submit.prevent="adicionarSala" class="mb-4">
  <h2>Cadastrar Salas</h2>
    <div class="form-group">
      <label for="bloco">Bloco da sala</label>
      <input 
        type="text" 
        id="bloco" 
        v-model="novoBloco" 
        placeholder="Digite o bloco" 
        class="form-control" 
        required 
      />
    </div>
    <div class="form-group">
      <label for="nome">Nome da sala</label>
      <input 
        type="text" 
        id="nome" 
        v-model="novoNome" 
        placeholder="Digite o nome da sala" 
        class="form-control" 
        required 
      />
    </div>
    <div class="form-group">
      <label for="numero">Número da sala</label>
      <input 
        type="number" 
        id="numero" 
        v-model="novoNumero" 
        placeholder="Digite o número da sala" 
        class="form-control" 
        required 
      />
    </div>
    <button type="submit" class="btn btn-primary">Adicionar Sala</button>
  </form>
  
  <h2>Tabela de Salas Cadastradas</h2>
  <input 
    type="text" 
    placeholder="Pesquisa por nome ou bloco" 
    class="form-control mb-3" 
  />
  
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Bloco</th>
          <th>Número da sala</th>
          <th>Nome da sala</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Bloco">A</td>
          <td data-label="Número da sala">23</td>
          <td data-label="Nome da sala">Laboratório</td>
          <td data-label="Ações">
            <button class="btn btn-warning btn-sm">Editar</button>
            <button class="btn btn-danger btn-sm">Remover</button>
          </td>
        </tr>
        <tr>
          <td data-label="Bloco">A</td>
          <td data-label="Número da sala">23</td>
          <td data-label="Nome da sala">Laboratório</td>
          <td data-label="Ações">
            <button class="btn btn-warning btn-sm">Editar</button>
            <button class="btn btn-danger btn-sm">Remover</button>
          </td>
        </tr>
        <!-- Adicione mais linhas aqui conforme necessário -->
      </tbody>
    </table>
  </div>


</div>


        
    <!-- Tabela Alunos-->
      <div v-if="mostrarTabelaExibida" class="table-container p-3">
    <h2>Tabela de Usuários</h2>
    <input 
        type="text" 
        placeholder="Pesquisa por nome ou email" 
        class="form-control mb-3" 
    />
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Nome">João Silva</td>
                    <td data-label="Email">joao@example.com</td>
                    <td data-label="Ações">
                      <button class="btn btn-warning btn-sm">Editar</button>
                      <button class="btn btn-danger btn-sm">Remover</button>
                    </td>
                </tr>
                <tr>
                    <td data-label="Nome">Maria Oliveira</td>
                    <td data-label="Email">maria@example.com</td>
                    <td data-label="Ações">
                      <button class="btn btn-warning btn-sm">Editar</button>
                      <button class="btn btn-danger btn-sm">Remover</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>


        <!-- Formulário para cadastrar novo aluno -->
      
        <div v-if="mostrarFormulario" class="form-container">
          <h2>Cadastrar usuário</h2>
          <form @submit.prevent="cadastrarAluno">
            <div class="form-group">
              <label for="nome">Nome:</label>
              <input type="text" id="nome" v-model="novoAluno.nome" required />
            </div>
            <div class="form-group">
              <label for="email">Telefone:</label>
              <input
                type="text	"
                id="telefone"
                v-model="novoAluno.telefone"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                v-model="novoAluno.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Confirmar Email:</label>
              <input
                type="email"
                id="email"
                v-model="novoAluno.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="senha">Senha:</label>
              <input
                type="senha"
                id="semha"
                v-model="novoAluno.senha"
                required
              />
            </div>
            <div class="form-group">
              <label for="senha"> Confirmar Senha:</label>
              <input
                type="senha"
                id="semha"
                v-model="novoAluno.senha"
                required
              />
            </div>
            <div class="form-group">
              <label>Tipo de Usuário:</label>
              <div class="radio-group">
                <input
                  type="radio"
                  id="estudante"
                  value="ESTUDANTE"
                  v-model="novoAluno.tipoUsuario"
                />
                <label for="estudante">Estudante</label>

                <input
                  type="radio"
                  id="tecnico"
                  value="TI"
                  v-model="novoAluno.tipoUsuario"
                />
                <label for="tecnico">Técnico de TI</label>
                <input
                  type="radio"
                  id="Docente"
                  value="DOCENTE"
                  v-model="novoAluno.tipoUsuario"
                />
                <label for="tecnico">Docente</label>
                <input
                  type="radio"
                  id="tecnico"
                  value="MANUTENCAO"
                  v-model="novoAluno.tipoUsuario"
                />
                <label for="tecnico">Técnico de Manuteção</label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary">Cadastrar</button>
          </form>
        </div>


        <!-- TABELAS DO KANBAN-->
        <div
  v-show="mostrarTodosChamados || categoriaVisivel === 'Analise'"
  id="Análise"
  class="kanban-column"
  @drop="drop($event)"
  @dragover="allowDrop($event)"
>
  <h3 class="kanban-header bg-secondary text-white p-2 text-center">
    Analise
  </h3>
  <div
    v-for="chamado in chamadosAnalise"
    :key="chamado.id"
    :id="chamado.id"
    class="kanban-item bg-light p-3 my-2"
    draggable="true"
    @dragstart="drag($event, chamado)"
  >
    <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
    <p><em>Email:</em> {{ chamado.email_usuario }}</p>
    <p><em>Problema:</em> {{ chamado.problema }}</p>
    <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
    <p><em>Bloco:</em> {{ chamado.bloco }}</p>
    <p><em>Sala:</em> {{ chamado.sala }}</p>
    <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join(", ") }}</p>
    <button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>

    <div class="tags"></div>
  </div>
</div>

      <div
        v-show="mostrarTodosChamados || categoriaVisivel === 'Pendente'"
        id="Pendentes"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-danger text-white p-2 text-center">
          Pendente
        </h3>
        <div
          v-for="chamado in chamadosPendentes"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>

      <div
        v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'"
        id="Em Andamento"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-primary text-white p-2 text-center">
          Andamento
        </h3>
        <div
          v-for="chamado in chamadosAndamento"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>

      <div
        v-show="mostrarTodosChamados || categoriaVisivel === 'Concluído'"
        id="Concluido"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-success text-white p-2 text-center">
          Concluído
        </h3>
        <div
          v-for="chamado in chamadosConcluidos"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>
          <button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>
        </div>
      </div>

      <!-- TABELAS DO KANBAN mostrarChamadosManutençao  -->

      <div
        v-show="mostrarChamadosManutençao || categoriaVisivel === 'Analise'"
        id="Análise"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-secondary text-white p-2 text-center">
          Analise
        </h3>
        <div
          v-for="chamado in chamadosAnalise"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>

      <div
        v-show="mostrarChamadosManutençao || categoriaVisivel === 'Pendente'"
        id="Pendentes"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-danger text-white p-2 text-center">
          Pendente
        </h3>
        <div
          v-for="chamado in chamadosPendentes"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>

      <div
        v-show="mostrarChamadosManutençao || categoriaVisivel === 'Andamento'"
        id="andamento"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-primary text-white p-2 text-center">
          Andamento
        </h3>
        <div
          v-for="chamado in chamadosAndamento"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>

  <div  v-show="mostrarChamadosManutençao || categoriaVisivel === 'Concluído'"
        id="concluido"
        class="kanban-column"
        @drop="drop($event)"
        @dragover="allowDrop($event)"
      >
        <h3 class="kanban-header bg-success text-white p-2 text-center">
          Concluído
        </h3>
        <div
          v-for="chamado in chamadosConcluidos"
          :key="chamado.id"
          class="kanban-item bg-light p-3 my-2"
          draggable="true"
          @dragstart="drag($event, chamado)"
        >  
          <p><strong>Nome:</strong> {{ chamado.nome_usuario }}</p>
          <p><em>Email:</em> {{ chamado.email_usuario }}</p>
          <p><em>Problema:</em> {{ chamado.problema }}</p>
          <p><em>Descrição:</em> {{ chamado.descricao_chamado }}</p>
          <p><em>Bloco:</em> {{ chamado.bloco }}</p>
          <p><em>Sala:</em> {{ chamado.sala }}</p>
          <p v-if="chamado.maquinas.length >= 1"><em>Maquina:</em> {{ chamado.maquinas.join (", ") }}</p>

        </div>
      </div>
  
      </div>
    </div>


  <!-- Ultima div (Templete)-->
</template>



<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      chamadosAnalise: [],
      chamadosAndamento: [],
      chamadosConcluidos: [],
      chamadosPendentes: [],
      chamados: [],
      categoriaVisivel: null,
      home: false,
      mostrarTodosChamados: true,
      mostrarFormulario: false,
      mostrarChamadosManutençao: false,
      mostrarTabelaExibida: false, 
      mostrarCadastrosala: false,

      novoAluno: {
        senha: "",
        nome: "",
        email: "",
        telefone: "",
        confirmarEmail: "",
        confirmarSenha: "",
        tipoUsuario: "",
      },
      novoSala: {
      bloco: '', // ou algum valor inicial
      numerodasala:'',
      nomedasala:''
    },
    };
  },
  methods: {
    
  methods: {
    confirmarRemocao(id) {
      Swal.fire({
        title: 'Tem certeza que deseja deletar?',
        text: "Esta ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, deletar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletarChamado(id);
        }
      });
    },
    deletarChamado(id) {
      // Lógica para remover o chamado do array `chamadosAnalise`
      this.chamadosAnalise = this.chamadosAnalise.filter(chamado => chamado.id !== id);
      Swal.fire('Deletado!', 'O chamado foi removido.', 'success');
    }
  },
    async carregarChamados() {
      try {
        const token = localStorage.getItem("token");
      
        const resposta = await axios.get('http://localhost:3000/chamados', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        });

        this.chamados = resposta.data;

        this.chamadosAnalise = this.chamados.filter(
          (chamado) => chamado.status === "Análise"
      
        );
        

        this.chamadosAndamento = this.chamados.filter(
          (chamado) => chamado.status === "Em Andamento"
        );
        this.chamadosConcluidos = this.chamados.filter(
          (chamado) => chamado.status === "Concluido"
        );
        this.chamadosPendentes = this.chamados.filter(
          (chamado) => chamado.status === "Pendentes"
        );
      } catch (erro) {
        console.error("Erro ao carregar os chamados:", erro);
      }
    },
    atualizarChamados() {
      setInterval(() => {
        this.carregarChamados();
      },1000*60);
    },

    chamadosTi() {
  this.categoriaVisivel = null;
  this.mostrarTabelaExibida = false;
  this.mostrarTodosChamados = true;
  this.mostrarFormulario = false;
  this.mostrarChamadosManutençao = false;
  this.mostrarCadastrosala = false;
},

chamadosManuntencao() {
  this.categoriaVisivel = null;
  this.mostrarTodosChamados = false;
  this.mostrarChamadosManutençao = true;
  this.mostrarFormulario = false;
  this.mostrarTabelaExibida = false;
  this.mostrarCadastrosala = false;
},

mostrarCadastro() {
  this.mostrarFormulario = true;
  this.categoriaVisivel = null;
  this.mostrarTodosChamados = false;
  this.mostrarTabelaExibida = false;
  this.mostrarChamadosManutençao = false;
  this.mostrarCadastrosala = false;
},

mostrarTabela() {
  this.categoriaVisivel = null;
  this.mostrarTabelaExibida = true;
  this.mostrarChamadosManutençao = false;
  this.mostrarTodosChamados = false;
  this.mostrarFormulario = false;
  this.mostrarCadastrosala = false;
},
mostrarSala() {
    console.log("Clique em Adicionar Salas!"); // Debug: verifique no console
    this.categoriaVisivel = null;
    this.mostrarCadastrosala = true; // Definir como true para exibir a seção
    this.mostrarFormulario = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarTodosChamados = false;
    this.mostrarTabelaExibida = false;
  },
    editarAluno(id) {
      // Lógica para editar o aluno
      console.log("Editar aluno com ID:", id);
    },
    removerAluno(id) {
      this.chamados = this.chamados.filter((aluno) => aluno.id !== id);
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event, chamado) {
      event.dataTransfer.setData("chamado", JSON.stringify(chamado));
    },
    async drop(event) {
     const pendentes = document.getElementById("Pendentes")
     const Analise = document.getElementById("Análise")
     const concluidos = document.getElementById("Concluido")
     const andamento = document.getElementById("Em Andamento")
     debugger
let status = ''

     if (pendentes=== event.target || pendentes.contains(event.target)) {
      status = 'Pendentes'
    } else if (Analise === event.target || Analise.contains(event.target)) {
      status = 'Análise'
    } else if (concluidos === event.target || concluidos.contains(event.target)) {
      status = 'Concluido'
    } else if (andamento === event.target || andamento.contains(event.target)) {
      status = 'Em Andamento'
      
    }
  
    

      event.preventDefault();
      const chamado = JSON.parse(event.dataTransfer.getData("chamado"));

      const result = await Swal.fire({
        title: "Voce tem certeza?",
        text: "voce deseja mudar o status do chamado?",
        showCancelButton: true,
        icon: "question",
      });

      if (!result.isConfirmed) {
        return;
      }

      chamado.status = status ;
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:3000/chamados/${chamado.id}`, chamado, {
        headers: {
          Authorization: `Bearer ${token}`, // Correção aqui
        },
      });
      await this.carregarChamados();
    },


    chamadosTi() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
      this.mostrarFormulario = false; // Esconde o formulário
      this.mostrarTabelaExibida = false;
      this.mostrarTabelaSala = false;
      this.mostrarCadastrosala = false;
    },
    chamadosManuntencao() {
      this.categoriaVisivel = null;
      this.mostrarTodosChamados = true;
      this.mostrarFormulario = false; // Esconde o formulário
      this.mostrarTabelaExibida = false;
      this.mostrarTabelaSala = false;
      this.mostrarCadastrosala = false;

    },
    mostrarCadastro() {
      this.mostrarFormulario = true; // Mostra o formulário
      this.categoriaVisivel = false; // Reseta a categoria visível
      this.mostrarTodosChamados = false; // Esconde todos os itens
      this.mostrarTabelaExibida = false;
      this.mostrarTabelaSala = false;
      this.mostrarCadastrosala = false;
    },
    
    allowDrop(event) {
      event.preventDefault();
    },



    async cadastrarAluno() {
      // Resetar o formulário
      const dadosUsuario = {
        nome_completo: this.novoAluno.nome,
        senha: this.novoAluno.senha,
        email: this.novoAluno.email,
        telefone: this.novoAluno.telefone,
        setor_id: this.novoAluno.setor_id,
        instituicao: "Senai",
        ocupacao: this.novoAluno.tipoUsuario,
      };
      const token = localStorage.getItem("token");

      const resposta = await axios.post(
        "http://localhost:3000/auth/register",
        dadosUsuario,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      this.novoAluno = {
        nome: "",
        email: "",
        telefone: "",
        tipoUsuario: "",
        senha: "",
      };
      this.mostrarFormulario = true;

      if (resposta.status === 201 && this.carregarChamados) {
        alert("Aluno cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar o aluno");
      }
    },
  },

  mounted() {
    this.carregarChamados();
    this.atualizarChamados();

  },
};

</script>

<style scoped>
/* Estilos para o Cabeçalho */
header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

/* Sidebar */
.sidebar {
  background-color: #0d6efd;
  width: 250px;
  min-height: 100vh;
  color: white;
  padding: 1rem;
  transition: transform 0.3s ease-in-out;
}

.sidebar h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.sidebar .nav-item {
  margin: 10px 0;
}

.sidebar .nav-link {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s;
}

.sidebar .nav-link:hover {
  background-color: #043c61;
}

/* Responsividade para Sidebar */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -250px;
    top: 0;
    height: 100%;
    z-index: 1000;
    transform: translateX(0);
  }

  .sidebar.active {
    transform: translateX(250px);
  }
}

/* Tabela e Formulário */
.table-container {
  flex: 1;
  padding: 2rem;
}

.table-container h2 {
  font-size: 1.6rem;
  color: #007bff;
}

.table-responsive {
  margin-top: 1rem;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table thead th {
  background-color: #007bff;
  color: white;
  text-align: center;
}

.table tbody td {
  padding: 0.75rem;
  text-align: center;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

/* Botões */
.btn {
  margin: 0 5px;
  font-size: 0.9rem;
}

/* Formulário de Cadastro */
.form-container {
  padding: 2rem;
}

.form-container h2 {
  font-size: 1.4rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.form-container .form-group label {
  font-weight: bold;
}

.form-container .form-group input,
.form-container .form-group select {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  width: 100%;
}

.form-container button[type="submit"] {
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.form-container button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Kanban Board */
.kanban-column {
  width: 24%;
  margin: 0.5rem;
  display: inline-block;
  vertical-align: top;
}

.kanban-header {
  padding: 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
  font-weight: bold;
}

.kanban-item {
  background-color: #f8f9fa;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  cursor: grab;
}

/* Layout principal */
.d-flex {
  display: flex;
}

/* Responsividade para o layout */
@media (max-width: 1024px) {
  .kanban-column {
    width: 48%; /* Ajusta para duas colunas em tablets */
  }
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column; /* Empilha os elementos em telas menores */
  }

  .kanban-column {
    width: 100%; /* Coluna única em dispositivos móveis */
  }

  .table-container {
    padding: 1rem;
  }

  .form-container {
    padding: 1rem;
  }
}

/* Menu Hambúrguer */
.hamburger {
  display: none;
  cursor: pointer;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
}

.hamburger div {
  width: 30px;
  height: 4px;
  background-color: white;
  margin: 6px 0;
  transition: 0.4s;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
}
.bg-secondary {
    --bs-bg-opacity: 1;
    background-color: #0d6efd !important;
}
</style>
