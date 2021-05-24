<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Área do Aluno</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <!-- TAB 0 - Lista de redações-->
        <b-tab-item label="Lista" icon="book-open" :visible="visibleTab.lista">
          <Redacoes :list="redacoes" />
        </b-tab-item>

        <!-- TAB 1 - Visualizar redações -->
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

        <!-- TAB 2 - Edição de redações -->
        <b-tab-item
          label="Edição"
          icon="file-edit"
          :visible="visibleTab.edicao"
        >
          <Edicao />
        </b-tab-item>

        <!-- TAB 3 - Cadastro de redações -->
        <b-tab-item label="Cadastro" icon="plus-circle">
          <Cadastro />
        </b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Redacoes from "@/components/Redacoes.vue";
import Cadastro from "@/components/Cadastro.vue";
import Redacao from "@/components/Redacao.vue";
import Navbar from "@/components/Navbar.vue";
import Edicao from "@/components/Edicao.vue";

import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  components: { Navbar, Redacoes, Redacao, Cadastro, Edicao },
  data() {
    return {
      currentTab: 0,
      aluno_id: "",
      name: "Aluno",
      redacoes: [], //Lista de redações
      redacao: [], //Dados de uma redação
      req: [], //Recebe o cabeçalho com o token de autenticação
      link: null, //Link de uma redação selecionada
      visibleTab: {
        visualizar: false,
        cadastro: true,
        edicao: false,
        lista: true,
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
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    barramento.quandoExibirTabVisualizar((id) => {
      if (id) this.currentTab = 1;
      this.visibleTab.visualizar = true;
      this.visibleTab.lista = false;
    });

    barramento.quandoVoltarParaLista((result) => {
      if (result) this.currentTab = 0;
      this.visibleTab.visualizar = false;
      this.visibleTab.edicao = false;
      this.visibleTab.lista = true;
    });

    barramento.quandoEditarRedacao((result) => {
      if (result) this.currentTab = 2;
      this.visibleTab.edicao = true;
    });

    barramento.quandoEnviarRedacao((result) => {
      if (result) this.currentTab = 1;
      this.visibleTab.edicao = false;
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
</style>