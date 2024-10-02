<template>
  <div>
    <!-- Cabeçalho -->
    <header class="header">
      <div class="header-content">
        <img src="/images/ST.KABAN.png" class="header-image" alt="Descrição da Imagem">
        <h1 class="header-title">Home</h1>
      </div>
    </header>

    <!-- Estrutura principal com o Dashboard e Kanban -->
    <div class="main-container">
      <!-- Sidebar (Dashboard) -->
      <nav class="sidebar">
        <h2>Menu</h2>
        <ul class="nav-list">
          <li class="nav-item">
            <a @click="mostrarHome" href="#" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a @click="KanbanBoard" href="kanbanboard" class="nav-link">Chamados</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Pendente')" href="#" class="nav-link">Pendentes</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Andamento')" href="#" class="nav-link">Andamentos</a>
          </li>
          <li class="nav-item">
            <a @click="mostrarCategoria('Concluído')" href="#" class="nav-link">Concluídos</a>
          </li>
        </ul>
      </nav>

      <!-- Conteúdo principal (Kanban com gráfico) -->
      <div class="content">
        <!-- Gráfico de barras (único gráfico) -->
        <div class="flex justify-center items-center">
          <div class="card w-[30%] h-[15rem]">
            <Chart type="bar" :data="chartDataBar" :options="chartOptionsBar" class="h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

// Lógica para gráfico de barras
onMounted(() => {
    chartDataBar.value = setChartDataBar();
    chartOptionsBar.value = setChartOptions();
});

const chartDataBar = ref();
const chartOptionsBar = ref();

// Função para dados e opções do gráfico de barras
const setChartDataBar = () => {
    return {
        labels: ['Pendentes', 'Andamentos', 'Concluídos'],
        datasets: [
            {
                label: 'Chamados',
                data: [500, 300, 700],  // Valores para cada categoria
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  // Cor para "Pendentes" (Vermelho)
                    'rgba(54, 162, 235, 0.2)',  // Cor para "Andamentos" (Azul)
                    'rgba(75, 192, 192, 0.2)'   // Cor para "Concluídos" (Verde)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',   // Borda para "Pendentes"
                    'rgba(54, 162, 235, 1)',   // Borda para "Andamentos"
                    'rgba(75, 192, 192, 1)'    // Borda para "Concluídos"
                ],
                borderWidth: 1
            }
        ]
    };
};

// Função para opções de estilo dos gráficos
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
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
.header {
  width: 100%;
  background: #0575E6;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

/* Sidebar */
.sidebar {
  width: 200px;
  background: linear-gradient(to bottom, #0575E6, #02298A, #021B79);
  padding: 15px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 10px;
}

.nav-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: #ddd;
}

/* Conteúdo Principal */
.main-container {
  margin-left: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
}

.content {
  margin-top: 20px;
}

/* Kanban Board */
</style>
