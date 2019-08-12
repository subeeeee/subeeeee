import { getAjax, getAjaxAll } from '@/api/util'
import axios from 'axios'

export default {
	dictionary: {
		UserPersonnelUrl: 'report/CommonMethodAreaRest/getUserPersonnel', //权限接口
		CustomConfigurationUrl: 'report/customConfigurationRest/getCustomConfiguration', //获取模板信息
		TaxRateUrl: 'report/CommonMethodAreaRest/getTaxRate', //税价分离
		PayClassUrl: 'report/CommonMethodAreaRest/getPaymentDetailsOrderByClass', //获取付款方式明细
		CustomPermissionsUrl: 'report/CommonMethodAreaRest/getCustomPermissions', //用户模板
		inquiry_mode: 1,//查询方式
		TaxRate: false, //是否开启税价分离[false:没有开启(隐藏)，true:开启(显示)]
		TaxRateData: ['服务费', '营业应收', '营业实收(付款合计)'], //税价分离数据
		report_num: '',
		PaymentType:false,
		PaymentZero:false,//是否开启付款0值屏蔽列
		PaymentData:[],//付款方式明细集合
		TreeNode: [], //字段模板集合
		TreeNodeObj: {}, //分组之后的集合
		frpt_id: -1, //需要查询的模板编号
		frpt_ids:-1,//标识模板名称
		is_default: 0, //是否查询默认模板
		TzxUser: sessionStorage.getItem('employeeName') || '',
		TzxtId: sessionStorage.getItem('tenentid') || '',
		Count: 0, //重复请求次数
	},
	PaymentUrl:{
		'SAAS_BI_2016_01':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总统计
		'SAAS_BI_2016_27':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总周期
		'SAAS_BI_2016_28':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总同比环比
		'SAAS_BI_2016_29':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总对比分析
		'SAAS_BI_2016_38':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总班次分析
		'SAAS_BI_2016_37':'/report/CommonMethodAreaRest/getPaymentDetailsOrderByClass',//营业汇总时段分析
		'SAAS_BI_2017_02':'/report/CommonMethodAreaRest/getPaymentDetailsStatus2',//收银员交班
	},
	result: {},
	getHeaderData(){
		return this.result['show_list'];
	},
	getCustomConfiguration(pps, fun) {
		let seft = this;
		seft.fun = fun;
		let dictionary = seft.dictionary;
		for(let item in pps) {
			if(item == 'frpt_id' && dictionary.frpt_ids != -1){
				dictionary[item] = pps[item];
			}else if(item != 'frpt_id'){
				dictionary[item] = pps[item];
			}
			
		}
		if(dictionary['TzxUser'] == ''){
			console.log('dictionary user is empty');
			if(sessionStorage.getItem('employeeName') != ''){
				console.log('but sessionStorage user is not empty');
				dictionary['TzxUser'] = sessionStorage.getItem('employeeName');
				console.log('set dictionary user is ' + dictionary['TzxUser']);
				if(sessionStorage.getItem('type') == 'debugger'){
					debugger;
				}
			}
		}else{
			console.log('dictionary user is not empty, is ' + dictionary['TzxUser']);
		}
		
		if(dictionary['TzxtId'] == ''){
			console.log('dictionary TzxtId is empty');
			if(sessionStorage.getItem('tenentid') != ''){
				console.log('but sessionStorage TzxtId is not empty');
				dictionary['TzxtId'] = sessionStorage.getItem('tenentid');
				console.log('set dictionary TzxtId is ' + dictionary['TzxtId']);
			}
		}else{
			console.log('dictionary TzxtId is not empty, is ' + dictionary['TzxtId']);
		}

		//获取税价分离数据
		this.getTaxRate();
		//获取付款方式明细
		this.GetPaymentDetailsOrderByClass();
		let CustomPermissions_p = {
			'report_num': "'" + dictionary.report_num + "'",
			'inquiry_mode': "'" + dictionary.inquiry_mode + "'",
			'user_name': "'" + dictionary.TzxUser + "'"
		};
		//判断是否需要税价分离
		if(dictionary.TaxRate) {
			//需要
		}
		//判断是否需要付款方式明细
		let AjaxList = [
			getAjax(dictionary.CustomPermissionsUrl, CustomPermissions_p), //用户模板
			getAjax(dictionary.UserPersonnelUrl) //权限接口
		];
		getAjaxAll(AjaxList, function(result) {
			if((result[0]['success'] == false || result[1]['success'] == false) && dictionary.Count < 5) {

				console.log('第' + (dictionary.Count + 1) + '次请求错误,继续下一次重新请求');
				dictionary.Count += 1;
				seft.getCustomConfiguration(pps, fun);
				return false;
			} else if(dictionary.Count >= 5) {
				//请求错误
				console.log('请求【用户模板接口】【用户权限接口接口】错误');
				return false;
			}

			//定义查询模板的参数
			let params = {
				'report_num': "'" + dictionary.report_num + "'",
				'inquiry_mode': "'" + dictionary.inquiry_mode + "'",
				'user_name': "'" + dictionary.TzxUser + "'"
			};
			seft.result['UserTemplateList'] = result[0]; ////用户模板
			seft.result['UserPersonneList'] = result[1]; ////权限接口
			//判断是查询默认模板还是自定义模板
			if(dictionary.frpt_id == -1 && seft.result['UserTemplateList'].length > 1){
				seft.result['UserTemplateList'].forEach((itemA, indexA) => {
					if(itemA['id'] != 0){
						dictionary.frpt_id = itemA['id'];
					}
				});
			}
			if(dictionary.frpt_id == -1 && seft.result['UserTemplateList'].length == 1){
				dictionary.frpt_id = 0;
			}
			dictionary.frpt_ids = dictionary.frpt_id;
			//判断当前模板
			seft.result['UserTemplateList'].forEach((item, index) => {
				if(item['id'] == dictionary.frpt_id) {
					//找打当前需要的模板
					params['frpt_id'] = "'" + item['id'] + "'",
					params['is_default'] = "'" + (item['is_default'] ? 1 : 0) + "'"
				}
			});
			//判断参数集中是否存在模板编号，如果不存在，就查询默认模板
			if(params['frpt_id'] == undefined) {
				params['frpt_id'] = "'0'",
					params['is_default'] = "'0'"
			}
			
			getAjax(dictionary.CustomConfigurationUrl, params).then(response => {
				if(response['success'] != false) {
					//数据集合转treenode
					dictionary.TreeNode = seft.GetToTreeNode(response.rows);
					//过滤税价分离
					dictionary.TreeNode = seft.GetFilterTaxRate(dictionary.TreeNode);
					//分组
					dictionary.TreeNodeObj = seft.GetGroupByField(dictionary.TreeNode);
					
					//排序
					dictionary.TreeNodeObj['show_list'] = seft.GetTreeNodeSort(dictionary.TreeNodeObj['show_list']);
					
					seft.result['hide_list'] = dictionary.TreeNodeObj['hide_list'];
					seft.result['show_list'] = dictionary.TreeNodeObj['show_list'];
					let ArrArray = seft.result['show_list'].concat(seft.result['hide_list']);
					ArrArray.forEach((item, index) => {
						if(item['defaul_name'] == '付款方式明细'){
							dictionary.PaymentType = true;
						}
						let arr = (item['show_list'] || []).concat(item['hide_list'] || []);
						if(arr.length == item['children']){							
							item['children'] = arr;
						}
					});
					seft.result['ArrArray'] = ArrArray;
					seft.result['frpt_id'] = dictionary.frpt_id;
					fun(seft.result);
				}
			});
		});
	},
	getCustomDate(){
		//获取是否开启了税价分离，是否选择了付款方式明细
		let dictionary = this.dictionary;
		return {
			TaxRate:dictionary['TaxRate'],
			PaymentType:dictionary['PaymentType'],
			PaymentZero:dictionary['PaymentZero']
		}
	},
	getTaxRate(type) {
		let dictionary = this.dictionary;
		getAjax(dictionary.TaxRateUrl, {
			tenentid: this.GetTzxtId(),
			data_type:1
		}).then(response => {
			if(response.success != false){				
				response.forEach((itemA, indexA) => {
					if(itemA['config_code'] == '10101') {
						//是否开启税价分离
						dictionary.TaxRate = parseInt(itemA['status']) == 0 ? false : true;
					}
					if(itemA['config_code'] == '10103'){
						//是否过滤付款方式明细0值数据
						dictionary.PaymentZero = parseInt(itemA['status']) == 0 ? false : true;
					}
				});
			}else if(type){
				//重复请求一次
			}else{
				this.getTaxRate(true);
			}
		});
	},
	GetPaymentData(ArrayA){
		//获取付款方式明细数据 
		let PaymentData = this.dictionary.PaymentData;
		ArrayA.forEach((itemB, indexB) => {
			if(itemB['label'] == '付款方式明细'){
				itemB['hide'] = true;
				PaymentData.forEach((itemA, indexA) => {
					ArrayA.push(itemA);
				});
			}
		});
		
		
		return ArrayA;
	},
	GetPaymentDetailsOrderByClass(){
		let seft = this;
		let dictionary = this.dictionary;
		dictionary.PaymentData = [];
		let url = this.PaymentUrl[dictionary.report_num]||dictionary.PayClassUrl;
		getAjax(url, {}).then(response => {
			if(!response.success){
				let a1 = [];
				response.forEach(function(item, index) {
					if(!a1[item['payment_class']]) {
						a1[item['payment_class']] = [];
					}
					a1[item['payment_class']].push({
						'prop': item.pname,
						'label': item.zname,
						'width': 160,
						'children':[],
						'align':'right',
						'is_sort':true,
						'data_type': 'float',
						'formatter': function(row, column, cellValue) {
							let itemprop = parseFloat(cellValue || 0).toFixed(2);
							let intnum=0;//整数部分数值初始化
							let floatnum="00";//小数部分数值初始化
							if(itemprop.indexOf(".")){//如果是小数
					           intnum = itemprop.split('.')[0];//取整数部分
					           floatnum = itemprop.split('.')[1];//取小数部分
							}
							intnum = seft.ThousandsNum(intnum);//整数部分加千位符
						   itemprop = "￥"+intnum+"."+floatnum;
						   return itemprop;
						}
					});
				});
				for(let item in a1){
					dictionary.PaymentData.push({
						'prop': '',
						'label': item,
						'width': 160,
						'pname':'fkfsmx',
						'is_sort':false,
						'data_type': 'float',
						'children':a1[item],
						'formatter': function(row, column, cellValue) {
							let itemprop = parseFloat(cellValue || 0).toFixed(2);
							let intnum=0;//整数部分数值初始化
							let floatnum="00";//小数部分数值初始化
							if(itemprop.indexOf(".")){//如果是小数
					           intnum = itemprop.split('.')[0];//取整数部分
					           floatnum = itemprop.split('.')[1];//取小数部分
							}
							intnum = seft.ThousandsNum(intnum);//整数部分加千位符
						   itemprop = "￥"+intnum+"."+floatnum;
						   return itemprop;
						}
					});
				}
			}
		});
	},
	ThousandsNum(num){
        var num = (num || 0).toString(),
        re = /\d{3}$/,
        result = '';
	    while (re.test(num)) {
	        result = RegExp.lastMatch + result;
	        if (num !== RegExp.lastMatch) {
	            result = ',' + result;
	            num = RegExp.leftContext;
	        } else {
	            num = '';
	            break;
	        }
	    }
	    if (num) { 
	    	result = num + result ;
	    }
	    return result;
	},
	GetToTreeNode(rows) {
		//数据转treenode
		let TreeNode = [];
		let GetNode = (item) => {
			rows.forEach((items, index) => {
				if(items['parentid'] == item['pid']) {
					item['children'].push(items);
				}
			});
		}
		rows.forEach((item, index) => {
			if(item['parentid'] == 0) {
				item['children'] = [];
				GetNode(item);
				TreeNode.push(item);
			}
		});
		return TreeNode;
	},
	GetGroupByField(rows) {
		//对数据进行分组
		let hide_list = [];
		let show_list = [];
		rows.forEach((item, index) => {
			if(item['field_type'] != 'edit') {
				show_list.push(item);
			}
			if(item['field_type'] == 'edit' || item['field_type'] == 'toway') {
				hide_list.push(item);
			}
		});
		hide_list.forEach((item, index) => {
			if(item['children']) {
				item['hide_list'] = [];
				item['children'].forEach((items, _) => {
					if(items['field_type'] == 'edit' && !items['hide']) {
						item['hide_list'].push(items);
					}
				});
			}
		});
		show_list.forEach((item, index) => {
			if(item['children']) {
				item['show_list'] = [];
				item['children'].forEach((items, _) => {
					if(items['field_type'] != 'edit' && !items['hide']) {
						item['show_list'].push(items);
					}
				});
			}
		});
		let obj = {};
		obj['hide_list'] = hide_list;
		obj['show_list'] = show_list;
		return obj;
	},
	GetTreeNodeSort(show_list) {
		//排序
		let obj = {};
		let show_array = [];
		show_list.forEach((item, index) => {
			if(item['show_list'] && item['show_list'].length > 0) {
				item['show_list'] = this.GetTreeNodeSort(item['show_list']);
			} else {
				item['show_list'] = [];
			}
			if(obj[item['place_sort']]) {
				obj[item['place_sort'] + 1] = item;
			} else {
				obj[item['place_sort']] = item;
			}

		});
		let index = 0;
		for(let item in obj) {
			index += 1;
			obj[item]['place_sort'] = index;
			show_array.push(obj[item]);
		}
		return show_array;
	},
	/*
	 * SortItem：需要换位排序的对象
	 * SortType：排序的类型[up/down]
	 * SortArray：需要排序的集合
	 */
	GetTranspositionSort(SortItem, SortType, SortArray) {
		//换位排序
		let index = SortItem['place_sort'];
		//分组
		let obj = this.GetGroupByField(SortArray);
		//排序
		obj['show_list'] = this.GetTreeNodeSort(obj['show_list']);
		let show_list = obj['show_list'];
		if(SortItem['parentid'] == 0) {
			//一层
			if(SortType == 'up') {
				if(show_list[index - 2] && show_list[index - 2]['forbid_sort']) {
					let _index = show_list[index - 2]['place_sort'];
					SortItem['place_sort'] = _index;
					show_list[index - 2]['place_sort'] = index;
				}
			} else {
				if(show_list[index] && show_list[index]['forbid_sort']) {
					let _index = show_list[index]['place_sort'];
					SortItem['place_sort'] = _index;
					show_list[index]['place_sort'] = index;
				}
			}
		} else {
			//二层
			show_list.forEach((item, idx) => {
				if(item['pid'] == SortItem['parentid']) {
					if(SortType == 'up' && index > 1) {
						let _index = item['show_list'][index - 2]['place_sort'];
						SortItem['place_sort'] = _index;
						item['show_list'][index - 2]['place_sort'] = index;
					} else if(SortType == 'down' && index < item['children'].length) {
						let _index = item['show_list'][index]['place_sort'];
						SortItem['place_sort'] = _index;
						item['show_list'][index]['place_sort'] = index;
					}
					item['children'] = (item['show_list'] || []).concat(item['hide_list'] || []);
				}
			});
		}
		//再次排序
		obj['show_list'] = this.GetTreeNodeSort(show_list);
		return obj;
	},
	SetAllFieldState(State, StateArray) {
		//设置所有字段为统一状态
		StateArray.forEach((item, index) => {
			if(item['field_type'] != 'read') {
				item['field_type'] = State;
				if(item['show_list']) {
					item['show_list'].forEach((a, v) => {
						a['field_type'] = State;
					});
				}
			}
		});
		//重新分组 {'hide_list':hide_list,'show_list':show_list};
		let obj = this.GetGroupByField(StateArray);
		return obj;
	},
	SetFieldState(FieldItem, State, StateArray) {
		//设置字段的状态
		if(FieldItem['field_type'] != 'read') {
			FieldItem['field_type'] = State;
			if(FieldItem['parentid'] != 0) {
				//设置的是子集
				StateArray.forEach((item, index) => {
					if(item['pid'] == FieldItem['parentid']) {
						let count = 0;
						item['children'].forEach((a, b) => {
							if(a['field_type'] == State) {
								count += 1;
							}
						});
						if(count == item['children'].length) {
							item['field_type'] = State;
						} else {
							item['field_type'] = 'toway';
						}
					}
				});
			} else if(FieldItem['children'] && FieldItem['children'].length > 0) {
				StateArray.forEach((item, index) => {
					if(item['pid'] == FieldItem['pid']) {
						item['children'].forEach((items, index) => {
							items['field_type'] = State;
						});
					}
				});

			}
		}
		//重新分组
		let obj = this.GetGroupByField(StateArray);

		//重新排序
		obj['show_list'] = this.GetTreeNodeSort(obj['show_list']);
		return obj;
	},
	GetFilterTaxRate(arrayNode){
		//过滤税价分离
		let dictionary = this.dictionary;
		if(dictionary.TaxRate == false){
			//没有开启//需要隐藏
			arrayNode.forEach((itemA, indexA) => {
				if(dictionary.TaxRateData.indexOf(itemA.defaul_name) > -1){
					itemA['children'] && itemA['children'].forEach((itemB, indexB) => {
						itemB['hide'] = true;
					});
				}
			});
		}
		return arrayNode;
	},
	GetTzxUser() {
		let user = {};
		let UserPersonneList = this.result['UserPersonneList'];
		UserPersonneList.forEach((item, index) => {
			if(item['text'] == this.dictionary['TzxUser'] && this.dictionary['TzxUser'] != '') {
				user['Id'] = item['id'];
				user['UserName'] = item['text'];
			}
		});
		if(user['UserName'] == ''){
			sessionStorage.setItem('UserList',JSON.stringify(UserPersonneList));
			debugger;
		}
		console.log('获取自定义用户信息,',user);
		console.log('自定义用户名称,',this.dictionary['TzxUser']);
		return user;
	},
	GetTime(dt = new Date()) {
		let time = '';
		let _dt = new Date(dt);
		let y = _dt.getFullYear();
		let m = _dt.getMonth() + 1;
		let d = _dt.getDate();
		m = m < 10 ? '0' + m : m;
		d = d < 10 ? '0' + d : d;
		time = y + '-' + m + '-' + d;
		return time;
	},
	GetTableHeaderFormatter(HeaderArray){
		let seft = this;
		HeaderArray.forEach((itemA, indexA) =>{
			itemA['formatter'] = function(row, column, cellValue){
				if(itemA.data_type == 'float') {
					let itemprop = parseFloat(cellValue || 0).toFixed(2);
					let intnum=0;//整数部分数值初始化
					let floatnum="00";//小数部分数值初始化
					if(itemprop.indexOf(".")){//如果是小数
			           intnum = itemprop.split('.')[0];//取整数部分
			           floatnum = itemprop.split('.')[1];//取小数部分
					}
					intnum = seft.ThousandsNum(intnum);//整数部分加千位符
				    itemprop = "￥"+intnum+"."+floatnum;
			        return itemprop;
				} else if(itemA.data_type == 'integer') {
					return parseFloat(cellValue || 0);
				} else if(itemA.data_type == 'percentage') {
					return(parseFloat(cellValue || 0) * 100).toFixed(2) + '%';
				} else {
					return(cellValue || '');
				}
			}
			if(itemA['children']){
				itemA['children'] = this.GetTableHeaderFormatter(itemA['children']);
			}
		});
		return HeaderArray;
	},
	GetPaymentType(arrayHeader = []){
		let dictionary = this.dictionary;
		dictionary.PaymentType = false;
		//判断是否存在付款方式明细
		arrayHeader.forEach((itemA, indexA) => {
			if(itemA['defaul_name'] == '付款方式明细'){
				dictionary.PaymentType = true;
			}
		});
	},
	GetTableHeader(HeaderArray = [], IsBool){
		if(!IsBool){			
			this.GetPaymentType(HeaderArray);
		}
		let seft = this;
		let ArrayA = [];
		HeaderArray.forEach((itemA, indexA) => {
			let objA = {
				prop:itemA['field_name'],
				label:itemA['modify_name'],
				width:itemA['cell_width'],
				fixed:itemA['fixed']?true:false,
				align:itemA['alignment'],
				data_type:itemA['data_type'],
				is_sort:itemA['is_sort'] == 1? true:false,
				type:'',
				hide:false,
				children:[],
				'header-align':itemA['alignment'],
				formatter:function(row, column, cellValue){
					if(itemA.data_type == 'float') {
						let itemprop = parseFloat(cellValue || 0).toFixed(2);
						let intnum=0;//整数部分数值初始化
						let floatnum="00";//小数部分数值初始化
						if(itemprop.indexOf(".")){//如果是小数
				           intnum = itemprop.split('.')[0];//取整数部分
				           floatnum = itemprop.split('.')[1];//取小数部分
						}
						intnum = seft.ThousandsNum(intnum);//整数部分加千位符
					    itemprop = "￥"+intnum+"."+floatnum;
				        return itemprop;
					} else if(itemA.data_type == 'integer') {
						return parseFloat(cellValue || 0);
					} else if(itemA.data_type == 'percentage') {
						return(parseFloat(cellValue || 0) * 100).toFixed(2) + '%';
					} else {
						return(cellValue || '');
					}
				},
			};
			if(itemA['show_list'] && itemA['show_list'].length > 0){
				objA['children'] = this.GetTableHeader(itemA['show_list'], true);
			}
			ArrayA.push(objA);
		});
		return ArrayA;
	},
	getPaymentZeroData(RowsItem, HeaderArray){
		//过滤付款方式0值数据
		let dictionary = this.dictionary;
		if(dictionary.PaymentZero){
			let PaymentData = dictionary.PaymentData;
			let ObjItem = {};
			PaymentData.forEach((itemA, indexA) => {
				itemA['children'].length > 0 && itemA['children'].forEach((itemB, indexB) => {
					ObjItem[itemB['prop']] = 0;
				});
				if(itemA['children'].length == 0){
					ObjItem[itemA['prop']] = 0;
				}
			});
			for(let itemA in ObjItem){				
				RowsItem.forEach((itemB, indexB) => {
					if(itemB[itemA] == 0 || itemB[itemA] == undefined){
						ObjItem[itemA] += 1;
					}
				});
			}
			HeaderArray.forEach((itemA, indexA) => {
				if(itemA['pname'] == 'fkfsmx' && itemA['children']){
					let count = 0;
					itemA['children'].forEach((itemB, indexB) => {
						if(ObjItem[itemB['prop']] == RowsItem.length){
							count += 1;
							itemB['hide'] = true;
						}else{
							itemB['hide'] = false;
						}
					});
					if(count == itemA['children'].length){
						//说明当前节点的所有子节点都被隐藏了，那么当前节点也要被隐藏
						itemA['hide'] = true;
					}else{
						itemA['hide'] = false;
					}
				}
			});
		}
		return HeaderArray;
	},
	GetAction(server, par, fun1, fun2) {
		$.ajax({
			url: axios.defaults.baseURL + server + '?_s=' + axios.defaults.token,
			data: par,
			type: 'post',
			dataType: 'json',
			contentType: 'application/json;charset=utf-8',
			success: function(data) {
				if(fun1) {
					fun1(data);
				}
			},
			error: function(a, b, c) {
				if(fun2) {
					fun2(a);
				}
			}
		});
	},
	GetTzxtId() {
		return this.dictionary['TzxtId'];
	},
	/*
	 * AllArr 集合
	 * HideArr 隐藏的字段集合
	 * hidetype 隐藏的类型 取值：list/indexof(list:集合中的均需要隐藏；indexof:只要包含集合中的任意一个就需要隐藏)
	 * field 取值字段
	 */
	GetHideField(AllArr = [], HideArr = [], hidetype = 'list', field = 'prop'){
		//字段中可能需要隐藏某些列，
		//而这些列是在查询条件中又人为选择的
		//不是在自定义字段中操作的
		AllArr.forEach((item ,index) => {
			if(hidetype == 'list'){				
				if(item[field] != '' && HideArr.indexOf(item[field]) > -1){
					item['hide'] = true;
				}else{
					item['hide'] = false;
				}
			}else if(hidetype == 'indexof'){
				for (let i = 0; i< HideArr.length; i++) {
					if(item[field].indexOf(HideArr[i]) > -1){
						item['hide'] = true;
						break;
					}else{
						item['hide'] = false;
					}
				}
			}
			item['children'] && (this.GetHideField(item['children'],HideArr, hidetype, field));
			let hideCount = 0;
			item['children'] && item['children'].forEach((v, k) => {
				if(v['hide']){
					hideCount += 1;
				}
			});
			if(item['children'].length > 0 && hideCount == item['children'].length){
				item['hide'] = true;
			}
		});
	},
	//处理到处表头信息数据
	GetexportHeader(arr) {
		//默认级别为一级
		let lv = 1;
		let result = [];
		let result_k = [];
		//是否选择了 付款方式明细
		let istrue = 0;
		
		//循环表头数据,记录表头级别
		arr.forEach(function(item, index) {
			if(item['label'] == '付款方式明细') {
				istrue = 1;
			}
			
			if(item['children'] && item['children'].length > 0){
				if(lv <2 ) lv = 2;
				item['children'].forEach((v, k) => {
					if(v['children'] && v['children'].length > 0){
						if(lv <3 ) lv = 3;
					}
				});
			}
		});
		//根据级别定位数组维度
		for(let i = 0; i < lv; i++) {
			result.push([]);
		}
		arr.forEach((item, index) => {
			if(!item['hide']){
				if(item['children'] && item['children'].length > 0){
					//循环二级表表头
					item['children'].forEach((v, k) => {
						result[0].push(' '+item['label']+' ');
						result[1].push(v['label']);
						result_k.push({
							'title': v['label'],
							'field': v['prop']
						});
					});
				}else{
					result_k.push({
						'title': item['label'],
						'field': item['prop']
					});
					for(let i = 1; i<= lv; i++){
						result[i - 1].push(item['label']);
					}
				}
				
			}
			
		})
		
		return {
			'val': result,
			'key': result_k,
			'customtype': istrue
		};
	},
}