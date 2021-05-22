<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <!-- LISTA DE REDAÇÕES -->
        <b-tab-item label="Lista" icon="book-open" :visible="visibleTab.lista">
          <Table
            :list="redacoes"
            labelButton="Limpar seleção"
            colorButton="is-danger"
            iconButton="close"
          >
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
            <b-table-column
              field="created_at"
              label="Data"
              centered
              sortable
              v-slot="props"
            >
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
                <!-- Mostrar lista de redações -->
                <b-button
                  class="button"
                  type="is-success"
                  icon-right="eye"
                  name="showRedacoes"
                  @click="[showTab(1), showRedacaoUrls(props.row.id)]"
                />
                <!-- Deletar redação -->
                <b-button
                  class="button"
                  type="is-danger"
                  icon-right="delete"
                  name="delete"
                  @click="deleteRedacao(props.row.id)"
                />
              </div>
            </b-table-column>
          </Table>
        </b-tab-item>

        <!-- Visualizar redações -->
        <b-tab-item
          label="Visualizar"
          icon="eye"
          :visible="visibleTab.visualizar"
        >
          <span class="has-text-warning-dark subtitle"
            >A redação será exibida abaixo da tabela!</span
          >
          <Table
            :list="redacao"
            labelButton="Voltar"
            colorButton="is-info"
            iconButton="arrow-left"
            activeButton="true"
          >
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
                <!-- Mostrar redação -->
                <b-button
                  class="button"
                  type="is-success"
                  icon-right="eye"
                  name="showRedacao"
                  @click="showRedacao(props.row.url)"
                />
                <!-- Editar redação -->
                <b-button
                  class="button"
                  type="is-warning"
                  icon-right="file-edit"
                  name="edit"
                />
              </div>
            </b-table-column>
          </Table>
          <Redacao :link="link" />
        </b-tab-item>

        <!-- Cadastro de Redações -->
        <b-tab-item label="Cadastro" icon="plus-circle">
          <div id="tab-cadastro">
            <!-- <b-field class="file">
              <b-upload v-model="file" expanded>
                <a class="button is-dark is-fullwidth">
                  <b-icon icon="upload"></b-icon>
                  <span>{{ file.name || "Selecionar arquivos" }}</span>
                </a>
              </b-upload>
            </b-field> -->
            <b-field>
              <b-upload v-model="files" multiple drag-drop expanded>
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
                v-for="(file, index) in files"
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
      currentTab: 2,
      dateFormat,
      aluno_id: "",
      name: "Aluno",
      redacoes: [], //Lista de redações
      redacao: [], //Dados de uma redação
      req: [], //Recebe o cabeçalho com o token de autenticação
      link: null, //Link de uma redação selecionada
      files: [],
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
    showTab(value) {
      //Responsável por exibir ou não uma TAB
      this.visibleTab.visualizar = true;
      this.visibleTab.lista = false;
      this.currentTab = value;
    },
    showRedacaoUrls(id) {
      //Listar as redações a partir do ID principal
      axios
        .get(`${urlAPI}redacao/${id}`, this.req)
        .then((res) => {
          this.redacao = res.data.data.urls;
        })
        .catch((err) => {
          console.log(err);
        });
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
      console.log(this.files);
      // axios
      //   .post(`${urlAPI}alunos/redacao/create`, this.req)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    showRedacao(value) {
      //Recebe a URL da redação para ser exibida
      this.link = value;
    },
    deleteDropFile(index) {
      this.files.splice(index, 1);
    },
  },
  created() {
    barramento.$on("rowSelected", (result) => {
      //Aviso de quando uma linha da tabela é selecionada
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