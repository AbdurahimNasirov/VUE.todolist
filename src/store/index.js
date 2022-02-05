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
        addTodos(s, data) {
           s.todos.push(data) 
        },
        patchTodos(s, data) {
            s.todos.find(todo => todo.id === data.id ? todo = data : console.log('e polucilos update') )
        },
        delTodos(s, data) {
            s.todos = s.todos.filter(todo => todo.id != data.id)
        }
    },
    actions: {
        async defaultFetch(ctx, { url, body = null, method }) {
            const headers = {
                'Content-type': 'application/json; charset=UTF-8'
            }
            const reqBody = {
                method,
                body,
                headers
            }
            const req = await fetch(url, reqBody)
            let res
            if(req.ok) {
                res = await req.json()
                return res
            }else {
                const er = new Error('ne udalost polucit todos')
            }
        },
        async getTodos({dispatch, commit}, reqBody) {
            const req = await dispatch('defaultFetch', reqBody)
            if(req) {
                commit('setTodos', req)
            }
        },
        async addTodos({dispatch, commit}, reqBody) {
            const req = await dispatch('defaultFetch', reqBody)
            if(req) {
                commit('addTodos', req)
            }
        },
        async patchTodos({dispatch, commit}, reqBody) {
            const req = await dispatch('defaultFetch', reqBody)
            if(req) {
                commit('patchTodos', req)
            }
        },
        async deleteTodos({dispatch, commit}, reqBody) {
            const req = await dispatch('defaultFetch', reqBody)
            if(req) {
                commit('delTodos', req)
            }
        }
    },
    getters: {
        setTodos: s => s.todos
    }
})
