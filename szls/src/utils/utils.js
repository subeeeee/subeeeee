// import XLSX from "xlsx";

/* eslint-disable */
/*
export default{
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }
}
/!**
 *  excel文件导出
 * 参数： dateList (json数据 数组对象) 所有数据 不只是当前分页查询数据
 *        filename (导出excel文件名字符串类型)
 *        keyList (对应表头数据列表) 例：[{en:"companyName",cn:"单位姓名"}]  en 为获取json数据的key,cn为页面表格中表头对应的名称
 *        keyList的key必须按照例子定义 en  和cn
 *!/
export function exportExcel(dateList,filename,keyList) {
  let keyListVal=keyList
  let ws = XLSX.utils.json_to_sheet(dateList);
  console.log(ws)
  for (const i in ws) {
    for (const k in keyList) {
      if (ws[i].v == keyListVal[k].headKey) {
        ws[i].v=keyList[k].lspzmc
      }
    }
  }
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  /!* 生成xlsx文件 *!/
  XLSX.writeFile(wb, `${filename}.xlsx`);
}
*/
