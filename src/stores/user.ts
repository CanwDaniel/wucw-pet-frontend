import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { getToken, getUserInfo, clearAuth, setToken, setUserInfo } from '@/utils/auth';
import { loginRequest } from '@/utils/apis/api/user';
import type { LoginRequestType } from '@/utils/apis/api/user';

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(getToken());
  const userInfo = ref<Object | null>(null);
  // const isLoggedIn = computed(() => !!token.value);
  // 登录
  const login = async (loginData: LoginRequestType) => {
    try {
      const response = (await loginRequest(loginData)) as any;

      // 更新状态
      setToken(response.data.accessToken);

      userInfo.value = response.data.userInfo;

      const permissions = response.data.userInfo.permissions.map(
        (permission: any) => permission.code,
      );

      const roles = response.data.userInfo.roles;

      const { username, userid, avatar } = response.data.userInfo;

      setUserInfo({ username, userid, avatar, permissions, roles });

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error };
    }
  };

  // 登出
  const logout = () => {
    token.value = null;
    userInfo.value = null;
    clearAuth();
  };

  // 检查登录状态
  const checkAuth = () => {
    const currentToken = getToken();

    if (currentToken) {
      token.value = currentToken;
      return true;
    }

    return false;
  };

  return {
    // 状态
    token,
    userInfo,
    // isLoggedIn,

    // 方法
    login,
    logout,
    checkAuth,
  };
});
