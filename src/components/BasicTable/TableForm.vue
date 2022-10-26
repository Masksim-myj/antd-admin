<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormButtonGroup align="right">
      <Reset>{{ t('form.reset') }}</Reset>
      <Submit @submit="onSubmit">{{ t('form.query') }}</Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<script setup lang="ts">
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { FormItem, Submit, Reset, FormButtonGroup, FormGrid } from '@formily/antdv-x3';
  import { useI18n } from 'vue-i18n';

  defineProps({
    schema: { type: Object, default: () => {} },
  });

  const emit = defineEmits(['submit']);
  const { t } = useI18n();
  const form = createForm();
  const { SchemaField } = createSchemaField({
    components: { FormItem, FormGrid },
  });

  const onSubmit = (value) => {
    emit('submit', value);
  };
</script>
