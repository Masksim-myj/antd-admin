import type { ErrorMessageMode } from './types';
import { useMessage } from '/@/utils/useMessage';
import { useUserStore } from '/@/store/user';
import { HttpStatusCode } from './httpEnum';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  const userStore = useUserStore();
  const errMessage = msg || HttpStatusCode.get(status);

  if (status === 401) {
    // 如果未登录，跳转到登录页面，并携带当前页面的路径
    // 登录成功后返回当前页面。需要在登录页面上操作此步骤。
    userStore.setToken(undefined);
    userStore.logout(true);
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: '错误提示', content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
