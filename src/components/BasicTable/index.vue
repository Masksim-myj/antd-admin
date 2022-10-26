<template>
  <div class="h-full">
    <div class="box mb-8">
      <TableForm :schema="schema" @submit="onSubmit" />
    </div>
    <vxe-grid class="box" v-bind="gridOptions">
      <template #action="{ row }">
        <TableAction :actions="props.actions(row)" />
      </template>
    </vxe-grid>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { VxeGridProps } from 'vxe-table';
  import TableForm from './TableForm.vue';
  import TableAction from './TableAction.vue';

  const props = defineProps({
    schema: { type: Object, default: () => {} },
    actions: { type: Function, default: () => {} },
    gridOptions: { type: Object as PropType<VxeGridProps>, default: () => {} },
  });
  const emit = defineEmits(['submit']);
  const onSubmit = (value) => {
    emit('submit', value);
  };
</script>

<style lang="less" scoped>
  .box {
    @apply bg-white p-4 shadow-lg rounded-lg;
  }
</style>
