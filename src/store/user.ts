import { acceptHMRUpdate, defineStore } from 'pinia';
import { PageEnum } from '/@/enums/pageEnum';
import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { router } from '/@/router';
import { getAuthCache, setAuthCache } from '/@/utils/cache/auth';
import { doLogout, getUserInfoAsync, loginApi } from '/@/api/basic/user';
import type { UserInfo } from '/#/store';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: string | null;
  sessionTimeout: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', () => {
  const state = reactive<UserState>({
    userInfo: null,
    token: null,
    sessionTimeout: false,
    lastUpdateTime: 0,
  });

  const getToken = () => state.token || getAuthCache<string>(TOKEN_KEY);
  const setToken = (info: string) => {
    state.token = info ? info : null;
    setAuthCache(TOKEN_KEY, info);
  };
  const getUserInfo = () => state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
  const setUserInfo = (info: UserInfo | null) => {
    state.userInfo = info;
    setAuthCache(USER_INFO_KEY, info);
  };
  const getSessionTimeout = () => state.sessionTimeout;
  const getLastUpdateTime = () => state.lastUpdateTime;
  // 登录
  const login = async (params) => {
    try {
      const { goHome = true, mode, ...loginParams } = params;
      const data = await loginApi(loginParams, mode);
      setToken(data.access_token);
      return afterLoginAction(goHome);
    } catch (e) {
      Promise.reject(e);
    }
  };
  // 登录之后的操作
  const afterLoginAction = async (goHome?: boolean) => {
    if (!getToken) return null;
    // get user info
    const userInfo = await getUserInfoAction();
    goHome && (await router.replace(PageEnum.BASE_HOME));
    return userInfo;
  };
  // 获取用户信息
  const getUserInfoAction = async () => {
    if (!getToken) return null;
    const userInfo = await getUserInfoAsync();
    setUserInfo(userInfo.user);
    return userInfo;
  };
  //退出登录
  const logout = async (goLogin = false) => {
    if (state.token) {
      await doLogout();
    }
    state.token = null;
    state.userInfo = null;
    goLogin && router.push(PageEnum.BASE_LOGIN);
  };

  const resetState = () => {
    state.userInfo = null;
    state.token = '';
    state.sessionTimeout = false;
  };

  return {
    login,
    afterLoginAction,
    getToken,
    setToken,
    getUserInfo,
    getUserInfoAction,
    getSessionTimeout,
    getLastUpdateTime,
    setUserInfo,
    logout,
    resetState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
