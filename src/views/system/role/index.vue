<template>
  <BasicTable
    :schema="schema"
    :gridOptions="gridOptions"
    :actions="actions"
    @submit="getListData"
  />
  <setModalVue />
</template>

<script setup lang="ts">
  import type { VxeGridProps } from 'vxe-table';
  import { schema, columns } from './data';
  import { getRoleList } from '/@/api/system/role';
  import setModalVue from './modal/setModal.vue';

  const gridOptions = reactive<VxeGridProps>({
    align: 'center',
    loading: false,
    columns: columns,
    pagerConfig: { pageSize: 10 },
    data: [],
  });

  const handleEdit = (e) => {
    console.log(e);
  };
  const handleDelete = (e) => {
    console.log(e);
  };
  const handleDataScope = (e) => {
    console.log(e);
  };
  const handleAuthUser = (e) => {
    console.log(e);
  };

  const actions = (row) => [
    {
      color: 'edit',
      tooltip: '编辑',
      icon: 'i-ant-design:form-outlined',
      onClick: handleEdit.bind(null, row),
    },
    {
      color: 'error',
      tooltip: '删除',
      icon: 'i-ant-design:delete-outlined',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, row),
      },
    },
    {
      color: 'power',
      tooltip: '权限',
      icon: 'i-ant-design:poweroff-outlined',
      onClick: handleDataScope.bind(null, row),
    },
    {
      color: 'handle',
      tooltip: '分配',
      icon: 'i-ant-design:user-outlined',
      onClick: handleAuthUser.bind(null, row),
    },
  ];

  const getListData = async (value) => {
    gridOptions.loading = true;
    const result = await getRoleList(value);
    gridOptions.data = result.rows;
    gridOptions.loading = false;
  };

  getListData({});
</script>
