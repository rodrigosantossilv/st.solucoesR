<template>
  <div>
    <!-- Cabeçalho -->
    <header class="bg-primary text-white p-3">
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="d-flex">
      <!-- Sidebar (Dashboard) -->
      <div class="sidebar bg-secondary text-white p-3">
        <h2>Menu</h2>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link text-white" @click="telaprincipal" href="#">Home </a>
          </li>

          <li class="nav-item">
            <select v-model="filterOcupacao" class="form-select text-white bg-dark" aria-label="Chamados Ti" @change="atualizarFiltro"
              @click="chamadosTi">
              <option value="TODOS" selected>Todos os Chamados</option>
              <option value="ESTUDANTE">Alunos</option>
              <option value="DOCENTE">Docentes</option>
              <option value="MANUTENCAO">Manuteção</option>
              <option value="TI">Técnico de TI</option>
              <option value="NOA">ADM</option>
            </select>
          </li>

         

          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarCadastro" to="#">Novo Cadastro</a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarSala" href="#">
              Cadastra sala
            </a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostrarTabela" href="#">Tabela de usuários</a>
          </li>
          <li v-if="this.role === this.ROLES.NOA" class="nav-item">
            <a class="nav-link text-white" @click="mostraTabelasalascadasatradas" href="#">
              Tabela de salas
            </a>
          </li>
        </ul>
        <!-- Botão de Logout -->
        <div class="mt-4 pt-2 border-top">
  <button @click="logout" class="btn btn-danger w-100 custom-logout-button">Sair</button>
</div>


      </div>




      <div v-if="dashboard" class="dashboard-container">
      <!-- Sidebar de navegação -->
  

      <!-- Conteúdo Principal com cartões resumo e gráficos -->
      <div class="content">
        <h2>Resumo Geral</h2>
        <div class="dashboard-summary">
          <div class="summary-card"><h3>Total de Chamados Abertos</h3><p>150</p></div>
          <div class="summary-card"><h3>Total de Chamados Finalizados</h3><p>120</p></div>
          <div class="summary-card"><h3>Total de Chamados Em Andamento</h3><p>30</p></div>
          <div class="summary-card"><h3>Tempo Médio de Resolução</h3><p>4h 30m</p></div>
          <div class="summary-card"><h3>Problemas Mais Recorrentes</h3><p>Impressoras, Rede</p></div>
        </div>

        <!-- Gráficos -->
        <h2>Estatísticas Visuais</h2>
        <div class="charts-container">
          <!-- Gráfico de Pizza -->
          <div class="chart-card">
            <h3>Distribuição de Chamados por Categoria</h3>
            <canvas id="pieChart"></canvas>
          </div>

          <!-- Gráfico de Barra -->
          <div class="chart-card">
            <h3>Chamados por Mês</h3>
            <canvas id="barChart"></canvas>
          </div>

          <!-- Gráfico de Linha -->
          <div class="chart-card">
            <h3>Evolução dos Chamados</h3>
            <canvas id="lineChart"></canvas>
          </div>

          <!-- Gráfico de Degrau -->
          <div class="chart-card">
            <h3>Chamados em Degrau</h3>
            <canvas id="stepChart"></canvas>
          </div>
        </div>
      </div>
    </div>













<!-- Formulário para cadastro de sala -->
      <div v-if="mostrarCadastrosala" class="table-container p-3">
        <form @submit.prevent="adicionarSala" class="mb-4">
          <h2>Cadastrar Salas</h2>
          <div class="form-group">
            <label for="bloco">Bloco da sala</label>
            <input type="text" id="bloco" v-model="novoBloco" placeholder="Digite o bloco" class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="nome">Nome da sala</label>
            <input type="text" id="nome" v-model="novoNome" placeholder="Digite o nome da sala" class="form-control"
              required />
          </div>
          <div class="form-group">
            <label for="numero">Número da sala</label>
            <input type="number" id="numero" v-model="novoNumero" placeholder="Digite o número da sala"
              class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Adicionar Sala</button>
          <h2>Pesquisa de salas cadastradas</h2>
          <input type="text" placeholder="Pesquisa por sala ou laboratorio cadastrado" class="form-control mb-3" />
        </form>


      </div>
      <div v-if="mostrarTabelasalas"  class="table-container p-3">
        <h2>Tabela de salas cadastradas</h2>
        <input type="text" placeholder="Pesquisa por salas ou laboratórios cadastrados" class="form-control mb-3" />
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
                <td data-label="Bloco">m</td>
                <td data-label="Número da sala">23</td>
                <td data-label="Nome da sala">Laboratório</td>
                <td data-label="Ações">
                  <button class="btn btn-warning btn-sm">Editar</button>
                  <button class="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
              <tr>
                <td data-label="Bloco">b</td>
                <td data-label="Número da sala">23</td>
                <td data-label="Nome da sala">Laboratório</td>
                <td data-label="Ações">
                  <button class="btn btn-warning btn-sm">Editar</button>
                  <button class="btn btn-danger btn-sm">Remover</button>
                </td>
              </tr>
            
            </tbody>
          </table>
        </div>


      <!-- Tabela Alunos-->
      <div v-if="mostrarTabelaExibida" class="table-container p-3">
        <h2>Tabela de Usuários</h2>
        <input type="text" placeholder="Pesquisa por nome ou email" class="form-control mb-3" />
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
      <label for="telefone">Telefone:</label>
      <input
        type="tel"
        id="telefone"
        v-model="novoAluno.telefone"
        @input="formatarTelefone"
        required
        maxlength="16"
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="novoAluno.gmail"
        required
      />
    </div>

    <div class="form-group">
      <label for="confirmar-email">Confirmar Email:</label>
      <input
        type="email"
        id="confirmar-email"
        v-model="novoAluno.confirmarEmail"
        required
      />
    </div>

    <div class="form-group">
      <label for="senha">Senha:</label>
      <input
        type="password"
        id="senha"
        v-model="novoAluno.senha"
        required
        minlength="8"
        :title="'Senha deve ter pelo menos 8 caracteres'"
      />
      <small class="form-text text-muted">A senha deve ter pelo menos 8 caracteres.</small>
    </div>

    <div class="form-group">
      <label for="confirmar-senha">Confirmar Senha:</label>
      <input
        type="password"
        id="confirmar-senha"
        v-model="novoAluno.confirmarSenha"
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
          id="docente"
          value="DOCENTE"
          v-model="novoAluno.tipoUsuario"
        />
        <label for="docente">Docente</label>

        <input
          type="radio"
          id="manutencao"
          value="MANUTENCAO"
          v-model="novoAluno.tipoUsuario"
        />
        <label for="manutencao">Técnico de Manutenção</label>

        <input
          type="radio"
          id="administrativo"
          value="NOA"
          v-model="novoAluno.tipoUsuario"
        />
        <label for="administrativo">NOA</label>
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar</button>
  </form>
</div>

<!-- TABELAS DO KANBAN -->

<!-- Coluna Análise -->
<div  class="kanban-com">
  <div v-show="mostrarTodosChamados || categoriaVisivel === 'Analise'" id="Análise" 
       @drop="drop($event)" @dragover="allowDrop($event)">
    <h3 class="kanban-header bg-warning text-white p-2 text-center">
      ANÁLISE
    </h3>
    <div v-for="chamado in chamadosAnalise" :key="chamado.id" :id="chamado.id" 
         class="kanban-item bg-light p-3 my-2" draggable="true" @dragstart="drag($event, chamado)">
      <p><strong>E-mail:</strong> {{ chamado.email }}</p>
      <p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
      <p><strong>Problema:</strong> {{ chamado.problema }}</p>
      <p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
      <p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
      <p><strong>Sala:</strong> {{ chamado.sala }}</p>
      <p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
      <button class="btn btn-danger btn-sm" @click="confirmarRemocao(chamado.id)">Remover</button>
      <div class="tags"></div>
    </div>
  </div>
</div>

<!-- Coluna Pendentes -->
<div v-show="mostrarTodosChamados || categoriaVisivel === 'TI'" id="Pendentes" class="kanban-column" 
    @drop="drop($event)" @dragover="allowDrop($event)">
  <h3 class="kanban-header bg-danger text-white p-2 text-center">
    TI
  </h3>
  <div v-for="chamado in chamadosPendentes" :key="chamado.id" class="kanban-item bg-light p-3 my-2" 
      draggable="true" @dragstart="drag($event, chamado)">
    <p><strong>E-mail:</strong> {{ chamado.email }}</p>
    <p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
    <p><strong>Problema:</strong> {{ chamado.problema }}</p>
    <p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
    <p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
    <p><strong>Sala:</strong> {{ chamado.sala }}</p>
    <p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
  </div>
</div>

<!-- Coluna Em Andamento -->
<div v-show="mostrarTodosChamados || categoriaVisivel === 'Andamento'" id="Em Andamento" class="kanban-column" 
    @drop="drop($event)" @dragover="allowDrop($event)">
  <h3 class="kanban-header bg-primary text-white p-2 text-center">
    MANUTENÇÃO
  </h3>
  <div v-for="chamado in chamadosAndamento" :key="chamado.id" class="kanban-item bg-light p-3 my-2" 
    draggable="true" @dragstart="drag($event, chamado)">
    <p><strong>E-mail:</strong> {{ chamado.email }}</p>
    <p><strong>Ocupação:</strong> {{ chamado.ocupacao }}</p>
    <p><strong>Problema:</strong> {{ chamado.problema }}</p>
    <p><strong>Descrição:</strong> {{ chamado.descricao_chamado }}</p>
    <p><strong>Bloco:</strong> {{ chamado.bloco }}</p>
    <p><strong>Sala:</strong> {{ chamado.sala }}</p>
    <p v-if="chamado.maquinas.length >= 1"><em>Máquina(s):</em> {{ chamado.maquinas.join(", ") }}</p>
  </div>
</div>



    
      

    </div>
  </div>


  <!-- Ultima div (Templete)-->
</template>



<script >
import axios from "axios";
import Swal from "sweetalert2";
import { ROLES } from "../util/roles";
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  data() {
    return {
      filterOcupacao: "TODOS",
      ROLES,
      role: null,
      chamadosAnalise: [],
      chamadosAndamento: [],
      chamadosConcluidos: [],
      chamadosPendentes: [],
      chamados: [],
      categoriaVisivel: null,
      home: false,
      mostrarTodosChamados: false,
      mostrarFormulario: false,
      mostrarTabelaExibida: false,
      mostrarCadastrosala: false,
      mostrarTabelasalas: false,
      dashboard:true,
    
      novoAluno: {
        senha: "",
        nome: "",
        email: "",
      
        tipoUsuario: "",
      },
      novoSala: {
        bloco: '', // ou algum valor inicial
        numerodasala: '',
        nomedasala: ''
      },
    };
  },

  mounted() {
    this.carregarChamados();
    this.atualizarChamados();
    this.role = localStorage.getItem("role")
    
  // Gráfico de Pizza
  new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: ['TI', 'Manutenção', 'Outros'],
      datasets: [{
        data: [50, 30, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    }
  });

  // Gráfico de Barra
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [{
        label: 'Chamados por Mês',
        data: [20, 30, 40, 25, 35, 45],
        backgroundColor: '#4BC0C0'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Gráfico de Linha
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [{
        label: 'Evolução dos Chamados',
        data: [15, 25, 35, 45, 55, 65],
        borderColor: '#36A2EB',
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });

  // Gráfico de Degrau
  new Chart(document.getElementById('stepChart'), {
    type: 'line',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [{
        label: 'Chamados em Degrau',
        data: [10, 15, 20, 30, 40, 50],
        borderColor: '#FF6384',
        stepped: true,
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });

},

  methods: {
    
    formatarTelefone(event) {
    // Remove todos os caracteres não numéricos
    let telefone = this.novoAluno.telefone.replace(/\D/g, '');

    // Aplica a máscara de acordo com a quantidade de dígitos
    if (telefone.length <= 10) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6, 10)}`;
    } else if (telefone.length <= 15) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)}`;
    } else if (telefone.length <= 20) {
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)} ${telefone.slice(15, 20)}`;
    } else {
        // Caso haja mais de 20 dígitos, truncamos o valor
        this.novoAluno.telefone = `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)} ${telefone.slice(11, 15)} ${telefone.slice(15, 20)}`;
    }
},

submitForm() {
    // Remove caracteres não numéricos antes de validar
    const telefoneSemMascara = this.novoAluno.telefone.replace(/\D/g, '');
    
    if (telefoneSemMascara.length < 10 || telefoneSemMascara.length > 20) {
        alert('O telefone deve ter entre 10 e 20 dígitos.');
        return;
    }

    // Lógica de envio do formulário
},

    async atualizarFiltro(event) {
    await this.carregarChamados();
      
    },
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

   this.chamados = this.filterOcupacao !== "TODOS" ? this.chamados.filter(
    (chamado) => chamado.ocupacao === this.filterOcupacao
) : this.chamados;
      
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
    }, 1000 * 60);
  },

  chamadosTi() {
    this.categoriaVisivel = null;
    this.mostrarTabelaExibida = false;
    this.mostrarTodosChamados = true;
    this.mostrarFormulario = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarCadastrosala = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;
  },

  mostrarCadastro() {
    this.mostrarFormulario = true;
    this.categoriaVisivel = false;
    this.mostrarTodosChamados = false;
    this.mostrarTabelaExibida = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarCadastrosala = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },

  mostrarTabela() {
    this.categoriaVisivel = null;
    this.mostrarTabelaExibida = true;
    this.mostrarChamadosManutençao = false;
    this.mostrarTodosChamados = false;
    this.mostrarFormulario = false;
    this.mostrarCadastrosala = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },
  mostrarSala() {
    console.log("Clique em Adicionar Salas!"); // Debug: verifique no console
    this.categoriaVisivel = null;
    this.mostrarCadastrosala = true; // Definir como true para exibir a seção
    this.mostrarFormulario = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarTodosChamados = false;
    this.mostrarTabelaExibida = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },
  mostraTabelasalascadasatradas(){
    console.log("Clique em Adicionar Salas!"); // Debug: verifique no console
    this.categoriaVisivel = null;
    this.mostrarCadastrosala = false; // Definir como true para exibir a seção
    this.mostrarFormulario = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarTodosChamados = false;
    this.mostrarTabelaExibida = false;
    this.mostrarTabelasalas = true;
    this.dashboard = false;

  },
  telaprincipal(){
    console.log("Clique em Adicionar Salas!"); // Debug: verifique no console
    this.categoriaVisivel = null;
    this.mostrarCadastrosala = false; // Definir como true para exibir a seção
    this.mostrarFormulario = false;
    this.mostrarChamadosManutençao = false;
    this.mostrarTodosChamados = false;
    this.mostrarTabelaExibida = false;
    this.mostrarTabelasalas = false;
    this.dashboard = true;

  },
  logout() {
      // Lógica para realizar o logout do usuário
      alert('Você saiu da sua conta');
      // Implementar redirecionamento ou outra ação de logout
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
    const Analise = document.getElementById("Análise")
    const pendentes = document.getElementById("Pendentes")
    const concluidos = document.getElementById("Concluido")
    const andamento = document.getElementById("Em Andamento")
    let status = ''

    if (pendentes === event.target || pendentes.contains(event.target)) {
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

    chamado.status = status;
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
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },
  chamadosManuntencao() {
    this.categoriaVisivel = null;
    this.mostrarTodosChamados = true;
    this.mostrarFormulario = false; // Esconde o formulário
    this.mostrarTabelaExibida = false;
    this.mostrarTabelaSala = false;
    this.mostrarCadastrosala = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },
  mostrarCadastro() {
    this.mostrarFormulario = true; // Mostra o formulário
    this.categoriaVisivel = false; // Reseta a categoria visível
    this.mostrarTodosChamados = false; // Esconde todos os itens
    this.mostrarTabelaExibida = false;
    this.mostrarTabelaSala = false;
    this.mostrarCadastrosala = false;
    this.mostrarTabelasalas = false;
    this.dashboard = false;

  },

  allowDrop(event) {
    event.preventDefault();
  },

  async cadastrarAluno() {
  // Verificar se as senhas e emails são iguais
  if (this.novoAluno.senha !== this.novoAluno.confirmarSenha) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return;
  }

  if (this.novoAluno.gmail !== this.novoAluno.confirmarEmail) {
    alert("Os e-mails não coincidem. Por favor, verifique.");
    return;
  }

  // Verificar se a senha tem pelo menos 8 caracteres
  if (this.novoAluno.senha.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres.");
    return;
  }

  // Montar os dados do usuário
  const dadosUsuario = {
    nome_completo: this.novoAluno.nome,
    senha: this.novoAluno.senha,
    email: this.novoAluno.gmail,
    telefone: this.novoAluno.telefone,
    setor_id: this.novoAluno.setor_id, // Adicionar o setor_id no objeto de dados se necessário
    instituicao: "Senai",
    ocupacao: this.novoAluno.tipoUsuario,
  };

  const token = localStorage.getItem("token");

  try {
    // Enviar a requisição para o servidor
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

    // Resetar os campos do formulário
    this.novoAluno = {
      nome: "",
      email: "",
      tipoUsuario: "",
      senha: "",
      
    };
    this.mostrarFormulario = true;

    // Exibir a mensagem personalizada com base no tipo de usuário
    if (resposta.status === 201) {
      let mensagemSucesso = "";
      switch (this.novoAluno.tipoUsuario) {
        case "ESTUDANTE":
          mensagemSucesso = "Aluno cadastrado com sucesso!";
          break;
        case "TI":
          mensagemSucesso = "Técnico de TI cadastrado com sucesso!";
          break;
        case "DOCENTE":
          mensagemSucesso = "Docente cadastrado com sucesso!";
          break;
        case "MANUTENCAO":
          mensagemSucesso = "Técnico de Manutenção cadastrado com sucesso!";
          break;
        case "NOA":
          mensagemSucesso = "Usuário NOA cadastrado com sucesso!";
          break;
        default:
          mensagemSucesso = "Cadastro realizado com sucesso!";
      }
      alert(mensagemSucesso);
    } else {
      alert("Erro ao cadastrar o usuário");
    }
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar o usuário. Tente novamente.");
  }
},
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
  width: 400px;
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
    left: 400px;
    top: 0;
    height: 100%;
    z-index: 1000;
    transform: translateX(0);
  }

  .sidebar.active {
    transform: translateX(450px);
  }

  .hamburger {
    display: block;
  }
}

/* Tabela e Formulário */
.table-container {
  flex: 1; /* Ajuste a propriedade 'flex' para garantir que o conteúdo ocupe o espaço disponível */
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.292);
  border-radius: 12px;
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 30px;
  margin-bottom: 30px; /* Ajuste a margem inferior para 30px, se necessário */
  font-weight: bold;
  
}


.table-container h2 {
  font-size: 1.6rem;
  color: #007bff;
  font-weight: bold;

  
}

.table-responsive {
  margin-top: 1rem;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-weight: bold;
/* box-shadow: 0 4px 12px rgba(33, 33, 33, 0.292);
  border-radius: 12px;
  transition: transform 0.3s ease; 
  transition: transform 0.3s ease; Adiciona uma transição suave */
}

/* Efeito hover na tabela */

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
  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.292);
  border-radius: 12px;
  margin-left: 300px;
  margin-right: 100px;
  margin-top: 30px;
  margin-bottom: 30px;
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

.kanban-com {
  width: 32%;
  margin: 0.5rem;
  display: inline-block;
  vertical-align: top;
  min-height: 300px;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.kanban-header {
  padding: 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.kanban-item {
  background-color: #fff;
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: transform 0.2s ease-in-out;
}

.kanban-item:hover {
  transform: translateY(-5px);
}

.kanban-item p {
  margin: 0.5rem 0;
}

.kanban-item button {
  margin-top: 1rem;
}

/* Cores para cada categoria */
.bg-warning {
  background-color: #ffcc00 !important;
}

.bg-danger {
  background-color: #f44336 !important;
}

.bg-primary {
  background-color: #2196f3 !important;
}

/* Responsividade */
@media (max-width: 1024px) {
  .kanban-column {
    width: 48%;
  }
}

@media (max-width: 768px) {
  .kanban-column {
    width: 100%;
    margin: 0.5rem 0;
  }

  .kanban-header {
    font-size: 1.25rem;
    padding: 0.5rem;
  }

  .kanban-item {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .kanban-item p {
    font-size: 0.9rem;
  }
}

/* Drag and Drop */
.kanban-column {
  position: relative;
  padding-bottom: 2rem;
}

.kanban-item[draggable="true"]:hover {
  cursor: grabbing;
}

/* Outros ajustes */
.tags {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
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

/* Menu Lateral com opções */
.bg-dark {
  --bs-bg-opacity: 1;
  background-color: #0d6efd !important;
}

.bg-secondary {
  --bs-bg-opacity: 1;
  background-color: #0d6efd !important;
}

.form-group {
  margin-bottom: 15px;
}

.radio-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.radio-group input {
  margin-right: 5px;
}

.radio-group label {
  margin-right: 15px;
}

.form-select {
  --bs-form-select-bg-img: url(data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e);
  display: block;
  width: 100%;
  padding: .375rem 2.25rem .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right .75rem center;
  background-size: 16px 12px;
  border: var(--bs-border-width) solid #0d6efd;
  border-radius: var(--bs-border-radius);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

/* Cartões de resumo */
.dashboard-summary {
  display: flex;  
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
  margin-left: 90px;
}

.summary-card {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  transition: transform 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-10px);
}

.summary-card h3 {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
  
}

.summary-card p {
  font-size: 32px;
  font-weight: bold;
  color: #0e85bd;
}

/* Gráficos */
.charts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 95px;

}

.chart-card {
  background-color: #fff;
  padding: 20px;
  width: calc(50% - 20px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(33, 33, 33, 0.292);
  transition: transform 0.3s ease;
  
}

.chart-card:hover {
  transform: translateY(-10px);
}

.chart-card h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 15px;
}

/* Gráficos específicos */
canvas {
  width: 100%;
  height: 200px;
}

/* Responsividade */
@media (max-width: 1200px) {
  .dashboard-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .chart-card {
    width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 400%;
  }

  .content {
    margin-left: 0;
  }

  .dashboard-summary {
    grid-template-columns: 1fr;
  }

  .chart-card {
    width: 100%;
  }
}
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--bs-heading-color);
}
.custom-logout-button {
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.custom-logout-button:hover {
  background-color: #c82333; /* Cor mais escura ao passar o mouse */
}

</style>
