<template>
  <ul class="right-box">
    <li class="list"> <Search class="list-btn" /></li>
    <li class="list"> <FullScreen class="list-btn" /></li>
    <li class="list"> <Notify class="list-btn" /></li>
    <li class="list"> <Locale class="list-btn" /></li>
    <li class=""> <User class="" /></li>
    <li class="list"> <div class="list-btn i-ant-design:setting-outlined"></div></li>
  </ul>
</template>

<script setup lang="ts">
  import { Search, FullScreen, Notify, Locale, User } from './components';
</script>

<style lang="less" scoped>
  .right-box {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0;
    ::v-deep(.list) {
      width: 32px;
      padding: 0 5px;
      height: 100%;
      color: #fff;
      cursor: pointer;

      &-btn {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
    ::v-deep(.list):hover {
      background-color: #0f2438;
    }
  }
</style>
