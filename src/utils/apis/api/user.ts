import { post, del, get } from '@/utils/methods'
import type { UserRequestType, UserDelType, UserListRequestType } from '../types/user.d'

export function userRequest(params: UserRequestType) {
  return post('/user/add', { ...params })
}

export function userDelRequest(userid: UserDelType) {
  return del('/user/delete', { ...userid })
}

export function userListRequest(params: UserListRequestType) {
  return get('/user/list', { params })
}
