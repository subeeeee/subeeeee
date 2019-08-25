import {get, post, put, del} from './util'
import  config from '../utils/config'

/***
 * 调用后台处理数据的基类，普通的模块基本都包含了，
 * 如果有新的页面需要特殊的方法，可以继承本类
 */
export default class  commonApi {
    //设置模块名称，根据模块名称获取到后台查询数据的URL地址
    constructor(moduleName){
        this.name=moduleName;
    }
     /***
     * 按鈕权限方法
     * @param options
     * @returns {*}
     */
    GetshowBtn(options) {
        return post(config['showBtnUrl'], options)
    }
    /***
     * 查询一级表格数据
     * @param options
     * @returns {*}
     */
    GetDataListOne(options) {
        return post(config[this.name]['UrlOne'], options)
    }
    /***
     * 查询二级表格数据
     * @param options
     * @returns {*}
     */
    GetDataListTwo(options) {
        return post(config[this.name]['UrlTwo'], options)
    }
    /***
     * 查询三级表格数据
     * @param options
     * @returns {*}
     */
    GetDataListThree(options) {
        return post(config[this.name]['UrlThree'], options)
    }
   
    post(type,options){
        return post(config[ this.name][type], options)
    }
}

