<template>


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

</template>
<script>

</script>


<style>

</style>