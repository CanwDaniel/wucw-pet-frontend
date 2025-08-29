import { post, del, get } from '@/utils/methods';
import type { UserRequestType, UserDelType, UserListRequestType } from '../types/user.d';

// 登录接口参数类型
export interface LoginRequestType {
  username: string;
  password: string;
}

// 登录响应类型
export interface LoginResponseType {
  token: string;
  user: {
    userid: string;
    username: string;
    usertype: string;
    phone: string;
    gender: string;
    birthday: Date | null;
    avatar: string;
  };
}

export function userRequest(params: UserRequestType) {
  return post('/user/add', { ...params });
}

export function userDelRequest(userid: UserDelType) {
  return del('/user/delete', { ...userid });
}

export function userListRequest(params: UserListRequestType) {
  return get('/user/list', { params });
}

// 新增登录接口
export function loginRequest(params: LoginRequestType) {
  return post('/user/login', { ...params });
}
