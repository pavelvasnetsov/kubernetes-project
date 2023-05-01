<template lang="">
    <div class="todo">
        <v-checkbox 
            class="todo__checkbox"
            style="max-width: 50px;"
            v-model="copyItem.completed"
        />
        <div class="todo__title">
            {{ copyItem.title }}
        </div>
        <v-btn
            color="blue"
            @click="openEditModal"
        >
            Редактировать
        </v-btn>
        <v-btn
            color="red"
            class="todo__delete"
            @click="$emit('item:delete', copyItem.id)"
        >
            Удалить
        </v-btn>

        <v-dialog
            v-model="dialog"
            width="800"
        >
            <v-card>
                <v-card-title>
                    <span class="text-h5">Редактирование задачи</span>
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
                        @click="dialog = false"
                    >
                        Отмена
                    </v-btn>
                    <v-btn
                        color="blue"
                        @click="edit"
                    >
                        Изменить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    name: 'TodoItem',
    props: {
        item: {
            required: true,
            type: Object
        },
    },
    data() {
        return {
            copyItem: {},
            dialog: false,
            task: "",
            rules: [
                value => !!value || 'Поле обязательное'
            ],
        }
    },
    methods: {
        openEditModal() {
            this.task = this.copyItem.title;
            this.dialog = true;
        },
        edit() {
            this.copyItem.title = this.task;
            this.dialog = false;
        }
    },
    watch: {
        copyItem: {
            deep: true,
            handler(newValue) {
                this.$emit('item:edit', newValue);
            }
        },
        dialog(newValue) {
            if (newValue === false) {
                setTimeout(() => {
                    this.task = "";
                }, 500);
            }
        }
    },
    mounted() {
        this.copyItem = {
            ...this.item
        };
    },
}
</script>
<style lang="scss" scoped>
.todo {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;

    &__title {
        flex: 1 1 auto;
    }

    &__checkbox {
        position: relative;
        top: 11px;
    }

    &__delete {
        margin-left: 10px;
    }
}
</style>