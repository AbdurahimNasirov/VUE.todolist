<template>
  <li class="todo" :class="todo.completed ? 'completed' : ''">
    <div class="checkbox-btn" @click="completedChnager">
      <div class="checkbox-btn__empty" v-show="!todo.completed"></div>
      <span class="checkbox-btn__icon" v-show="todo.completed">+</span>
    </div>
    <span class="todo__content">{{ todo.title }}</span>
    <button class="todo__deleteBtn" @click="deleteTodo">+</button>
  </li>
</template>

<script>
import { mapActions} from "vuex";
export default {
  props: ["todo"],
  name: "Todo-item",
  data: () => ({
    todoTitle: "",
    completed: null,
  }),
  mounted() {
    (this.todoTitle = this.todo.title), (this.completed = this.todo.completed);
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),
    completedChnager() {
      this.updateTodo({
        title: this.todo.title,
        completed: !this.todo.completed,
        id: this.todo.id,
      });
      this.todo.completed = !this.todo.completed;
    },
    deleteTodoBtn() {
      this.deleteTodo(this.todo.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 10px;
  border-radius: 5px;
  max-width: 90%;
  margin: 10px auto;
  cursor: pointer;
  &__checkbox {
    border: 2px solid #494a4b;
    outline: none;
  }
  &__deleteBtn {
    margin: 0 -8px 0 auto;
    padding: 0 8px;
    border: none;
    background: none;
    transform: rotate(45deg) scale(2);
    cursor: pointer;
    transition: 0.25s;
    &:hover {
      color: rgb(114, 111, 111);
    }
  }
  &__content {
    font-family: "Abel";
    font-weight: 700;
    padding: 5px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .checkbox-btn {
    width: 15px;
    height: 15px;
    cursor: pointer;
    &__empty {
      width: 15px;
      height: 15px;
      border: 2px solid #494a4b;
      padding: 5px;
      border-radius: 3px;
    }
    &__icon {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 5px;
    }
  }
}
.none {
  display: none !important;
}
.block {
  display: block !important;
}
.completed {
  background-color: rgb(18, 131, 18);
  animation: copmletedAnimation 0.75s ease-in-out both;
}
@keyframes copmletedAnimation {
  0% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  40% {
    transform: rotateX(-10deg);
  }
  70% {
    transform: rotateX(10deg);
  }
  to {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
</style>