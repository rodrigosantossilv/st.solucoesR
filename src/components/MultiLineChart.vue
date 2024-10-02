<template>
    <div>
      <canvas id="multiLineChart" class="multiLine-chart chartjs-render-monitor"></canvas>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'MultiLineChart',
    props: {
      chartData: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      onMounted(() => {
        const ctx = document.getElementById('multiLineChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: props.chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    }
  });
  </script>
  
  <style scoped>
  .chartjs-render-monitor {
    animation: chartjs-render-animation 0.001s;
  }
  .multiLine-chart {
    max-width: 500px;
    max-height: 500px;
  }
  </style>
  