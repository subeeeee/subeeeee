let mounth = function (min,max,gap){
    let mounthArr = [];
    for(let i = min * 1,j = max * 1 + 1;i < j; i += gap * 1){
        mounthArr.push('' + i)
    }
    return mounthArr
};
function getTerms (min,max,step) {
  let arr = [];
  step = step * 1;
  min = min * 1;
  max = max * 1
  for(let i = min* 1; i < max * 1 + 1; i+=step){
    arr.push(''+ min)
    min += step
  }
  return arr
}
//2月2日 星期五 09:00  时间转换时间戳
function dataSwitch(time) {
  let year  = new Date().getFullYear()
  time = time.replace('月','/')
  time = time.replace(/[日|周|六|一|二|三|四|五|星|期]/g,'')
  time = year+'/' + time
  let a =  new Date(time)
  time =  a.getTime()
  return time
}
function setLocalStorage(pageName,params) {
  let localObj = {};
window.localStorage.setItem('queryCondition',)
}
function getLocalStorage() {

}
function downloadPackage(url,args) {
  var body = $(document.body);
  var form = $("<form method='post' target='_blank'></form>");
  var input;
  form.attr({
    action: url
  });
  if (args) {
    $.each(args, function (key, value) {
      input = $("<input type='hidden'>");
      input.attr({
        name: key
      });
      input.val(value);
      form.append(input);
    });
  }
  form.appendTo(body);
  form.submit();
}
export default {mounth,getTerms,dataSwitch,setLocalStorage,getLocalStorage,downloadPackage}
