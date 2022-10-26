<template>
  <a-sub-menu :title="item.meta?.title" :key="item.name">
    <template #icon>
      <div :class="`i-${item.meta?.icon}`"></div>
    </template>
    <template v-for="childrenItem in item.children" :key="childrenItem.path">
      <SubMenu v-if="childrenItem?.children" :item="childrenItem" />
      <a-menu-item
        class="menu-item"
        v-else
        :key="childrenItem.path"
        @click="handleClick(childrenItem.path)"
      >
        <template #icon>
          <div :class="`i-${childrenItem.meta?.icon}`"></div>
        </template>
        {{ childrenItem.meta?.title }}
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
  import { useGo } from '/@/utils/usePage';

  const go = useGo();
  defineProps({
    item: { type: Object, default: () => {} },
  });

  const handleClick = (path: string) => {
    go(path);
  };
</script>

<style lang="less">
  .menu-item {
    display: flex !important;
    align-items: center;
  }
</style>
