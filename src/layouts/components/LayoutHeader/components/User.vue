<template>
  <a-dropdown placement="bottomLeft" :trigger="['hover']">
    <div class="userInfo">
      <a-avatar class="mr-4!" size="small" :src="getUserInfo.avatar" />
      <span>{{ getUserInfo.nickName }}</span>
    </div>
    <template #overlay>
      <a-menu class="text-dark-300" @click="handleMenuClick">
        <a-menu-item key="userInfo">
          <div class="flex items-center pr-6">
            <div class="i-ant-design:poweroff-outlined mr-2"></div>
            <span>{{ t('header.userInfo') }}</span>
          </div>
        </a-menu-item>
        <a-menu-item key="logout">
          <div class="flex items-center pr-6">
            <div class="i-ant-design:poweroff-outlined mr-2"></div>
            <span>{{ t('header.dropdownItemLoginOut') }}</span>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
  // import {}from 'ant-design-icon'
  const { t } = useI18n();
  const userStore = useUserStore();
  const getUserInfo = computed(() => {
    const { avatar, nickName } = userStore.getUserInfo() || {};
    console.log(nickName);
    return { nickName, avatar: import.meta.env.DEV ? '' : avatar };
  });
  const handleMenuClick = (e) => {
    if (e.key === 'userInfo') {
    } else if (e.key === 'logout') {
    }
  };
</script>
<style lang="less" scoped>
  .userInfo {
    @apply flex justify-around cursor-pointer items-center text-white px-4;
  }
  .userInfo:hover {
    background-color: #0f2438;
  }
</style>
