// 左侧导航
function clearOfRenderCesium(currentNavIndex, index) {
    if (currentNavIndex == 1) {
        changeLegendShow(-1)
    }
    if (index == 1) {
        changeLegendShow(subNavIndex)
    }
}

function navClickStyleOne() {
    $('.areaDetailBox').hide()
    $('.subnav-context,.road-check-btn,.reback-center-btn,.navigation-controls,.report-organ').show()
    $('.report-organ .report-organ-list1').show()
    $('.report-organ .report-organ-list,.riskAnalysis,.boatInfoBox,.boatRunDirection').hide()
    $('.subnav-context').css('padding', '24px')
    $('.lineThrouth').hide()
    $('.header-nav-right').show()
    $('.timeShow,.tutide,.cloudImg').hide()

    var index = $(this).index();
    if (index == currentNavIndex) {
        return
    }
    $('.report-dialog').hide()
    if (currentNavIndex == 1) {
        changeLegendShow(-1, false)
    }
    if (index == 1) { //风险区划
        changeLegendShow(subNavIndex, false)
        delateInfo()
        closeINfoBox()
        $('.road-check-btn,.reback-center-btn,.navigation-controls,.report-organ').hide()
        $('.riskAnalysis,.boatInfoBox,.boatRunDirection').show()

        $('.toDetail').click(function() {
                $('.boatInfoBox').hide()
                $('.detailInfo_box').show()
            })
            // 风险类型切换
    }
    $(".nav-item").removeClass("nav-click");
    $(this).addClass("nav-click");
    currentNavIndex = index
    $('.subnav-context').eq(index).show().siblings().hide()
        // 卫星云图
    if (index == 2) {
        delateInfo()
        closeINfoBox()

        $('.header-nav-right,.road-check-btn,.reback-center-btn,.navigation-controls,.report-organ').hide()
        $('.timeShow,.tutide').show()
        $('.cloudImg').show()
        $('.aimate-btn').click(function() {
            let inputVal = $(".setTime input[type='radio']:checked").val();
            cloudPlay(inputVal)
        })
    }
    // 近岸预报
    if (index === 3) {
        delateInfo()
        closeINfoBox()
            // $('.report-dialog').hide()

        $('.subnav-context').height(550 + 'px')
        $('.report-organ-close .report-organ-btn').trigger('click')

        // 每日详情
        getLatestDailyDetail()
            // 海域单元显示
        if (!isSeaZoneShow) {
            offshoreForecast($('.nav-fold-level li').eq(0), true)
        } else {
            // 如果海域单元已经显示的话，直接设置颜色即可
            loadAstronomicalTideForecastPoint()
            getLatestThreeDayDetail()
            setForecastColorOrange()
        }
        $('.next').click(function() {
            nextTo()
        })
        $('.prev').click(function() {
            leftTo()
        })
    } else if (index == 4) {
        // ada
        //设置默认选择项
        delateInfo()
        closeINfoBox()

        getInfoBytype("城市天气")
        $('.report-organ .report-organ-list').show()
        $('.report-organ .report-organ-list1').hide()
        $('.subnav-context').height(0 + 'px').css('padding', '0')　　

        $('.reback-center-btn').click(function() {
            let type = localStorage.getItem('type')
            removeInfoLast(type)
        })
        $('.but_box .btn-nav ').click(function() {
            $('.but_box .btn-nav ').removeClass('btn-active')
            $(this).addClass('btn-active')
            closeINfoBox()
            getInfoBytype($(this).text()) //获取信息
            localStorage.setItem('type', $(this).text())
        })
        setImageryViewModels('电子云图')
        if (isSeaZoneShow) {
            // 如果海域单元有显示的话，在切换时需要删除
            offshoreForecast($('.nav-fold-level li').eq(0), false)
        }
    } else if (index == 5) {
        delateInfo()
        closeINfoBox()

        $('.subnav-context').height(0 + 'px').css('padding', '0')
        $('.areaDetailBox').show()

        // 天气类型切换
        $('.btuBox ').on('click', '.btn-nav ', function() {
            $('.btuBox .btn-nav ').removeClass('btn-active')
            $(this).addClass('btn-active')

        })
        if (isSeaZoneShow) {
            // 如果海域单元有显示的话，在切换时需要删除
            offshoreForecast($('.nav-fold-level li').eq(0), false)
        }

    } else if (index === 1) {
        $('.subnav-context').eq(1).css({
            height: 0,
            padding: 0
        })
    } else {
        $('.subnav-context').height($('.right').height() - 96 + 'px')
        if (isSeaZoneShow) {
            // 如果海域单元有显示的话，在切换时需要删除
            offshoreForecast($('.nav-fold-level li').eq(0), false)
        }
    }
    //重置高度
    if (index === 1) {
        reBuildHeight(subNavIndex);
    } else {
        reBuildHeight(-1);
    }
}
//根据本地类型删除
function delateInfo() {
    let type = localStorage.getItem('type')
    console.log(type)
    removeInfoLast(type)
}
/* 点击根据传入类型出现弹窗
 *@parmas
 *@left left
 *@top top
 *@name 标题名称
 *@type  天气类型
 *@weather 天气
 *@wind  风力
 *@temperatrue 温度
 *@windDirection 风向
 *@temperatrueM  最高温度
 *@temperatrueMin 最低温度
 */
function showWeatherInfo(data) {
    if (data) {
        var str = "";
        if (data.type == '城市天气') {
            str +=
                '<p class="title">福州6月13日预报信息</p>' +
                '<span>未来24小时</span>' +
                '<ul>' +
                '<li>' +
                '<span>天气现象</span>' +
                '<p>' + data.params.weather + '</p>' +
                '</li>' +
                '<li>' +
                '<span>最高气温</span>' +
                '<p>' + data.params.temperatureM + '</p>' +
                '</li>' +
                '<li>' +
                '<span>最低气温</span>' +
                '<p>' + data.params.temperatureMin + '</p>' +
                '</li>' +
                '</ul>' +
                '<div class="direct_iconArea">' + '</div>'
            $('.weatherInfo').empty().append(str).show()
        } else if (data.type == "海区天气") {
            str +=
                '<p class="title">' + data.name + '天气预报</p>' +
                '<span>未来24小时</span>' +
                '<ul>' +
                '<li>' +
                '<span>天气现象</span>' +
                '<p>' + data.params.weather + '</p>' +
                '</li>' +
                '<li>' +
                '<span>风力</span>' +
                '<p>' + data.params.wind + '</p>' +
                '</li>' +
                '<li>' +
                '<span>风向</span>' +
                '<p>' + data.params.windDirection + '</p>' +
                '</li>' +
                '<li>' +
                '<span>能见度</span>' +
                '<p>' + data.params.canSee + '</p>' +
                '</li>' +
                '</ul>' +
                '<div class="direct_iconArea">' + '</div>'
            $('.weatherInfo').empty().append(str).show()
        } else if (data.type == '港口天气') {
            str +=
                '<p class="title">' + data.name + '</p>' +
                '<span>未来24小时</span>' +
                '<ul>' +
                '<li>' +
                '<span>天气现象</span>' +
                '<p>' + data.params.weather + '</p>' +
                '</li>' +
                '<li>' +
                '<span>风力</span>' +
                '<p>' + data.params.wind + '</p>' +
                '</li>' +
                '<li>' +
                '<span>风向</span>' +
                '<p>' + data.params.windDirection + '</p>' +
                '</li>' +
                '</ul>' +
                '<div class="direct_iconArea">' + '</div>'
            $('.weatherInfo').empty().append(str).show()
        } else {

        }
    } else {

    }


}
// 天气弹窗坐标轴设置
function setByremove(leftX, topY) {
    $('.weatherInfo').css({
        left: leftX,
        top: topY
    })
}
// 切换天气类型获取天气数据
function getInfoBytype(type) {
    //获取方法
    if (type == "城市天气") {
        removeInfoLast("海洋天气")
        removeInfoLast("港口天气")
        loadWeatherData(type)

    } else if (type == "海区天气") {
        removeInfoLast("城市天气")
        removeInfoLast("港口天气")
        loadWeatherData(type)
    } else if (type == "港口天气") {
        removeInfoLast("城市天气")
        removeInfoLast("海洋天气")
        loadWeatherData(type)
    } else {

    }


}
// 清除数据
function removeInfoLast(type) {
    //清除方法
    removeWheatherDataPoint(type)
}
//close  弹窗
function closeINfoBox() {
    $('.weatherInfo').hide()
}

// 向右滑动效果
function nextTo() {
    $(".nav-ul").animate({ left: '-=257px' }, function() {

    });

}
//关闭弹窗X
function closeDetailBox() {
    $('.detailInfo_box').hide()
}

function leftTo() {
    $(".nav-ul").animate({ left: '+=257px' }, function() {

    });
}
//左边距判断样式
function leftOffest() {
    var leftX = $('.nav-ul').position().left;
    console.log(leftX)
    if (leftX == 0) {
        $('.prev').css('cursor', 'not-allowed')
    } else {
        console.log(leftX)
        $('.prev').css('cursor', 'pointer')

    }
}
// 获取船只详情信息 @id  船只id
function getBoatDetailInfo(id) {
    // 假数据模拟
    var dataTest = {
        "data": {
            "list": [{
                    "mmsi": "412604000",
                    "imo": "0",
                    "name": "中国发展2",
                    "counter": "中国",
                    "call": "BYFA",
                    "boatLen": "199米",
                    "boatWide": "32米",
                    "loadDu": "52300.00",
                    "totalDu": "33511.0",
                    "netDu": "52300.0",
                    "windPower": "5级",
                    "preArrival": "FANG CHENG",
                    "preArrivalTime": "06-12 18:20",
                    "longitude": 110.8355,
                    "latitude": 21.7583,
                    "boatDirection": "241度",
                    "boatMoveDirection": "161.0度",
                    "status": "锚泊/0.1节",
                    "draft": "12.8米",
                    "updateTime": "2020-06-15 11:36:09",
                    "boatType": "客船",
                    "wave": "1.2米"
                },

                {
                    "mmsi": "413055580",
                    "imo": "0",
                    "name": "",
                    "counter": "",
                    "call": "",
                    "boatLen": "22米",
                    "boatWide": "5米",
                    "loadDu": "67.00",
                    "totalDu": "52.0",
                    "netDu": "67.0",
                    "windPower": "5级",
                    "preArrival": "GUI SHAN",
                    "preArrivalTime": "06-13 08:00",
                    "longitude": 113.9588,
                    "latitude": 22.9938,
                    "boatDirection": "未知",
                    "boatMoveDirection": "82.1度",
                    "status": "在航(主机推动)/0.0节",
                    "draft": "1.5米",
                    "updateTime": "2020-06-15 11:27:08",
                    "boatType": "客船",
                    "wave": "1.2米"
                },
                {
                    "mmsi": "413471030",
                    "imo": "0",
                    "name": "",
                    "counter": "",
                    "call": "",
                    "boatLen": "26米",
                    "boatWide": "6米",
                    "loadDu": "吨",
                    "totalDu": "吨",
                    "netDu": "吨",
                    "windPower": "8级",
                    "preArrival": "BDAM",
                    "preArrivalTime": "00-00 00:00",
                    "longitude": 113.8722,
                    "latitude": 23.0316,
                    "boatDirection": "22度",
                    "boatMoveDirection": "248.9度",
                    "status": "未定义/0.7节",
                    "draft": "1.5米",
                    "updateTime": "2020-06-15 11:42:55",
                    "boatType": "引航",
                    "wave": "1.5米"
                },
                {
                    "mmsi": "413907633",
                    "imo": "0",
                    "name": "",
                    "counter": "",
                    "call": "",
                    "boatLen": "53米",
                    "boatWide": "9米",
                    "loadDu": "吨",
                    "totalDu": "吨",
                    "netDu": "吨",
                    "windPower": "4级",
                    "preArrival": "SHATIAN",
                    "preArrivalTime": "06-12 20:50",
                    "longitude": 115.15166,
                    "latitude": 23.4416,
                    "boatDirection": "63度",
                    "boatMoveDirection": "146.9度",
                    "status": "锚泊/0.0节",
                    "draft": "3.5米",
                    "updateTime": "2020-06-15 11:28:04",
                    "boatType": "邮轮",
                    "wave": "1.7米"
                },
                {
                    "mmsi": "413377770",
                    "imo": "0",
                    "call": "0",
                    "name": "",
                    "counter": "",
                    "boatLen": "53米",
                    "boatWide": "9米",
                    "loadDu": "吨",
                    "totalDu": "吨",
                    "netDu": "吨",
                    "windPower": "4级",
                    "preArrival": "8",
                    "preArrivalTime": "06-10 00:00",
                    "longitude": 111.6672,
                    "latitude": 23.566,
                    "boatDirection": "212度",
                    "boatMoveDirection": "212.3度",
                    "status": "锚泊/0.6节",
                    "draft": "3.4米",
                    "updateTime": "2020-06-15 11:30:48",
                    "boatType": "邮轮",
                    "wave": "1.7米"
                },
                {
                    "mmsi": "412476890",
                    "imo": "888888",
                    "call": "",
                    "name": "",
                    "counter": "",
                    "boatLen": "50米",
                    "boatWide": "8米",
                    "loadDu": "吨",
                    "totalDu": "吨",
                    "netDu": "吨",
                    "windPower": "3级",
                    "preArrival": "GUANGZHOU",
                    "preArrivalTime": "03-05 08:08",
                    "longitude": 115.9116,
                    "latitude": 24.9002,
                    "boatDirection": "0度",
                    "boatMoveDirection": "83.1度",
                    "status": "未定义/0.2节",
                    "draft": "3.1米",
                    "updateTime": "2020-06-15 07:43:22",
                    "boatType": "其他",
                    "wave": "1.6米"
                },
                {
                    "mmsi": "413782091",
                    "imo": "",
                    "call": "",
                    "name": "",
                    "counter": "",
                    "boatLen": "米",
                    "boatWide": "米",
                    "loadDu": "吨",
                    "totalDu": "吨",
                    "netDu": "吨",
                    "windPower": "10级",
                    "preArrival": "",
                    "preArrivalTime": "03-05 08:08",
                    "longitude": 115.9116,
                    "latitude": 24.9002,
                    "boatDirection": "140度",
                    "boatMoveDirection": "140.5度",
                    "status": "未定义/5.9节",
                    "draft": "米",
                    "updateTime": "2020-06-15 11:39:36",
                    "boatType": "其他",
                    "wave": "2.5米"
                },
                {
                    "mmsi": "477519200",
                    "imo": "9683178",
                    "call": "VRMM7",
                    "name": "",
                    "counter": "Hong Kong",
                    "boatLen": "31米",
                    "boatWide": "10米",
                    "loadDu": "214吨",
                    "totalDu": "278吨",
                    "netDu": "214吨",
                    "windPower": "4级",
                    "preArrival": "A",
                    "preArrivalTime": "00-00 24:60",
                    "longitude": 115.755,
                    "latitude": 23.05,
                    "boatDirection": "未知",
                    "boatMoveDirection": "23.13度",
                    "status": "在航/1.2节",
                    "draft": "0.0米",
                    "updateTime": "2020-06-15 11:45:17",
                    "boatType": "其他",
                    "wave": "1.4米"
                }
            ]

        },
        "code": 200
    }
    var res = JSON.parse(JSON.stringify(dataTest))
    var str = ''
    res.list.forEach(function(item, index) {
        console.log(item)
    })
}
// 云图动画
function cloudPlay(inputVal) {
    console.log(inputVal)
    var imgArray = new Array("./image/cloudImage/Fy2E_202006090115.jpg", "./image/cloudImage/Fy2E_202006090215.jpg", "./image/cloudImage/Fy2E_202006090315.jpg",
        "./image/cloudImage/Fy2E_202006090415.jpg", "./image/cloudImage/Fy2E_202006090515.jpg", "./image/cloudImage/Fy2E_202006090615.jpg", "./image/cloudImage/Fy2E_202006090715.jpg", "./image/cloudImage/Fy2E_202006090815.jpg", "./image/cloudImage/Fy2E_202006090915.jpg", "./image/cloudImage/Fy2E_202006091015.jpg", "./image/cloudImage/Fy2E_202006091115.jpg", "./image/cloudImage/Fy2E_202006091215.jpg", "./image/cloudImage/Fy2E_202006091315.jpg", "./image/cloudImage/Fy2E_202006091415.jpg", "./image/cloudImage/Fy2E_202006091515.jpg"
    );
    var i = 0,
        len = imgArray.length;
    $(document).ready(function() {
        $(".cloudImg").attr("src", "./image/cloudImage/Fy2E_202006090015.jpg");
        change(i, len, inputVal);

    });

    function change(i, len, inputVal) {
        if (i < len) {
            $(".cloudImg").attr("src", imgArray[i++]);
            t = setTimeout(function() {
                change(i, len, inputVal)
            }, inputVal);
        } else {
            clearTimeout(t)
        }
    }
}

//进岸预报弹窗隐藏
function hideJinanReport() {
    $('.report-dialog').hide()
}

function navClickStyleTwo() {
    var index = $(this).index();
    if (currentNavIndex !== index) {
        if (currentNavIndex == 1) {
            changeLegendShow(-1, false)
        }
        if (index == 1) {
            changeLegendShow(subNavIndex, false)
        }
    }
    $('.report-dialog').hide()
    $(".nav-item").removeClass("nav-click");
    $(this).addClass("nav-click");
    currentNavIndex = index
    $('.subnav-context').eq(index).toggle().siblings().hide()
        // 近岸预报
    if (currentNavIndex === 3) {
        $('.subnav-context').height(550 + 'px')
        $('.report-organ-close .report-organ-btn').trigger('click')
            // 每日详情
        getLatestDailyDetail()
            // 海域单元显示
        if (!isSeaZoneShow) {
            offshoreForecast($('.nav-fold-level li').eq(0), true)
        } else {
            loadAstronomicalTideForecastPoint()
            getLatestThreeDayDetail()
            setForecastColorOrange()
        }
    } else {
        $('.subnav-context').height($('.right').height() - 96 + 'px')
        if (isSeaZoneShow) {
            offshoreForecast($('.nav-fold-level li').eq(0), false)
        }
    }
    //重置高度
    if (index === 1) {
        reBuildHeight(subNavIndex);
    } else {
        reBuildHeight(-1);
    }
}

//台风信息弹窗模块
function typhoonInfoShow(number, pointId, name) {
    typhoonPointInfo({ number: number, pointId: pointId }, function(res) {
        $('.typhoon-info').show()
        var resData = res.data
        $('.typhoon-info-title h4').text(number + name)
        $('.typhoon-info-title p').text(moment(resData.time).format('MM/DD HH:mm'))
        $('.typhoon-info-list li').eq(0).hide()
        $('.typhoon-info-list li').eq(1).find('p').text(resData.lat + '°E/' + resData.lng + '°N')
        var tempHtml = resData.speed + '米/秒，<em style="color:#FF0000;">' + resData.power + '级(' + resData.strong + ')</em>'
        $('.typhoon-info-list li').eq(2).find('p').html(tempHtml)
        $('.typhoon-info-list li').eq(3).find('p').text(resData.pressure + '百帕')
        $('.typhoon-info-list li').eq(4).show().find('p').text(resData.movespeed + '公里/小时，' + resData.movedirection)
        var typhoonCircle = [{
            class: 7,
            direction: resData.radius7.split('|')
        }, {
            class: 10,
            direction: resData.radius10.split('|')
        }, {
            class: 12,
            direction: resData.radius12.split('|')
        }]
        var circleHtml = ''
        typhoonCircle.forEach(function(item, index) {
            if (item.direction[0]) {
                var max = Math.max.apply(null, item.direction)
                var min = Math.min.apply(null, item.direction)
                if (min != max) {
                    circleHtml += '<li>' +
                        '<span>' + item.class + '级半径</span>' +
                        '<p>' + min + '~' + max + '公里</p>' +
                        '</li>'
                } else {
                    circleHtml += '<li>' +
                        '<span>' + item.class + '级半径</span>' +
                        '<p>' + min + '公里</p>' +
                        '</li>'
                }
            }
        })
        $('.typhoon-circle-list').show()
        $('.typhoon-circle-list').html(circleHtml)
    })
}

function typhoneForecastInfoShow(number, name, organ, info) {
    $('.typhoon-info').show()
    $('.typhoon-circle-list').hide()
    $('.typhoon-info-title h4').text(number + name)
    $('.typhoon-info-title p').text(moment(info.time).format('MM/DD HH:mm'))
    $('.typhoon-info-list li').eq(0).show().find('p').text(organ)
    $('.typhoon-info-list li').eq(1).find('p').text(info.lat + '°E/' + info.lng + '°N')
    var tempHtml = info.speed + '米/秒，<em style="color:#FF0000;">' + info.power + '级(' + info.strong + ')</em>'
    $('.typhoon-info-list li').eq(2).find('p').html(tempHtml)
    var tempVal = info.pressure ? info.pressure + '百帕' : '-'
    $('.typhoon-info-list li').eq(3).find('p').text(tempVal)
    $('.typhoon-info-list li').eq(4).hide()
}

function typhoonInfoDelete() {
    $('.typhoon-info').hide()
}

function typhoonInfoPosition(left, top) {
    $('.typhoon-info').css({
        left: left + 'px',
        top: top + 'px'
    })
}

// 台风标签
function addTyphoonMarker(leftX, topY, name, number) {
    var markerHtml = '<div class="typhoon_marker typhoon_marker_' + number + '">' +
        '<span></span>' +
        '<p>' + number + '-' + name + '</p>' +
        '</div>'
    $('.right').append(markerHtml)
    changeMarkerPosition(leftX, topY, number)
}

function changeMarkerPosition(leftX, topY, number) {
    $('.typhoon_marker_' + number).css({
        left: leftX,
        top: topY
    })
}

function deleteMarkerItem(number) {
    $('.typhoon_marker_' + number).remove()
}

function deleteMarkerAll() {
    $('.typhoon_marker').remove()
}

// 台风点位信息
function typhoonCheckTextChange(ele) {
    var typhoonCheckedArr = [ele.find('.number').text(), ele.find('.name').text(), ele.find('.english').text()]
    var typhoonText = typhoonCheckedArr.join(' ')
    $('.typhoon-checked-current').text(typhoonText)
    typhoonPointList(ele.find('.number').text(), function(res) {
        var tableHtml = ''
        res.data.forEach(function(item, index) {
            tableHtml += '<tr data-id="' + item.pointId + '">' +
                '<td>' + moment(item.time).format('MM/DD HH:mm') + '</td>' +
                '<td>' + item.speed + 'm/s</td>' +
                '<td>' + item.moveDirection + '</td>' +
                '<td>' + item.strong + '</td>' +
                '</tr>'
        })
        $('.typhoon-info-table tbody').html(tableHtml)
        $('.typhoon-info-table').scrollTop(0)
    })
}

// 清除所有选择
function handleClearAllCheck() {
    var isBool = false
    $('.search-result-list').find('.checkbox-check').each(function(index, element) {
        if ($(this).css('display') == 'block') {
            isBool = true
        }
    })
    if (isBool) {
        $('.search-result-cancel').addClass('has-select')
    } else {
        $('.search-result-cancel').removeClass('has-select')
        $('.typhoon-info-table').hide()
        $('.typhoon-table-head').hide()
        $('.typhoon-checked-current').hide()
    }
}
// 台风选项清除
function changeCheckItemTable(number) {
    var currnetElement = $('.result-checked-item-' + number)
    if (currnetElement.hasClass('active')) {
        if (currnetElement.index() != 0) {
            currnetElement.prev().addClass('active')
            typhoonCheckTextChange(currnetElement.prev())
            typhoonCheckIndex = currnetElement.index() - 1
        } else {
            $('.result-checked-item').eq(1).addClass('active')
            typhoonCheckTextChange($('.result-checked-item').eq(1))
            typhoonCheckIndex = 0
        }
    }
    currnetElement.remove()
}
// 刷新台风数据
function refreshTyphoonData() {
    typhoonTimer = setTimeout(function() {
        currentTyphoon.forEach(function(number) {
            typhoonEntryObject[number].deleteTyphoon()
            typhoonStateToPlay(number)
            getTyphoonData(number, function(res) {
                var typhoonOne = new typhoon(viewer, number, res.data)
                typhoonEntryObject[number] = typhoonOne
            })
        })
        refreshTyphoonData()
    }, 30 * 60 * 1000)
}
// 台风列表
function renderTyphoonList(isDrop) {
    $('.search-loading').show()
    $('.no_more').hide()
    $('.check_more').hide()
        //台风查询结果
    var params = {
        current: 1,
        size: 100,
        year: [],
        month: [],
        strong: []
    }
    if (isDrop) {
        currentPage += 1
        params.current = currentPage
    } else {
        currentPage = 1
        params.current = currentPage
    }
    yearCheckList.forEach(function(item, index) {
        params.year.push(parseInt(item).toString())
    })
    monthList.forEach(function(item, index) {
        var tempVal = parseInt(item) < 10 ? '0' + parseInt(item) : parseInt(item).toString()
        params.month.push(tempVal)
    })
    strongList.forEach(function(item, index) {
        var findIndex = -1
        strongListTemp.forEach(function(subitem, subindex) {
            if (item == subitem) {
                findIndex = subindex
            }
        })
        params.strong.push(findIndex + 1)
    })
    typhoonSearchList(params, function(res) {
        typhoonList = res.data.records
            // 渲染台风列表
        var typhoonListHtml = ''
        $('.search-loading').hide()
        if (currentPage >= res.data.pages) {
            $('.no_more').hide()
            $('.check_more').hide()
        } else {
            $('.no_more').hide()
            $('.check_more').show()
        }
        typhoonList.forEach(function(item, index) {
            var infoArr = [item.number, item.zhName, item.enName]
            if (item.active) {
                isHasCurrent = true
                typhoonListHtml += '<li class="search-result-item search-result-item-' + item.number + '" data-num=' + item.number + '>' +
                    '<div class="result-item-left current">' +
                    '<i class="iconfont checkbox-uncheck" style="display:none">&#xeadc;</i>' +
                    '<i class="iconfont checkbox-check" style="display:block">&#xead8;</i>' +
                    '<p class="result-item-text">' + infoArr.join(' ') + '</p>' +
                    '</div>' +
                    '<div class="result-item-right play-state">' +
                    '<i class="iconfont result-item-control stop">&#xead9;</i>' +
                    '<i class="iconfont result-item-control play">&#xeae1;</i>' +
                    '</div>' +
                    '</li>'
                if (isFirst) {
                    // 遍历到当前活动活动则显示到已选中列表中
                    var typhoonSimHTML = '<li class="result-checked-item current result-checked-item-' + item.number + '">' +
                        '<span class="number">' + item.number + '</span>' +
                        '<p class="name">' + item.zhName + '</p>' +
                        '<p class="english">' + item.enName + '</p>' +
                        '<span class="ongoing"><img src="image/active.gif"/></span>' +
                        '</li>'
                    $('.search-result-checked ul').append(typhoonSimHTML)
                    $('.typhoon-info-table').show()
                    $('.typhoon-table-head').show()
                    $('.typhoon-checked-current').show()
                    hasCheckedTyphoon.push(item.number)
                    currentTyphoon.push(item.number)
                        // 加载台风
                    getTyphoonData(item.number, function(res) {
                        var typhoonOne = new typhoon(viewer, item.number, res.data)
                        typhoonEntryObject[item.number] = typhoonOne
                    })
                }
            } else {
                typhoonListHtml += '<li class="search-result-item search-result-item-' + item.number + '" data-num=' + item.number + '>' +
                    '<div class="result-item-left">' +
                    '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
                    '<i class="iconfont checkbox-check">&#xead8;</i>' +
                    '<p class="result-item-text">' + infoArr.join(' ') + '</p>' +
                    '</div>' +
                    '<div class="result-item-right" style="display:none">' +
                    '<i class="iconfont result-item-control stop">&#xead9;</i>' +
                    '<i class="iconfont result-item-control play">&#xeae1;</i>' +
                    '</div>' +
                    '</li>'
            }
        })
        isFirst = false
        if (isDrop) {
            $('.search-result-list').append(typhoonListHtml)
        } else {
            $('.search-result-list').html(typhoonListHtml)
            $('.search-result-list-wrap').scrollTop(0)
        }
        // 若存在当前活动台风,默认显示的是第一个
        if ($('.search-result-checked li').length && typhoonCheckIndex == -1) {
            $('.search-result-checked li:first').addClass('active')
            typhoonCheckTextChange($('.search-result-checked li:first'))
            typhoonCheckIndex = 0
        }
        if (hasCheckedTyphoon.length) {
            hasCheckedTyphoon.forEach(function(item) {
                $('.search-result-item-' + item).find('.result-item-left').find('.checkbox-uncheck').hide()
                $('.search-result-item-' + item).find('.result-item-left').find('.checkbox-check').show()
                $('.search-result-item-' + item).find('.result-item-right').show()
            })
        }
        // 选项总数
        $('.search-result-num span:first').text($('.search-result-item').length)
        $('.search-result-num span:last').text(res.data.total)
    })
}
// 下拉列表重新渲染
function renderDropdownList(ele, arrayList, arrayListTemp) {
    var parent = ele.parents('.drop-down-wrap')
    var arrayList = arrayList
    if (ele.index() == 0) {
        if (ele.hasClass('checked')) {
            parent.find('.checked-all').removeClass('checked')
            parent.find('.drop-down-group li').removeClass('checked')
            parent.find('.drop-down-txt-name').text('请选择')
            parent.find('.drop-down-txt-clear').hide()
            parent.find('.drop-down-txt-num').hide()
            arrayList = []
        } else {
            ele.addClass('checked')
            parent.find('.drop-down-group li').addClass('checked')
            parent.find('.drop-down-txt-name').text('全部')
            arrayList = JSON.parse(JSON.stringify(arrayListTemp))
        }
    } else {
        var yearText = ele.find('span').text()
        if (ele.hasClass('checked')) {
            ele.removeClass('checked')
            parent.find('.checked-all').removeClass('checked')
                // console.log(yearText)
                // console.log(arrayList.indexOf(yearText))
            arrayList.splice(arrayList.indexOf(yearText), 1)
        } else {
            ele.addClass('checked')
            arrayList.push(yearText)
        }
        if (arrayList[0]) {
            parent.find('.drop-down-txt-name').text(arrayList[0])
        } else {
            parent.find('.drop-down-txt-name').text('请选择')
        }
    }
    if (!arrayList.length) {
        parent.find('.drop-down-txt-name').text('请选择')
        parent.find('.drop-down-txt-clear').hide()
        parent.find('.drop-down-txt-num').hide()
            // 按钮状态
        $('.search-condition-btn').addClass('disactive')
    } else {
        parent.find('.drop-down-txt-clear').show()
        parent.find('.drop-down-txt-num').show()
        parent.find('.drop-down-txt-name').text(arrayList[0])
        if (arrayList.length >= arrayListTemp.length) {
            parent.find('.checked-all').addClass('checked')
            parent.find('.drop-down-txt-name').text('全部')
        }
        parent.find('.drop-down-txt-num').text('+' + arrayList.length)
        $('.search-condition-btn').removeClass('disactive')
    }
    return arrayList;
}
// 清除所有下拉选项
function clearDropdownItem(ele, arrayList) {
    var parent = ele.parents('.drop-down-wrap')
    parent.find('.checked-all').removeClass('checked')
    parent.find('.drop-down-group li[data-attr=' + arrayList[0] + ']').removeClass('checked')
    arrayList.splice(0, 1)
    parent.find('.drop-down-txt-name').text(arrayList[0])
    if (!arrayList.length) {
        parent.find('.drop-down-txt-name').text('请选择')
        parent.find('.drop-down-txt-clear').hide()
        parent.find('.drop-down-txt-num').hide()
    } else {
        parent.find('.drop-down-txt-num').text('+' + arrayList.length)
    }
    return arrayList
}

//播放状态
function typhoonStateToStop(number) {
    $('.search-result-item-' + number).find('.result-item-right').removeClass('play-state')
}

function typhoonStateToPlay(number) {
    $('.search-result-item-' + number).find('.result-item-right').addClass('play-state')
}

// 测距清除
function clearMeasureDistanceBtn() {
    $('.nav-fold-three li').removeClass('active')
}

// 风险区划模块
function formatRiskLevel(level) {
    if (parseInt(level) == 0) {
        return '无'
    } else if (parseInt(level) == 1) {
        return '低'
    } else if (parseInt(level) == 2) {
        return '较低'
    } else if (parseInt(level) == 3) {
        return '较高'
    } else if (parseInt(level) == 4) {
        return '高'
    }
}
//风险区划图
function renderAssessmentList(isDrop) {
    $('.search-loading').show()
    $('.no_more').hide()
    $('.check_more').hide()
    var params = {
        current: 1,
        size: 100,
        typhoonLevelId: typhoonLevelId
    }
    if (isDrop) {
        disasterPage += 1
        params.current = disasterPage
    } else {
        disasterPage = 1
        params.current = disasterPage
        $('.path-info-table').scrollTop(0)
    }
    zonationCommunityAssessmentList(params, function(res) {
        $('.search-loading').hide()
        if (disasterPage >= res.data.pages) {
            $('.no_more').hide()
            $('.check_more').hide()
                // if (res.data.total < 20) {
                // 	$('.no_more').hide()
                // }
        } else {
            $('.no_more').hide()
            $('.check_more').show()
        }
        assessmentList = res.data.records
        var assessmentHtml = ''
        assessmentList.forEach(function(item, index) {
            assessmentHtml += '<tr data-lat="' + item.latitude + '" data-lon="' + item.longitude + '" data-name="' + item.name + '" data-type="' + item.type + '" data-id="' + item.id + '">' +
                '<td>' + item.name + '</td>' +
                '<td>' + formatRiskLevel(item.riskLevel) + '</td>' +
                '<td>' + (Number(item.totalPopulation) ? item.totalPopulation : '-') + '</td>' +
                '</tr>'
        })
        if (isDrop) {
            $('.assess-info-table tbody').append(assessmentHtml)
        } else {
            $('.assess-info-table tbody').html(assessmentHtml)
        }
    })
}
//淹没分析
function renderAvoidancePointList(isDrop) {
    $('.search-loading').show()
    $('.no_more').hide()
    $('.check_more').hide()
    var params = {
        current: 1,
        size: 100,
        typhoonLevelId: typhoonLevelId
    }
    if (isDrop) {
        disasterPage += 1
        params.current = disasterPage
    } else {
        disasterPage = 1
        params.current = disasterPage
        $('.path-info-table').scrollTop(0)
    }
    zonationDisasterAvoidancePointList(params, function(res) {
        $('.search-loading').hide()
        if (disasterPage >= res.data.pages) {
            $('.no_more').hide()
            $('.check_more').hide()
                // if (res.data.total < 20) {
                // 	$('.no_more').hide()
                // }
        } else {
            $('.no_more').hide()
            $('.check_more').show()
        }
        avoidanceList = res.data.records
        var avoidanceHtml = ''
        avoidanceList.forEach(function(item, index) {
            if (item.dangerous) {
                avoidanceHtml += '<tr data-lat="' + item.latitude + '" data-lon="' + item.longitude + '" data-name="' + item.name + '" data-type="' + item.type + '" data-id="' + item.id + '">' +
                    '<td>' +
                    '<i class="iconfont">&#xe6dc;</i>' +
                    '<span>' + item.name + '</span>' +
                    '</td>' +
                    '<td>' + (Number(item.altitude) ? item.altitude : '-') + '</td>' +
                    '<td>有</td>' +
                    '</tr>'
            } else {
                avoidanceHtml += '<tr data-lat="' + item.latitude + '" data-lon="' + item.longitude + '" data-name="' + item.name + '" data-type="' + item.type + '" data-id="' + item.id + '">' +
                    '<td>' +
                    '<span>' + item.name + '</span>' +
                    '</td>' +
                    '<td>' + (Number(item.altitude) ? item.altitude : '-') + '</td>' +
                    '<td>无</td>' +
                    '</tr>'
            }
        })
        if (isDrop) {
            $('.disaster-info-table tbody').append(avoidanceHtml)
        } else {
            $('.disaster-info-table tbody').html(avoidanceHtml)
        }
    })
}
//脆弱性分析
function renderZonationWeekLevelList(isDrop) {
    $('.search-loading').show()
    $('.no_more').hide()
    $('.check_more').hide()
    var params = {
        current: 1,
        size: 100,
        district: districtId
    }
    if (isDrop) {
        disasterPage += 1
        params.current = disasterPage
    } else {
        disasterPage = 1
        params.current = disasterPage
        $('.path-info-table').scrollTop(0)
    }
    zonationWeekLevelList(params, function(res) {
        $('.search-loading').hide()
        if (disasterPage >= res.data.pages) {
            $('.no_more').hide()
            $('.check_more').hide()
                // if (res.data.total < 20) {
                // 	$('.no_more').hide()
                // }
        } else {
            $('.no_more').hide()
            $('.check_more').show()
        }
        weekLevelList = res.data.records
        var weekLevelHtml = ''
        weekLevelList.forEach(function(item, index) {
            weekLevelHtml += '<tr data-lat="' + item.latitude + '" data-lon="' + item.longitude + '" data-name="' + item.name + '" data-type="' + item.type + '" data-id="' + item.id + '">' +
                '<td>' + item.name + '</td>' +
                '<td>' + formatRiskLevel(item.weekLevel) + '</td>' +
                '<td>' + (Number(item.totalPopulation) ? item.totalPopulation : '-') + '</td>' +
                '</tr>'
        })
        if (isDrop) {
            $('.assess-info-table tbody').append(weekLevelHtml)
        } else {
            $('.assess-info-table tbody').html(weekLevelHtml)
        }
    })
}
// 风险等级
function renderDisasterClassData(params) {
    if (globalRiskData) {
        globalRiskData.remove()
        globalRiskData = null
    }
    // if (is905hPa) {
    // 	globalRiskData = new riskData(res, true)
    // } else {
    zonationShpList(params, function(res) {
            globalRiskData = new riskData(res, false)
            globalRiskData.updateAlpha(opacityRate)
        })
        // }
}
// 图例变更
function changeLegendShow(type, isClear) {
    $('.risk-rating-legend').show()
    $('.statistics-module').show()
    $('.risk-rating-legend').css('left', '320px')
    if (type == 0) {
        $('.statistics-module-bar').show()
        $('.statistics-module-bar').find('.disaster-statistics-title span').text('社区（村）脆弱性等级数量统计')
        $('.risk-rating-legend').find('.disaster-statistics-title span').text('脆弱性评价图例')
        $('.water-depth-legend').hide()
        zonationWeekLevelBar({ district: districtId }, function(res) {
            renderDisasterPieEchart(res.data, 0)
        })
    } else if (type == 1) {
        $('.risk-rating-legend').css('left', '0px')
        $('.statistics-module-bar').hide()
        $('.water-depth-legend').hide()
        $('.risk-rating-legend').find('.disaster-statistics-title span').text('风险等级图例')
    } else if (type == 2) {
        $('.statistics-module-bar').show()
        $('.statistics-module-bar').find('.disaster-statistics-title span').text('社区（村）风险评估数量统计')
        $('.risk-rating-legend').find('.disaster-statistics-title span').text('风险区划图例')
        $('.water-depth-legend').hide()
        zonationCommunityAssessmentBar({ typhoonLevelId: typhoonLevelId }, function(res) {
            renderDisasterPieEchart(res.data, 1)
        })
    } else if (type == 3) {
        $('.risk-rating-legend').css('left', '0px')
        $('.statistics-module-bar').hide()
        $('.water-depth-legend').hide()
        $('.risk-rating-legend').find('.disaster-statistics-title span').text('危险性评价图例')
    } else if (type == 4) {
        $('.statistics-module-bar').show()
        $('.statistics-module-bar').find('.disaster-statistics-title span').text('避灾点淹没风险统计')
        $('.risk-rating-legend').hide()
        $('.water-depth-legend').show()
        zonationDisasterAvoidancePointBar({ typhoonLevelId: typhoonLevelId }, function(res) {
            renderAccessPieEchart(res.data)
        })
    } else {
        $('.statistics-module').hide()
    }
    if (isClear) {
        // 清除
        $('.access-btn').removeClass('active')
        if (urgentRiskData) {
            urgentRiskData.remove()
            urgentRiskData = null
        }
        if (globalRiskData) {
            globalRiskData.remove()
            globalRiskData = null
        }
        removeBillboardByBillboardName('coordinate')
    }
}
//等级选择
function levelListChange() {
    if (subNavIndex == 0) {
        $('.typhoon-type').hide()
        $('.zone-type').show()
    } else if (subNavIndex == 1) {
        $('.typhoon-type').show()
        $('.zone-type').show()
    } else {
        $('.typhoon-type').show()
        $('.zone-type').hide()
    }
}
// 风险区划二级切换数据加载
function refreshDisasterTable() {
    reBuildHeight(subNavIndex)
    changeLegendShow(subNavIndex, true)
    var params = {
        type: parseInt(subNavIndex) + 1
    }
    if (subNavIndex == 1) {
        $('.assess-result').eq(3).show().siblings().hide()
        if (typhoonLevelId && districtId) {
            params.typhoonLevelId = typhoonLevelId
            params.district = districtId
            renderDisasterClassData(params)
        }
    } else {
        // var is905hPa = false
        if (subNavIndex == 2) {
            $('.assess-result').eq(1).show().siblings().hide()
                // if($('.typhoon-type-strength li.active').find('span').text() == '905hPa'){
                // 	is905hPa = true
                // }
            renderAssessmentList()
        } else if (subNavIndex == 4) {
            // 清除
            $('.access-btn').removeClass('active')
            $('.assess-result').eq(2).show().siblings().hide()
            renderAvoidancePointList()
        } else if (subNavIndex == 0) {
            $('.assess-result').eq(0).show().siblings().hide()
            renderZonationWeekLevelList()
        } else {
            $('.assess-result').eq(3).show().siblings().hide()
        }
        if (typhoonLevelId) {
            params.typhoonLevelId = typhoonLevelId
        }
        if (districtId) {
            params.district = districtId
        }
        renderDisasterClassData(params)
    }
}
// 地区切换
function cameraViewChange(text) {
    switch (text) {
        case '揭阳市':
            cameraFly(116.373367, 23.549510, 150000)
            break
        case '惠来县':
            cameraFly(116.164627, 23.037402, 100000)
            break
        case '普宁市':
            cameraFly(116.267537, 23.297487, 100000)
            break
        case '榕城区':
            cameraFly(116.356544, 23.535976, 100000)
            break
        case '揭东区':
            cameraFly(116.412506, 23.569966, 100000)
            break
        case '揭西县':
            cameraFly(115.837440, 23.426709, 100000)
            break
        case '南海':
            // cameraFly(116.267537,23.037402,20000)
            break
    }

}
// 表格列表项点击
function disasterTableItemClick(ele) {
    ele.addClass('active').siblings().removeClass('active')
    var latitude = ele.attr('data-lat').toString()
    var longitude = ele.attr('data-lon').toString()
    var type = ele.attr('data-type').toString()
    var id = ele.attr('data-id').toString()
    var name = ele.attr('data-name')
        // 定位与弹窗
    if (latitude != 'undefined' && longitude != 'undefined') {
        // cameraFly(longitude, latitude)
        removeBillboardByBillboardName('coordinate')
        addBillboard('coordinate', name, 'coordinate', longitude, latitude, './image/coordinate.png', 1)
            // 点信息弹窗
            // 脆弱性评价与风险区划
        if (subNavIndex == 0 || subNavIndex == 2) {
            adminiUnitStructure(longitude, latitude)
        } else {
            if (type != 'undefined' && id != 'undefined') {
                disasterCartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude)
                disasterPosition = { x: disasterCartesian.x, y: disasterCartesian.y }
                disasterInfoShowById(disasterCartesian.x, disasterCartesian.y, type, id)
            } else {
                disasterInfoDelete()
            }
        }
    } else {
        disasterInfoDelete()
        removeBillboardByBillboardName('coordinate')
    }
}
// 行政单元柱体结构
function adminiUnitStructure(longitude, latitude) {
    var params = {
        type: parseInt(subNavIndex) + 1,
        longitude: longitude,
        latitude: latitude
    }
    if (typhoonLevelId) {
        params.typhoonLevelId = typhoonLevelId
    }
    if (districtId) {
        params.district = districtId
    }
    zonationCommunityInfo(params, function(res) {
        disasterCartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude)
        disasterPosition = { x: disasterCartesian.x, y: disasterCartesian.y }
        disasterInfoShow(disasterCartesian.x, disasterCartesian.y, 0, res.data.populationGatheringAreaInfo)
        riskByXY(res.data.cylinderBodyConfig)
    })
}

//承载体信息弹窗
function disasterItem(text, value) {
    return '<li>' +
        '<span>' + text + '</span>' +
        '<p>' + value + '</p>' +
        '</li>'
}

function disasterInfoShowById(left, top, type, id) {
    disasterBodyGetInfoById({ type: type, id: id }, function(res) {
        console.log(res)
        disasterInfoShow(left, top, type, res.data.info)
    })
}

function disasterInfoShowByName(left, top, type, name) {
    disasterBodyGetInfoByName({ type: type, name: name }, function(res) {
        console.log(res)
        disasterInfoShow(left, top, type, res.data.info)
    })
}

function disasterInfoPosition(left, top) {
    $('.station-info').css({
        left: left + 'px',
        top: top + 'px'
    })
}

function disasterInfoDelete() {
    $('.station-info').hide()
}

function disasterInfoShow(left, top, type, info) {
    $('.station-info').show()
    var disasterHtml = ''
    for (var key in info) {
        value = info[key]
        if (key == 'name') {
            $('.station-info-title').text(value)
        } else {
            // 堤坝工程
            if (type == 1) {
                switch (key) {
                    case 'seawallName':
                        disasterHtml += disasterItem('所属海堤', value);
                        break;
                    case 'type':
                        disasterHtml += disasterItem('海堤类型', value)
                        break;
                    case 'length':
                        disasterHtml += disasterItem('海堤长度（米）', value)
                        break;
                    case 'height':
                        disasterHtml += disasterItem('挡浪墙顶高程（米）', value)
                        break;
                    case 'waveWallHeight':
                        disasterHtml += disasterItem('海堤宽度（米）', value)
                        break;
                    case 'material':
                        disasterHtml += disasterItem('筑堤材料', value)
                        break;
                    case 'revetmentForm':
                        disasterHtml += disasterItem('护岸形式', value)
                        break;
                    case 'protectionStandard':
                        disasterHtml += disasterItem('设计防护标准（重现期）', value)
                        break;
                    case 'highTideLevel':
                        disasterHtml += disasterItem('设计高潮位（米）', value)
                        break;
                    case 'seawallCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 水闸
            } else if (type == 2) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('类型', value);
                        break;
                    case 'designStandard':
                        disasterHtml += disasterItem('设计标准（重现期）', value)
                        break;
                    case 'sluiceDischarge':
                        disasterHtml += disasterItem('过闸流量（立法米每秒）', value)
                        break;
                    case 'sluiceCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 泵站
            } else if (type == 3) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem(' 类型（A/B/C）', value);
                        break;
                    case 'level':
                        disasterHtml += disasterItem('设工程级别（1/2/3/4/5）', value)
                        break;
                    case 'installedDischarge':
                        disasterHtml += disasterItem('装机流量（立方米每秒）', value)
                        break;
                    case 'designLift':
                        disasterHtml += disasterItem('设计扬程（米）', value)
                        break;
                    case 'pumpNum':
                        disasterHtml += disasterItem('水泵数量（台）', value)
                        break;
                    case 'pumpCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 渔港
            } else if (type == 4) {
                switch (key) {
                    case 'level':
                        disasterHtml += disasterItem('渔港等级', value);
                        break;
                    case 'windEscapeLevel':
                        disasterHtml += disasterItem('避风等级', value)
                        break;
                    case 'shipsAboveSixtyHorsepower':
                        disasterHtml += disasterItem('设计容纳量60马力以上（艘）', value)
                        break;
                    case 'shipsUnderSixtyHorsepower':
                        disasterHtml += disasterItem('设计容量60马力以下（艘）', value)
                        break;
                    case 'wharfNumber':
                        disasterHtml += disasterItem(' 码头数量（个）', value)
                        break;
                    case 'wharfLength':
                        disasterHtml += disasterItem('码头长度（米）', value)
                        break;
                    case 'revetmentLength':
                        disasterHtml += disasterItem('护岸长度（米）', value)
                        break;
                    case 'breakwaterLength':
                        disasterHtml += disasterItem('防护堤长度', value)
                        break;
                    case 'portCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 避风锚地
            } else if (type == 5) {
                switch (key) {
                    case 'tonnageMax':
                        disasterHtml += disasterItem('可锚泊船只的最大吨位（万吨）', value);
                        break;
                    case 'capacity':
                        disasterHtml += disasterItem('容纳量（艘）', value)
                        break;
                    case 'waterDepth':
                        disasterHtml += disasterItem('水深（米）', value)
                        break;
                    case 'waterArea':
                        disasterHtml += disasterItem('水域面积（平方米）', value)
                        break;
                    case 'purpose':
                        disasterHtml += disasterItem('用途', value)
                        break;
                }
                // 港口码头
            } else if (type == 6) {
                switch (key) {
                    case 'subordinate':
                        disasterHtml += disasterItem('所属港口/企业', value);
                        break;
                    case 'type':
                        disasterHtml += disasterItem('类型（A/B/C/D/E）', value)
                        break;
                    case 'berthsNumber':
                        disasterHtml += disasterItem('泊位个数', value)
                        break;
                    case 'builtScale':
                        disasterHtml += disasterItem('船舶通航量（艘）', value)
                        break;
                }
                // 机场
            } else if (type == 7) {
                switch (key) {
                    case 'area':
                        disasterHtml += disasterItem('面积（公顷）', value);
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'dailyFlightFlow':
                        disasterHtml += disasterItem('日航班流量（架次）', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'airportCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 修造船厂
            } else if (type == 8) {
                switch (key) {
                    case 'annualOutput':
                        disasterHtml += disasterItem('年产值（万元）', value);
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'shipyardCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 发电设施
            } else if (type == 9) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('设施类型', value);
                        break;
                    case 'characteristic':
                        disasterHtml += disasterItem('特征指标', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 变电设施
            } else if (type == 10) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('设施类型', value);
                        break;
                    case 'characteristic':
                        disasterHtml += disasterItem('特征指标', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 钢铁基地
            } else if (type == 11) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('工程类型', value);
                        break;
                    case 'annualOutput':
                        disasterHtml += disasterItem('年产量（万吨）', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 石油化工基地
            } else if (type == 12) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('工程类型', value);
                        break;
                    case 'productCategory':
                        disasterHtml += disasterItem('产品种类', value)
                        break;
                    case 'annualOutput':
                        disasterHtml += disasterItem('年生成或加工能力', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 危险化学品设施
            } else if (type == 13) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('企业类型', value);
                        break;
                    case 'dangerousType':
                        disasterHtml += disasterItem('危险品种类及数量（吨/年）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 油气运输管道
            } else if (type == 14) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('工程类型', value);
                        break;
                    case 'annualOutput':
                        disasterHtml += disasterItem('年产量（立方米）', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 学校
            } else if (type == 15) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('类别', value);
                        break;
                    case 'studentNumber':
                        disasterHtml += disasterItem('在校学生人数（人）', value)
                        break;
                    case 'staffNumber':
                        disasterHtml += disasterItem('在校职工人数（人）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                }
                // 医院
            } else if (type == 16) {
                switch (key) {
                    case 'level':
                        disasterHtml += disasterItem('类别', value);
                        break;
                    case 'staffNumber':
                        disasterHtml += disasterItem('现有职工数（人）', value)
                        break;
                    case 'bedNumber':
                        disasterHtml += disasterItem('核定床位数（张）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'telephone':
                        disasterHtml += disasterItem('联系电话', value)
                        break;
                }
                // 人口聚集区
            } else if (type == 17) {
                switch (key) {
                    case 'name':
                        disasterHtml += disasterItem('名称', value);
                        break;
                    case 'district':
                        disasterHtml += disasterItem('区县', value)
                        break;
                    case 'town':
                        disasterHtml += disasterItem('乡镇', value)
                        break;
                    case 'statisticalYear':
                        disasterHtml += disasterItem('统计年度（年）', value)
                        break;
                    case 'totalPopulation':
                        disasterHtml += disasterItem('总人口数（人）', value)
                        break;
                    case 'totalHouseholds':
                        disasterHtml += disasterItem('总户数', value)
                        break;
                }
                // 工业园区
            } else if (type == 18) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('类型', value);
                        break;
                    case 'level':
                        disasterHtml += disasterItem('等级', value)
                        break;
                    case 'industrialOutput':
                        disasterHtml += disasterItem('工业总产值', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'parkCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 自然保护区
            } else if (type == 19) {
                switch (key) {
                    case 'level':
                        disasterHtml += disasterItem('等级', value);
                        break;
                    case 'protectedObject':
                        disasterHtml += disasterItem('主要保护对象', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                }
                // 旅游娱乐区
            } else if (type == 20) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('娱乐类型', value);
                        break;
                    case 'level':
                        disasterHtml += disasterItem('等级', value);
                        break;
                    case 'dailyVisitorNumber':
                        disasterHtml += disasterItem('设定日游客接待量（人）', value)
                        break;
                    case 'peakSeasonDailyVisitorNumber':
                        disasterHtml += disasterItem('旺季日常游客接待量（人）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'zoneCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 物资储备基地
            } else if (type == 21) {
                switch (key) {
                    case 'type':
                        disasterHtml += disasterItem('物资类型', value);
                        break;
                    case 'storageCapacity':
                        disasterHtml += disasterItem('储量（吨）', value);
                        break;
                    case 'totalCapacity':
                        disasterHtml += disasterItem('总容量（吨）', value)
                        break;
                    case 'totalInvestment':
                        disasterHtml += disasterItem('总投资（万元）', value)
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方米）', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                    case 'facilityCreateTime':
                        disasterHtml += disasterItem('建成时间', moment(value).format('YYYY年MM月DD日'))
                        break;
                }
                // 避灾点
            } else if (type == 22) {
                switch (key) {
                    case 'address':
                        disasterHtml += disasterItem('物资类型', value);
                        break;
                    case 'accommodation':
                        disasterHtml += disasterItem('可容纳人数（人）', value);
                        break;
                    case 'buildArea':
                        disasterHtml += disasterItem('建筑面积（平方米）', value)
                        break;
                    case 'buildingStructure':
                        disasterHtml += disasterItem(' 建筑结构', value)
                        break;
                    case 'lightingFacilities':
                        disasterHtml += disasterItem('照明设施', value)
                        break;
                    case 'sanitationFacilities':
                        disasterHtml += disasterItem('卫生设施', value)
                        break;
                    case 'medicalEquipment':
                        disasterHtml += disasterItem('医疗设备', value)
                        break;
                    case 'heatingEquipment':
                        disasterHtml += disasterItem('取暖设备', value)
                        break;
                    case 'disasterPreventionMaterials':
                        disasterHtml += disasterItem('避灾物资', value)
                        break;
                    case 'altitude':
                        disasterHtml += disasterItem('高程（米）', value)
                        break;
                }
                // 航标信息
            } else if (type == 23) {
                switch (key) {
                    case 'number':
                        disasterHtml += disasterItem('编号', value);
                        break;
                    case 'lampQuality':
                        disasterHtml += disasterItem('灯质', value);
                        break;
                    case 'lampHeight':
                        disasterHtml += disasterItem('灯高（米）', value)
                        break;
                    case 'range':
                        disasterHtml += disasterItem('射程（海里）', value)
                        break;
                    case 'structure':
                        disasterHtml += disasterItem('构造', value)
                        break;
                    case 'remark':
                        disasterHtml += disasterItem('附件', value)
                        break;
                }
            } else if (type == 0) {
                switch (key) {
                    case 'district':
                        disasterHtml += disasterItem('区县', value);
                        break;
                    case 'town':
                        disasterHtml += disasterItem('乡镇', value);
                        break;
                    case 'area':
                        disasterHtml += disasterItem('面积（平方公里）', value)
                        break;
                    case 'statisticalYear':
                        disasterHtml += disasterItem('统计年度', value)
                        break;
                    case 'totalPopulation':
                        disasterHtml += disasterItem('总人口（人）', value)
                        break;
                    case 'totalHouseholds':
                        disasterHtml += disasterItem('总户数', value)
                        break;
                    case 'weekLevel':
                        disasterHtml += disasterItem('脆弱等级', formatRiskLevel(value))
                        break;
                    case 'riskLevel':
                        var disasterItemTitle = '风险等级（'
                        if (info['typhoonLevel']) {
                            disasterItemTitle += info['typhoonLevel'] + 'hPa'
                        }
                        disasterItemTitle += '）'
                        disasterHtml += disasterItem(disasterItemTitle, formatRiskLevel(value))
                        break;
                }
            }
        }
    }
    $('.station-info-list').html(disasterHtml)
    $('.station-info').attr('data-type', type)
}
// 近岸预报
function getLatestDailyDetail() {
    // $('.report-dialog').show()
    latestDailyDetail({ seaAreaCode: 4 }, function(res) {
        $('.report-content').text(res.data.content)
        $('.report-time').text('（' + moment(new Date(res.data.releaseTime)).format('YYYY年MM月DD日HH时') + '发布）')
    })
}

function getLatestThreeDayDetail(name) {
    $('.report-dialog').show()
    latestThreeDayDetail({ seaAreaCode: 4 }, function(res1) {

        var data = {
            "data": {
                "releaseTime": 1587610800000,
                "type": 2,
                "sea": [{
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "temp": "21.9-22.3",
                        "waves": {
                            "day": {
                                "level": "1.6-2.4",
                                "grade": "中浪"
                            },
                            "night": {
                                "level": "1.7-2.4",
                                "grade": "中浪"
                            }
                        },
                        "wind": {
                            "direction": "东北",
                            "power": "5-6级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "temp": "21.4-22.0",
                        "waves": {
                            "day": {
                                "level": "1.5-2.2",
                                "grade": "中浪"
                            },
                            "night": {
                                "level": "1.3-1.9",
                                "grade": "中浪"
                            }
                        },
                        "wind": {
                            "direction": "东北",
                            "power": "5-6级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "temp": "21.5-21.9",
                        "waves": {
                            "day": {
                                "level": "0.9-1.5",
                                "grade": "轻浪到中浪"
                            },
                            "night": {
                                "level": "0.8-1.1",
                                "grade": "轻浪"
                            }
                        },
                        "wind": {
                            "direction": "东-东北",
                            "power": "3-5级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "temp": "21.9-22.3",
                        "waves": {
                            "day": {
                                "level": "1.6-2.4",
                                "grade": "中浪"
                            },
                            "night": {
                                "level": "1.7-2.4",
                                "grade": "中浪"
                            }
                        },
                        "wind": {
                            "direction": "东北",
                            "power": "5-6级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "temp": "21.4-22.0",
                        "waves": {
                            "day": {
                                "level": "1.5-2.2",
                                "grade": "中浪"
                            },
                            "night": {
                                "level": "1.3-1.9",
                                "grade": "中浪"
                            }
                        },
                        "wind": {
                            "direction": "东北",
                            "power": "5-6级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "temp": "21.5-21.9",
                        "waves": {
                            "day": {
                                "level": "0.9-1.5",
                                "grade": "轻浪到中浪"
                            },
                            "night": {
                                "level": "0.8-1.1",
                                "grade": "轻浪"
                            }
                        },
                        "wind": {
                            "direction": "东-东北",
                            "power": "3-5级"
                        }
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "temp": "21.5-21.9",
                        "waves": {
                            "day": {
                                "level": "0.9-1.5",
                                "grade": "轻浪到中浪"
                            },
                            "night": {
                                "level": "0.8-1.1",
                                "grade": "轻浪"
                            }
                        },
                        "wind": {
                            "direction": "东-东北",
                            "power": "3-5级"
                        }
                    }
                ],
                "tides": [{
                        "level": 96,
                        "time": 1587571200000,
                        "type": 2
                    },
                    {
                        "level": 102,
                        "time": 1587574800000,
                        "type": 2
                    },
                    {
                        "level": 115,
                        "time": 1587578400000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "level": 123,
                        "time": 1587581940000,
                        "type": 1
                    },
                    {
                        "level": 123,
                        "time": 1587582000000,
                        "type": 2
                    },
                    {
                        "level": 114,
                        "time": 1587585600000,
                        "type": 2
                    },
                    {
                        "level": 99,
                        "time": 1587589200000,
                        "type": 2
                    },
                    {
                        "level": 89,
                        "time": 1587592800000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "level": 87,
                        "time": 1587595500000,
                        "type": 1
                    },
                    {
                        "level": 87,
                        "time": 1587596400000,
                        "type": 2
                    },
                    {
                        "level": 93,
                        "time": 1587600000000,
                        "type": 2
                    },
                    {
                        "level": 104,
                        "time": 1587603600000,
                        "type": 2
                    },
                    {
                        "level": 112,
                        "time": 1587607200000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "level": 114,
                        "time": 1587608820000,
                        "type": 1
                    },
                    {
                        "level": 112,
                        "time": 1587610800000,
                        "type": 2
                    },
                    {
                        "level": 104,
                        "time": 1587614400000,
                        "type": 2
                    },
                    {
                        "level": 100,
                        "time": 1587618000000,
                        "type": 2
                    },
                    {
                        "level": 105,
                        "time": 1587621600000,
                        "type": 2
                    },
                    {
                        "level": 108,
                        "time": 1587625200000,
                        "type": 2
                    },
                    {
                        "level": 99,
                        "time": 1587628800000,
                        "type": 2
                    },
                    {
                        "level": 81,
                        "time": 1587632400000,
                        "type": 2
                    },
                    {
                        "level": 69,
                        "time": 1587636000000,
                        "type": 2
                    },
                    {
                        "level": 64,
                        "time": 1587639600000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587600000000,
                        "level": 64,
                        "time": 1587639900000,
                        "type": 1
                    },
                    {
                        "level": 68,
                        "time": 1587643200000,
                        "type": 2
                    },
                    {
                        "level": 78,
                        "time": 1587646800000,
                        "type": 2
                    },
                    {
                        "level": 91,
                        "time": 1587650400000,
                        "type": 2
                    },
                    {
                        "level": 97,
                        "time": 1587654000000,
                        "type": 2
                    },
                    {
                        "level": 96,
                        "time": 1587657600000,
                        "type": 2
                    },
                    {
                        "level": 98,
                        "time": 1587661200000,
                        "type": 2
                    },
                    {
                        "level": 111,
                        "time": 1587664800000,
                        "type": 2
                    },
                    {
                        "level": 127,
                        "time": 1587668400000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "level": 131,
                        "time": 1587670620000,
                        "type": 1
                    },
                    {
                        "level": 130,
                        "time": 1587672000000,
                        "type": 2
                    },
                    {
                        "level": 116,
                        "time": 1587675600000,
                        "type": 2
                    },
                    {
                        "level": 102,
                        "time": 1587679200000,
                        "type": 2
                    },
                    {
                        "level": 96,
                        "time": 1587682800000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "level": 96,
                        "time": 1587684000000,
                        "type": 1
                    },
                    {
                        "level": 98,
                        "time": 1587686400000,
                        "type": 2
                    },
                    {
                        "level": 106,
                        "time": 1587690000000,
                        "type": 2
                    },
                    {
                        "level": 115,
                        "time": 1587693600000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "level": 119,
                        "time": 1587696780000,
                        "type": 1
                    },
                    {
                        "level": 119,
                        "time": 1587697200000,
                        "type": 2
                    },
                    {
                        "level": 112,
                        "time": 1587700800000,
                        "type": 2
                    },
                    {
                        "level": 103,
                        "time": 1587704400000,
                        "type": 2
                    },
                    {
                        "level": 102,
                        "time": 1587708000000,
                        "type": 2
                    },
                    {
                        "level": 105,
                        "time": 1587711600000,
                        "type": 2
                    },
                    {
                        "level": 100,
                        "time": 1587715200000,
                        "type": 2
                    },
                    {
                        "level": 82,
                        "time": 1587718800000,
                        "type": 2
                    },
                    {
                        "level": 65,
                        "time": 1587722400000,
                        "type": 2
                    },
                    {
                        "level": 57,
                        "time": 1587726000000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587686400000,
                        "level": 56,
                        "time": 1587727860000,
                        "type": 1
                    },
                    {
                        "level": 57,
                        "time": 1587729600000,
                        "type": 2
                    },
                    {
                        "level": 65,
                        "time": 1587733200000,
                        "type": 2
                    },
                    {
                        "level": 79,
                        "time": 1587736800000,
                        "type": 2
                    },
                    {
                        "level": 92,
                        "time": 1587740400000,
                        "type": 2
                    },
                    {
                        "level": 95,
                        "time": 1587744000000,
                        "type": 2
                    },
                    {
                        "level": 94,
                        "time": 1587747600000,
                        "type": 2
                    },
                    {
                        "level": 103,
                        "time": 1587751200000,
                        "type": 2
                    },
                    {
                        "level": 122,
                        "time": 1587754800000,
                        "type": 2
                    },
                    {
                        "level": 137,
                        "time": 1587758400000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "level": 138,
                        "time": 1587759420000,
                        "type": 1
                    },
                    {
                        "level": 133,
                        "time": 1587762000000,
                        "type": 2
                    },
                    {
                        "level": 118,
                        "time": 1587765600000,
                        "type": 2
                    },
                    {
                        "level": 108,
                        "time": 1587769200000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "level": 105,
                        "time": 1587772800000,
                        "type": 1
                    },
                    {
                        "level": 108,
                        "time": 1587776400000,
                        "type": 2
                    },
                    {
                        "level": 116,
                        "time": 1587780000000,
                        "type": 2
                    },
                    {
                        "level": 123,
                        "time": 1587783600000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "level": 124,
                        "time": 1587785040000,
                        "type": 1
                    },
                    {
                        "level": 122,
                        "time": 1587787200000,
                        "type": 2
                    },
                    {
                        "level": 112,
                        "time": 1587790800000,
                        "type": 2
                    },
                    {
                        "level": 104,
                        "time": 1587794400000,
                        "type": 2
                    },
                    {
                        "level": 104,
                        "time": 1587798000000,
                        "type": 2
                    },
                    {
                        "level": 102,
                        "time": 1587801600000,
                        "type": 2
                    },
                    {
                        "level": 87,
                        "time": 1587805200000,
                        "type": 2
                    },
                    {
                        "level": 66,
                        "time": 1587808800000,
                        "type": 2
                    },
                    {
                        "level": 53,
                        "time": 1587812400000,
                        "type": 2
                    },
                    {
                        "level": 48,
                        "time": 1587816000000,
                        "type": 2
                    },
                    {
                        "predictTime": 1587610800000,
                        "predictTargetTime": 1587772800000,
                        "level": 48,
                        "time": 1587816240000,
                        "type": 1
                    },
                    {
                        "level": 52,
                        "time": 1587819600000,
                        "type": 2
                    },
                    {
                        "level": 64,
                        "time": 1587823200000,
                        "type": 2
                    },
                    {
                        "level": 80,
                        "time": 1587826800000,
                        "type": 2
                    }
                ],
                "next": "1271261232027471874"
            },
            "code": 200
        }
        var res = JSON.parse(JSON.stringify(data))
        console.log(res)
        var detailHtml = ''
        $('.report-dialog-header').text((name == undefined ? '揭阳惠来近岸' : name) + '未来七日海况预报(' + moment(res.data.releaseTime).format('YYYY年MM月DD日HH时') + ')')
        res.data.sea.forEach(function(item, index) {
            detailHtml += '<li class="report-table-right">' +
                '<div class="report-table-time">' + moment(item.predictTargetTime).format('MM月DD日') + '</div>' +
                '<ol class="report-table-text">' +
                '<li>白天</li>' +
                '<li>夜间</li>' +
                '</ol>' +
                '<ol class="report-table-content">' +
                '<li>' + item.waves.day.level + '</li>' +
                '<li>' + item.waves.night.level + '</li>' +
                '</ol>' +
                '<ol class="report-table-content">' +
                '<li>' + item.waves.day.grade + '</li>' +
                '<li>' + item.waves.night.grade + '</li>' +
                '</ol>' +
                '<div class="report-table-content">' + item.wind.direction + ' ' + item.wind.power + '</div>' +
                '<div class="report-table-content report-table-content-last">' + item.temp + '</div>' +
                '</li>'
        })
        $('.nav-ul').empty().append(detailHtml)
        let switchState = res.data
        if (switchState.next) {
            // $('ul .report-table-right').animate()
        } else {
            $('.next').css('background-color', '#E9EAEF')
            $('.next').css('cursor', 'not-allowed')

        }
        renderReportEchart(res.data.tides)
    })
}
// 海域单元显示与隐藏函数
function offshoreForecast(ele, isShow) {
    if (isShow) {
        ele.find('.checkbox-uncheck').hide()
        ele.find('.checkbox-check').show()
        isSeaZoneShow = true
        loadOffshoreForecast()
        if (currentNavIndex === 3) {
            loadAstronomicalTideForecastPoint()
                // getLatestThreeDayDetail()
        }
    } else {
        ele.find('.checkbox-uncheck').show()
        ele.find('.checkbox-check').hide()
        isSeaZoneShow = false
        removeBillboardByBillboardName('astronomicalTideForecastPoint.png')
        removeOffshoreForecast()
        $('.report-dialog').hide()
    }
}
// 预报弹窗关闭
function reportDialogClose() {
    $('.report-dialog').hide()
}