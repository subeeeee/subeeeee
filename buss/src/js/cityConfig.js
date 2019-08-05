function cityCongif(_this,requestUrl,cityCode,fn) {
  $.post(_this._path + requestUrl,{cityCode:cityCode},(res)=>{
    if(res.resultCode == '0000'){
      fn(res)
    }else{
      this.requestError(res,this)
    }
  })
}
export default {cityCongif}
