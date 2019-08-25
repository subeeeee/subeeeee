import {aptitude} from '@/api/index.build'
import request from '@/utils/request.build'

// export const fileApiUploadUrl=FileApi + `/file/upload`;

//分页获取执法资质人员申请信息列表
export function getApplyList(params) {
  return request({
    url: `${aptitude}/pxqd/getDZfryzzsqByQuery/${params.pageIndex}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}

//新增执法资质人员信息
export function addApplyInfo(params) {
  return request({
    url: `${aptitude}/zfzzry/insert/${params.status}`,
    method: 'post',
    data: params
  })
}

//修改执法资质人员信息
export function updateApplyInfo(params) {
  return request({
    url: `${aptitude}/zfzzry/update`,
    method: 'post',
    data: params
  })
}


export function getApplyInfo(id) {
  return request({
    url: `${aptitude}/zfzzry/getDZfryzzsqInfoByZzsqbh/${id}`,
    method: 'get'
  })
}

//执法申请批量审批
//params data
//{
// lcids  array
// message string
// status number 0、驳回 1、审批
//}
export function batchReview(data) {
  return request({
    url: `${aptitude}/zfzzry/complete/${data.message}/${data.status}`,
    method: 'get',
    data
  })
}

/*  执法人员资质培训  开始*/

//首页根据分页 获取数据
export function getTopicByNum(pageNum, pageSize, data) {
  return request({
    url: `${aptitude}/pxqd/getDZfryzzsqByQuery/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })
}

//新增按钮 新增培训主题
export function addTrainTopic(data) {
  return request({
    url: `${aptitude}/pxztgl/insert`,
    method: "post",
    data
  })
}


//获取最大期数（新增弹框中的）
export function getMaxQS(data){
  return request({
    url:`${aptitude}/pxqd/getMaxQS`,
    method:'post',
    data
  })
}


//获取人员信息列表( 签到 和 查看弹框的 )
export function getSignInList(data) {
  return request({
    url: `${aptitude}/pxqd/getDPxqdryByQuery`,
    method: "post",
    data
  })
}

 
//培训签到更新 （ 签到弹框中的保存  ）
export function modifySignStatus(pxztbh ,data) {
  return request({
    url: `${aptitude}/pxqd/updateDPxqdryByQuery?pxztbh=${pxztbh}`,
    method: 'post',
    data
  })
}

//培训签到中的 提交/首页中的提交
export function submit(data){
  return request({
    url:`${aptitude}/pxqd/submitDPxqdryByQuery`,
    method:'post',
    data
  })
}

/*  执法人员资质培训 结束 */



/*   执法 考核信息  开始  */

//根据 信息/分页 查询数据列表
export function getList(pageNum, pageSize, data) {
  return request({
    url: `${aptitude}/zfryzzkh/getDZfryzzkhPageByQuery/${pageNum}/${pageSize}`,
    method: 'post',
    data
  })
}


//新增按钮
export function addAssessmentInfo(data) {
  return request({
    url: `${aptitude}/zfryzzkh/insert`,
    method: 'post',
    data
  })
}


//获得考核的结果
export function getAssessmentResult(data) {
  return request({
    url: `${aptitude}/zfryzzkh/getkhjg`,
    method: 'post',
    data
  })
}

//保存考核结果 
export function updateAssessmentResult(data) {
  return request({
    url: `${aptitude}/zfryzzkh/updatekhjg`,
    method: 'post',
    data
  })
}

//提交
export function getSubmit(khstatus,data){
  return request({
    url:`${aptitude}/zfryzzkh/updateKhjgByQuery?khstatus=${khstatus}`,
    method:'post',
    data
  })
}

//获取考核期( 查看 和 考核结果弹框 )
export function getAssessmentStageAndCompany(data) {
  return request({
    url:`${aptitude}/zfryzzkh/getKhqsAndKhdw`,
    method:'post',
    data
  })
}

//获取考核首页的期数列表
export function getAssessmentList(){
  return request({
    url:`${aptitude}/zfryzzkh/getKhqs`,
    method:'POST'
  })
}

/*  执法 考核信息 结束  */


//获取证书发放列表
export function getCertificateList(data) {
  return request({
    url: `${aptitude}/zfryzs/getDZfryzsPageByQuery/${data.pageIndex}/${data.pageSize} `,
    method: 'post',
    data
  })
}

//证书发放
export function updateCertificate(data) {
  return request({
    url: `${aptitude}/zfryzs/updateZfryzs`,
    method: 'post',
    data
  })
}

//获取地区
export function getAreaList() {
  return request({
    url: `${aptitude}/zfryzs/getDQ`,
    method: 'post'
  })
}

//获取证书详情
//params  data
// {
//  "rybh":"String" //人员编号
// }
export function getCertificateDetail(data) {
  return request({
    url: `${aptitude}/zfryzsgl/getDetailByRybh?rybh=${data.rybh}`,
    method: 'post',
    data
  })
}
//获取人员列表
export function getUserList() {
  return request({
    url: `${aptitude}/zfzzry/getUserInfor`,
    method: 'post'
  })
}





