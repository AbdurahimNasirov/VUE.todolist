<template>
  <div class="title">
    <img
      src="https://todos-app-v2.vercel.app/img/note.75134fb0.svg"
      alt=""
      class="title__img"
    />
    <h1 class="title__content">to-do-list</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo'
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  &__img {
    width: 90px;
    height: 70px;
  }
  &__content {
    font-size: 20px;
    text-transform: capitalize;
    background: rgb(18, 131, 18);
    display: flex;
    border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
    align-items: center;
    justify-content: center;
    transform: rotate(3deg);
    padding: 8px;
  }
}
</style>