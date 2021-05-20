<template>
  <div id="student">
    <Navbar :name="name" />
    <h1 class="title">Área do Aluno</h1>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
// import axios from "axios";
// import BASE_URL from "@/api/url";

export default {
  components: { Navbar },
  data() {
    return {
      aluno_id: "",
      name: "Aluno",
    };
  },
  // created() {
  //   this.aluno_id = localStorage.getItem("keyUser")

  //   let req = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   };

  //   axios
  //     .get(`${BASE_URL}index/aluno/${this.aluno_id}`, req)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
};
</script>

<style>
</style>