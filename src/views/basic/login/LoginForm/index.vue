<template>
  <div class="login-form">
    <div class="text-2xl font-bold mb-6">登录</div>
    <FormProvider :form="form">
      <SchemaField :schema="schema" />
      <Submit size="large" block @submit="onSubmit">提交</Submit>
    </FormProvider>
  </div>
</template>

<script lang="ts" setup>
  import { Image } from 'ant-design-vue';
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { FormItem, FormLayout, Password, Input, Submit, Checkbox } from '@formily/antdv-x3';
  import { getPictureCode } from '/@/api/basic/user';
  import { observer } from '@formily/reactive-vue';

  import { useUserStore } from '/@/store/user';
  import { useMessage } from '/@/utils/useMessage';

  const uuid = ref();
  const img = ref();
  const userStore = useUserStore();
  const { notification } = useMessage();

  const handleStart = async () => {
    const pictureCode = await getPictureCode();
    uuid.value = pictureCode.uuid;
    img.value = `data:image/gif;base64,${pictureCode.img}`;
  };
  // const Image = AImage;

  const imgDom = observer(
    defineComponent({
      name: 'PicCode',
      setup() {
        return () =>
          h(Image, {
            width: '106px',
            height: '40px',
            preview: false,
            src: img.value,
            onClick: () => handleStart(),
          });
      },
    }),
  );

  watchEffect(() => {
    handleStart();
  });

  const schema = {
    title: '登录',
    type: 'object',
    properties: {
      layout: {
        type: 'void',
        'x-component': 'FormLayout',
        className: 'mb-14',
        properties: {
          username: {
            type: 'string',
            default: 'admin',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '账号', size: 'large' },
            'x-validator': [{ required: true, message: '账号不能为空' }],
          },
          password: {
            type: 'string',
            default: 'admin123',
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            'x-component-props': { placeholder: '密码', size: 'large' },
            'x-validator': [{ required: true, message: '密码不能为空' }],
          },
          picCode: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': { placeholder: '图片验证码', size: 'large' },
            'x-validator': [{ required: true, message: '验证码不能为空' }],
            'x-decorator-props': { addonAfter: imgDom, bordered: true },
          },
          checkboxGroup: {
            type: 'boolean',
            'x-decorator': 'FormItem',
            'x-component': 'Checkbox.Group',
            enum: [{ label: '记住我', value: true }],
          },
        },
      },
    },
  };

  const form = createForm();
  const { SchemaField } = createSchemaField({
    components: { FormLayout, FormItem, Input, Password, Image, imgDom, Checkbox },
  });

  const onSubmit = async (value) => {
    const userInfo = await userStore.login({ uuid: uuid.value, ...value });
    if (userInfo) {
      notification.success({
        message: '登录成功',
        description: `欢迎回来: ${userInfo.user.nickName}`,
        duration: 3,
      });
    }
  };
</script>

<style scoped lang="less">
  .login-form {
    position: absolute;
    top: calc(50% - 225px);
    right: 10%;
    background-color: #fff;
    width: 350px;
    height: 450px;
    border-radius: 24px;
    padding: 32px 24px;
  }
</style>
