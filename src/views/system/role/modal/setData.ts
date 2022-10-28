import { Input, Radio, InputNumber } from '@formily/antdv-x3';
import { Tree } from '/@/components/Form/Tree';
import { action } from '@formily/reactive';
import { getTreeSelect } from '/@/api/system/role';

const useAsyncDataSource = (service) => (field) => {
  field.loading = true;
  service(field).then(
    action.bound!((data) => {
      field.dataSource = data;
      field.loading = false;
    }),
  );
};

export const schema = {
  type: 'object',
  properties: {
    grid: {
      type: 'void',
      'x-component': 'FormLayout',
      'x-component-props': {
        labelCol: 6,
        wrapperCol: 12,
      },
      properties: {
        roleId: {
          type: 'string',
          title: 'id',
          'x-decorator': 'FormItem',
          'x-hidden': true,
          'x-component': Input,
        },
        roleName: {
          type: 'string',
          title: '角色名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': Input,
        },
        roleKey: {
          type: 'string',
          title: '权限字符',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': Input,
        },
        roleSort: {
          type: 'string',
          title: '角色顺序',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': InputNumber,
        },
        status: {
          type: 'string',
          title: '状态',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': Radio.Group,
          enum: [
            { label: '正常', value: '0' },
            { label: '停用', value: '1' },
          ],
        },
        menuIds: {
          type: 'string',
          title: '菜单权限',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': Tree,
          'x-component-props': {
            checkable: true,
            checkStrictly: true,
            height: 300,
            fieldNames: {
              key: 'id',
              value: 'id',
              title: 'label',
            },
          },
          'x-reactions': [useAsyncDataSource(getTreeSelect)],
        },
        remark: {
          type: 'string',
          title: '备注',
          'x-decorator': 'FormItem',
          'x-component': Input.TextArea,
        },
      },
    },
  },
};
