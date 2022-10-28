<template>
  <FormLayout labelCol="{6}" wrapperCol="{10}">
    <SchemaField :schema="schema" />
  </FormLayout>
</template>

<script setup lang="ts">
  import { FormLayout, FormItem, Input } from '@formily/antdv-x3';
  import { createSchemaField } from '@formily/vue';

  const { SchemaField } = createSchemaField({
    components: { FormItem, Input },
  });

  const schema = {
    type: 'object',
    properties: {
      aaa: {
        type: 'string',
        title: '输入框1',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      bbb: {
        type: 'string',
        title: '输入框2',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      ccc: {
        type: 'string',
        title: '输入框3',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      ddd: {
        type: 'string',
        title: '输入框4',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  };
</script>
