import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        setTodos(s, data) {
            s.todos = data
        },
        addTodo(s, data) {
            s.todos.push(data)
        },
        updateTodo(s, data) {
            s.todos = data
        },
        delTodo(s, data) {
            s.todos = data
        }
    },
    actions: {
        getTodos({ commit }) {
            const req = localStorage.getItem('Todos')
            const res = JSON.parse(req)
            if (res) {
                commit('setTodos', res)
            }
        },
        addTodo({ commit }, { title, completed }) {
            const req = localStorage.getItem('Todos')
            let res = JSON.parse(req)
            let id = null
            if (res.length != 0) {
                id = res[res.length - 1].id + 1
            } else {
                id = 1
            }
            const reqBody = {
                id,
                completed,
                title
            }
            res.push(reqBody)
            localStorage.setItem('Todos', JSON.stringify(res))
            if (reqBody) {
                commit('addTodo', reqBody)
            }
        },
        updateTodo({ commit }, { id, completed, title }) {
            const req = localStorage.getItem('Todos')
            let res = JSON.parse(req)
            const reqBody = {
                id,
                completed,
                title
            }
            res.forEach((todo, idx) => {
                if (todo.id === id) res[idx] = reqBody
            })
            localStorage.setItem('Todos', JSON.stringify(res))
            if (res) {
                commit('updateTodo', res)
            }
        },
        deleteTodo({ commit }, id) {
            const req = localStorage.getItem('Todos')
            let res = JSON.parse(req)
            res.forEach((todo, idx) => {
                if (todo.id === id) res.splice(idx, 1)
            })
            localStorage.setItem('Todos', JSON.stringify(res))
            if (res) {
                commit('delTodo', res)
            }
        }
    },
    getters: {
        todos: s => s.todos
    }
})
