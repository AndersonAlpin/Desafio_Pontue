<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <!-- LISTA DE REDAÇÕES -->
        <b-tab-item label="Lista" icon="book-open" :visible="visibleTab.lista">
          <Redacoes :list="redacoes" />
        </b-tab-item>

        <!-- Visualizar redações -->
        <b-tab-item
          label="Visualizar"
          icon="eye"
          :visible="visibleTab.visualizar"
        >
          <span class="has-text-warning-dark subtitle">
            A redação será exibida abaixo da tabela!
          </span>
          <Redacao :list="redacao" />
        </b-tab-item>

        <!-- Cadastro de Redações -->
        <b-tab-item label="Cadastro" icon="plus-circle">
          <div id="tab-cadastro">
            <b-field>
              <b-upload v-model="file" multiple drag-drop expanded>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>
                      Arraste seus arquivos para cá ou clique para encontra-los
                    </p>
                  </div>
                </section>
              </b-upload>
            </b-field>

            <div class="tags">
              <span
                v-for="(file, index) in file"
                :key="index"
                class="tag is-dark"
              >
                {{ file.name }}
                <button
                  class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)"
                ></button>
              </span>
            </div>

            <div id="button-upload">
              <b-button
                @click="uploadRedacao"
                type="is-dark"
                icon-right="file-export"
                >Enviar</b-button
              >
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Redacoes from "@/components/Redacoes.vue";
import Redacao from "@/components/Redacao.vue";

import axios from "axios";
import urlAPI from "@/api/url";
import barramento from "@/barramento.js";

export default {
  components: { Navbar,  Redacoes, Redacao },
  data() {
    return {
      currentTab: 0,
      aluno_id: "",
      name: "Aluno",
      redacoes: [], //Lista de redações
      redacao: [], //Dados de uma redação
      req: [], //Recebe o cabeçalho com o token de autenticação
      link: null, //Link de uma redação selecionada
      file: [],
      visibleTab: {
        lista: true,
        visualizar: false,
        cadastro: true,
      },
    };
  },
  methods: {
    listRedacoes() {
      //Listar ID principal das redações
      axios
        .get(`${urlAPI}index/aluno/${this.aluno_id}`, this.req)
        .then((res) => {
          this.redacoes = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      //Responsável por fazer logout, deletando o token
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
    deleteRedacao(id) {
      //Deletar uma redação
      axios
        .delete(`${urlAPI}redacao/${id}/delete`, this.req)
        .then((res) => {
          this.listRedacoes;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Enviar uma redação
    uploadRedacao() {
      console.log(this.file);
      axios
        .post(`${urlAPI}alunos/redacao/create`, this.file, this.req)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteDropFile(index) {
      this.file.splice(index, 1);
    },
  },
  created() {
    barramento.$on("showRedacao", (result) => {
      result ? this.currentTab = 1 : this.currentTab = 0;
      this.visibleTab.visualizar = true;
      this.visibleTab.lista = false;
    });

    barramento.$on("backToLista", (result) => {
      result ? this.currentTab = 0 : this.currentTab = 1;
      this.visibleTab.visualizar = false;
      this.visibleTab.lista = true;
    });

    let json = localStorage.getItem("userKey");
    let userKey = JSON.parse(json);

    this.aluno_id = userKey.aluno_id;

    this.req = {
      headers: {
        Authorization: `Bearer ${userKey.token}`,
      },
    };

    // Listar ID principal das redações automaticamente após login
    axios
      .get(`${urlAPI}index/aluno/${this.aluno_id}`, this.req)
      .then((res) => {
        this.redacoes = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.page-title {
  margin: 20px 0;
}

#tabs {
  padding: 20px 100px;
}

#buttons {
  display: flex;
  justify-content: center;
}

#tab-cadastro {
  margin-top: 20px;
}
</style>