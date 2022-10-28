<template>
  <FormLayout labelCol="6" wrapperCol="10">
    <SchemaField :schema="schema" />
  </FormLayout>
</template>

<script setup lang="ts">
  import { FormItem, FormLayout } from '@formily/antdv-x3';
  import { createSchemaField } from '@formily/vue';
  import { schema } from './setData';

  const { SchemaField } = createSchemaField({
    components: { FormItem, FormLayout },
  });
</script>

<style scoped></style>
