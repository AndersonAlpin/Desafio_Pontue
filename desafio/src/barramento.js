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

    deletarRedacao(){
      this.$emit("deletarRedacao", true)
    },
    quandoDeletarRedacao(callback){
      this.$on("deletarRedacao", callback)
    },

    enviarRedacao(){
      this.$emit("enviarRedacao", true);
    },
    quandoEnviarRedacao(callback) {
      this.$on('enviarRedacao', callback)
    },

    abriRedacao(url){
      this.$emit("abriRedacao", url)
    },
    quandoAbrirRedacao(callback) {
      this.$on('abriRedacao', callback)
    }
  }
})