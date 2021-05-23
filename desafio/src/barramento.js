import Vue from 'vue'
export default new Vue({
  methods: {
    exibirTabVisualizar(id) {
      this.$emit('exibirTabVisualizar', id)
    },
    quandoExibirTabVisualizar(callback) {
      this.$on('exibirTabVisualizar', callback)
    },

    voltarParaLista(){
      this.$emit("voltarParaLista", true);
    },
    quandoVoltarParaLista(callback) {
      this.$on('voltarParaLista', callback)
    },

    editarRedacao(id){
      this.$emit('editarRedacao', id)
    },
    quandoEditarRedacao(callback){
      this.$on('editarRedacao', callback)
    },

    enviarRedacao(){
      this.$emit("enviarRedacao", true);
    },
    quandoEnviarRedacao(callback) {
      this.$on('enviarRedacao', callback)
    },
  }
})