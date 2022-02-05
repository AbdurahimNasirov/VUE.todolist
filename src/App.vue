<template>
  <div id="app">
    <main class="container">
      <Title />
      <TodoForm />
      <TodoList />
    </main>
  </div>
</template>

<script>
import Title from "@/components/titleBlock/Title.vue";
import TodoForm from "@/components/todoForm/TodoForm.vue";
import TodoList from "@/components/todoList/TodoList.vue";
export default {
  name: "App",
  data: () => ({
    todosItems: [],
  }),
  mounted() {},
  methods: {
    setTodos(data) {
      console.log(data);
    },
  },
  components: {
    Title,
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
