import { Message ,MessageBox,Loading } from 'element-ui'
import path from './path'

function _req (res) {
  let code = res.resultCode || res.code;
  switch (code) {
    case '401':
      MessageBox.alert('您已掉线，请重新登录。掉线的原因可能为以下两种： 1.您已经超过半个小时没有操作系统； 2.有其他人登录您的账户。', '提示信息', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.href = res.data.sso_login_url
        }
      });

      break;
    default:
      let msg = res.resultMsg || res.message;
      Message.error(msg);
      break
  }
}
function request(obj) {
  obj.type = obj.type && obj.type.toLocaleLowerCase() === 'get'?'get':'post';
  obj.data = obj.data?obj.data:{};
  obj.loading = obj.loading?obj.loading:false;
  if(!obj.url) throw new Error('请输入请求url');
  let loading = null;
  if(obj.loading){
    loading = Loading.service({
      lock: true,
      text: "正在加载...",
      spinner: "el-icon-loading",
      background: "rgba(255, 255, 255, 0.5)"
    });
  }
  $[obj.type](path._path+ obj.url,obj.data,res=>{
    if(obj.loading) loading.close();
    switch (res.resultCode){
      case '0000':
        obj.callback(res);
        break;
      case '9999':
        obj.callback9999(res);
        break;
      case '1234':
        obj.callback1234(res);
        break;
      default:
        _req (res)
    }
  })

}
function image(data,callback) {
  request({
    type:'get',
    url:'/businessImage/validateRequiredImage',
    data,
    callback:res=>{
      callback(res)
    }
  })
}


export default {_req,request,image}
