<template>
  <div id="tab-edicao">
    <b-field>
      <b-upload v-model="file" multiple drag-drop expanded>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Arraste seus arquivos para cá ou clique para encontra-los</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span v-for="(file, index) in file" :key="index" class="tag is-dark">
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>

    <div class="message-edicao">
      <span v-if="msg">{{ msg }}</span>
    </div>

    <div id="button-upload">
      <b-button @click="uploadRedacao" type="is-dark" icon-right="file-export"
        >Enviar</b-button
      >
    </div>
  </div>
</template>

<script>
import barramento from "@/barramento.js";

export default {
  data() {
    return {
      file: [],
      msg: null,
      id: "",
    };
  },
  methods: {
    uploadRedacao() {
      if (this.file.length > 0) {
        console.log(this.file);
        console.log(this.id);
      }
    },
    deleteDropFile(index) {
      this.file.splice(index, 1);
    },
  },
  created() {
    barramento.quandoEditarRedacao((id) => {
      this.id = id;
    });
  },
};
</script>

<style>
#tab-edicao {
  margin-top: 20px;
}

.message-edicao {
  font-size: 16px;
  color: rgb(230, 88, 88);
  text-align: center;
  margin-bottom: 10px;
}
</style>