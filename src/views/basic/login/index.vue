<template>
  <div class="login">
    <Earth />
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
  import Earth from './Earth/index.vue';
  import LoginForm from './LoginForm/index.vue';
</script>

<style scoped>
  .login {
    position: relative;
  }
</style>
