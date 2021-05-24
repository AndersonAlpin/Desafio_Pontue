<template>
  <div id="tab-cadastro">
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

    <div class="message-login">
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
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  data() {
    return {
      file: [],
      msg: null,
    };
  },
  methods: {
    uploadRedacao() {
      console.log(this.file);

      let json = localStorage.getItem("userKey");
      let userKey = JSON.parse(json);

      let req = {
        headers: {
          Authorization: `Bearer ${userKey.token}`,
        },
      };

      axios
        .post(`${urlAPI}alunos/redacao/create`, this.file, req)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.msg = "Ocorreu um erro durante o envio do arquivo.";
          setTimeout(() => {
            this.msg = null;
          }, 5000);
          console.log(err);
        });
    },
    deleteDropFile(index) {
      this.file.splice(index, 1);
    },
  },
};
</script>

<style>
#tab-cadastro {
  margin-top: 20px;
}

.message-login {
  font-size: 16px;
  color: rgb(230, 88, 88);
  text-align: center;
  margin-bottom: 10px;
}
</style>