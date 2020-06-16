function renderDisasterPieEchart(data, type) {
	var myEchart = echarts.init(document.getElementById('disasterPieEchart'))
	var tempValue = {}
	var totalNum = 0
	$.each(data.list, function(key, value) {
		if (type) {
			tempValue[value.riskLevel] = value.count
		} else {
			tempValue[value.weekLevel] = value.count
		}
		totalNum += value.count
	})
	$('.echart-bar-text').text(totalNum)
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: '66%',
			y: 'center',
			data: [{
				name: '高风险',
				icon: 'circle'
			}, {
				name: '较高风险',
				icon: 'circle'
			}, {
				name: '较低风险',
				icon: 'circle'
			}, {
				name: '低风险',
				icon: 'circle'
			}, {
				name: '无风险',
				icon: 'circle'
			}]
		},
		graphic: [{
            type: 'text',
            z: 100,
            left: '31%',
            top: '54%',
            style: {
                text: 'total',
                fill: '#999'
            }
        }],
		series: [{
			name: '社区（村）',
			type: 'pie',
			radius: ['50%', '75%'],
			center: ['35%', '50%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: tempValue['0'] ? tempValue['0'] : 0,
					name: '无风险',
					itemStyle: {
						normal: {
							color: '#E1E1E1'
						}
					}
				},{
					value: tempValue['1'] ? tempValue['1'] : 0,
					name: '低风险',
					itemStyle: {
						normal: {
							color: '#0000FF'
						}
					}
				},
				{
					value: tempValue['2'] ? tempValue['2'] : 0,
					name: '较低风险',
					itemStyle: {
						normal: {
							color: '#FFFF00'
						}
					}
				},
				{
					value: tempValue['3'] ? tempValue['3'] : 0,
					name: '较高风险',
					itemStyle: {
						normal: {
							color: '#FF6600'
						}
					}
				},
				{
					value: tempValue['4'] ? tempValue['4'] : 0,
					name: '高风险',
					itemStyle: {
						normal: {
							color: '#FF0000'
						}
					}
				}
			]
		}]
	};
	myEchart.setOption(option)
}

function renderAccessPieEchart(data) {
	var myEchart = echarts.init(document.getElementById('disasterPieEchart'))
	$('.echart-bar-text').text(data.securityPointNum+data.dangerousPointNum)
	var option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: '64%',
			y: 'center',
			data: [{
				name: '有淹没风险',
				icon: 'circle'
			}, {
				name: '无淹没风险',
				icon: 'circle'
			}]
		},
		graphic: [{
            type: 'text',
            z: 100,
            left: '31%',
            top: '54%',
            style: {
                text: 'total',
                fill: '#999'
            }
        }],
		series: [{
			name: '避灾点',
			type: 'pie',
			radius: ['50%', '75%'],
			center: ['35%', '50%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center'
				},
				emphasis: {
					show: false,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: data.dangerousPointNum,
					name: '有淹没风险',
					itemStyle: {
						normal: {
							color: '#FF0000'
						}
					}
				},
				{
					value: data.securityPointNum,
					name: '无淹没风险',
					itemStyle: {
						normal: {
							color: '#99FF66'
						}
					}
				}
			]
		}]
	};
	myEchart.setOption(option)
}
function renderReportEchart (data) {
	let tideList = []
	let markPointList = []
	data.forEach(function(item, index) {
		tideList.push([item.time, item.level])
		if (item.type === 1) {
			markPointList.push({value: item.level+'cm', xAxis: item.time, yAxis: item.level})
		}
	})
	var myEchart = echarts.init(document.getElementById('reportEchart'))
	var option = {
		tooltip: {
		  trigger: 'axis',
		},
		title: {
			text: '天文潮',
			subtext: 'cm',
			left: 26,
			top: 0,
			textStyle: {
				color: '#4AC3EF',
				fontSize: 14
			}
        },
		grid: {
			top: '60px',
			left: '30px',
			right: '30px',
			bottom: '10px',
			containLabel: true
		},
		legend: {
			show: false
		},
		dataZoom: [{
			type: 'inside',
			show: true,
			xAxisIndex: [0]
		}],
		tooltip: {
			show: true,
			trigger: 'axis',
			backgroundColor: '#fff',
			position: 'top',
			axisPointer: {
				show: true,
				type: 'line',
				lineStyle: {
					type: 'dashed',
					width: 1,
					color: '#2A88BB'
				}
			},
			formatter: function (params) {
				var htmlText = '<div class="echart-tooltip"><h5>'+params[0].data[1]+'cm</h5><p>'+moment(params[0].data[0]).format('MM-DD HH:mm')+'</p></div>'
				return htmlText
			}
		},
		xAxis: {
			type: 'time',
			axisLine: {
				lineStyle: {
					color: '#E9EAEF'
				}
			},
			splitLine: {
			  show: false
			},
			axisLabel: {
				show: true,
				interval: 2,
				textStyle: {
				   color: '#9FA9AF',
				   fontSize : 12
				},
				formatter:function(params){
					var timeDate = moment(params).format('M月D日')
					var timeDetail = moment(params).format('HH:mm')
					var lableText = ''
					if (timeDetail === '12:00') {
						lableText = '12:00'
					} else {
						lableText = timeDate+'\n'+timeDetail
					}
					return lableText
				}
			}
		},
		yAxis: {
			axisLine: {
				lineStyle: {
					color: '#E9EAEF'
				}
			},
			splitLine: {
				lineStyle: {
				color: '#E9EAEF',
				}
			},
			axisLabel: {
				show: true,
				textStyle: {
				   color: '#9FA9AF',
				   fontSize : 12
				}
			}
		},
		series: [
		  {
			name: '天文潮',
			type: 'line',
			data: tideList,
			smooth: true,
			lineStyle: {
				normal: {
					color: '#1985C0',
					width: '2'
				}
			},
			showSymbol: false,
			symbol: 'circle',
			symbolSize: 6,
			itemStyle: {
				normal: {
					color: '#157CB4',
					borderColor: '#157CB4'
				},
				emphasis: {
					color: '#ffffff',
					borderWidth: '4'
				}
			},
			markPoint: {
				symbol: 'circle',
				symbolSize: 9,
				// symbolOffset: [0, 0],
				label: {
					show: true,
					color: '#333333',
					fontSize: 14,
					fontWeight: 'bolder',
					position: 'top',
					textBorderColor: '#fff',
					textBorderWidth: 4
				},
				itemStyle: {
					// color: 'transparent'
				},
                data: []
            }
		  }
		]
	};
	option.series[0].markPoint.data = markPointList
	myEchart.setOption(option)
}
$(function() {
//	renderDisasterPieEchart()
//	renderAccessPieEchart()
//	renderSeawallBarEchart()
	// renderReportEchart()
})