<template>



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


</template>

<script>

</script>

<style>

</style>