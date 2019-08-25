import { User, auth, dict } from '@/api/index.build'

import request from '@/utils/request.build'

// 登录 加入标识 1：粮食局
// export function userLogin(obj) {
//   return request({
//     url: `${auth}/login/userLogin`,
//     method: 'post',
//     data: obj
//   })
// }

export function userLogin() {
  return request({
    url: `${auth}/auth/login/1/${username}/${password}`,
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

/* --------------根据菜单和用户id获取左侧导航栏和平台列表----------------*/
// export function getInfo() {
//   return request({
//     url: `${User}/guide/findByUserId/100001`,
//     method: 'get'
//   })
// }

// 获取综合业务菜单林艳飞
export function getAllmenus(codes) {
  return request({
    url: `${User}/roleResources/findRoleResourcesTree?resourcesCode=RM1001003&roleCode=${codes}`,
    // url: `${User}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
    method: 'post'
  })
}


/*// 获取综合业务菜单林艳飞
export function getAllmenus(codes) {
  return request({
    url: `http://192.168.123.15:11020/myuser/roleResources/findRoleResourcesTree?resourcesCode=RM1001003&roleCode=${codes}`,
    // url: `${User}/roleResources/findRoleResourcesTree?roleCode=${codes}`,
    method: 'post'
  })
}*/

//导航菜单
export function getInfo() {
  return request({
    url: `${User}/user/getCurrUserinfo`,
    method: 'get'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/api/admin/user/front/info',
//     method: 'get',
//     params: { token }
//   });
// }

// 编辑==通过id查询信息，返回信息到弹框form表单里面
export function getById(userId) {
  return request({
    url: `${User}/user/findById/${userId}`,
    method: 'get'
  })
}

// 更新用户信息
export function putObj(userObj) {
  return request({
    url: `${User}/user/update`,
    method: 'post',
    data: JSON.stringify(userObj)
  })
}

/* -----------------修改密码-----------------------*/
export function updataPassword(data) {
  return request({
    url: `${User}/user/updatePassword`,
    method: 'post',
    data: data
  })
}

// 获取省份信息
export function provinceInfo() {
  return request({
    url: `${User}/menu/getProvince`,
    method: 'get'
  })
}

/* 侧导航栏----------------*/
// export function getSiderBarInfo(userId, menuid) {
//   return request({
//     url: `${User}/guide/findByUserId/${menuid}/${userId}`,
//     // /menu/getBasePlatform/{id}
//     // url: `${User}/guide/findByUserId/${userId}/${menuid}`,
//     method: 'get'
//   })
// }
// 根据用户id拿到侧边栏数据
export function findSiderMenuById(userId) {
  return request({
    url: `${User}/guide/findByUserId?id=${userId}`,
    method: 'get'
  })
}

// export function getAllMenus() {
//   return request({
//     url: '/loginapi/admin/user/front/menu/all',
//     method: 'get'
//   });
// }

//字典表方法
export function dictionaryMethod(option) {
  return request({
    url: `${dict}/dataDictionary/getDataTree/${option}`,
    method: 'get'
  })
}
