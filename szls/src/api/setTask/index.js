import {businessApi} from '@/api/index.build'
import request from '@/utils/request.build'


/**
 * 字典查询
 */
export function getDictionaryList(params) {
    return request({
      url: `${businessApi}/dataDictionary/findByGroupId/${params.rybh}`,
      method: 'post',
      data: params
    })
  }

  /**
 * 制定任务列表
 */
export function getSetTask(params) {
  return request({
    url: `${businessApi}/dataDictionary/findByGroupId/${params.rybh}`,
    method: 'post',
    data: params
  })
}
