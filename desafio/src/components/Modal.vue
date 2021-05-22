<template>
  <b-modal
    title="modal-delete"
    v-model="isModalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    aria-role="dialog"
    aria-label="Example Modal"
    aria-modal
  >
    <template>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Deletar Redação</p>
        </header>
        <section class="modal-card-body">
          <p>Tem certeza que deseja excluir esta redação?</p>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-success" label="Fechar"></b-button>
          <b-button type="is-warning" label="Fechar"></b-button>
        </footer>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ["isModalActive"],
};
</script>

<style>
</style>