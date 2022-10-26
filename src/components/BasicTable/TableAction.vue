<template>
  <div class="table-action flex w-auto items-center justify-around">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <a-tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <a-popconfirm v-if="Object.keys(action.popConfirm || {}).length" v-bind="action">
          <div class="action" :class="action.color">
            <div :class="[action.icon, 'cursor-pointer', !!action.label && 'mr-1']"></div>
            <template v-if="action.label">{{ action.label }}</template>
          </div>
        </a-popconfirm>
        <div v-else @click="action.onClick">
          <div class="action" :class="action.color">
            <div :class="[action.icon, 'cursor-pointer', !!action.label && 'mr-1']"></div>
          </div>
          <template v-if="action.label">{{ action.label }}</template>
        </div>
      </a-tooltip>
      <a-popconfirm v-else v-bind="action">
        <div :class="[action.icon, 'cursor-pointer', !!action.label && 'mr-1']"></div>
        <template v-if="action.label">{{ action.label }}</template>
      </a-popconfirm>
      <a-divider type="vertical" class="h-full bg-gray-300" v-if="index < getActions.length - 1" />
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { TooltipProps } from 'ant-design-vue/es/tooltip/Tooltip';
  import { PropType } from 'vue';
  import { isBoolean, isFunction, isString } from 'lodash-es';

  interface ActionItem {
    label?: string;
    icon?: string;
    color?: 'edit' | 'details' | 'error' | 'handle' | 'power';
    tooltip?: string | TooltipProps;
    ifShow?: boolean | ((action: ActionItem) => boolean);
    popConfirm?: PopConfirm;
    onClick: () => {};
  }

  interface PopConfirm {
    title: string;
    okText?: string;
    cancelText?: string;
    confirm: Fn;
    cancel?: Fn;
    icon?: string;
    placement?:
      | 'top'
      | 'left'
      | 'right'
      | 'bottom'
      | 'topLeft'
      | 'topRight'
      | 'leftTop'
      | 'leftBottom'
      | 'rightTop'
      | 'rightBottom'
      | 'bottomLeft'
      | 'bottomRight';
  }

  const props = defineProps({
    actions: { type: Array as PropType<ActionItem[]>, default: () => [] },
  });

  const isIfShow = (action: ActionItem): boolean => {
    const ifShow = action.ifShow;
    let isIfShow = true;
    isBoolean(ifShow) && (isIfShow = ifShow);
    isFunction(ifShow) && (isIfShow = ifShow(action));
    return isIfShow;
  };

  const getActions = computed(() =>
    toRaw(props.actions)
      .filter((action) => isIfShow(action))
      .map((action) => ({
        type: 'link',
        size: 'small',
        ...action,
        ...(action.popConfirm || {}),
        onConfirm: action.popConfirm?.confirm,
        onCancel: action.popConfirm?.cancel,
        enable: !!action.popConfirm,
      })),
  );

  const getTooltip = (data: string | TooltipProps): TooltipProps => ({
    placement: 'top',
    ...(isString(data) ? { title: data } : data),
  });
</script>

<style lang="less" scoped>
  .table-action {
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      color: #fff;
      background-color: #55d187;
    }
    .edit {
      background-color: #55d187;
    }
    .details {
      background-color: #55d187;
    }
    .error {
      background-color: #ff4d4f;
    }
    .handle {
      background-color: #55d187;
    }
    .power {
      background-color: #55d187;
    }
  }
</style>
