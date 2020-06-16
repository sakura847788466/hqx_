var subNavIndex = -1
var currentNavIndex = 0
    // 下拉列表
    // 年份下拉列表
var yearCheckList = []
var yearCheckListTemp = []
var monthList = []
var monthListTemp = []
var strongList = ['热带低压', '热带风暴', '强热带风暴', '台风', '强台风', '超强台风']
var strongListTemp = ['热带低压', '热带风暴', '强热带风暴', '台风', '强台风', '超强台风']
    // 台风列表
var isFirst = true
var currentPage = 1
var typhoonList = []
    // 已选中台风
var hasCheckedTyphoon = []
var currentTyphoon = []
var typhoonCheckIndex = -1
var isHasCurrent = false
    // 存储台风实体对象
var typhoonEntryObject = {}
    // 承灾体
var areaType = 0
var typeValArr = []
    // 风险区划
var disasterPage = 1
var typhoonLevelId = ''
var districtId = ''
var globalRiskData = null
    // 时间
var typhoonTimer = null
    // 应急疏散方案id
var emergencyId = ''
var urgentRiskData = null
    // 透明度
var opacityRate = 0.6
    // 海域单元编号
var seaZoneNumber = ''
var isSeaZoneShow = false

function resize() {
    $('.subnav-context').height($('.right').height() - 96 + 'px')
    if (!currentNavIndex) {
        reBuildHeight(-1)
    } else {
        reBuildHeight(subNavIndex)
        if (currentNavIndex === 3) {
            $('.subnav-context').height(550 + 'px')
        }
    }
    var wrapWidth = $('.header-nav').width()
    $('.header-nav-left').css('width', wrapWidth - 580 + 'px')
    window.onresize = function() {
        $('.subnav-context').height($('.right').height() - 96 + 'px')
        if (!currentNavIndex) {
            reBuildHeight(-1)
        } else {
            reBuildHeight(subNavIndex)
            if (currentNavIndex === 3) {
                $('.subnav-context').height(550 + 'px')
            }
        }
        var wrapWidth = $('.header-nav').width()
        $('.header-nav-left').css('width', wrapWidth - 580 + 'px')
    }
}
// 重置高度
function reBuildHeight(index) {
    if (index == 1) {
        var tableHeight = $('.subnav-context').height() - $('.rish-assess').height() - 90
        $('.path-info-table').css({ height: tableHeight })
    } else if (index == 2) {
        var tableHeight = $('.subnav-context').height() - $('.rish-assess').height() - 90
        $('.path-info-table').css({ height: tableHeight })
    } else if (index == 4) {
        var tableHeight = $('.subnav-context').height() - $('.rish-assess').height() - 148
        $('.path-info-table').css({ height: tableHeight })
    } else if (index == 0) {
        var tableHeight = $('.subnav-context').height() - $('.rish-assess').height() - 90
        $('.path-info-table').css({ height: tableHeight })
    } else if (index == -1) {
        var tableHeight = $('.subnav-context').height() - 626
        $('.path-info-table').css({ height: tableHeight })
    } else {
        $('.path-info-table').css({ height: 'auto' })
    }
}

$(function() {
    resize();
    // 左侧导航
    $(".nav-item").on('click.one', {}, navClickStyleOne);
    //导航栏放大缩小切换
    $(".nav-open").click(function() {
        $(this).hide();
        $(".nav-close").show();
        $(".left").addClass("small-menu");
        //      $(".right").css({width:screenWidth-89,height:screenHeight});
        $('.subnav-context').hide()
        $('.subnav-context').css('left', '89px')
        $('.header-nav').css('padding-left', '99px')
        $('.nav-item').off('click.one')
        $('.nav-item').on('click.two', {}, navClickStyleTwo)
    });
    $(".nav-close").click(function() {
        $(this).hide();
        $(".nav-open").show();
        $(".left").removeClass("small-menu");
        //      $(".right").css({width:screenWidth-288,height:screenHeight});
        $('.subnav-context').css('left', '288px')
        $('.header-nav').css('padding-left', '298px')
        $('.subnav-context').eq(currentNavIndex).show()
        $('.nav-item').off('click.two');
        $(".nav-item").on('click.one', {}, navClickStyleOne);
    });
    // 切换到后台管理
    // $(".nav-change").click(function() {
    //     var loginName = sessionStorage.getItem('userName');
    //     var loginPass = sessionStorage.getItem('password');
    //     if (loginName == null || loginPass == null || loginName == "" || loginPass == "" || loginName == undefined || loginPass == undefined) {
    //         window.location.href = "login.html";
    //     } else {
    //         window.location.href = "indexManage.html";
    //     }
    //     //window.location.href="indexManage.html";
    // });


    // 头部下拉框
    $('.header-nav-item').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active')
        $(this).parent().find('.nav-fold-drop').toggle()
        $(this).parent().siblings().find('.nav-fold-drop').hide()
        return false
    })
    $('.nav-fold-two li').click(function() {
        if ($('.nav-fold-two li.active').index() == $(this).index()) {
            return
        }
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).index() == 1) {
            setImageryViewModels('遥感地图')
        } else {
            setImageryViewModels('电子地图')
        }
        var tempVal = $(this).find('span').text()
        $(this).parents('.header-nav-li').find('.header-nav-item span').text(tempVal)
        return false
    })
    $('.nav-fold-three li').click(function() {
            if ($('.nav-fold-three li.active').index() == $(this).index()) {
                return
            }
            $(this).addClass('active')
            new measureDistance(viewer)
            return false
        })
        //预报机构
    $('.report-organ-open .report-organ-btn').click(function() {
        $(this).parents('.report-organ').find('.report-organ-close').show()
        $(this).parent().hide()
    })
    $('.report-organ-close .report-organ-btn').click(function() {
        $(this).parents('.report-organ').find('.report-organ-open').show()
        $(this).parent().hide()
    })
    $('.report-organ-item').click(function() {
            $(this).find('.checkbox-uncheck').toggle()
            $(this).find('.checkbox-check').toggle()
            var isShow = false
            var organ = $(this).attr('data-text')
            if ($(this).find('.checkbox-check').css('display') == 'none') {
                isShow = false
            } else {
                isShow = true
            }
            $.each(typhoonEntryObject, function(key, value) {
                value.forecastingAgencyIsShow(organ, isShow)
            })
        })
        //下拉列表
        // 年份下拉列表
    var yearHtml = ''
    typhoonYearList(function(res) {
        if (res.code === 200 && res.data) {
            for (var i = 0; i < res.data.list.length; i++) {
                yearHtml += '<li data-attr="' + res.data.list[i] + '年">' +
                    '<span>' + res.data.list[i] + '年</span>' +
                    '<i class="iconfont">&#xeaf1;</i>' +
                    '</li>'
                yearCheckListTemp.push(res.data.list[i] + '年')
            }
            $('.drop-down-group-year').append(yearHtml)
            $('.drop-down-group-year li:eq(1)').addClass('checked')
            $('.form-item-year .drop-down-txt-name').text(res.data.list[0] + '年')
            yearCheckList.push(res.data.list[0] + '年')
            $('.form-item-year').find('.form-item-year').text()
            $('.form-item-year').find('.drop-down-txt-num').text('+' + 1)
                //台风查询结果
            renderTyphoonList()
        }
    })

    // 月份下拉列表
    var monthHtml = ''
    for (var i = 0; i < 12; i++) {
        monthHtml += '<li class="checked" data-attr="' + (i + 1) + '月份">' +
            '<span>' + (i + 1) + '月份</span>' +
            '<i class="iconfont">&#xeaf1;</i>' +
            '</li>'
        monthList.push((i + 1) + '月份')
        monthListTemp.push((i + 1) + '月份')
    }
    $('.drop-down-group-month').append(monthHtml)
    $('.form-item-month').find('.drop-down-txt-num').text('+' + monthListTemp.length)

    // 强度下拉列表
    var strongHtml = ''
    for (var i = 0; i < strongList.length; i++) {
        strongHtml += '<li class="checked" data-attr="' + strongList[i] + '">' +
            '<span>' + strongList[i] + '</span>' +
            '<i class="iconfont">&#xeaf1;</i>' +
            '</li>'
    }
    $('.drop-down-group-strong').append(strongHtml)
    $('.form-item-strong').find('.drop-down-txt-num').text('+' + strongListTemp.length)

    //下拉列表操作
    $('.drop-down-select').click(function(e) {
        $(this).parents('.form-item-wrap').find('.drop-down-wrap').toggleClass('active')
        $(this).parents('.form-item-wrap').siblings().find('.drop-down-wrap').removeClass('active')
        return false;
    })
    $('.drop-down-group-year').on('click', 'li', function(e) {
        yearCheckList = renderDropdownList($(this), yearCheckList, yearCheckListTemp)
        return false;
    })
    $('.drop-down-group-month').on('click', 'li', function(e) {
        monthList = renderDropdownList($(this), monthList, monthListTemp)
        return false;
    })
    $('.drop-down-group-strong').on('click', 'li', function(e) {
            strongList = renderDropdownList($(this), strongList, strongListTemp)
            return false;
        })
        //清除下拉列表选项
    $('.form-item-year').find('.drop-down-txt-clear').click(function() {
        yearCheckList = clearDropdownItem($(this), yearCheckList)
        return false
    })
    $('.form-item-month').find('.drop-down-txt-clear').click(function() {
        monthList = clearDropdownItem($(this), monthList)
        return false
    })
    $('.form-item-strong').find('.drop-down-txt-clear').click(function() {
        strongList = clearDropdownItem($(this), strongList)
        return false
    })
    $('body').click(function() {
        $('.drop-down-wrap').removeClass('active')
        $('.nav-fold-drop').hide()
    })

    //台风
    // 加载台风列表按钮
    $('.search-condition-btn button').click(function() {
            if ($(this).parent().hasClass('disactive')) {
                return
            }
            renderTyphoonList()
        })
        // 选择台风
    layui.use('layer', function() {
            var layer = layui.layer
            $('.search-result-list').on('click', '.result-item-left', function() {
                if ($(this).hasClass('current')) {
                    return
                }
                if ($(this).find('.checkbox-check').css('display') == 'none') {
                    // 最多只能选择5个
                    if (hasCheckedTyphoon.length >= 5) {
                        layer.msg('最多叠加5场台风！', {
                            icon: 0,
                            offset: 'rb',
                            tipsMore: false,
                            time: 3000
                        });
                        return
                    }
                }
                $(this).find('.checkbox-uncheck').toggle()
                $(this).find('.checkbox-check').toggle()
                handleClearAllCheck()
                var typhoonNumber = $(this).parent().attr('data-num')
                    // 选择
                if ($(this).find('.checkbox-check').css('display') != 'none') {
                    var tempArr = $(this).find('.result-item-text').text().split(' ')
                    var typhoonSimHTML = '<li class="result-checked-item result-checked-item-' + typhoonNumber + '">' +
                        '<span class="number">' + tempArr[0] + '</span>' +
                        '<p class="name">' + tempArr[1] + '</p>' +
                        '<p class="english">' + tempArr[2] + '</p>' +
                        '<span class="clear" data-num="' + typhoonNumber + '"><i class="iconfont">&#xeaf2;</i></span>' +
                        '</li>'
                    $('.search-result-checked ul').append(typhoonSimHTML)
                    $('.typhoon-info-table').show()
                    $('.typhoon-table-head').show()
                    $('.typhoon-checked-current').show()
                    $('.search-result-checked li:last').addClass('active').siblings().removeClass('active')
                    typhoonCheckTextChange($('.search-result-checked li:last'))
                    $(this).parent().find('.result-item-right').show()
                    hasCheckedTyphoon.push(typhoonNumber)
                        // 默认选择最后一个
                    typhoonCheckIndex = hasCheckedTyphoon.length - 1
                        // 加载台风
                    typhoonStateToPlay(typhoonNumber)
                    getTyphoonData(typhoonNumber, function(res) {
                            var typhoonOne = new typhoon(viewer, typhoonNumber, res.data)
                            typhoonEntryObject[typhoonNumber] = typhoonOne
                            for (var i = 0; i < 5; i++) {
                                if ($('.report-organ-item').eq(i).find('.checkbox-check').css('display') == 'none') {
                                    var organ = $('.report-organ-item').eq(i).attr('data-text')
                                    typhoonOne.forecastingAgencyIsShow(organ, false)
                                }
                            }
                        })
                        // 设置滚动位置
                    var offsetLeft = $('.search-result-checked li:last').offset().left
                    $('.search-result-checked').scrollLeft(offsetLeft)
                        // 取消选择
                } else {
                    $(this).parent().find('.result-item-right').hide()
                    changeCheckItemTable(typhoonNumber)
                    if (!$('.search-result-checked li:not(.current)').length) {
                        $('.search-result-cancel').removeClass('has-select')
                    }
                    hasCheckedTyphoon.splice(hasCheckedTyphoon.indexOf(typhoonNumber), 1)
                        // 删除台风
                    typhoonEntryObject[typhoonNumber].deleteTyphoon()
                    if (typhoonNumber == parseInt($('.typhoon-info-title h4').text()).toString()) {
                        typhoonInfoDelete()
                    }
                }
            })
        })
        // 暂停播放
    $('.search-result-list').on('click', '.result-item-right', function() {
            if ($(this).hasClass('play-state')) {
                return
            }
            $(this).toggleClass('play-state')
                // 重播
            if ($(this).hasClass('play-state')) {
                typhoonInfoDelete()
                var typhoonNumber = $(this).parent().attr('data-num')
                    //  		console.log(typhoonEntryObject[typhoonNumber])
                    //  		if (typhoonEntryObject[typhoonNumber]) {
                    //  			viewer.clockViewModel.shouldAnimate = true
                    //  		} else {
                viewer.clockViewModel.shouldAnimate = true
                typhoonEntryObject[typhoonNumber].deleteTyphoon()
                getTyphoonData(typhoonNumber, function(res) {
                        var typhoonOne = new typhoon(viewer, typhoonNumber, res.data)
                        typhoonEntryObject[typhoonNumber] = typhoonOne
                        for (var i = 0; i < 5; i++) {
                            if ($('.report-organ-item').eq(i).find('.checkbox-check').css('display') == 'none') {
                                var organ = $('.report-organ-item').eq(i).attr('data-text')
                                typhoonOne.forecastingAgencyIsShow(organ, false)
                            }
                        }
                    })
                    //  		}
                    // 暂停
            } else {
                viewer.clockViewModel.shouldAnimate = false
            }
        })
        // 取消所有选择
    $('.search-result-cancel').click(function() {
            $('.search-result-list .result-item-left:not(.current)').find('.checkbox-uncheck').show()
            $('.search-result-list .result-item-left:not(.current)').find('.checkbox-check').hide()
            $('.search-result-cancel').removeClass('has-select')
                // 没有实时台风，则删除所有
            if (!isHasCurrent) {
                $('.typhoon-info-table').hide()
                $('.typhoon-table-head').hide()
                $('.typhoon-checked-current').hide()
                $('.search-result-checked ul').empty()
                hasCheckedTyphoon = []
                $.each(typhoonEntryObject, function(key, value) {
                    value.deleteTyphoon()
                })
                $('.search-result-item').find('.result-item-right').hide()
            } else {
                $('.search-result-checked li:not(.current)').each(function() {
                    var typhoonNumber = $(this).find('.number').text()
                    typhoonEntryObject[typhoonNumber].deleteTyphoon()
                    $('.search-result-item-' + typhoonNumber).find('.result-item-right').hide()
                    if (typhoonNumber == parseInt($('.typhoon-info-title h4').text()).toString()) {
                        typhoonInfoDelete()
                    }
                })
                $('.search-result-checked li:not(.current)').remove()
                $('.search-result-checked li:last').addClass('active')
                typhoonCheckTextChange($('.search-result-checked li:last'))
                hasCheckedTyphoon = JSON.parse(JSON.stringify(currentTyphoon))
            }
        })
        // 已选中台风
    $('.search-result-checked').mousewheel(function(event, delta) {
        var dir = delta > 0 ? 'Up' : 'Down';
        var left = $(this).scrollLeft()
        if (dir == 'Up') {
            $(this).scrollLeft(left - 50)
        } else {
            $(this).scrollLeft(left + 50)
        }
        return false;
    });
    // 点击已选台风
    $('.search-result-checked').on('click', 'li', function() {
            typhoonCheckIndex = $(this).index()
            $(this).addClass('active').siblings().removeClass('active')
            $('.typhoon-checked-current').show()
            $('.typhoon-info-table').show()
            $('.typhoon-table-head').show()
            typhoonCheckTextChange($(this))
        })
        // 清除台风
    $('.search-result-checked').on('click', '.clear', function() {
            var typhoonNumber = $(this).attr('data-num');
            changeCheckItemTable(typhoonNumber)
            $('.search-result-item-' + typhoonNumber).find('.checkbox-uncheck').toggle()
            $('.search-result-item-' + typhoonNumber).find('.checkbox-check').toggle()
            $('.search-result-item-' + typhoonNumber).find('.result-item-right').hide()
                // 清除台风
            hasCheckedTyphoon.splice(hasCheckedTyphoon.indexOf(typhoonNumber), 1)
            typhoonEntryObject[typhoonNumber].deleteTyphoon()
            if (!$('.search-result-checked li:not(.current)').length && !$('.search-result-checked li').length) {
                $('.search-result-cancel').removeClass('has-select')
                $('.typhoon-checked-current').hide()
                $('.typhoon-info-table').hide()
                $('.typhoon-table-head').hide()
            }
            if (!$('.search-result-checked li:not(.current)').length) {
                $('.search-result-cancel').removeClass('has-select')
            }
            if (typhoonNumber == parseInt($('.typhoon-info-title h4').text()).toString()) {
                typhoonInfoDelete()
            }
            return false;
        })
        // 台风表格点击
    $('.typhoon-info-table').on('click', 'tr', function() {
        console.log($(this).attr('data-id'))
    })

    //承灾体
    var arrListOne = ['堤防工程', '水闸', '泵站', '渔港', '避风锚地', '港口码头', '机场', '修、造船厂']
    var arrListTwo = ['发电设施', '变电设施', '钢铁基地', '石油化工基地', '危险化学品设施', '油气运输管道']
    var arrListThree = ['学校', '医院', '人口集聚区']
    var arrListFour = ['工业园区', '自然保护区', '旅游娱乐区']
    var arrListFive = ['物资储备基地', '避灾点', '航标信息']
    var onePicHtml = ''
    arrListOne.forEach(function(item, index) {
        onePicHtml += '<li data-id="' + (index + 1) + '">' +
            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
            '<i class="iconfont checkbox-check">&#xead8;</i>' +
            '<img src="./image/sm-icon/sm-icon' + (index + 1) + '.png" />' +
            '<span>' + item + '</span>' +
            '</li>'
    })
    $('.nav-fold-list').eq(0).append(onePicHtml)
    onePicHtml = ''
    arrListTwo.forEach(function(item, index) {
        onePicHtml += '<li data-id="' + (index + 9) + '">' +
            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
            '<i class="iconfont checkbox-check">&#xead8;</i>' +
            '<img src="./image/sm-icon/sm-icon' + (index + 9) + '.png" />' +
            '<span>' + item + '</span>' +
            '</li>'
    })
    $('.nav-fold-list').eq(1).append(onePicHtml)
    onePicHtml = ''
    arrListThree.forEach(function(item, index) {
        onePicHtml += '<li data-id="' + (index + 15) + '">' +
            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
            '<i class="iconfont checkbox-check">&#xead8;</i>' +
            '<img src="./image/sm-icon/sm-icon' + (index + 15) + '.png" />' +
            '<span>' + item + '</span>' +
            '</li>'
    })
    $('.nav-fold-list').eq(2).append(onePicHtml)
    onePicHtml = ''
    arrListFour.forEach(function(item, index) {
        onePicHtml += '<li data-id="' + (index + 18) + '">' +
            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
            '<i class="iconfont checkbox-check">&#xead8;</i>' +
            '<img src="./image/sm-icon/sm-icon' + (index + 18) + '.png" />' +
            '<span>' + item + '</span>' +
            '</li>'
    })
    $('.nav-fold-list').eq(3).append(onePicHtml)
    onePicHtml = ''
    arrListFive.forEach(function(item, index) {
        onePicHtml += '<li data-id="' + (index + 21) + '">' +
            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>' +
            '<i class="iconfont checkbox-check">&#xead8;</i>' +
            '<img src="./image/sm-icon/sm-icon' + (index + 21) + '.png" />' +
            '<span>' + item + '</span>' +
            '</li>'
    })
    $('.nav-fold-list').eq(4).append(onePicHtml)
        // 点击事件
    $('.nav-fold-list li').click(function() {
        if ($(this).hasClass('unclick')) {
            return
        }
        $(this).find('.checkbox-uncheck').toggle()
        $(this).find('.checkbox-check').toggle()
        var typeVal = $(this).attr('data-id')
            // console.log(typeVal)
        if ($(this).find('.checkbox-check').css('display') == 'block') {
            var areaText = $('.nav-fold-area li').eq(areaType).find('span').text()
                // cameraViewSwitching(areaText)
            disasterBody(typeVal, areaType)
            typeValArr.push(typeVal)
        } else {
            removeDisasterBodyPoint(typeVal)
            removeDisasterBodyLayer(typeVal)
            typeValArr.splice(typeValArr.indexOf(typeVal), 1)
            if ($('.station-info').attr('data-type') == typeVal) {
                $('.station-info').hide()
            }
        }
        return false
    })
    $('.nav-fold-level li').click(function() {
        // $(this).find('.checkbox-uncheck').toggle()
        // $(this).find('.checkbox-check').toggle()
        // if ($(this).find('.checkbox-check').css('display') != 'none') {
        // 	loadOffshoreForecast()
        // } else {
        // 	removeOffshoreForecast()
        // }
        if (!isSeaZoneShow) {
            offshoreForecast($(this), true)
        } else {
            offshoreForecast($(this), false)
        }
        return false
    })
    $('.bugout-list-wrap').mousewheel(function(event, delta) {
        var dir = delta > 0 ? 'Up' : 'Down';
        var left = $('.bugout-list-wrap').scrollLeft()
        if (dir == 'Up') {
            $('.bugout-list-wrap').scrollLeft(left - 50)
        } else {
            $('.bugout-list-wrap').scrollLeft(left + 50)
        }
        return false;
    });
    // 地区选择
    $('.nav-fold-area li').click(function() {
        if ($(this).index() == $('.nav-fold-area li.active').index()) {
            return
        }
        // 清除之前选择
        $('.station-info').hide()
        typeValArr.forEach(function(val) {
            // removeBillboardByBillboardName(val)
            // removeImageryProviderByLayer(val)
            removeDisasterBodyPoint(val)
            removeDisasterBodyLayer(val)
        })
        $(this).addClass('active').siblings().removeClass('active')
        areaType = $(this).index()
        cameraViewSwitching($(this).find('span').text())
            // 清除一张图
        $('.nav-fold-list li').find('.checkbox-uncheck').show()
        $('.nav-fold-list li').find('.checkbox-check').hide()
        var tempText = $(this).find('span').text()
        $(this).parents('.header-nav-li').find('.header-nav-item span').text(tempText)
        return false
    })

    //加载数据
    // 头部信息
    typhoonActiveInfo(function(res) {
        if (res.data && res.data.actives) {
            if (res.data.actives.length) {
                var activesHtml = ''
                res.data.actives.forEach(function(item, index) {
                    var year = item.number.toString().slice(0, 4)
                    var rank = parseInt(item.number.toString().slice(4))
                    var textTemp = year + '年第' + rank + '号' + item.strong + item.zhName
                    textTemp += '(' + item.number + ') ' + moment(item.time).format('MM月DD日HH时') + ',风速' + item.speed + '米/秒,移速' + item.moveSpeed + '公里/小时,东经' + item.lat + '°E,北纬' + item.lng + '°N,气压' + item.pressure + '百帕,近中心最大风力' + item.power + '级'
                    activesHtml += '<li>' + textTemp + '</li>'
                })
                $('.typhoon-current-state').html(activesHtml)
            } else {
                $('.typhoon-current-state').html('<li>目前太平洋海域无活动台风</li>')
            }
        } else {
            $('.typhoon-current-state').html('<li>目前太平洋海域无活动台风</li>')
        }
        var wrapWidth = $('.header-nav').width()
        $('.header-nav-left').css('width', wrapWidth - 580 + 'px')
        $('.typhoon-current-state-wrap').css('width', wrapWidth - 620 + 'px')
        var totalLength = 0
        $('.typhoon-current-state li').each(function() {
                totalLength += $(this).width()
            })
            // 设置初始位置
        $('.typhoon-current-state').css({
            'left': wrapWidth - 580 + 'px'
        })
        setInterval(function() {
            var tempLeft = $('.typhoon-current-state').position().left
            if (tempLeft < 0 && Math.abs(tempLeft) > totalLength) {
                $('.typhoon-current-state').css({
                    'left': wrapWidth - 580 + 'px'
                })
            } else {
                $('.typhoon-current-state').css({
                    'left': $('.typhoon-current-state').position().left - 1 + 'px'
                })
            }
        }, 30);
    })

    // 风险区划
    // 下拉列表
    $('.drop-down-group-risk li').click(function() {
            if ($(this).index() == subNavIndex) {
                return
            }
            subNavIndex = $(this).index()
            $(this).parents('.drop-down-wrap').find('.drop-down-txt').text($(this).text())
            $(this).addClass('active').siblings().removeClass('active')
            levelListChange()
            typhoonLevelId = ''
            districtId = ''
            $('.disaster-type-wrap ul li').removeClass('active')
            $('.assess-result').eq(3).show().siblings().hide()
            changeLegendShow(-1, true)
            disasterInfoDelete()
            removeShpToJson('dangerZone.json')
                // if (subNavIndex == 0 || subNavIndex == 2) {
                // 	loadRiskJson()
                // }
                // 进入风险区划
            var tempElement = $('.nav-fold-list').eq(4).find('li').eq(1)
            if ($(this).index() == 4) {
                var typeVal = tempElement.attr('data-id')
                tempElement.find('.checkbox-uncheck').show()
                tempElement.find('.checkbox-check').hide()
                tempElement.css({
                    'cursor': 'not-allowed',
                    'opacity': '0.4'
                }).addClass('unclick')
                removeDisasterBodyPoint(typeVal)
                removeDisasterBodyLayer(typeVal)
                typeValArr.splice(typeValArr.indexOf(typeVal), 1)
            } else {
                tempElement.css({
                    'cursor': 'pointer',
                    'opacity': '1'
                }).removeClass('unclick')
            }
        })
        // 台风等级
    zonationTyphoonLevels(function(res) {
        var typhoonLevelHtml = ''
        if (res.data && res.data.list) {
            res.data.list.forEach(function(item, index) {
                typhoonLevelHtml += '<li data-id="' + item.id + '"><span>' + item.level + 'hPa</span></li>'
            })
        }
        $('.typhoon-type-strength').html(typhoonLevelHtml)
    })
    $('.zone-type-strength').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        districtId = $(this).attr('data-id');
        refreshDisasterTable()
            // cameraViewChange($(this).find('span').text())
        disasterInfoDelete()
        removeShpToJson('dangerZone.json')
        if (subNavIndex == 0 || subNavIndex == 2) {
            loadRiskJson()
        }
    })
    $('.typhoon-type-strength').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        typhoonLevelId = $(this).attr('data-id');
        refreshDisasterTable()
        if (subNavIndex != 1) {
            // cameraViewChange('揭阳市')
        }
        disasterInfoDelete()
        removeShpToJson('dangerZone.json')
        if (subNavIndex == 0 || subNavIndex == 2) {
            loadRiskJson()
        }
    })

    // 加载更多
    $('.subnav-context-wrap').on('click', '.check_more', function() {
        if (currentNavIndex == 0) {
            renderTyphoonList(true)
        } else {
            if (subNavIndex == 0) {
                renderZonationWeekLevelList(true)
            }
            if (subNavIndex == 2) {
                renderAssessmentList(true)
            } else if (subNavIndex == 4) {
                renderAvoidancePointList(true)
            }
        }
    })

    // 标注路网
    $('.road-check-btn').click(function() {
        $(this).find('.checkbox-uncheck').toggle()
        $(this).find('.checkbox-check').toggle()
        if ($(this).find('.checkbox-check').css('display') == 'block') {
            isRoadNetwork(true)
        } else {
            isRoadNetwork(false)
        }
    })

    // 还原按钮
    $('.reback-center-btn').click(function() {
        viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(116.373367, 23.549510, 800000) })
    })

    // 应急疏散方案按钮
    $('.access-btn').click(function() {
            $('.access-btn').toggleClass('active')
            if ($('.access-btn').hasClass('active')) {
                var params = {
                    type: parseInt(subNavIndex) + 1
                }
                if (typhoonLevelId) {
                    params.typhoonLevelId = typhoonLevelId
                }
                if (districtId) {
                    params.district = districtId
                }
                zonationShpEvacuationPlan(params, function(res) {
                    urgentRiskData = new riskData(res, false)
                })
            } else {
                urgentRiskData.remove()
            }
        })
        // 表格点击点位
    $('.assess-info-table').on('click', 'tr', function() {
        disasterTableItemClick($(this))
    })
    $('.disaster-info-table').on('click', 'tr', function() {
            disasterTableItemClick($(this))
        })
        // 图例收起
    $('.disaster-statistics-title').click(function() {
        if ($(this).parent().height() <= 40) {
            $(this).parent().css('height', 'auto')
            $(this).parent().removeClass('legend-fold')
        } else {
            $(this).parent().css('height', '40px')
            $(this).parent().addClass('legend-fold')
        }
    })

    // 透明度控制
    var deltaX = 0
    var isControl = false
    $('.opacity-control-bar').css('width', 140 * 0.6 + 'px')
    $('.opacity-control-dot').css('left', 140 * 0.6 - 5 + 'px')
    $('.opacity-control-dot').on('mousedown', function(e) {
        isControl = true
        deltaX = parseInt($('.opacity-control-main').offset().left)
        $('.opacity-control-wrap').on('mousemove', function(e) {
            if (isControl) {
                var moveX = e.pageX - deltaX
                if (moveX > 140) {
                    moveX = 140
                }
                if (moveX < 0) {
                    moveX = 0
                }
                $('.opacity-control-bar').css('width', moveX + 'px')
                $('.opacity-control-dot').css('left', moveX - 5 + 'px')
                opacityRate = moveX / 140
                $('.opacity-control-text').text((opacityRate * 100).toFixed(0) + '%')
                if (globalRiskData) {
                    globalRiskData.updateAlpha(opacityRate)
                }
            }
        })
    })
    $(document).on('mouseup', function(e) {
        isControl = false
    })
    $('.opacity-icon').click(function() {
        $(this).toggleClass('active')
        $('.opacity-control-wrap').toggle()
    })

    // 近岸预报
    $('.report-close').click(function() {
            $('.report-dialog').hide()
            setForecastColorBlue()
        })
        // 台风数据首次加载
    refreshTyphoonData()
});