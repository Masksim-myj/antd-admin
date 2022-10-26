<template>
  <a-dropdown
    placement="bottom"
    :trigger="['click']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
  >
    <div class="i-ion:language"></div>
  </a-dropdown>
</template>

<script setup lang="ts">
  import { localeList } from '/@/settings/localeSetting';
  const selectedKeys = ref<string[]>([]);
  const handleMenuEvent = (menu) => {
    console.log(menu);
    // if (unref(getLocale) === menu.event) {
    //   return;
    // }
    // toggleLocale(menu.event as string);
  };
</script>
