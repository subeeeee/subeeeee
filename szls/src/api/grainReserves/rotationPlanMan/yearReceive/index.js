import {main} from '@/api'
import request from '@/utils/request.build'

//列表页
export function selectList(data) {
    return request({
      url: `${main}/annualrotation/selectList`,
      method: 'post',
      data: data
    })
}

//详情页
export function selectDetail(id) {
    return request({
      url: `${main}/annualrotation/selectDetail?jhbm=${id}`,
      method: 'post',
    })
}
