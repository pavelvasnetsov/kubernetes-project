<template>
  <div>
    <v-app>
      <v-app-bar>
        <div v-if="!isLogged">
          <v-btn 
            @click="$router.push('/auth')
          ">Авторизация</v-btn>
          <v-btn 
            @click="$router.push('/registration')"
          >Регистрация</v-btn>
        </div>
        <div v-else>
          <v-btn 
            @click="logout"
          >Выйти</v-btn>
        </div>
      </v-app-bar>
      <div class="container">
        <router-view></router-view>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      isLogged: state => state.auth.isLogged
    })
  },
  methods: {
    ...mapMutations({
      setIsLogged: 'auth/SET_IS_LOGGED'
    }),
    logout() {
      localStorage.removeItem('accessToken');
      this.setIsLogged(false);
      this.$router.push('/auth');
    }
  },
  created() {
    if (localStorage.getItem('accessToken')) {
      this.setIsLogged(true);
    } else {
      this.setIsLogged(false);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 70px;
}
</style>