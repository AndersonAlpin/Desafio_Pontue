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
          <p class="modal-card-title">Redação</p>
        </header>
        <section class="modal-card-body">
          <p class="has-text-danger-dark" >Tem certeza que deseja excluir esta redação?</p>
        </section>
        <footer id="buttons" class="modal-card-foot">
          <slot/>
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