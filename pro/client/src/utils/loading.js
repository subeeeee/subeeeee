import { Loading } from 'element-ui';
// 记录loading的数量  防止多个loading闪屏
let loadingCount = 0;
// loading
let loading;
// 开始
const openLoading = (text) => {
  loading = Loading.service({
    lock: true,
    text: text || '正在加载……',
    background: 'rgba(0, 0, 100%, 0.9)'
  });
};
// 关闭
const closeLoading = () => {
  loading.close();
};
// 多个loading时只实例化一个对象
const open = (text) => {
  if (loadingCount === 0) {
    openLoading(text);
  }
  loadingCount += 1;
};
// 逐个关闭loading
const close = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    closeLoading();
  }
};
// 异常重置loading
const reset = () => {
  if(loadingCount !== 0){
    loadingCount = 0;
    closeLoading();
  }

};
openLoading()
export default {
  open,
  close,
  reset,
  loadingCount,
}
