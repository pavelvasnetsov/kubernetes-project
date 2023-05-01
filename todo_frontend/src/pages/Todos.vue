<template lang="">
    <div class="todos">
        
        <v-dialog
            v-model="dialog"
            width="800"
        >
            <template v-slot:activator="{ props }">
                <v-btn
                    color="blue"
                    v-bind="props"
                    class="todos__add"
                >
                    Добавить задачу
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Добавление задачи</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="task"
                        label="Задача"
                        :rules="rules"
                        hide-details="auto"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red"
                        @click="reset"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        color="blue"
                        @click="add"
                    >
                        Добавить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <TodoItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @item:delete="deleteTodoById"
            @item:edit="edit"
        />
    </div>
</template>
<script>
import TodoItem from '@/components/TodoItem.vue';
import { getTodos, addTodo, deleteTodo, editTodo } from '@/http/todoAPI';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Todos',
    components: {
        TodoItem
    },
    data() {
        return {
            dialog: false,
            rules: [
                value => !!value || 'Поле обязательное'
            ],
            task: '',
            items: []
        }
    },
    methods: {
        reset() {
            this.dialog = false;
        },
        async add() {
            const self = this;
            this.dialog = false;
            const data = await addTodo(this.task, false, self);
            this.items.unshift(data);
        },
        async deleteTodoById(id) {
            await deleteTodo(id);
            this.items = this.items.filter(item => item.id !== id);
        },
        async edit(item) {
            const self = this;
            const data = await editTodo(item.id, item.title, item.completed, self);
            console.log(data);
        }
    },  
    watch: {
        dialog(newValue) {
            if (newValue === false) {
                this.task = '';
            }
        }
    },
    beforeCreate() {
        if (!localStorage.getItem('accessToken')) {
            this.$router.push('/auth');
        }
    },
    async mounted() {
        const self = this;
        const data = await getTodos(self);
        this.items = data;
    },
}
</script>
<style lang="scss" scoped>
    .todos {
        &__add {
            margin-bottom: 10px;
            margin-left: 10px;
        }
    }
</style>