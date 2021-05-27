<template>
  <div id="login" class="container is-fullhd">
    <div class="box">
      <b-field label="E-mail">
        <ValidationProvider name="email" rules="required" v-slot="{ errors }">
          <b-input
            placeholder="Informe seu e-mail"
            type="email"
            name="email"
            v-model="emailField"
          />
          <span class="message">{{ errors[0] }}</span>
        </ValidationProvider>
      </b-field>

      <b-field label="Senha">
        <ValidationProvider name="email" rules="required" v-slot="{ errors }">
          <b-input
            placeholder="Informe sua senha"
            type="password"
            name="password"
            v-model="passwordField"
            password-reveal
          />
          <span class="message">{{ errors[0] }}</span>
        </ValidationProvider>
      </b-field>

      <div class="message-login">
        <span v-if="msg">{{ msg }}</span>
      </div>

      <b-button class="button" @click="login" expanded>Entrar</b-button>
    </div>
  </div>
</template>

<script>
import { setLocalStorage } from "@/global.js";
import urlAPI from "@/api/url";
import axios from "axios";

import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Este campo é obrigatório",
});

export default {
  components: { ValidationProvider },
  data() {
    return {
      emailField: "",
      passwordField: "",
      user: {},
      msg: "",
    };
  },
  methods: {
    login() {
      if (this.emailField && this.passwordField) {
        axios
          .post(`${urlAPI}auth/login`, {
            email: this.emailField,
            password: this.passwordField,
          })
          .then((res) => {
            this.user = {
              role: res.data.aluno_id ? "aluno" : "admin",
              token: res.data.access_token,
              aluno_id: res.data.aluno_id,
            };

            this.user.req = {
              headers: {
                Authorization: `Bearer ${this.user.token}`,
              },
            };

            setLocalStorage(this.user);

            this.user.role == "admin"
              ? this.$router.push({ name: "Admin" })
              : this.$router.push({ name: "Aluno" });
          })
          .catch((err) => {
            this.msg = "Login inválido";

            setTimeout(() => {
              this.msg = null;
            }, 3000);
            console.log(err);
          });
      }
    },
  },
  created() {
    this.$store.replaceState({
      login: [],
      redacoes: [],
    });
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
  margin: 5px;
  background-color: #fff;

  text-align: left;
}

.box .button {
  background-color: #53278c;
  color: #fff;
}

span.message {
  font-size: 13px;
  color: rgb(230, 88, 88);
}

.message-login {
  font-size: 13px;
  color: rgb(230, 88, 88);
  text-align: center;
  margin-bottom: 10px;
}
</style>