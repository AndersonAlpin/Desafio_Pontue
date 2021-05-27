<template>
  <div id="admin">
    <Navbar :name="name" :logout="logout" />

    <template id="tabs">
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
          <span class="has-text-warning-dark">
            A redação será exibida abaixo da tabela!
          </span>
          <Redacao />
        </b-tab-item>
      </b-tabs>
    </template>
  </div>
</template>

<script>
import Redacao from "@/components/Redacao.vue";
import Navbar from "@/components/Navbar.vue";
import Alunos from "@/components/Alunos.vue";

import barramento from "@/barramento.js";
import urlAPI from "@/api/url";
import axios from "axios";

export default {
  components: { Navbar, Alunos, Redacao },
  data() {
    return {
      name: "Administrador",
      currentTab: 0,
      alunos: [],
      userKey: null,
      visibleTab: {
        lista: true,
        visualizar: false,
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
    barramento.quandoExibirTabVisualizar((id) => {
      if(id) 
      this.currentTab = 1;
      this.visibleTab.visualizar = true;
      this.visibleTab.lista = false;
    });

    barramento.quandoVoltarParaLista((result) => {
      if(result)
      this.currentTab = 0;
      this.visibleTab.visualizar = false;
      this.visibleTab.lista = true;
    })

    this.userKey = JSON.parse(localStorage.getItem('userKey'))

    axios
      .get(`${urlAPI}index/admin`, this.userKey.req)
      .then((res) => {
        this.alunos = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
#tabs{
  margin-top: 30px;
}
</style>