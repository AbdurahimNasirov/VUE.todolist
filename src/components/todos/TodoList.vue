<template>
  <div>
    <div>
      <div class="search-block">
        <span class="search-block__title">~ Search todo ~</span>
        <div class="search-block__btn-types">
          <button
            class="search-block__btn-type"
            v-for="(type, idx) of filterTypes"
            :key="idx"
            :class="filterTypes[idx].selected === true ? 'selected' : ''"
            @click.prevent="filterTodosWithType(idx)"
          >
            {{ type.type }}
          </button>
        </div>
      </div>
    </div>
    <ul class="todo-list">
      <TodoItem v-for="(todo, idx) of filteredTodos" :key="idx" :todo="todo" />
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/todos/TodoItem.vue";
import { mapGetters } from "vuex";
export default {
  name: "Todo-list",
  data: () => ({
    showTrigger: false,
    filterTypes: [
      {
        type: "All",
        selected: true,
      },
      {
        type: "Active",
        selected: false,
      },
      {
        type: "Completed",
        selected: false,
      },
    ],
    filterInput: "",
    filterType: "All",
    filteredTodos: [],
  }),
  computed: {
    ...mapGetters(["todos"]),
    filterTodos() {
      let todos = this.todos
      if(this.filterType === 'All') return todos;
      if( this.filterType === 'Completed') return (todos = this.todos.filter(
          (todo) => todo.completed === true
        ))
      if( this.filterType === 'Active') return (todos = this.todos.filter(
          (todo) => todo.completed === false
        ))

    },
  },
  mounted() {
    this.filteredTodos = this.todos;
  },
  methods: {
    filterTodosWithType(idx) {
      this.filterTypes.forEach((type) => (type.selected = false));
      this.filterTypes[idx].selected = !this.filterTypes[idx].selected;
      this.filterType = this.filterTypes[idx].type
      this.filteredTodos = this.filterTodos
    },
  },
  components: {
    TodoItem,
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 110px;
  background: rgb(18, 131, 18);
  display: block;
  margin: 20px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}
.search-block {
  position: relative;
  background: rgb(77, 197, 77);
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  margin: 25px auto;
  &__title {
    display: block;
    margin-top: -20px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 22px;
  }
  &__input {
    font-family: "Abel";
    display: block;
    width: 80%;
    margin: 0px auto;
    border: none;
    padding: 7px 10px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
  &__btn-types {
    width: 100%;
    padding: 15px 0 0 0;
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  &__btn-type {
    border: none;
    padding: 7px;
    cursor: pointer;
    border-radius: 5px;
    font-family: "Abel";
    font-weight: 700;
  }
  &__trigger {
    position: absolute;
    top: 10px;
    right: 15px;
    border: none;
    background: none;
    transform: rotate(45deg) scale(2.5);
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      color: #fe7345;
    }
  }
}
.selected {
  background: #fe7345;
}
.todo-list {
  margin-top: 30px;
}
</style>