<template>
  <BasicTable :schema="schema" :gridOptions="gridOptions" :actions="actions" @submit="getListData">
    <template #tools>
      <a-button class="mr-4" type="primary">新增</a-button>
      <a-button type="primary" danger>删除</a-button>
    </template>
  </BasicTable>
</template>

<script setup lang="ts">
  import type { VxeGridProps } from 'vxe-table';
  import { FormDialog } from '@formily/antdv-x3';
  import { schema, columns } from './data';
  import { getRoleList, getRoleMenuTreeSelect, editRole } from '/@/api/system/role';
  import setModalVue from './modal/setModal.vue';
  import depModalVue from './modal/depModal.vue';

  const gridOptions = reactive<VxeGridProps>({
    align: 'center',
    loading: false,
    columns: columns,
    pagerConfig: { pageSize: 10 },
    data: [],
  });

  const handleEdit = (e) => {
    FormDialog('修改角色', setModalVue as any)
      .forOpen((_payload, next) => {
        getRoleMenuTreeSelect(e.roleId).then((res) => {
          next({ initialValues: { ...e, menuIds: res.checkedKeys } });
        });
      })
      .forConfirm(async (payload, next) => {
        await editRole(payload.values);
        await getListData({});
        next();
      })
      .open()
      .catch(console.error);
  };
  const handleDelete = (e) => {
    console.log(e);
  };
  const handleDataScope = (e) => {
    console.log(e);
    FormDialog('修改角色', depModalVue as any)
      .forOpen((_payload, next) => {
        setTimeout(() => {
          next({
            initialValues: {
              aaa: '123',
            },
          });
        }, 1000);
      })
      .forConfirm((payload, next) => {
        setTimeout(() => {
          console.log(payload);
          next(payload);
        }, 1000);
      })
      .forCancel((payload, next) => {
        setTimeout(() => {
          console.log(payload);
          next(payload);
        }, 1000);
      })
      .open()
      .then(console.log)
      .catch(console.error);
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
