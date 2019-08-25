import { aptitude } from '@/api/index.build'
import request from '@/utils/request.build'

//分页获取执法人员证书管理列表
export function getManagement(params) {
  return request({
    url: `${aptitude}/zfryzsgl/getZfryzsglByQuery/${params.pageIndex}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}

//根据条件导出执法人员证书管理信息
export function exportMessage(params) {
  return request({
    url: `${aptitude}/zfryzsgl/exportByQuery?rybhs=${params.rybhs}`,
    method: 'post',
    data:params
  })
}

//分页获取执法人员证书审核列表
export function getCertificateAudit(params) {
  return request({
    url: `${aptitude}/zfzzrySh/getDzfzzryShPage/${params.pageIndex}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}