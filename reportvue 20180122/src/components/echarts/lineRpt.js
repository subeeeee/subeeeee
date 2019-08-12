export function lineRpt(data = {}) {
	let textarr = ['a', 'b'];
	let legend_right = '5%';
	let symbolSize = 30;
	let line_width = 4;
	let yaxisArrs = [
		[{
				name: '客单价\n(元)',
				type: 'value',
				//offset:25,
				nameTextStyle: {
					color: '#FFF',
					align: 'left'
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#162E81'
					}
				},
				axisLabel: {
					align: 'right',
					textStyle: {
						color: '#C5C8DC'
					}
				},
				splitLine: {
					show: false
				}
			},
			{
				name: '营业实收\n(万元)',
				type: 'value',
				//offset:25,
				nameTextStyle: {
					color: '#0AE9FF',
					align: 'right'
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#162E81'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#0EA0CD'
					}
				},
				splitLine: {
					show: false
				}
			},
			{
				name: '客流量\n(万人)',
				type: 'value',
				offset: 60,
				nameTextStyle: {
					color: '#FF368F',
					align: 'right'
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: '#162E81'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#BA3186'
					}
				},
				splitLine: {
					show: false
				}
			}
		],
	];
	var option = {
		tooltip: {
			trigger: 'axis',
			confine: true,
			backgroundColor: 'rgba(2, 16, 54, 0.9)',
			extraCssText: 'box-shadow: 0 0 10px 0 rgba(19,43,114,0.50);',
			axisPointer: {
				type: 'shadow'
			}
		},
		textStyle: {
			fontFamily: 'PingFangSC-Regular'
		},
		color: [{
				type: 'linear',
				x: 0,
				y: 0,
				x2: 1,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: '#377EE2' // 0% 处的颜色
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
					color: '#FF1B74' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#EB65E4' // 100% 处的颜色
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
					color: '#FFFFFF' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#FFFFFF' // 100% 处的颜色
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
					color: '#7D5CC7' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#AE2782' // 100% 处的颜色
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
					color: '#F5B13F' // 0% 处的颜色
				}, {
					offset: 1,
					color: '#92D8FA' // 100% 处的颜色
				}],
				globalCoord: false // 缺省为 false
			}
		],
		axisPointer: {
			type: 'shadow',
			shadowStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [{
							offset: 0.02,
							color: 'rgba(0,57,255,0)' // 0% 处的颜色#3E79A3
						},
						{
							offset: 0.36,
							color: 'rgba(14,68,227,0.36)'
						},
						{
							offset: 0.56,
							color: 'rgba(13,75,251,0.45)'
						},
						{
							offset: 0.77,
							color: 'rgba(13,61,200,0.26)'
						},
						{
							offset: 1,
							color: 'rgba(2,52,228,0)'
						}
					],
					globalCoord: false // 缺省为 false
				}
				//opacity:0.5
			}
		},
		legend: {
			data: data['legend'],
			orient: 'horizontal',
			right: legend_right,
			itemGap: 20,
			itemWidth: 9,
			itemHeight: 9,
			borderRadius: 100,
			top: '6%',
			textStyle: {
				fontSize: 12,
				color: '#fff'
			}
		},
		grid: {
			top: '25%',
			left: '10%',
			right: '10%',
			bottom: '10%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: true,
				interval: 0,
				lineStyle: {
					width: 1,
					color: [{
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0,
							color: '#1041A8' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#162E81' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}]
				}
			},
			axisLabel: {
				textStyle: {
					color: '#A9C5F5',
					align: 'center'
				}
			},
			data: data['month_data'],
		}],
		yAxis: yaxisArrs[0],
		series: []
	};
	var dt = {
		name: '动态',
		type: 'line',
		smooth: true,
		symbol: 'circle',
		symbolSize: 5,
		showSymbol: false,
		lineStyle: {
			normal: {
				width: line_width,
				shadowColor: "rgba(27,24,80,0.30)",
				shadowBlur: 4,
				shadowOffsetY: 16

			}
		},
		markPoint: {
			symbol: 'image://img/w_circle.png',
			symbolSize: symbolSize,
			symbolOffset: [0, 0],
			label: {
				normal: {
					show: false
				}
			},
			data: [{
				type: 'max',
				name: '最大值'
			}]
		},
		data: []
	};
	var arr = data['data'];
	$(arr).each(function(k, v) {
		var obj = JSON.parse(JSON.stringify(dt));
		obj['name'] = v['name'];
		obj['yAxisIndex'] = v['index'];
		obj['data'] = v['data'];
		option.series.push(obj);
	});
	
	let myChart = echarts.init(document.getElementById(data['id']))
	myChart.setOption(option);
}

export default lineRpt = lineRpt;