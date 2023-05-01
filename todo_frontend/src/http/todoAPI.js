import { $host, $authHost } from ".";

const refresh = async (self) => {
    try {
        const response = await $host.get('/auth/refresh');
        const data = response.data;
        localStorage.setItem('accessToken', data.accessToken);
        return data;
    } catch (e) {
        console.log(e);
        self.$router.push('/auth');
        localStorage.removeItem('accessToken');
    }
}

export const getTodos = async (self) => {
    try {
        const response = await $authHost.get('/todos');
        const data = response.data;
        return data;
    } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
            await refresh(self);
            await getTodos(self);
        } else {
            console.log(e);
        }
    }
};

export const addTodo = async (title, completed, self) => {
    try {
        const response = await $authHost.post('/todos', {
            title,
            completed
        });
        const data = response.data;
        return data;
    } catch (e) {
        if (e.response.status === 401) {
            await refresh(self);
            await addTodo(title, completed, self);
        } else {
            console.log(e);
        }
    }
};

export const editTodo = async (id, title, completed) => {
    try {
        const response = await $authHost.put(`/todos/${id}`, {
            title,
            completed
        });
        const data = response.data;
        return data;
    } catch (e) {
        if (e.response.status === 401) {
            await refresh();
            await editTodo(id, title, completed);
        } else {
            console.log(e);
        }
    }
}

export const deleteTodo = async (id, self) => {
    try {
        const response = await $authHost.delete(`/todos/${id}`);
        const data = response.data;
        return data;
    } catch (e) {
        if (e.response.status === 401) {
            await refresh(self);
            await deleteTodo(id, self);
        } else {
            console.log(e);
        }
    }
}