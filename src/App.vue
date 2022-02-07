<template>
  <div id="app">
    <main class="container">
      <Logo />
      <TodoForm />
      <TodoList />
    </main>
  </div>
</template>

<script>
import Logo from "@/components/logo/index.vue";
import TodoForm from "@/components/form/index.vue";
import TodoList from "@/components/todos/TodoList.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({
    todosItems: [],
  }),
  computed: {
    ...mapGetters(["todos"]),
  },
  created() {
    if (!localStorage.getItem("Todos")) 
      localStorage.setItem("Todos", JSON.stringify([]));
    this.getTodos();
  },
  methods: {
    ...mapActions(["getTodos"]),
  },
  components: {
    Logo,
    TodoForm,
    TodoList,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Supermercado One";
}
body {
  min-height: 100vh;
  background: rgb(77, 197, 77);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.container {
  min-width: 420px;
  border-radius: 15px;
  margin: auto;
  min-height: 450px;
  background: rgba(238, 201, 201, 0.863);
  padding: 25px;
}
</style>
