<template lang="">
    <v-form class="auth" @submit.prevent>
        <v-text-field
            v-model="name"
            class="auth__input"
            label="Имя"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
        <v-text-field
            v-model="surname"
            class="auth__input"
            label="Фамилия"
            :rules="rules"
            hide-details="auto"
        ></v-text-field>
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
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
            class="auth__input"
            label="Повторить пароль"
            :rules="repeatPasswordRules"
            hide-details="auto"
            v-model="repeatPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn
            type="submit"
            color="blue"
            @click="registrationRequest"
        >Зарегистрироваться</v-btn>
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
    name: 'Registration',
    data() {
        return {
            name: '',
            surname: '',
            password: '',
            repeatPassword: '',
            login: '',
            show1: false,
            show2: false,
            rules: [
                value => !!value || 'Поле обязательное',
                value => (value && value.length >= 4) || 'Минимум 4 символа',
            ],
            repeatPasswordRules: [
                value => this.password === value || 'Пароли должны совпадать'
            ],
            snackbar: false,
            errMsg: ''
        }
    },

    methods: {
        ...mapMutations({
            setIsLogged: 'auth/SET_IS_LOGGED'
        }),
        async registrationRequest() {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/registration`, {
                    name: this.name,
                    surname: this.surname,
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