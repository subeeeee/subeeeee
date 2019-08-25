/*
 *钻取表格头部数据定义
 * 2018-01-02
 * 
 * */
let dictionary = {
	Purchasegoods_one: [{ //下钻标头数据[实时库存查询]
			prop: 'inbound_type',
			label: '入库类型',
			align: 'left',
			width: 120,
			sortable: false,
			formatter: function(row, column, cellValue) {
				return(cellValue || '');
			}
		},
		{
			prop: 'inbound_code',
			label: '入库单号',
			align: 'left',
			width: 120,
			sortable: false,
			formatter: function(row, column, cellValue) {
				return(cellValue || '');
			}
		},
		{
			prop: 'available_num',
			label: '可用库存',
			align: 'right',
			width: 120,
			sortable: true,
			formatter: function(row, column, cellValue) {
				return parseFloat(cellValue || 0).toFixed(2);
			}
		},
		{
			prop: 'yes_freeze',
			label: '是否冻结',
			align: 'right',
			width: 120,
			sortable: false,
			formatter: function(row, column, cellValue) {
				return cellValue=='normal' ? '否' : '是';
			}
		}
	],
	Purchasegoods_two: [{
		prop: 'report_date',
		label: '日期',
		align: 'center',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
//			let tm = new Date(cellValue || new Date());
//			let y = tm.getFullYear();
//			let m = tm.getMonth() + 1;
//			let d = tm.getDate();
//			m = m < 10 ? '0' + m : m;
//			d = d < 10 ? '0' + d : d;
//			return y + '-' + m + '-' + d;
            return(cellValue || '');
		}
	}, {
		prop: 'item_id',
		label: '单库类型',
		align: 'left',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return(cellValue || '');
		}
	}, {
		prop: 'code',
		label: '单号',
		align: 'left',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return(cellValue || '');
		}
	}, {
		prop: 'inbound_num',
		label: '入库数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'outbound_num',
		label: '出库数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'available_num',
		label: '可用库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'going_num',
		label: '在途库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'total_num',
		label: '总库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}],
	PurchaseOrderDrill: [{
		prop: 'item_id',
		label: '菜品编码',
		align: 'left',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0);
		}
	}, {
		prop: 'item_name',
		label: '物品名称',
		align: 'left',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'num',
		label: '应收数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'real_num',
		label: '实收数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'order_price',
		label: '订单单价',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'real_price',
		label: '收货单价',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'order_amount',
		label: '订单金额',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}, {
		prop: 'real_amount',
		label: '收货金额',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	}],
	operation1: [{
		prop: 'inbound_type',
		label: '入库类型',
		align: 'left',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return (cellValue || '');
		}
	}, {
		prop: 'inbound_code',
		label: '入库单号',
		align: 'left',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return (cellValue || '');
		}
	}, {
		prop: 'available_num',
		label: '可用库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'yes_freeze',
		label: '是否冻结',
		align: 'left',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}],
	operation2: [{
		prop: 'report_date',
		label: '日期',
		align: 'left',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'item_id',
		label: '单库类型',
		align: 'left',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return(cellValue || '');
		}
	}, {
		prop: 'code',
		label: '单号',
		align: 'left',
		width: 120,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return(cellValue || '');
		}
	}, {
		prop: 'inbound_num',
		label: '入库数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'outbound_num',
		label: '出库数量',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'available_num',
		label: '可用库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'going_num',
		label: '在途库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}, {
		prop: 'total_num',
		label: '总库存',
		align: 'right',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}],
	HeaderTable: [{
		prop: 'store_name',
		label: '交易门店',
		align: 'left',
		width: 200,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'report_date',
		label: '报表日期',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'bill_num',
		label: '账单编号',
		align: 'left',
		width: 150,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'serial_num',
		label: '流水单号',
		align: 'left',
		width: 150,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'guest',
		label: '消费客数',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'opentable_time',
		label: '开单时间',
		align: 'center',
		width: 150,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'payment_time',
		label: '结账时间',
		align: 'center',
		width: 150,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'pos_num',
		label: '结账机号',
		align: 'right',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'waiter_num',
		label: '服务员',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'open_opt',
		label: '开台员',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'cashier_num',
		label: '收款员',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'shift_id',
		label: '结账班次',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'bill_amount',
		label: '账单应收',
		align: 'rgiht',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'item_sale',
		label: '消费流水',
		align: 'rgiht',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'item_amount',
		label: '菜品消费',
		align: 'rgiht',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'service_fee_income',
		label: '服务费',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'back_money_item',
		label: '退菜',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'discount_money',
		label: '折扣',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'reduction_money',
		label: '折让',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'free_money',
		label: '奉送',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'moling_money',
		label: '抹零',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'coupons_ds',
		label: '多收礼券',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'real_amount',
		label: '账单实收',
		align: 'rgiht',
		width: 120,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'average_amount',
		label: '人均消费',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'discount_case_name',
		label: '折扣方案',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'zkl',
		label: '折扣率',
		align: 'rgiht',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'chanel',
		label: '渠道',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'sale_mode',
		label: '销售模式',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	}],
	HeaderDataLeft:[{
		prop: 'item_num',
		label: '菜品编号',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'item_name',
		label: '菜品名称',
		align: 'left',
		width: 150,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return cellValue;
		}
	},{
		prop: 'item_price',
		label: '菜品单价',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'item_count',
		label: '菜品数量',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'item_unit',
		label: '菜品规格',
		align: 'left',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_amount',
		label: '菜品应收',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'discount_amount',
		label: '优惠金额',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'discountr_amount',
		label: '折让金额',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'single_discount_amount',
		label: '抹零均摊',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'discount_state',
		label: '折扣状态',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'discount_rate',
		label: '折扣率',
		align: 'right',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2)+"%";
		}
	},{
		prop: 'item_remark',
		label: '账单备注',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_remark',
		label: '账单备注',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_property',
		label: '菜品属性',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'assist_num',
		label: '辅助数量',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'assist_money',
		label: '辅助金额',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'pushmoney_way',
		label: '提成方式',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'proportion',
		label: '提成金额',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'waiter_num',
		label: '服务员',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_time',
		label: '点菜时间',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_serial',
		label: '点菜序号',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	},{
		prop: 'item_mac_id',
		label: '点菜机号',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	}],
	HeaderDataRight:[{
		prop: 'payment_name',
		label: '付款方式',
		align: 'center',
		width: 100,
		sortable: false,
		formatter: function(row, column, cellValue) {
			return (cellValue || '');
		}
	},{
		prop: 'currency_amount',
		label: '付款金额',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'count',
		label: '付款数量',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return parseFloat(cellValue || 0).toFixed(2);
		}
	},{
		prop: 'number',
		label: '付款号码',
		align: 'right',
		width: 100,
		sortable: true,
		formatter: function(row, column, cellValue) {
			return (cellValue || 0);
		}
	}]

}

export default dictionary = dictionary;