<template>
  <a-modal v-model:visible="visible" :title="getTitle" :confirm-loading="loading" @ok="handleOk">
    <p>222</p>
  </a-modal>
</template>

<script setup lang="ts">
  const loading = ref(false);
  const props = defineProps({
    isEdit: { type: Boolean, defalut: false },
    visible: { type: Boolean, defalut: false },
  });
  const getTitle = computed(() => (props.isEdit ? '修改角色' : '新增角色'));
  const handleOk = () => {};
</script>

<style scoped></style>
