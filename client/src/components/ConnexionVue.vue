<template>
  <div class="bg-gradient-to-r from-blue-400 to-purple-900 conn">
    <div class="center" v-if="!isInscriptionShown">
      <h1 class="text-3xl font-bold">Connexion</h1>
      <form action="">
        <div class="txt_field">
          <input type="text" required id="pseudo" v-model="bodyConnexion.username">
          <span></span>
          <label>Pseudonyme</label>
        </div>
        <div class="txt_field">
          <input type="password" required id="password" v-model="bodyConnexion.password">
          <span></span>
          <label>Mot de passe</label>
        </div>
        <ErrorVue v-if="isErrorConnexion" :msg="errorConnexion"></ErrorVue>
        <input type="button" value="Connexion" @click="connexion">
        <div class="signup_link">
          Pas encore inscrit ?
          <button type="button" @click="isInscriptionShown = true">Inscription</button>
        </div>
      </form>

    </div>
    <div class="center" v-if="isInscriptionShown">
      <h1 class="text-3xl font-bold">Inscription</h1>
      <form>
        <div class="txt_field">
          <input type="text" required id="inscr-pseudo" v-model="bodyInscription.username">
          <span></span>
          <label>Pseudonyme</label>
        </div>
        <div class="txt_field">
          <input type="password" required id="inscr-first-pwd" v-model="bodyInscription.password">
          <span></span>
          <label>Mot de passe</label>
        </div>
        <div class="txt_field">
          <input type="password" required id="inscr-second-pwd" v-model="bodyInscription.confirm_password">
          <span></span>
          <label>Confirmer votre mot de passe</label>
        </div>
        <ErrorVue v-if="isErrorInscription" :msg="errorInscription"></ErrorVue>
        <input type="button" value="Inscription" @click="inscription">
        <div class="signup_link">
          Déjà inscrit ?
          <button type="button" @click="isInscriptionShown = false">Connexion</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import ErrorVue from "@/components/ErrorVue";
import { fetchData } from "@/js/request";

export default {
  name: "ConnexionVue",
  components: {ErrorVue},
  data() {
    return {
      bodyConnexion: {
        username: "toto",
        password: "toto",
      },
      bodyInscription: {
        username: "",
        password: "",
        confirm_password: ""
      },
      isInscriptionShown: false,
      isErrorConnexion: false,
      isErrorInscription: false,
      errorInscription: "",
      errorConnexion: "",
    };
  },
  methods: {
    connexion: function () {
      this.isErrorConnexion = false;
      if(this.bodyConnexion.password.trim().length === 0 || this.bodyConnexion.username.trim().length === 0){
        this.errorConnexion = "Les champs ne peuvent pas être vides";
        this.isErrorConnexion = true;
        return;
      }
      fetchData(JSON.stringify(this.bodyConnexion), 'POST', 'login/').then((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('currentDate', new Date().toISOString().slice(0, 10));
        this.$router.push("/day");
      }).catch(() => {
        this.errorConnexion = "Identifiants incorrects";
        this.isErrorConnexion = true;
      });
    },
    inscription: function () {
      this.isErrorInscription = false;
      if(this.bodyInscription.password.trim().length === 0 || this.bodyInscription.username.trim().length === 0 || this.bodyInscription.confirm_password.trim().length === 0){
        console.log('a');
        this.errorInscription = "Les champs ne peuvent pas être vides";
        this.isErrorInscription = true;
        return;
      }
      if(this.bodyInscription.password !== this.bodyInscription.confirm_password){
        this.errorInscription = "Les mots de passe ne correspondent pas";
        this.isErrorInscription = true;
        return;
      }
      fetchData(JSON.stringify(this.bodyInscription), 'POST', 'register/').then((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('currentDate', new Date().toISOString().slice(0, 10));
        this.$router.push("/day");

        console.log(res);
      }).catch(() => {
        this.errorInscription = "Pseudonyme déjà utilisé";
        this.isErrorInscription = true;
      });
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  border-radius: 10px;
  box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.05);
  animation: show-modal 1s ease;
}

@keyframes show-modal {
  from {
    opacity: 0;
    top: 45%;
  }
  to {
    opacity: 1;
    top: 50%;
  }
}

.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}

.center form {
  padding: 0 40px;
  box-sizing: border-box;
}

form .txt_field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}

.txt_field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}

.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s;
}

.txt_field span::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: .5s;
}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}


input[type="button"] {
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
}

input[type="button"]:hover {
  border-color: #2691d9;
  transition: .5s;
}

.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}

.signup_link button {
  color: #2691d9;
  text-decoration: none;
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
}

.signup_link button:hover {
  text-decoration: underline;
}

.conn {
  height: 100%;
  width: 100%;
}
</style>
