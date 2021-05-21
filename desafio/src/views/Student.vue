<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs id="tabs" type="is-toggle" expanded>
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
          </Table>
        </b-tab-item>
        <b-tab-item
          label="Visualizar"
          icon="eye"
          :visible="selected"
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
import { dateFormat } from "@/global.js"
import barramento from "@/barramento.js";

export default {
  components: { Navbar, Table },
  data() {
    return {
      dateFormat,
      aluno_id: "",
      name: "Aluno",
      redacoes: [],
      selected: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    barramento.$on("rowSelected", (result) => {
      this.selected = result;
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
</style>