export interface UserRequestType {
  userid?: string
  username: string
  password: string
  usertype: string
  phone: string
  gender: string
  birthday: Date | null
  avatar: string
}

export interface UserDelType {
  userid: string
}

export interface UserListRequestType {
  username: string
  pageNo: number
  pageSize: number
}
