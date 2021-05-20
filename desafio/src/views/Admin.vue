<template>
  <div id="student">
    <Navbar :name="name" :logout="logout" />
    <h1 class="title">Área do Administrador</h1>
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
      name: "Administrador",
    };
  },
   methods: {
    logout() {
      localStorage.removeItem('userKey')
      this.$router.push({ name: "Login" });
    }
  }
  // created() {
  //   let req = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   };

  //   axios
  //     .get(`${BASE_URL}index/admin`, req)
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