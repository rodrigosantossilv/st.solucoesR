<template>

<!-- TABELAS DO KANBAN -->

<!-- Coluna Análise -->
<div v-if="this.role === this.ROLES.NOA" class="kanban-column">
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

</template>

<script>

</script>
<style>

</style>