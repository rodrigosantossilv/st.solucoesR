<template>



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

</template>

<script>


</script>

<style>



</style>