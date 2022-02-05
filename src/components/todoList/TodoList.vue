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
            
            :class="filterWith === type.type ? 'selected' : ''"
            @click.prevent="filterTodosWithTypes(idx)"
          >
            {{ type.type }}
          </button>
        </div>
      </div>
    </div>
    <ul class="todo-list">
      <TodoItem
        v-for="todo of filteredTodos"
        :key="todo.id"
        :todo="todo"
        @deletedTodoId="deleteTodoLocal()"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from "@/components/todoList/TodoItem.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    TodoItem,
  },

  async mounted() {
    await this.getTodoBasicFunc();
  },
  computed: {
    ...mapGetters(["setTodos"]),
  },
  data: () => ({
    showTrigger: false,
    filterTypes: [
      {
        type: "All",
        selected: false,
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
    filterWith: "All",
    filteredTodos: [],
  }),
  // watch: {
  //   setTodos: async function () {
  //     await this.getTodos({
  //       url: this.$url.todos,
  //       body: null,
  //       methods: "GET",
  //     });
  //     this.filteredTodos = this.setTodos
  //   },
  // },
  methods: {
    ...mapActions(["getTodos"]),
    async getTodoBasicFunc() {
      if (!this.setTodos.length) {
        await this.getTodos({
          url: this.$url.todos,
          body: null,
          methods: "GET",
        });
      }
      this.filteredTodos = this.setTodos;
    },
    filterTodosWithTypes(idx) {
      this.filterTypes.forEach((type) => (type.selected = false));
      this.filterTypes[idx].selected = !this.filterTypes[idx].selected;
      this.filterWith = this.filterTypes[idx].type;
      if (this.filterWith === "Completed")
        this.filteredTodos = this.setTodos.filter(
          (todo) => todo.completed != false
        );
      if (this.filterWith === "Active")
        this.filteredTodos = this.setTodos.filter(
          (todo) => todo.completed === false
        );
      if (this.filterWith === "All") this.filteredTodos = this.setTodos;
    },
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