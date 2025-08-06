import instance from './http'

export function get<T>(url: string, params?: any): Promise<T> {
  return instance
    .get<T>(url, { ...params })
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function post<T>(url: string, data?: any): Promise<T> {
  return instance
    .post<T>(url, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}

export function del<T>(url: string, userid: any): Promise<T> {
  return instance
    .post<T>(url, userid)
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })
}
