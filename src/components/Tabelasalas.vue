<template>

<div  class="table-container p-3">
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

</template>

<script>

</script>

<style>
</style>