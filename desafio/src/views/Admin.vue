<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Área do Administrador</h1>

    <template>
      <b-tabs v-model="currentTab" id="tabs" type="is-toggle" expanded>
        <!-- TAB 0 - Lista de alunos-->
        <b-tab-item label="Lista" icon="school" :visible="visibleTab.lista">
          <Alunos :list="alunos" />
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
          
        </b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Alunos from "@/components/Alunos.vue";
import axios from "axios";
import BASE_URL from "@/api/url";

export default {
  components: { Navbar, Alunos },
  data() {
    return {
      name: "Administrador",
      currentTab: 0,
      alunos: [],
      visibleTab: {
        lista: true,
        visualizar: true,
      },
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userKey");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    let json = localStorage.getItem("userKey");
    let userKey = JSON.parse(json);

    let req = {
      headers: {
        Authorization: `Bearer ${userKey.token}`,
      },
    };

    axios
      .get(`${BASE_URL}index/admin`, req)
      .then((res) => {
        this.alunos = res.data.data;
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>