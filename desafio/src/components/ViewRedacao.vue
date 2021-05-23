<template>
  <div id="view-redacao" v-if="link">
    <hr />
    <h1 class="subtitle">Redação</h1>
    <div class="-view-redacao-borda">
      <b-image :src="link"></b-image>
    </div>
  </div>
</template>

<script>
export default {
  props: ["link"],
};
</script>

<style>
#view-redacao .view-redacao-borda {
  border: 1px solid black;
}
</style>