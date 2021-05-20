<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title page-title">Minhas Redações</h1>

    <template>
      <b-tabs id="tabs" type="is-toggle" expanded>
        <b-tab-item label="Redações" icon="book-open">
          <h1 class="title">Lista</h1>
        </b-tab-item>
        <b-tab-item label="Adicionar" icon="plus-circle">
          <h1 class="title">Cadastro</h1>
        </b-tab-item>
        <b-tab-item label="Visualizar" icon="eye" :visible="false"></b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import urlAPI from "@/api/url";

export default {
  components: { Navbar },
  data() {
    return {
      aluno_id: "",
      name: "Aluno",
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

    this.aluno_id = userKey.aluno_id;

    let req = {
      headers: {
        Authorization: `Bearer ${userKey.token}`,
      },
    };

    axios
      .get(`${urlAPI}index/aluno/${this.aluno_id}`, req)
      .then((res) => {
        console.log(res);
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