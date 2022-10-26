import type { VxeGridPropTypes } from 'vxe-table';
import { h } from 'vue';
import { Input, Select, DatePicker } from '@formily/antdv-x3';
import { Switch } from 'ant-design-vue';

import { useMessage } from '/@/utils/useMessage';
import { setRoleStatus } from '/@/api/system/role';

export const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormGrid',
      properties: {
        roleName: {
          type: 'string',
          title: '角色名称',
          'x-decorator': 'FormItem',
          'x-component': Input,
        },
        roleKey: {
          type: 'string',
          title: '权限字符',
          'x-decorator': 'FormItem',
          'x-component': Input,
        },
        status: {
          type: 'string',
          title: '状态',
          'x-decorator': 'FormItem',
          'x-component': Select,
          enum: [
            { label: '正常', value: 0 },
            { label: '停用', value: 1 },
          ],
        },
        '[beginTime,endTime]': {
          title: '创建时间',
          'x-decorator': 'FormItem',
          'x-component': DatePicker.RangePicker,
          'x-decorator-props': { gridSpan: 2 },
          type: 'string',
        },
      },
    },
  },
};

export const columns: VxeGridPropTypes.Columns = [
  { field: 'roleName', title: '角色名称' },
  { field: 'roleId', title: '角色编号', width: 100 },
  { field: 'roleKey', title: '权限字符', width: 300 },
  { field: 'roleSort', title: '显示顺序', width: 100 },
  {
    field: 'status',
    title: '状态',
    width: 150,
    slots: {
      default: ({ row }) =>
        h(Switch, {
          checked: row.status === '0',
          checkedChildren: '启用',
          unCheckedChildren: '停用',
          loading: row.pendingStatus,
          onChange(checked: boolean) {
            row.pendingStatus = true;
            const status = checked ? '0' : '1';
            const { createMessage } = useMessage();
            setRoleStatus({ roleId: row.roleId, status })
              .then(() => {
                row.status = status;
                createMessage.success(`已成功修改角色状态`);
              })
              .catch(() => {
                createMessage.error('修改角色状态失败');
              })
              .finally(() => {
                row.pendingStatus = false;
              });
          },
        }),
    },
  },
  { field: 'createTime', title: '创建时间', width: 200 },
  { field: 'action', title: '操作', fixed: 'right', width: 200, slots: { default: 'action' } },
];
