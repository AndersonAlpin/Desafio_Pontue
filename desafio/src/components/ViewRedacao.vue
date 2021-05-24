<template>
  <div id="view-redacao">
    <hr />
    <div class="-view-redacao-borda">
      <b-image :src="url"></b-image>
    </div>
  </div>
</template>

<script>
import barramento from "@/barramento.js";

export default {
  data() {
    return {
      url: null,
    };
  },
  created() {
    barramento.quandoAbrirRedacao((url) => {
      this.url = url;
    });

    barramento.quandoVoltarParaLista((result) => {
      if (result) this.url = null;
    });
  },
};
</script>

<style>
#view-redacao .view-redacao-borda {
  border: 1px solid black;
}
</style>