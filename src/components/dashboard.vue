<template>
  <div>
    <!-- Cabeçalho -->
    <header class="header">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="header-image" alt="Logo do Dashboard">
        <h1 class="header-title">Dashboard</h1>
      </div>
    </header>

    <!-- Estrutura principal com Sidebar e Conteúdo -->
    
    <div class="dashboard-container">
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
  
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
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
});
</script>

<style scoped>


/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
}

/* Cabeçalho */
.header {
  width: 100%;
  background: #0575E6;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-image {
  height: 40px;
  width: auto;
}

.header-title {
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
}

/* Dashboard Container */
.dashboard-container {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 200px;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  padding: 20px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.sidebar h2 {
  margin-bottom: 15px;
  font-size: 18px;
}

.nav-list {
  list-style: none;
}

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #055cad;
}

/* Conteúdo Principal */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Cartões de Resumo */
.dashboard-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.summary-card {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(33.333% - 20px); /* Três cartões por linha */
  text-align: center;
}

.summary-card h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.summary-card p {
  font-size: 24px;
  font-weight: bold;
  color: #0575E6;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
.header { width: 100%; background: #0575E6; color: #fff; padding: 10px 20px; display: flex; align-items: center; }
.header-content { display: flex; align-items: center; }
.header-image { height: 40px; width: auto; }
.header-title { margin-left: 10px; font-size: 24px; font-weight: bold; }
.dashboard-container { display: flex; height: 100vh; }
.sidebar { width: 200px; background: linear-gradient(to bottom, #0575E6, #02298A); padding: 20px; color: #ffffff; }
.nav-list { list-style: none; }
.nav-link { color: #ffffff; display: block; padding: 10px; border-radius: 5px; transition: background 0.3s; }
.nav-link:hover { background: #055cad; }
.content { flex: 1; padding: 20px; }
.dashboard-summary { display: flex; flex-wrap: wrap; gap: 20px; }
.summary-card { background: #f0f0f0; padding: 20px; border-radius: 8px; width: calc(33.333% - 20px); text-align: center; }
.summary-card h3 { font-size: 16px; color: #333; margin-bottom: 10px; }
.summary-card p { font-size: 24px; font-weight: bold; color: #0575E6; }
.charts-container { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px; }
.chart-card { flex: 1; min-width: 300px; padding: 20px; background: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
.chart-card h3 { font-size: 18px; text-align: center; color: #333; margin-bottom: 10px; }


</style>
