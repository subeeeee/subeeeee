import { BaseRequest } from  './../utils/request'
class RequestMock extends BaseRequest {
  getdata(page = 0) {
    return this.request({
      method:'get',
      url:"/data",
      data:{
        sd:12
      }
    })
  };
  getName(data={}) {
    data = {
      a:1,
      b:2
    }
    return this.request({
      method:'post',
      data
    })

  }
}

export default new RequestMock()
