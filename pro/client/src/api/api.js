import { BaseRequest } from  './../utils/request'
class RequestMock extends BaseRequest {
  getdata(page = 0) {
    let data = {
      page,
      name:1
    }
    return this.request.get({
      url:"/data",
      params:{
        sd:12
      }
    })
  };
  getName(page = 0) {
    return this.request.get('/name')
  }
}

export default new RequestMock()
