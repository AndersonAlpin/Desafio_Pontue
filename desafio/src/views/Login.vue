<template>
  <div id="login">
    <div class="logo">
      <b-image
            src="https://pontue.com.br/wp-content/uploads/2018/05/PONTUE-H-2.png"
        ></b-image>
    </div>

    <div class="box">
      <b-field label="Login">
        <b-input />
      </b-field>

      <b-field label="Senha">
        <b-input type="password" password-reveal />
      </b-field>

      <b-button class="button" expanded>Entrar</b-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#login {
  width: 100vw;
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
  background-color: #fff;

  text-align: left;
}

.box .button {
  background-color: #53278c;
  color: #fff;
}

.logo {
  position: absolute;
  top: 100px;
  width: 200px;
}
</style>