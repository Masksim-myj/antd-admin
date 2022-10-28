<template>
  <div class="h-full">
    <div class="box mb-8">
      <TableForm :schema="schema" @submit="onSubmit" />
    </div>
    <div class="box">
      <vxe-grid ref="xTable" v-bind="gridOptions">
        <template #toolbar>
          <ul class="flex justify-end my-2">
            <slot name="tools"></slot>
            <li class="tool" @click="onSubmit"><div class="i-ant-design:reload-outlined"></div></li>
            <li class="tool" @click="full"><div class="i-ant-design:fullscreen-outlined"></div></li>
          </ul>
        </template>
        <template #action="{ row }">
          <TableAction :actions="props.actions(row)" />
        </template>
      </vxe-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { VxeGridProps, VxeGridInstance } from 'vxe-table';
  import TableForm from './TableForm.vue';
  import TableAction from './TableAction.vue';

  const xTable = ref<VxeGridInstance>();
  const emit = defineEmits(['submit']);
  const props = defineProps({
    schema: { type: Object, default: () => {} },
    actions: { type: Function, default: () => {} },
    gridOptions: { type: Object as PropType<VxeGridProps>, default: () => {} },
  });

  const full = () => {
    xTable.value!.zoom();
  };

  const onSubmit = (value?) => {
    emit('submit', value);
  };
</script>

<style lang="less" scoped>
  .box {
    @apply bg-white px-4 py-2 shadow-lg rounded-lg;

    .tool {
      @apply flex items-center justify-center cursor-pointer w-8 h-8 ml-4 rounded-full border-1 border-gray-400;
    }
  }
</style>
