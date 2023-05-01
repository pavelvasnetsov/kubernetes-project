<template lang="">
    <v-form class="auth" @submit.prevent>
        <v-text-field
            v-model="login"
            class="auth__input"
            label="Логин"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            class="auth__input"
            label="Пароль"
            :rules="rules"
            hide-details="auto"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        ></v-text-field>
        <v-btn
            type="submit"
            color="blue"
            @click="authReques"
        >Войти</v-btn>
        <v-snackbar
            v-model="snackbar"
            multi-line
            >
            {{ errMsg }}

            <template v-slot:actions>
                <v-btn
                color="red"
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-form>
</template>
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Authorization',
    data() {
        return {
            password: '',
            login: '',
            show: false,
            rules: [
                value => !!value || 'Поле обязательное',
                value => (value && value.length >= 4) || 'Минимум 4 символа',
            ],
            snackbar: false,
            errMsg: '',
        }
    },
    methods: {
        ...mapMutations({
            setIsLogged: 'auth/SET_IS_LOGGED'
        }),
        async authReques() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                    login: this.login,
                    password: this.password
                });

                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                this.setIsLogged(true);
                this.$router.push('/todos');
            } catch (e) {
                this.errMsg = e.response.data.message;
                this.snackbar = true;
            }
        }
    },
    beforeCreate() {
        if (localStorage.getItem('accessToken')) {
            this.$router.push('/todos');
        }
    }
}
</script>
<style lang="scss">
.auth {
    max-width: 700px;
    padding: 20px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    &__input {
        margin-bottom: 20px;
    }
}
</style>