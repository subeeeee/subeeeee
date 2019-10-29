import { BaseRequest } from  './../utils/request'
class RequestMock extends BaseRequest {
  getdata(page = 0) {
    return this.request.get({
      url: '/data',
      a: page
    })
  }
}

export default new RequestMock()
