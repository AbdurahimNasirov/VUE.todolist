<template>
  <div>
    <span
      class="search"
      @click="showTrigger = !showTrigger"
      v-show="!showTrigger"
      >Search <ion-icon name="search"></ion-icon
    ></span>
    <div class="search-block" v-show="showTrigger">
      <span class="search-block__title">~ Search todo ~</span>
      <input
        type="text"
        placeholder="Search...."
        v-model="filterInput"
        class="search-block__input"
        @input="filterTodos()"
      />
      <button class="search-block__trigger" @click="showTrigger = !showTrigger">
        +
      </button>

      <div class="search-block__btn-types">
        <button
          class="search-block__btn-type"
          v-for="(type, idx) of filterTypes"
          :key="idx"
          :class="type.selected ? 'selected' : ''"
          @click="filterTypeChooser(idx)"
        >
          {{ type.type }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
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
  async mounted() {
    if (!this.setTodos.length) {
      await this.getTodos({
        url: this.$url.todos,
        body: null,
        methods: "GET",
      });
    }
    this.filteredTodos = this.setTodos
    this.$emit('filteredTodos', this.filteredTodos)
    console.log(this.filteredTodos)
  },
  methods: {
    ...mapActions(["getTodos"]),
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
</style>