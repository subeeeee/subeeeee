export function barRpt(data = {}) {
	var echarts = require('echarts');
	var itemStyle = {
		normal: {},
		emphasis: {
			barBorderWidth: 1,
			shadowBlur: 5,
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			shadowColor: 'rgba(0,0,0,0.5)'
		}
	};
	var _color = [{
			type: 'linear',
			x: 0,
			y: 0,
			x2: 1,
			y2: 1,
			colorStops: [{
				offset: 0,
				color: '#70F2FF' // 0% 处的颜色
			}, {
				offset: 1,
				color: '#0AE9FF' // 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		},
		{
			type: 'linear',
			x: 0,
			y: 0,
			x2: 1,
			y2: 1,
			colorStops: [{
				offset: 0,
				color: '#7E1DFF' // 0% 处的颜色
			}, {
				offset: 1,
				color: '#C980FF' // 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		},
		{
			type: 'linear',
			x: 0,
			y: 0,
			x2: 1,
			y2: 1,
			colorStops: [{
				offset: 0,
				color: '#1E78FF' // 0% 处的颜色
			}, {
				offset: 1,
				color: '#1CC1FF' // 100% 处的颜色
			}],
			globalCoord: false // 缺省为 false
		},
		"#fc97af", "#87f7cf", "#f7f494", "#72ccff", "#f7c5a0", "#d4a4eb", "#d2f5a6",
		"#76f2f2", "#E3BE27", "#32B26B", "#E95862", "#A6CADC", "#7D5CC7", "#AE2782", "#F1895A"
	];
	let defaultShadowColor = 'rgba(2, 16, 54, 0.9)';
	let defaultTextColor = 'rgba(255,255,255,0.7)';
	let font_size = 14;
	let option = {
		color: _color,
		textStyle:{
		    	fontFamily:'PingFangSC-Regular'
		},
		legend: {
			data: data['ldata'],
			align: 'left',
			left: 10,
			show:data['ldata']?true:false,
		},

		tooltip: { // 提示框组件
			trigger: 'axis', // 触发类型 可选为：'axis' | 'item' | 'none'
			backgroundColor: defaultShadowColor,
			padding: 20,
			confine: true,
			axisPointer: {
				type: 'shadow',
				shadowStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 1,
						y2: 1,
						colorStops: [{
							offset: 1,
							color: 'rgba(25,72,177,0.5)' // 0% 处的颜色
						}, {
							offset: 0,
							color: 'rgba(24,34,99,0)' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}
				}
			}
		},
		xAxis: {
			data: data['xAxisData'],
			name: data['xname'],
			axisTick: { // 坐标轴刻度相关设置。
				alignWithLabel: true,
				show: false
			},
			silent: true,
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
			axisLine: { // 坐标轴轴线相关设置。
				onZero: true,

			},
			axisLabel: { // 坐标轴轴线标签设置。
				margin: 15,
				lineHeight: 22,
				formatter: function(value, index) {
					return value;
				},
				textStyle: {
					color: '#758896',
					fontSize: font_size
				}
			}
		},
		yAxis: {
			inverse: true,
			splitArea: {
				show: false
			},
			nameTextStyle: { // name的样式，默认不需要设置，继承全局集体样式。
				color: '#ffffff',
				align: 'left',
				fontSize: font_size
			},
			offset: 10,
			nameGap: 15, // 坐标名称跟坐标轴的距离。
			axisTick: { // 坐标轴刻度相关设置。
				show: false
			},
			axisLine: { // 坐标轴轴线相关设置。
				show: false,
			},
			splitLine: { // 坐标轴在 grid 区域中的分隔线。
				show: true,
				lineStyle: {
					width: 1,
					type: 'solid',
					color: '#D8E5EC'
				}
			},
			axisLabel: { // 坐标轴轴线标签设置。
				textStyle: {
					color: '#758896',
					fontSize: font_size
				}
			}
		},
		grid: {
			left: 100
		},
		visualMap: {
			show:false,
			type: 'continuous',
			dimension: 1,
			text: data['visualMap'],
			inverse: true,
			itemHeight: 160,
			calculable: true,
			min: -2,
			max: 6,
			top: 20,
			left: 10,
			inRange: {
				colorLightness: [0.4, 0.8]
			},
			outOfRange: {
				color: '#bbb'
			},
			controller: {
				inRange: {
					color: '#2f4554'
				}
			}
		},
		series: []
	};

	data['data'].forEach((itemA, indexA) => {
		let obj = {
			name: itemA['name'],
			type: 'bar',
			stack: itemA['stack'],
			itemStyle: itemStyle,
			data: itemA['data'],
		}
		if(itemA['mark']){
			obj['markPoint'] =  {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
           };
           obj['markLine'] =  {
                data : [
                    {type : 'average', name: '平均值'}
                ]
           };
		}
		option.series.push(obj);
	});
	
	if(data['visualMap'] != undefined && data['visualMap'] != false){
		option.visualMap['show'] = true;
	}
	if(data['yinverse'] != undefined){
		option['yAxis']['inverse'] = data['yinverse'];
	}
	
	let myChart = echarts.init(document.getElementById(data['id']))
	myChart.setOption(option);
/*
	myChart.on('brushSelected', renderBrushed);

	function renderBrushed(params) {
		var brushed = [];
		var brushComponent = params.batch[0];

		for(var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
			var rawIndices = brushComponent.selected[sIdx].dataIndex;
			brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
		}

		myChart.setOption({
			title: {
				backgroundColor: '#333',
				text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
				bottom: 0,
				right: 0,
				width: 100,
				textStyle: {
					fontSize: 12,
					color: '#fff'
				}
			}
		});
	}*/
}
export default barRpt = barRpt;