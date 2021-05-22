<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <!-- LISTA DE REDAÇÕES -->
        <b-tab-item label="Lista" icon="book-open" :visible="visibleTab.lista">
          <Table :list="redacoes">
            <!-- COLUNAS -->
            <b-table-column field="id" label="ID" centered v-slot="props">
              {{ props.row.id }}
            </b-table-column>
            <b-table-column
              field="numero"
              label="Número"
              centered
              v-slot="props"
            >
              {{ props.row.numero }}
            </b-table-column>
            <b-table-column field="data" label="Data" centered v-slot="props">
              {{ dateFormat(props.row.created_at) }}
            </b-table-column>

            <!-- BOTÕES -->
            <b-table-column
              class="buttons"
              field="buttons"
              label="Ações"
              centered
              v-slot="props"
            >
              <div id="buttons" class="buttons">
                <b-button
                  class="button"
                  type="is-success"
                  icon-right="eye"
                  name="showRedacoes"
                  @click="[showTab(1), showRedacaoUrls(props.row.id)]"
                />
              </div>
            </b-table-column>
          </Table>
        </b-tab-item>

        <!-- Visualizar Redações -->
        <b-tab-item
          label="Visualizar"
          icon="eye"
          :visible="visibleTab.visualizar"
        >
          <span class="has-text-warning-dark subtitle">A redação será exibida abaixo da tabela!</span>
          <Table :list="redacao">
            <!-- COLUNAS -->
            <b-table-column field="id" label="ID" centered v-slot="props">
              {{ props.row.id }}
            </b-table-column>

            <b-table-column
              field="anotacoes"
              label="Anotações"
              centered
              v-slot="props"
            >
              {{ props.row.anotacoes || "Sem anotações" }}
            </b-table-column>

            <b-table-column
              field="comentarios"
              label="Comentários"
              centered
              v-slot="props"
            >
              {{ props.row.comentarios || "Sem comentários" }}
            </b-table-column>

            <!-- BOTÕES -->
            <b-table-column
              class="buttons"
              field="buttons"
              label="Ações"
              centered
              v-slot="props"
            >
              <div id="buttons" class="buttons">
                <b-button
                  class="button"
                  type="is-success"
                  icon-right="eye"
                  name="showRedacao"
                  @click="showRedacao(props.row.url)"
                />
                <b-button
                  class="button"
                  type="is-warning"
                  icon-right="file-edit"
                  name="edit"
                />
                <b-button
                  class="button"
                  type="is-danger"
                  icon-right="delete"
                  name="delete"
                />
              </div>
            </b-table-column>
          </Table>
          <Redacao :link="link" />
        </b-tab-item>

        <!-- Cadastro de Redações -->
        <b-tab-item label="Cadastro" icon="plus-circle">
          <h1 class="title">Cadastro</h1>
        </b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Table from "@/components/Table.vue";
import Redacao from "@/components/Redacao.vue";

import axios from "axios";
import urlAPI from "@/api/url";
import { dateFormat } from "@/global.js";
import barramento from "@/barramento.js";

export default {
  components: { Navbar, Table, Redacao },
  data() {
    return {
      currentTab: 0,
      dateFormat,
      req: [],
      aluno_id: "",
      name: "Aluno",
      redacoes: [], //Lista de redações
      redacao: [], //Dados de uma redação
      link: null, //Link de uma redação selecionada
      visibleTab: {
        lista: true,
        visualizar: false,
        cadastro: true,
      },
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
    showTab(value) {
      this.visibleTab.visualizar = true;
      this.visibleTab.lista = false;
      this.currentTab = value;
    },
    showRedacaoUrls(id) {
      axios
        .get(`${urlAPI}redacao/${id}`, this.req)
        .then((res) => {
          this.redacao = res.data.data.urls;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showRedacao(value){
      this.link = value;
    }
  },
  created() {
    barramento.$on("rowSelected", (result) => {
      this.visibleTab.visualizar = result;
      this.visibleTab.lista = true;
      this.currentTab = 0;
      this.link = null;
    });

    let json = localStorage.getItem("userKey");
    let userKey = JSON.parse(json);

    this.aluno_id = userKey.aluno_id;

    this.req = {
      headers: {
        Authorization: `Bearer ${userKey.token}`,
      },
    };

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