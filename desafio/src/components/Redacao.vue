<template>
  <div id="redacao" v-if="link">
    <hr />
    <h1 class="subtitle">Redação</h1>
    <div class="redacao-borda">
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
#redacao .redacao-borda {
  border: 1px solid black;
}
</style>