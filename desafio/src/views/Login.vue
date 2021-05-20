<template>
  <div id="login" class="container is-fullhd">
    <div class="box">
      <b-field label="E-mail">
        <b-input type="text" v-model="email" />
      </b-field>

      <b-field label="Senha">
        <b-input type="password" v-model="password" password-reveal />
      </b-field>

      <b-button class="button" @click="login" expanded>Entrar</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BASE_URL from "@/api/url";
import { setLocalStorage } from "@/global.js"

export default {
  data() {
    return {
      email: "juliana.cerqueira@pontue.com.br",
      password: "123456@pontue",
      role: "",
      token: "",
      aluno_id: ""
    };
  },
  methods: {
    login() {
      axios
        .post(`${BASE_URL}auth/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.role = res.data.aluno_id ? "aluno" : "admin";
          this.token = res.data.access_token;
          this.aluno_id = res.data.aluno_id;
          setLocalStorage(this.token, this.role, this.aluno_id);

          if (this.role == "admin") {
            this.$router.push({ name: "Admin" });
          } else {
            this.$router.push({ name: "Student" });
          }
        })
        .catch((err) => {
          let msgError = err.message;
          console.log(msgError);
        });
    },
  },
};
</script>

<style scoped>
#login {
  height: 100vh;
  background-image: linear-gradient(
    129deg,
    rgba(35, 27, 195, 0.7),
    rgba(152, 19, 177, 0.85)
  );

  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  width: 375px;
  height: 275px;
  margin: 5px;
  background-color: #fff;

  text-align: left;
}

.box .button {
  background-color: #53278c;
  color: #fff;
}
</style>