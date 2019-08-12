import commonApi from "../api/common";

export default class commonStore {
    state = {
       	Report_num:'',//报表编码
	    DateTime:[],//交易时间
	    DateTimelimit:3,
	    DateTimeplaceholder:'交易日期',
	    StoreId:[],//交易机构
	    StoreIdData:[],
		StoreIdText:'',
		StoreIdplaceholder:'交易门店',
		queryText:'查询',//是否显示查询按钮
	    query:true,//是否显示查询按钮
	    Reset:true,//重置按钮是否显示
	    seniorquery:true,//是否显示高级查询
	    Explain:true,//说明按钮是否显示
	    Export:false,//导出按钮是否显示
	    Custom:false,//自定义按钮
	    explainText:'',
	    
	    TaxRate:false,//是否开启了价税分离
	    PaymentType:false,//是否选择了付款方式明细
	    PaymentZero:false,//是否选择了过滤付款方式0值
        //数据列表
        fixed:false,//是否冻结[展开列]
        selection:true,//是否查询复选框
        selectionfixed:false,//是否冻结复选框
        columns:[],//表头数据
        footer:[],//合计
        PageSizeList:[20,30,50],
        dataListOne: [],//一层数据
        dataListTwo: [],//二层数据
        dataListThree: [],//三层数据
        loadingOne:false,//一层是否处于加载中
        openOne:false,//一层是否允许展开
        totalOne:1,//一层总条数
        PageIndexOne:1,//一层当前页
        PageSizeOne:20,//一层每页多少条
        loadingTwo:false,//二层加载状态
        openTwo:false,//二层是否允许展开
        totalTwo:1,//二层总条数
        PageIndexTwo:1,//二层当前页
        PageSizeTwo:20,//二层每页多少条
        loadingThree:false,//三层加载状态
        totalThree:1,//三层总条数
        PageIndexThree:1,//三层当前页
        PageSizeThree:20,//三层每页多少条
    }
    getters = {
    	Report_num: state => state.Report_num,
	    DateTime: state => state.DateTime,
	    DateTimelimit: state => state.DateTimelimit,
	    DateTimeplaceholder: state => state.DateTimeplaceholder,
	    StoreId: state => state.StoreId,
	    StoreIdData: state => state.StoreIdData,
	    StoreIdText: state => state.StoreIdText,
	    StoreIdplaceholder: state => state.StoreIdplaceholder,
    	queryText: state => state.queryText,
	    query: state => state.query,
	    seniorquery: state => state.seniorquery,
	    Reset: state => state.Reset,
	    Export: state => state.Export,
	    Explain: state => state.Explain,
	    Custom: state => state.Custom,
	    explainText: state => state.explainText,
    	PageSizeList: state => state.PageSizeList,
        TreeDate: state => state.TreeDate,
        dataListOne: state => state.dataListOne,
        dataListTwo: state => state.dataListTwo,
        dataListThree: state => state.dataListThree,
        showBtn: state => state.showBtn,
        
        PaymentZero: state => state.PaymentZero,
        PaymentType: state => state.PaymentType,
        TaxRate: state => state.TaxRate,
        fixed: state => state.fixed,
        selection: state => state.selection,
        selectionfixed: state => state.selectionfixed,
        columns: state => state.columns,
        footer: state => state.footer,

        loadingOne: state => state.loadingOne,
        openOne: state => state.openOne,
        totalOne: state => state.totalOne,
        PageIndexOne: state => state.PageIndexOne,
        PageSizeOne: state => state.PageSizeOne,
        loadingTwo: state => state.loadingTwo,
        openTwo: state => state.openTwo,
        totalTwo: state => state.totalTwo,
        PageIndexTwo: state => state.PageIndexTwo,
        PageSizeTwo: state => state.PageSizeTwo,
        loadingThree: state => state.loadingThree,
        totalThree: state => state.totalThree,
        PageIndexThree: state => state.PageIndexThree,
        PageSizeThree: state => state.PageSizeThree,
    }
    mutations = {
    	
    	setReport_num(state, value){
	        state.Report_num = value;
	    },
	    setDateTime(state, value){
	        if(value == 1){
	            state.DateTime = [new Date().setDate(1), new Date()];
	        }else{
	             state.DateTime = value;
	        }
	    }, 
	    setStoreId(state, value){
	        state.StoreId = value;
	    },
	    setStoreIdData(state, value){
	    	if(value.success!=false){
	    		state.StoreIdData = value;
	    	}
	        
	    },
	    setStoreIdText(state, value){
	        state.StoreIdText = value;
	    },
         setdataListOne(state, value) {
            state.dataListOne = value;
        },
         setdataListTwo(state, value) {
            state.dataListTwo = value;
        },
         setdataListThree(state, value) {
            state.dataListThree = value;
        },
        setquery(state, value) {
            state.query = value;
        },
    	setseniorquery(state, value) {
            state.seniorquery = value;
        },
    	setReset(state, value) {
            state.Reset = value;
        },
    	setExport(state, value) {
            state.Export = value;
        },
    	setExplain(state, value) {
            state.Explain = value;
        },
        setCustom(state, value) {
            state.Custom = value;
        },
    	setexplainText(state, value) {
            state.explainText = value;
        },
        
        setfixed(state, value) {
            state.fixed = value;
        },
        setselection(state, value) {
            state.selection = value;
        },
        setselectionfixed(state, value) {
            state.selectionfixed = value;
        },
        setcolumns(state, value) {
        	state.columns = [];
        	setTimeout(() => {
        		state.columns = value;
        	}, 100);
            
        },
        setfooter(state, value) {
            state.footer = value;
        },
        setloadingOne(state, value) {
            state.loadingOne = value;
        },
        setopenOne(state, value) {
            state.openOne = value;
        },
        settotalOne(state, value) {
            state.totalOne = value;
        },
        setPageIndexOne(state, value) {
            state.PageIndexOne = value;
        },
        setPageSizeOne(state, value) {
            state.PageSizeOne = value;
        },
        setloadingTwo(state, value) {
            state.loadingTwo = value;
        },
        setopenTwo(state, value) {
            state.openTwo = value;
        },
        settotalTwo(state, value) {
            state.totalTwo = value;
        },
        setPageIndexTwo(state, value) {
            state.PageIndexTwo = value;
        },
        setPageSizeTwo(state, value) {
            state.PageSizeTwo = value;
        },
        setloadingThree(state, value) {
            state.loadingThree = value;
        },
        settotalThree(state, value) {
            state.totalThree = value;
        },
        setPageIndexThree(state, value) {
            state.PageIndexThree = value;
        },
        setPageSizeThree(state, value) {
            state.PageSizeThree = value;
        },
        setTaxRate(state, value) {
            state.TaxRate = value;
        },
        setPaymentType(state, value) {
            state.PaymentType = value;
        },
        setPaymentZero(state, value) {
            state.PaymentZero = value;
        },
    }

    actions(moduleName) {
        let dataApi = new commonApi(moduleName);
        return {
            // 获取数据列表
            GetMultiStore({commit, getters}, data) {
                return dataApi.GetMultiStore(data).then((res) => {
                    commit('setMultiStore', res)
                    return res;

                })
            },
            // 获取数据列表
            GetDataListOne({commit, getters}, data) {
            	commit('setloadingOne', true);
                return dataApi.GetDataListOne(data).then((res) => {
                	if(res.data.rows){
	                	commit('setfooter',res.data.footer);
	                	commit('settotalOne',res.data.total);
	                	commit('setloadingOne', false);
	                    commit('setdataListOne', res.data.rows);
                	}
                    return res.data;

                })
            },
            // 获取数据列表
            GetDataListTwo({commit, getters}, data) {
                return dataApi.GetDataListTwo(data).then((res) => {
                    commit('setdataListTwo', res.data)
                    return res.data;

                })
            },
            // 获取数据列表
            GetDataListThree({commit, getters}, data) {
                return dataApi.GetDataListThree(data).then((res) => {
                    commit('setdataListThree', res.data)
                    return res.data;

                })
            },
            //通用的获取或者提交数据的接口，param必须为两个参数，{typeName:'后台接口的名称',options:[要传到后台的数据]}
            postData({commit, dispatch}, param) {
                return dataApi.post(param.typeName, param.options).then((res) => {
                    if (res.data.pagination) {
                        return res.data
                    } else {
                        return res.data.data;
                    }
                })
            },
           //是否显示自定义按钮
			GetshowBtn({commit, dispatch}, param) {
				 return dataApi.GetshowBtn(param).then((res) => {
				 	let data = res.data;
				 	commit('setCustom',data.configBtn == 1?true:false);
				 	commit('setExport',data.exportBtn == 1?true:false);
               })
			},
            //分页中每页条数变化时
            sizeChange({commit, dispatch}, pageSize) {
                commit('sizeChange', pageSize);
                return dispatch('getDataList');
            },
            //当前页发生变化时候
            currentChange({commit, dispatch}, pageNo) {
                commit('currentChange', pageNo);
                return dispatch('getDataList');
            }
        }
    }
}


