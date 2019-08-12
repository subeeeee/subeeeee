import { getAjax,getAjaxAll } from '@/api/util'
import axios from 'axios'
export default {
	getStoreTree(fun){
		//门店url
		let _url ='framework/organContraller/getOrgansTreeByConditions';
		getAjax(_url).then(response => {
			GetNodeTree(response)
	        fun(response);
	        function GetNodeTree(nodes){
	        	$(nodes).each(function(k,v){
	        		v['label'] = v['text'];
	        		if(v['children'].length > 0){
	        			GetNodeTree(v['children']);
	        		};
	        	});
	        }
	    });
	},
	getExplain(report_num,fun){
		let _url = 'report/CommonMethodAreaRest/getExplain';
		let params = {
			'report_num':report_num
		};
		getAjax(_url,params).then(response => {
			fun(response);
	    });
	},
	//
	getTaxRate(fun){
		//获取价税分离
		let tid = localStorage.getItem('tzxtid')||'rlyhbi';
		let TaxRateUrl = 'report/CommonMethodAreaRest/getTaxRate';
		getAjax(TaxRateUrl, {tenentid: tid,data_type:1}).then(response => {
			fun(response);
	    });
	},
	getResult(_url,params,fun){
		getAjax(_url,params).then(response => {
			fun(response);
	    });
	},
	getTime(time){
		let timer = new Date(time||new Date());
		let year = timer.getFullYear();
		let month = timer.getMonth() + 1;
		let day = timer.getDate();
		month = month < 10 ? '0' + month : month;
		day = day < 10 ? '0' + day : day;
		return year + '-' + month + '-' + day;
	},
	GetWeekList(begin_time,end_time){
		//根据开始结束时间获取区间内所有的周一~周日集合
		let time = {
			week1_dates:[],
			week2_dates:[],
			week3_dates:[],
			week4_dates:[],
			week5_dates:[],
			week6_dates:[],
			week7_dates:[]
		};
		if(begin_time && end_time){
			let day = 1 * 24 * 60 * 60 * 1000;
			let time1 = new Date(begin_time).getTime();
			let time2 = new Date(end_time).getTime();
			
			while(time1 <= time2){
				let td = new Date(time1);
				let wk = td.getDay();
				time[(wk==0?'week7_dates':'week'+wk+'_dates')].push(this.getTime(td));
				time1 += day;
			}
		}
		return time;
	},
	getexportFun(params,_this){
		//导出
		let fes = params.fes;//获取导出的数据
		if(!fes || fes.length == 0) {
			_this.$message({message: '请选择要导出的信息',type: 'warning'});
		} else {
			let RowColumns = params.result;//表头集合
			let exportUrl = axios.defaults.baseURL + params.exportUrl;//导出url
			exportUrl = exportUrl + "?_s=" + axios.defaults.token;
			let form = $("<form>");
			form.attr("style", "display:none");
			form.attr("method", "post");
			form.attr("action", exportUrl);
			let fes1 = [];
			for(let i = 0; i < fes.length; i++) {
				fes1.push(fes[i][params['key']]);
			}
			if(params['parametertype'] == 'String') {
				fes1 = "'" + fes1.join("','") + "'";
			} else {
				fes1 = fes1.join(',');
			}
			
			form.append(new CreateInput('exportdataexpr', fes1));
			form.append(new CreateInput('rowcolumns', JSON.stringify(RowColumns)));
			for(var i in params) {
				if(i == 'exporData') { 
					for(var j in params[i]) {
						if(j != 'hierarchytype' && j!= 'exportdataexpr'){
							form.append(new CreateInput(j, params[i][j]));
						}
					}
				} else if(i != 'fes'){
					form.append(new CreateInput(i, params[i]));
				}
			}
			form.append(new CreateInput("hierarchytype", "1"));
			function CreateInput(k,v){
				var d1 = $("<input>");
				d1.attr("name", k);
				d1.attr("value", v);
				d1.attr("type", "hidden");
				return d1;
			}
			
			$("body").append(form);
	
			form.submit();
			form.remove();
		}
	},
	GetHeaderData(HeaderData){
		let array1 = [];
		let seft = this;
		HeaderData.forEach((item, index) => {
			let obj = {
				'label':item['modify_name'],
				'prop':item['field_name'],
				'width':item['cell_width'],
				'align':item['alignment'],
				'data_type':item['data_type'],
				'header-align':item['_children1']&&item['_children1'].length > 0 ?'center':item['data_type'],
				'sortable':true,
				'hide':false,
				'children':[],
				'formatter':function(row, column, cellValue){
					if(item.data_type == 'float') {
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
					} else if(item.data_type == 'integer') {
						return parseFloat(cellValue || 0);
					} else if(item.data_type == 'percentage') {
						return(parseFloat(cellValue || 0) * 100).toFixed(2) + '%';
					} else {
						return(cellValue || '');
					}
				}
			};
			if(item['_children1'] && item['_children1'].length > 0){
				obj['children'] = this.GetHeaderData(item['_children1']);
			}else if(item['children'] && item['children'].length > 0){
				obj['children'] = this.GetHeaderData(item['children']);
			}
			array1.push(obj);
		});
		return array1;
	},
	/*
	 * AllArr 集合
	 * HideArr 隐藏的字段集合
	 * hidetype 隐藏的类型 取值：list/indexof(list:集合中的均需要隐藏；indexof:只要包含集合中的任意一个就需要隐藏)
	 */
	GetHideField(AllArr = [], HideArr = [], hidetype = 'list', field = 'prop'){
		//字段中可能需要隐藏某些列，
		//而这些列是在查询条件中又人为选择的
		//不是在自定义字段中操作的
		AllArr.forEach((item ,index) => {
			if(hidetype == 'list'){				
				if(item[field] != '' && HideArr.indexOf(item[field]) > -1){
					item['hide'] = true;
				}
			}else if(hidetype == 'indexof'){
				for (let i = 0; i< HideArr.length; i++) {
					if(item[field].indexOf(HideArr[i]) > -1){
						item['hide'] = true;
						break;
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
			item['children'].length > 0 && hideCount == item['children'].length && (item['hide'] = true);
		});
	},
	SetFieldformatter(fieldlist){
		let seft = this;
		fieldlist.forEach((item ,index) => {
			item['formatter'] = function(row, column, cellValue){
				if(item.data_type == 'float') {
					return parseFloat(cellValue || 0).toFixed(2);
				}else if(item.data_type == 'abslutevalue') {
					return parseFloat(Math.abs(cellValue || 0));//取绝对值
				}else if(item.data_type == 'integer') {
					return parseFloat(cellValue || 0);
				}else if(item.data_type == 'percentage') {
					return(parseFloat(cellValue || 0) * 100).toFixed(2) + '%';
				}else {
					return (cellValue || '');
				}
			}
			if(item['children'].length > 0){
				seft.SetFieldformatter(item['children']);
			}
		});
	},
	GetfixedHeaderData(HeaderData,fixedindex){
		HeaderData && HeaderData.forEach((item, index) => {
			if(index < fixedindex){
				item['fixed'] = true;
			}
		});
		return HeaderData;
	},
	//数据格式化-千分位符
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
	    if (num) { result = num + result ; }
	    return result;
		}
};
