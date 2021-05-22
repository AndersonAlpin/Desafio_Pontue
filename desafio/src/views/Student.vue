<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <b-tab-item label="Lista" icon="book-open">
          <Table :redacoes="redacoes">
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
                  name="show"
                  @click="[showTab(1), showRedacaoUrls(props.row.id)]"
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
        </b-tab-item>

        <b-tab-item
          label="Visualizar"
          icon="eye"
          :visible="visible"
        ></b-tab-item>

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

import axios from "axios";
import urlAPI from "@/api/url";
import { dateFormat } from "@/global.js";
import barramento from "@/barramento.js";

export default {
  components: { Navbar, Table },
  data() {
    return {
      currentTab: 0,
      dateFormat,
      aluno_id: "",
      name: "Aluno",
      redacoes: [],
      visible: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
    showTab(value) {
      this.visible = true;
      this.currentTab = value;
    },
    showRedacaoUrls(id){
      console.log(id);
    }
  },
  created() {
    barramento.$on("rowSelected", (result) => {
      this.visible = result;
    });

    let json = localStorage.getItem("userKey");
    let userKey = JSON.parse(json);

    this.aluno_id = userKey.aluno_id;

    let req = {
      headers: {
        Authorization: `Bearer ${userKey.token}`,
      },
    };

    axios
      .get(`${urlAPI}index/aluno/${this.aluno_id}`, req)
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