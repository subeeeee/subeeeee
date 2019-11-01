import { BaseRequest } from  './../utils/request'
class RequestMock extends BaseRequest {
  getdata(page = 0) {
    return this.request.get('/data')
  };
  getName(page = 0) {
    return this.request.get('/name')
  }
}

export default new RequestMock()
