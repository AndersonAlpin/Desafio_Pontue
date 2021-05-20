<template>
  <b-navbar type="is-primary" mobile-burger>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/pontue-logo3.png" alt="Pontue" />
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="user-photo">
          <img src="@/assets/perfil.png" alt="" />
        </div>

        <div class="user-logged">
          <b-navbar-dropdown :label="name">
            <b-navbar-item> Sair </b-navbar-item>
          </b-navbar-dropdown>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  props: ["name"],
};
</script>

<style>
</style>