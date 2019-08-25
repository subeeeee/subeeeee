import request from '@/utils/request.build'

import { User,loginUrl } from '@/api/index.build'




/* 用户信息*/
export function userInfo() {
  return request({
    url: `${loginUrl}/login/userinfo`,
    method: 'post',
    data: ''
  })
}
// 登出
export function logout(token) {
  return request({
    url: `${User}/user/logout`,
    method: 'post',
    params: { token }
  })
}

// 获取综合业务菜单林艳飞
export function getAllmenus(codes) {
  return request({
    url: `${loginUrl}/roleResources/findRoleResourcesTree?resourcesCode=RM1001007&roleCode=${codes}`,
    // url: `${User}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
    method: 'post'
  })
}



//导航菜单
export function getInfo() {
  return request({
    url: `${User}/user/getCurrUserinfo`,
    method: 'get'
  })
}

