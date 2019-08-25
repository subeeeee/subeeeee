export function pieRpt(data = {}) {
	var echarts = require('echarts');
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
	var option = {
		color: _color,
		textStyle: {
			fontFamily: 'PingFangSC-Regular'
		},
		grid: {
			bottom: '5%'
		},
		tooltip: {
			trigger: 'item',
			confine: true,
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			show: false,
			orient: 'vertical',
			left: '20px',
			bottom: '20px',
			data: (data['data2']).map(function(item, index) {
				console.log('item',item);
				return {
					name: 'wer',
					textStyle: {}
				};
			}),
		},
		series: [{
			name: data['seriesName'],
			type: 'pie',
			radius: '65%',
			minAngle: 2,
			center: ['50%', '50%'],
			data: data['data1'],
			label: {
				normal: {
					textStyle: {
						color: '#2f4554',
						fontSize: 12
					}
				}
			},
			labelLine: { //视觉引导线样式
				normal: {
					show: true
				}
			},
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};

	let myChart = echarts.init(document.getElementById(data['id']))
	myChart.setOption(option);
}

export default pieRpt = pieRpt;