import { connect, mapProps } from '@formily/vue';
import { Tree as AntdTree } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export const Tree = connect(
  AntdTree,
  mapProps(
    {
      dataSource: 'treeData',
      value: 'checkedKeys',
      onInput: 'onCheck',
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? h(LoadingOutlined) : props.suffixIcon,
      };
    },
  ),
);
