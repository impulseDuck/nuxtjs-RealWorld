// 个人中心
import {request} from '@/plugins/request'

// 获取个人信息
export const getInfo = () => {
  return request({
    method: 'GET',
    url: `/api/user`
  })
}

// 更新个人信息
export const updateInfo = data => {
  return request({
    method: 'PUT',
    url: `/api/user`,
    data
  })
}