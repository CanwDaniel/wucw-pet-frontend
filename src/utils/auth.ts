// Token 管理工具

const TOKEN_KEY = 'access_token';
const USER_INFO_KEY = 'user_info';
const TOKEN_EXPIRE_KEY = 'token_expire';

// 设置 token
export function setToken(token: string, expireTime?: number) {
  localStorage.setItem(TOKEN_KEY, token);

  // 设置过期时间（默认24小时）
  const expire = expireTime || Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem(TOKEN_EXPIRE_KEY, expire.toString());
}

// 获取 token
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// 移除 token
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  localStorage.removeItem(TOKEN_EXPIRE_KEY);
}

// 检查 token 是否过期
export function isTokenExpired(): boolean {
  const expireTime = localStorage.getItem(TOKEN_EXPIRE_KEY);
  if (!expireTime) return true;

  return Date.now() > parseInt(expireTime);
}

// 检查是否已登录
export function isLoggedIn(): boolean {
  const token = getToken();
  return !!(token && !isTokenExpired());
}

// 设置用户信息
export function setUserInfo(userInfo: any) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

// 获取用户信息
export function getUserInfo(): any {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}

// 清除所有认证信息
export function clearAuth() {
  removeToken();
}
