import {businessApi} from '@/api/index.build'
import request from '@/utils/request.build'

export function getEnterpriseInformationList(params) {
  return request({
    url: `${businessApi}/tzSlqy/getTzSlqyPage/${params.pageIndex}/${params.pageSize}`,
    method: 'post',
    data: params
  })
}
