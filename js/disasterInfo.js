var typhoonId = "";
var districtId = "";
var townId = "";
var reportType = "";
var fillStartTime = "";
var fillEndTime = "";
/*var typhoonIdAdd = "";
var districtIdAdd = "";
var townIdAdd = "";
var reportTypeAdd = "";
var fillCreateTimeAdd = "";
var typhoonIdEdit = "";
var districtIdEdit = "";
var townIdEdit = "";
var reportTypeEdit = "";
var fillCreateTimeEdit = "";*/
var uploadImgList = [];
var uploadImgLists = [];
var uploadImgListSum = [];
var uploadImgListOld = [];
var disasterInfoId;
//获取token值
var token = $.cookie("token");
$(function () {
    //点击灾情信息导航栏获取列表
    $("#info-nav").click(function () {
        var title = $("#infoSearchName").val();
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
    //表格操作
    $(".table-menuItem").click(function () {
        $(this).toggleClass("table-menuClick");
    });
    //灾情列表获取
    var tableLength;
    var title = $("#infoSearchName").val();
    page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    //首页
    $("#info-firstPage").click(function () {
        var title = $("#infoSearchName").val();
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
    //上一页
    $("#info-prevPage").click(function () {
        var title = $("#infoSearchName").val();
        var pageNow = 1;
        var currentPage = parseInt($("#info-currentPage").text());
        if (pageNow < 1) {
            return false;
        } else {
            pageNow = currentPage - 1;
            page(pageNow, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        }
    });
    //下一页
    $("#info-nextPage").click(function () {
        var title = $("#infoSearchName").val();
        var pageNow;
        var currentPage = parseInt($("#info-currentPage").text());
        var totalPage = parseInt($("#info-totalPage").text());
        if (currentPage >= totalPage) {
            return false;
        } else {
            pageNow = currentPage + 1;
            page(pageNow, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        }
    });
    //尾页
    $("#info-endPage").click(function () {
        var title = $("#infoSearchName").val();
        var totalPage = $("#info-totalPage").text();
        page(totalPage, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
    //跳转
    $("#info-pageTo").click(function () {
        var title = $("#infoSearchName").val();
        var pageNum = $("#info-pageValue").val();
        if (pageNum == "") {

        } else {
            page(pageNum, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        }
    });
    $("#infoPageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            var title = $("#infoSearchName").val();
            var pageNum = $("#info-pageValue").val();
            if (pageNum == "") {

            } else {
                page(pageNum, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
            }
        }
    });
    //搜索功能
    $("#infoSearchName").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            var title = $("#infoSearchName").val();
            page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        }
    });
    $("#infoSearchIcon").click(function () {
        var title = $("#infoSearchName").val();
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });

    //点击除选择框之外隐藏该选择框
    $(document).click(function() {
        $("#typhoon-year").hide();
        $("#typhoon-list").hide();
        $("#area-city").hide();
        $("#area-towns").hide();
        $("#nature-list").hide();
    });
    var year = (new Date()).getFullYear();
    var typhoonYear;
    //灾情列表台风选择e
    $("#typhoon-select").click(function (e) {
        $("#typhoon-year").show();
        $("#area-city").hide();
        $("#area-towns").hide();
        $("#nature-list").hide();
        if ($("#typhoon-year").css("display") == "none") {
            $("#typhoon-list").hide();
        } else {

        }
        $(".typhoon-year-item").removeClass("typhoon-year-click");
        $(".typhoon-list-item").removeClass("typhoon-list-click");
        var listHtml = "";
        for (var i = year; i >= 1945; i--) {
            listHtml = listHtml + "<div class=\"typhoon-year-item\">\n" +
                "                                        <i class=\"iconfont typhoon-radio-uncheck\">&#xeada;</i>\n" +
                "                                        <i class=\"iconfont typhoon-radio-check\">&#xeadb;</i>\n" +
                "                                        <span class=\"typhoon-year-text\">" + i + "</span>\n" +
                "                                        <i class=\"iconfont typhoon-select-icon\">&#xeb03;</i>\n" +
                "                                    </div>";
        }
        $("#typhoon-year").html(listHtml);
        typhoonYearList();
        if ($(".typhoon-year-item").hasClass("typhoon-year-click")) {
            
        } else {
            $("#typhoon-year").mouseover(function () {
                $(this).show();
            });
            $("#typhoon-year").mouseout(function () {
                $(this).hide();
            });
        }
        e.stopPropagation();
    });
    function typhoonYearList() {
        $(".typhoon-year-item").click(function (e) {
            typhoonYear = $(this).find("span.typhoon-year-text").text();
            $(".typhoon-year-item").removeClass("typhoon-year-click");
            $(this).addClass("typhoon-year-click");
            $.ajax({
                url: srcPath + "admin/disaster/information/typhoon/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "year": typhoonYear
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    $("#typhoon-list").show();
                    var dataJson = data.data.list;
                    if (dataJson == "" || dataJson==null || dataJson==undefined) {
                        $("#typhoon-list").html("");
                    } else {
                        var listHtml = "";
                        for (var i = 0; i < dataJson.length; i++) {
                            listHtml = listHtml + "<div class=\"typhoon-list-item\">\n" +
                                "                                        <i class=\"iconfont typhoon-radio-uncheck\">&#xeada;</i>\n" +
                                "                                        <i class=\"iconfont typhoon-radio-check\">&#xeadb;</i>\n" +
                                "                                        <span class=\"typhoon-list-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                                "                                        <span class=\"typhoon-list-text\">" + dataJson[i].number + "-" + dataJson[i].zhName + "</span>\n" +
                                "                                    </div>";
                        }
                        $("#typhoon-list").html(listHtml);
                        typhoonList();
                    }
                    $("#typhoon-list").mouseover(function () {
                        $(this).show();
                        $("#typhoon-year").show();
                    });
                    $("#typhoon-list").mouseout(function () {
                        $(this).hide();
                        $("#typhoon-year").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
            e.stopPropagation();
        });
    }
    function typhoonList() {
        $(".typhoon-list-item").click(function () {
            var typhoonName = $(this).find("span.typhoon-list-text").text();
            typhoonId = $(this).find("span.typhoon-list-id").text();
            $(".typhoon-list-item").removeClass("typhoon-list-click");
            $(this).addClass("typhoon-list-click");
            $("#typhoon-year").hide();
            $("#typhoon-list").hide();
            $("#typhoon-select").find("span.info-item-word").text(typhoonName);
            var title = $("#infoSearchName").val();
            page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        });
    }
    //灾情列表地区选择
    var areaCity;
    var areaName;
    $("#area-select").click(function (e) {
        $("#area-city").show();
        $("#typhoon-year").hide();
        $("#typhoon-list").hide();
        $("#nature-list").hide();
        if ($("#area-city").css("display") == "none") {
            $("#area-towns").hide();
        } else {

        }
        $(".area-city-item").removeClass("area-city-click");
        $(".area-towns-item").removeClass("area-towns-click");
        if ($(".area-city-item").hasClass("area-city-click")) {

        } else {
            $("#area-city").mouseover(function () {
                $(this).show();
            });
            $("#area-city").mouseout(function () {
                $(this).hide();
            });
        }
        $.ajax({
            url: srcPath + "admin/address/district/list",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({

            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                var dataJson = data.data;
                var listHtml = "";
                for (var i = 0; i < dataJson.length; i++) {
                    listHtml = listHtml + "<div class=\"area-city-item\">\n" +
                        "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                        "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                        "                <span class=\"area-city-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                        "                <span class=\"area-city-text\">" + dataJson[i].name + "</span>\n" +
                        "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                        "            </div>";
                }
                $("#area-city").html(listHtml);
                citySelect();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
        e.stopPropagation();
    });
    function citySelect() {
        $(".area-city-item").click(function (e) {
            areaCity = $(this).find("span.area-city-text").text();
            districtId = $(this).find("span.area-city-id").text();
            $(".area-city-item").removeClass("area-city-click");
            $(this).addClass("area-city-click");
            $.ajax({
                url: srcPath + "admin/address/town/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "districtId": districtId
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    $("#area-towns").show();
                    var dataJson = data.data;
                    var listHtml = "";
                    for (var i = 0; i < dataJson.length; i++) {
                        listHtml = listHtml + "<div class=\"area-towns-item\">\n" +
                            "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                            "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                            "                <span class=\"area-towns-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                            "                <span class=\"area-towns-text\">" + dataJson[i].name + "</span>\n" +
                            "            </div>";
                    }
                    $("#area-towns").html(listHtml);
                    townsSelect();
                    $("#area-towns").mouseover(function () {
                        $(this).show();
                        $("#area-city").show();
                    });
                    $("#area-towns").mouseout(function () {
                        $(this).hide();
                        $("#area-city").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
            e.stopPropagation();
        });
    }
    function townsSelect() {
        $(".area-towns-item").click(function () {
            areaName = $(this).find("span.area-towns-text").text();
            townId = $(this).find("span.area-towns-id").text();
            $(".area-towns-item").removeClass("area-towns-click");
            $(this).addClass("area-towns-click");
            $("#area-city").hide();
            $("#area-towns").hide();
            $("#area-select").find("span.info-item-word").text(areaCity + areaName);
            var title = $("#infoSearchName").val();
            page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
        });
    }
    //灾情列表报送性质选择
    $("#submit-nature").click(function (e) {
        $("#nature-list").show();
        $("#typhoon-year").hide();
        $("#typhoon-list").hide();
        $("#area-city").hide();
        $("#area-towns").hide();
        $(".nature-list-item").removeClass("nature-list-click");
        e.stopPropagation();
    });
    $("#nature-list").mouseover(function () {
        $(this).show();
    });
    $("#nature-list").mouseout(function () {
        $(this).hide();
    });
    $(".nature-list-item").click(function () {
        $(".nature-list-item").removeClass("nature-list-click");
        $(this).addClass("nature-list-click");
        var natureText = $(this).find("span.nature-list-text").text();
        $("#submit-nature").find("span.info-item-word").text(natureText);
        $("#nature-list").hide();
        if (natureText == "初报") {
            reportType = 1;
        } else if (natureText == "续报") {
            reportType = 2;
        } else if (natureText == "核报") {
            reportType = 3;
        } else if (natureText == "一季度报") {
            reportType = 4;
        } else if (natureText == "上半年报") {
            reportType = 5;
        } else if (natureText == "前三季度报") {
            reportType = 6;
        } else if (natureText == "年报") {
            reportType = 7;
        }
        var title = $("#infoSearchName").val();
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
    //灾情列表填表时间段选择
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#time-range', //指定元素
            range: true,
            change: function (value, data) { //监听日期变换
                lay("#time-range").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#time-range").val(value);
                fillStartTime = Date.parse($("#time-range").val().split(" ")[0]);
                fillEndTime = Date.parse($("#time-range").val().split(" ")[2]);
                var title = $("#infoSearchName").val();
                page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
            }
        });
    });
    //灾情列表清空选项
    $("#clear-select").click(function () {
        $("#typhoon-select").find("span.info-item-word").text("选择台风");
        $("#area-select").find("span.info-item-word").text("选择地区");
        $("#submit-nature").find("span.info-item-word").text("选择报送性质");
        $("#time-range").attr("placeholder", "选择填表时间段");
        $("#time-range").val("");
        $("#typhoon-year").hide();
        $("#typhoon-list").hide();
        $("#area-city").hide();
        $("#area-towns").hide();
        $("#nature-list").hide();
        var title = $("#infoSearchName").val();
        typhoonId = "";
        townId = "";
        reportType = "";
        fillStartTime = "";
        fillEndTime = "";
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
 
    //灾情详情
    $(".hazard-closeIcon").click(function () {
        $(this).parent().parent().hide();
    });
    $(".info-closeBtn").click(function () {
        $(this).parent().parent().hide();
    });
    
    //批量删除
    $("#info-delAll").click(function () {
        $("#disaster-delAll").show();
        if (disasterInfoIds == "") {
            $("#disaster-delAll").find("div.del-content").html("至少选择一项才可以进行批量操作！");
            $("#disaster-delAll-sure").hide();
        } else {
            $("#disaster-delAll").find("div.del-content").html("确定对所选的内容进行删除吗？");
            $("#disaster-delAll-sure").show();
        }
    });
    $(".delAll-close").click(function () {
        $(this).parent().parent().hide();
        $("#info-delAll").removeClass("table-menuClick");
    });
    $(".del-btnIcon").click(function () {
        $(this).parent().parent().hide();
        $("#info-delAll").removeClass("table-menuClick");
    });
    $("#disaster-delAll-sure").click(function () {
        $.ajax({
            url: srcPath + "admin/disaster/information/delete",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "ids": disasterInfoIds
            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                console.log(data);
                if (data.code == 200) {
                    $("#disaster-delAll").hide();
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    }, 1000);
                    var title = $("#infoSearchName").val();
                    page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
                } else if (data.code == "-1") {
                    $("#fail").show();
                    setTimeout(function () {
                        $("#fail").hide();
                    },1000);
                } else {

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    
});
//列表
function page(current, size, title, typhoonId, townId, reportType, fillStartTime, fillEndTime) {
    $("#loading").show();
    $.ajax({
        url: srcPath + "admin/disaster/information/list",
        type: "post",
        dataType: 'json',
        contentType: 'application/json',
        headers: {
            token: token
        },
        data: JSON.stringify({
            "current": current,
            "size": size,
            "title": title,
            "typhoonId": typhoonId,
            "townId": townId,
            "reportType": reportType,
            "fillStartTime": fillStartTime,
            "fillEndTime": fillEndTime
        }),
        success: function (data) {
            console.log(data);
            $("#loading").hide();
            if (data.code == "-2") {
                window.location.href = "login.html";
            }
            var dataJson = data.data.records;
            if (dataJson == "") {
                $(".info-table-no").show();
                $(".info-table-yes").hide();
            } else {
                $(".info-table-no").hide();
                $(".info-table-yes").show();
                var tableHTML = "<thead>\n" +
                    "                                    <tr>\n" +
                    "                                        <th>\n" +
                    "                                            <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                    "                                            <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                    "                                        </th>\n" +
                    "                                        <th style='display: none;'>id</th>\n" +
                    "                                        <th>标题</th>\n" +
                    "                                        <th>台风</th>\n" +
                    "                                        <th>县级行政区</th>\n" +
                    "                                        <th>乡级行政区</th>\n" +
                    "                                        <th>报送性质</th>\n" +
                    "                                        <th>填表日期</th>\n" +
                    "                                        <th>填表单位</th>\n" +
                    "                                        <th>填表人</th>\n" +
                    "                                        <th>操作</th>\n" +
                    "                                    </tr>\n" +
                    "                                </thead>\n" +
                    "                                <tbody>";
                for (var i = 0; i < dataJson.length; i++) {
                    if (dataJson[i].id == "" || dataJson[i].id == null || dataJson[i].id == undefined) {
                        dataJson[i].id = "无";
                    } else {
                        dataJson[i].id = dataJson[i].id;
                    }
                    if (dataJson[i].title == "" || dataJson[i].title == null || dataJson[i].title == undefined) {
                        dataJson[i].title = "无";
                    } else {
                        dataJson[i].title = dataJson[i].title;
                    }
                    if (dataJson[i].typhoonName == "" || dataJson[i].typhoonName == null || dataJson[i].typhoonName == undefined) {
                        dataJson[i].typhoonName = "无";
                    } else {
                        dataJson[i].typhoonName = dataJson[i].typhoonName;
                    }
                    if (dataJson[i].districtName == "" || dataJson[i].districtName == null || dataJson[i].districtName == undefined) {
                        dataJson[i].districtName = "无";
                    } else {
                        dataJson[i].districtName = dataJson[i].districtName;
                    }
                    if (dataJson[i].townName == "" || dataJson[i].townName == null || dataJson[i].townName == undefined) {
                        dataJson[i].townName = "无";
                    } else {
                        dataJson[i].townName = dataJson[i].townName;
                    }
                    if (dataJson[i].reportType == "" || dataJson[i].reportType == null || dataJson[i].reportType == undefined) {
                        dataJson[i].reportType = "无";
                    } else {
                        if (dataJson[i].reportType == "1") {
                            dataJson[i].reportType = "初报";
                        } else if (dataJson[i].reportType == "2") {
                            dataJson[i].reportType = "续报";
                        } else if (dataJson[i].reportType == "3") {
                            dataJson[i].reportType = "核报";
                        } else if (dataJson[i].reportType == "4") {
                            dataJson[i].reportType = "一季度报";
                        } else if (dataJson[i].reportType == "5") {
                            dataJson[i].reportType = "上半年报";
                        } else if (dataJson[i].reportType == "6") {
                            dataJson[i].reportType = "前三季度报";
                        } else if (dataJson[i].reportType == "7") {
                            dataJson[i].reportType = "年报";
                        }
                    }
                    if (dataJson[i].fillCreateTime == "" || dataJson[i].fillCreateTime == null || dataJson[i].fillCreateTime == undefined) {
                        dataJson[i].fillCreateTime = "无";
                    } else {
                        dataJson[i].fillCreateTime = new Date(dataJson[i].fillCreateTime).Format('yyyy-MM-dd');
                    }
                    if (dataJson[i].fillUnit == "" || dataJson[i].fillUnit == null || dataJson[i].fillUnit == undefined) {
                        dataJson[i].fillUnit = "无";
                    } else {
                        dataJson[i].fillUnit = dataJson[i].fillUnit;
                    }
                    if (dataJson[i].fillBy == "" || dataJson[i].fillBy == null || dataJson[i].fillBy == undefined) {
                        dataJson[i].fillBy = "无";
                    } else {
                        dataJson[i].fillBy = dataJson[i].fillBy;
                    }
                    tableHTML = tableHTML + "<tr>\n" +
                        "            <td>\n" +
                        "                <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                        "                <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                        "            </td>\n" +
                        "            <td style='display: none;'>" + dataJson[i].id + "</td>\n" +
                        "            <td>" + dataJson[i].title + "</td>\n" +
                        "            <td>" + dataJson[i].typhoonName + "</td>\n" +
                        "            <td>" + dataJson[i].districtName + "</td>\n" +
                        "            <td>" + dataJson[i].townName + "</td>\n" +
                        "            <td>" + dataJson[i].reportType + "</td>\n" +
                        "            <td>" + dataJson[i].fillCreateTime + "</td>\n" +
                        "            <td>" + dataJson[i].fillUnit + "</td>\n" +
                        "            <td>" + dataJson[i].fillBy + "</td>\n" +
                        "            <td>\n" +
                        "                <span class=\"table-infoIcon\"><i class=\"iconfont\">&#xeb46;</i><span class=\"table-txt\">详情</span></span>" +
                        "                <span class=\"table-editIcon\"><i class=\"iconfont\">&#xeabe;</i><span class=\"table-txt\">编辑</span></span>" +
                        "                <span class=\"table-delIcon\"><i class=\"iconfont\">&#xeafb;</i><span class=\"table-txt\">删除</span></span>" +
                        "            </td>\n" +
                        "        </tr>";
                }
                tableHTML = tableHTML + "</tbody>";
                $("#disaster-table").html(tableHTML);
                tableCheck();
                tableDel();
                tableInfo();
                tableEdit();
                infoDoubleClick();
                //分页操作
                $("#info-totalPage").text(data.data.pages);
                $("#info-totalRecord").text(data.data.total);
                $("#info-currentPage").text(data.data.current);
                var page = parseInt($("#info-currentPage").text());
                var total = parseInt($("#info-totalPage").text());
                if (page == 1) {
                    $("#info-prevPage").addClass("page-item-notClick");
                    $("#info-nextPage").removeClass("page-item-notClick");
                } else if (page == total) {
                    $("#info-nextPage").addClass("page-item-notClick");
                    $("#info-prevPage").removeClass("page-item-notClick");
                } else {
                    $("#info-prevPage").removeClass("page-item-notClick");
                    $("#info-nextPage").removeClass("page-item-notClick");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });
}
//修改
function tableEdit() {
    $(".table-editIcon").click(function () {
        uploadImgLists.splice(0,uploadImgLists.length);
        uploadImgListOld.splice(0,uploadImgListOld.length);
        disasterInfoId = $(this).parent().siblings("td").eq(1).text();
        $("#disaster-edit").show();
        $.ajax({
            url: srcPath + "admin/disaster/information/detail",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "id": disasterInfoId
            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                var dataJson = data.data;
                if (dataJson.title == "" || dataJson.title == null || dataJson.title == undefined) {
                    dataJson.title = "";
                } else {
                    dataJson.title = dataJson.title;
                }
                if (dataJson.districtName == "" || dataJson.districtName == null || dataJson.districtName == undefined) {
                    dataJson.districtName = "";
                } else {
                    dataJson.districtName = dataJson.districtName;
                }
                if (dataJson.townName == "" || dataJson.townName == null || dataJson.townName == undefined) {
                    dataJson.townName = "";
                } else {
                    dataJson.townName = dataJson.townName;
                }
                if (dataJson.reportType == "" || dataJson.reportType == null || dataJson.reportType == undefined) {
                    dataJson.reportType = "";
                } else {
                    if (dataJson.reportType == "1") {
                        dataJson.reportType = "初报";
                    } else if (dataJson.reportType == "2") {
                        dataJson.reportType = "续报";
                    } else if (dataJson.reportType == "3") {
                        dataJson.reportType = "核报";
                    } else if (dataJson.reportType == "4") {
                        dataJson.reportType = "一季度报";
                    } else if (dataJson.reportType == "5") {
                        dataJson.reportType = "上半年报";
                    } else if (dataJson.reportType == "6") {
                        dataJson.reportType = "前三季度报";
                    } else if (dataJson.reportType == "7") {
                        dataJson.reportType = "年报";
                    }
                }
                if (dataJson.typhoonName == "" || dataJson.typhoonName == null || dataJson.typhoonName == undefined) {
                    dataJson.typhoonName = "";
                } else {
                    dataJson.typhoonName = dataJson.typhoonName;
                }
                if (dataJson.phone == "" || dataJson.phone == null || dataJson.phone == undefined) {
                    dataJson.phone = "";
                } else {
                    dataJson.phone = dataJson.phone;
                }
                if (dataJson.remark == "" || dataJson.remark == null || dataJson.remark == undefined) {
                    dataJson.remark = "";
                } else {
                    dataJson.remark = dataJson.remark;
                }
                if (dataJson.fillUnit == "" || dataJson.fillUnit == null || dataJson.fillUnit == undefined) {
                    dataJson.fillUnit = "";
                } else {
                    dataJson.fillUnit = dataJson.fillUnit;
                }
                if (dataJson.fillBy == "" || dataJson.fillBy == null || dataJson.fillBy == undefined) {
                    dataJson.fillBy = "";
                } else {
                    dataJson.fillBy = dataJson.fillBy;
                }
                if (dataJson.fillCreateTime == "" || dataJson.fillCreateTime == null || dataJson.fillCreateTime == undefined) {
                    dataJson.fillCreateTime = "";
                } else {
                    dataJson.fillCreateTime = new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                }
                if (String(dataJson.disasterPopulation) == "" || dataJson.disasterPopulation == null || dataJson.disasterPopulation == undefined) {
                    dataJson.disasterPopulation = "";
                } else {
                    dataJson.disasterPopulation = dataJson.disasterPopulation;
                }
                if (String(dataJson.deadPopulation) == "" || dataJson.deadPopulation == null || dataJson.deadPopulation == undefined) {
                    dataJson.deadPopulation = "";
                } else {
                    dataJson.deadPopulation = dataJson.deadPopulation;
                }
                if (String(dataJson.missPopulation) == "" || dataJson.missPopulation == null || dataJson.missPopulation == undefined) {
                    dataJson.missPopulation = "";
                } else {
                    dataJson.missPopulation = dataJson.missPopulation;
                }
                if (String(dataJson.transferPopulation) == "" || dataJson.transferPopulation == null || dataJson.transferPopulation == undefined) {
                    dataJson.transferPopulation = "";
                } else {
                    dataJson.transferPopulation = dataJson.transferPopulation;
                }
                if (String(dataJson.collapseHouse) == "" || dataJson.collapseHouse == null || dataJson.collapseHouse == undefined) {
                    dataJson.collapseHouse = "";
                } else {
                    dataJson.collapseHouse = dataJson.collapseHouse;
                }
                if (String(dataJson.collapseHouseDirectEcoLoss) == "" || dataJson.collapseHouseDirectEcoLoss == null || dataJson.collapseHouseDirectEcoLoss == undefined) {
                    dataJson.collapseHouseDirectEcoLoss = "";
                } else {
                    dataJson.collapseHouseDirectEcoLoss = dataJson.collapseHouseDirectEcoLoss;
                }
                if (String(dataJson.damagedHouse) == "" || dataJson.damagedHouse == null || dataJson.damagedHouse == undefined) {
                    dataJson.damagedHouse = "";
                } else {
                    dataJson.damagedHouse = dataJson.damagedHouse;
                }
                if (String(dataJson.damagedHouseDirectEcoLoss) == "" || dataJson.damagedHouseDirectEcoLoss == null || dataJson.damagedHouseDirectEcoLoss == undefined) {
                    dataJson.damagedHouseDirectEcoLoss = "";
                } else {
                    dataJson.damagedHouseDirectEcoLoss = dataJson.damagedHouseDirectEcoLoss;
                }
                if (String(dataJson.aquacultureAffectedArea) == "" || dataJson.aquacultureAffectedArea == null || dataJson.aquacultureAffectedArea == undefined) {
                    dataJson.aquacultureAffectedArea = "";
                } else {
                    dataJson.aquacultureAffectedArea = dataJson.aquacultureAffectedArea;
                }
                if (String(dataJson.aquacultureDirectEcoLoss) == "" || dataJson.aquacultureDirectEcoLoss == null || dataJson.aquacultureDirectEcoLoss == undefined) {
                    dataJson.aquacultureDirectEcoLoss = "";
                } else {
                    dataJson.aquacultureDirectEcoLoss = dataJson.aquacultureDirectEcoLoss;
                }
                if (String(dataJson.aquacultureDisasterArea) == "" || dataJson.aquacultureDisasterArea == null || dataJson.aquacultureDisasterArea == undefined) {
                    dataJson.aquacultureDisasterArea = "";
                } else {
                    dataJson.aquacultureDisasterArea = dataJson.aquacultureDisasterArea;
                }
                if (String(dataJson.aquacultureDisasterDirectEcoLoss) == "" || dataJson.aquacultureDisasterDirectEcoLoss == null || dataJson.aquacultureDisasterDirectEcoLoss == undefined) {
                    dataJson.aquacultureDisasterDirectEcoLoss = "";
                } else {
                    dataJson.aquacultureDisasterDirectEcoLoss = dataJson.aquacultureDisasterDirectEcoLoss;
                }
                if (String(dataJson.aquacultureNoGainArea) == "" || dataJson.aquacultureNoGainArea == null || dataJson.aquacultureNoGainArea == undefined) {
                    dataJson.aquacultureNoGainArea = "";
                } else {
                    dataJson.aquacultureNoGainArea = dataJson.aquacultureNoGainArea;
                }
                if (String(dataJson.aquacultureNoGainDirectEcoLoss) == "" || dataJson.aquacultureNoGainDirectEcoLoss == null || dataJson.aquacultureNoGainDirectEcoLoss == undefined) {
                    dataJson.aquacultureNoGainDirectEcoLoss = "";
                } else {
                    dataJson.aquacultureNoGainDirectEcoLoss = dataJson.aquacultureNoGainDirectEcoLoss;
                }
                if (String(dataJson.aquacultureLossNum) == "" || dataJson.aquacultureLossNum == null || dataJson.aquacultureLossNum == undefined) {
                    dataJson.aquacultureLossNum = "";
                } else {
                    dataJson.aquacultureLossNum = dataJson.aquacultureLossNum;
                }
                if (String(dataJson.aquacultureEcoLoss) == "" || dataJson.aquacultureEcoLoss == null || dataJson.aquacultureEcoLoss == undefined) {
                    dataJson.aquacultureEcoLoss = "";
                } else {
                    dataJson.aquacultureEcoLoss = dataJson.aquacultureEcoLoss;
                }
                if (String(dataJson.aquacultureDamageDeviceNum) == "" || dataJson.aquacultureDamageDeviceNum == null || dataJson.aquacultureDamageDeviceNum == undefined) {
                    dataJson.aquacultureDamageDeviceNum = "";
                } else {
                    dataJson.aquacultureDamageDeviceNum = dataJson.aquacultureDamageDeviceNum;
                }
                if (String(dataJson.aquacultureDamageDeviceEcoLoss) == "" || dataJson.aquacultureDamageDeviceEcoLoss == null || dataJson.aquacultureDamageDeviceEcoLoss == undefined) {
                    dataJson.aquacultureDamageDeviceEcoLoss = "";
                } else {
                    dataJson.aquacultureDamageDeviceEcoLoss = dataJson.aquacultureDamageDeviceEcoLoss;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatNum) == "" || dataJson.aquacultureDestroyedFishBoatNum == null || dataJson.aquacultureDestroyedFishBoatNum == undefined) {
                    dataJson.aquacultureDestroyedFishBoatNum = "";
                } else {
                    dataJson.aquacultureDestroyedFishBoatNum = dataJson.aquacultureDestroyedFishBoatNum;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatEcoLoss) == "" || dataJson.aquacultureDestroyedFishBoatEcoLoss == null || dataJson.aquacultureDestroyedFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = "";
                } else {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = dataJson.aquacultureDestroyedFishBoatEcoLoss;
                }
                if (String(dataJson.aquacultureDamageFishBoatNum) == "" || dataJson.aquacultureDamageFishBoatNum == null || dataJson.aquacultureDamageFishBoatNum == undefined) {
                    dataJson.aquacultureDamageFishBoatNum = "";
                } else {
                    dataJson.aquacultureDamageFishBoatNum = dataJson.aquacultureDamageFishBoatNum;
                }
                if (String(dataJson.aquacultureDamageFishBoatEcoLoss) == "" || dataJson.aquacultureDamageFishBoatEcoLoss == null || dataJson.aquacultureDamageFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDamageFishBoatEcoLoss = "";
                } else {
                    dataJson.aquacultureDamageFishBoatEcoLoss = dataJson.aquacultureDamageFishBoatEcoLoss;
                }
                if (String(dataJson.trafficDestroyedShipNum) == "" || dataJson.trafficDestroyedShipNum == null || dataJson.trafficDestroyedShipNum == undefined) {
                    dataJson.trafficDestroyedShipNum = "";
                } else {
                    dataJson.trafficDestroyedShipNum = dataJson.trafficDestroyedShipNum;
                }
                if (String(dataJson.trafficDestroyedShipEcoLoss) == "" || dataJson.trafficDestroyedShipEcoLoss == null || dataJson.trafficDestroyedShipEcoLoss == undefined) {
                    dataJson.trafficDestroyedShipEcoLoss = "";
                } else {
                    dataJson.trafficDestroyedShipEcoLoss = dataJson.trafficDestroyedShipEcoLoss;
                }
                if (String(dataJson.trafficDamageShipNum) == "" || dataJson.trafficDamageShipNum == null || dataJson.trafficDamageShipNum == undefined) {
                    dataJson.trafficDamageShipNum = "";
                } else {
                    dataJson.trafficDamageShipNum = dataJson.trafficDamageShipNum;
                }
                if (String(dataJson.trafficDamageShipEcoLoss) == "" || dataJson.trafficDamageShipEcoLoss == null || dataJson.trafficDamageShipEcoLoss == undefined) {
                    dataJson.trafficDamageShipEcoLoss = "";
                } else {
                    dataJson.trafficDamageShipEcoLoss = dataJson.trafficDamageShipEcoLoss;
                }
                if (String(dataJson.trafficShipCargoLossNum) == "" || dataJson.trafficShipCargoLossNum == null || dataJson.trafficShipCargoLossNum == undefined) {
                    dataJson.trafficShipCargoLossNum = "";
                } else {
                    dataJson.trafficShipCargoLossNum = dataJson.trafficShipCargoLossNum;
                }
                if (String(dataJson.trafficShipCargoEcoLoss) == "" || dataJson.trafficShipCargoEcoLoss == null || dataJson.trafficShipCargoEcoLoss == undefined) {
                    dataJson.trafficShipCargoEcoLoss = "";
                } else {
                    dataJson.trafficShipCargoEcoLoss = dataJson.trafficShipCargoEcoLoss;
                }
                if (String(dataJson.trafficChannelDepositLength) == "" || dataJson.trafficChannelDepositLength == null || dataJson.trafficChannelDepositLength == undefined) {
                    dataJson.trafficChannelDepositLength = "";
                } else {
                    dataJson.trafficChannelDepositLength = dataJson.trafficChannelDepositLength;
                }
                if (String(dataJson.trafficChannelDepositEcoLoss) == "" || dataJson.trafficChannelDepositEcoLoss == null || dataJson.trafficChannelDepositEcoLoss == undefined) {
                    dataJson.trafficChannelDepositEcoLoss = "";
                } else {
                    dataJson.trafficChannelDepositEcoLoss = dataJson.trafficChannelDepositEcoLoss;
                }
                if (String(dataJson.trafficDestroyedNavMarkNum) == "" || dataJson.trafficDestroyedNavMarkNum == null || dataJson.trafficDestroyedNavMarkNum == undefined) {
                    dataJson.trafficDestroyedNavMarkNum = "";
                } else {
                    dataJson.trafficDestroyedNavMarkNum = dataJson.trafficDestroyedNavMarkNum;
                }
                if (String(dataJson.trafficDestroyedNavMarkEcoLoss) == "" || dataJson.trafficDestroyedNavMarkEcoLoss == null || dataJson.trafficDestroyedNavMarkEcoLoss == undefined) {
                    dataJson.trafficDestroyedNavMarkEcoLoss = "";
                } else {
                    dataJson.trafficDestroyedNavMarkEcoLoss = dataJson.trafficDestroyedNavMarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedPortNum) == "" || dataJson.coastalDamagedPortNum == null || dataJson.coastalDamagedPortNum == undefined) {
                    dataJson.coastalDamagedPortNum = "";
                } else {
                    dataJson.coastalDamagedPortNum = dataJson.coastalDamagedPortNum;
                }
                if (String(dataJson.coastalDamagedPortEcoLoss) == "" || dataJson.coastalDamagedPortEcoLoss == null || dataJson.coastalDamagedPortEcoLoss == undefined) {
                    dataJson.coastalDamagedPortEcoLoss = "";
                } else {
                    dataJson.coastalDamagedPortEcoLoss = dataJson.coastalDamagedPortEcoLoss;
                }
                if (String(dataJson.coastalDamagedWharfLength) == "" || dataJson.coastalDamagedWharfLength == null || dataJson.coastalDamagedWharfLength == undefined) {
                    dataJson.coastalDamagedWharfLength = "";
                } else {
                    dataJson.coastalDamagedWharfLength = dataJson.coastalDamagedWharfLength;
                }
                if (String(dataJson.coastalDamagedWharfEcoLoss) == "" || dataJson.coastalDamagedWharfEcoLoss == null || dataJson.coastalDamagedWharfEcoLoss == undefined) {
                    dataJson.coastalDamagedWharfEcoLoss = "";
                } else {
                    dataJson.coastalDamagedWharfEcoLoss = dataJson.coastalDamagedWharfEcoLoss;
                }
                if (String(dataJson.coastalDamagedCargoNum) == "" || dataJson.coastalDamagedCargoNum == null || dataJson.coastalDamagedCargoNum == undefined) {
                    dataJson.coastalDamagedCargoNum = "";
                } else {
                    dataJson.coastalDamagedCargoNum = dataJson.coastalDamagedCargoNum;
                }
                if (String(dataJson.coastalDamagedCargoEcoLoss) == "" || dataJson.coastalDamagedCargoEcoLoss == null || dataJson.coastalDamagedCargoEcoLoss == undefined) {
                    dataJson.coastalDamagedCargoEcoLoss = "";
                } else {
                    dataJson.coastalDamagedCargoEcoLoss = dataJson.coastalDamagedCargoEcoLoss;
                }
                if (String(dataJson.coastalDamagedBulwarkLength) == "" || dataJson.coastalDamagedBulwarkLength == null || dataJson.coastalDamagedBulwarkLength == undefined) {
                    dataJson.coastalDamagedBulwarkLength = "";
                } else {
                    dataJson.coastalDamagedBulwarkLength = dataJson.coastalDamagedBulwarkLength;
                }
                if (String(dataJson.coastalDamagedBulwarkEcoLoss) == "" || dataJson.coastalDamagedBulwarkEcoLoss == null || dataJson.coastalDamagedBulwarkEcoLoss == undefined) {
                    dataJson.coastalDamagedBulwarkEcoLoss = "";
                } else {
                    dataJson.coastalDamagedBulwarkEcoLoss = dataJson.coastalDamagedBulwarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedSeawallLength) == "" || dataJson.coastalDamagedSeawallLength == null || dataJson.coastalDamagedSeawallLength == undefined) {
                    dataJson.coastalDamagedSeawallLength = "";
                } else {
                    dataJson.coastalDamagedSeawallLength = dataJson.coastalDamagedSeawallLength;
                }
                if (String(dataJson.coastalDamagedSeawallEcoLoss) == "" || dataJson.coastalDamagedSeawallEcoLoss == null || dataJson.coastalDamagedSeawallEcoLoss == undefined) {
                    dataJson.coastalDamagedSeawallEcoLoss = "";
                } else {
                    dataJson.coastalDamagedSeawallEcoLoss = dataJson.coastalDamagedSeawallEcoLoss;
                }
                if (String(dataJson.coastalDamagedRoadLength) == "" || dataJson.coastalDamagedRoadLength == null || dataJson.coastalDamagedRoadLength == undefined) {
                    dataJson.coastalDamagedRoadLength = "";
                } else {
                    dataJson.coastalDamagedRoadLength = dataJson.coastalDamagedRoadLength;
                }
                if (String(dataJson.coastalDamagedRoadEcoLoss) == "" || dataJson.coastalDamagedRoadEcoLoss == null || dataJson.coastalDamagedRoadEcoLoss == undefined) {
                    dataJson.coastalDamagedRoadEcoLoss = "";
                } else {
                    dataJson.coastalDamagedRoadEcoLoss = dataJson.coastalDamagedRoadEcoLoss;
                }
                if (String(dataJson.coastalDamagedComDeviceNum) == "" || dataJson.coastalDamagedComDeviceNum == null || dataJson.coastalDamagedComDeviceNum == undefined) {
                    dataJson.coastalDamagedComDeviceNum = "";
                } else {
                    dataJson.coastalDamagedComDeviceNum = dataJson.coastalDamagedComDeviceNum;
                }
                if (String(dataJson.coastalDamagedComDeviceEcoLoss) == "" || dataJson.coastalDamagedComDeviceEcoLoss == null || dataJson.coastalDamagedComDeviceEcoLoss == undefined) {
                    dataJson.coastalDamagedComDeviceEcoLoss = "";
                } else {
                    dataJson.coastalDamagedComDeviceEcoLoss = dataJson.coastalDamagedComDeviceEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilPlatformNum) == "" || dataJson.offshoreDamagedOilPlatformNum == null || dataJson.offshoreDamagedOilPlatformNum == undefined) {
                    dataJson.offshoreDamagedOilPlatformNum = "";
                } else {
                    dataJson.offshoreDamagedOilPlatformNum = dataJson.offshoreDamagedOilPlatformNum;
                }
                if (String(dataJson.offshoreDamagedOilPlatformEcoLoss) == "" || dataJson.offshoreDamagedOilPlatformEcoLoss == null || dataJson.offshoreDamagedOilPlatformEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = "";
                } else {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = dataJson.offshoreDamagedOilPlatformEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilGasLength) == "" || dataJson.offshoreDamagedOilGasLength == null || dataJson.offshoreDamagedOilGasLength == undefined) {
                    dataJson.offshoreDamagedOilGasLength = "";
                } else {
                    dataJson.offshoreDamagedOilGasLength = dataJson.offshoreDamagedOilGasLength;
                }
                if (String(dataJson.offshoreDamagedOilGasEcoLoss) == "" || dataJson.offshoreDamagedOilGasEcoLoss == null || dataJson.offshoreDamagedOilGasEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilGasEcoLoss = "";
                } else {
                    dataJson.offshoreDamagedOilGasEcoLoss = dataJson.offshoreDamagedOilGasEcoLoss;
                }
                if (String(dataJson.offshoreDamagedBridgeNum) == "" || dataJson.offshoreDamagedBridgeNum == null || dataJson.offshoreDamagedBridgeNum == undefined) {
                    dataJson.offshoreDamagedBridgeNum = "";
                } else {
                    dataJson.offshoreDamagedBridgeNum = dataJson.offshoreDamagedBridgeNum;
                }
                if (String(dataJson.offshoreDamagedBridgeEcoLoss) == "" || dataJson.offshoreDamagedBridgeEcoLoss == null || dataJson.offshoreDamagedBridgeEcoLoss == undefined) {
                    dataJson.offshoreDamagedBridgeEcoLoss = "";
                } else {
                    dataJson.offshoreDamagedBridgeEcoLoss = dataJson.offshoreDamagedBridgeEcoLoss;
                }
                if (String(dataJson.offshoreBothNetLength) == "" || dataJson.offshoreBothNetLength == null || dataJson.offshoreBothNetLength == undefined) {
                    dataJson.offshoreBothNetLength = "";
                } else {
                    dataJson.offshoreBothNetLength = dataJson.offshoreBothNetLength;
                }
                if (String(dataJson.offshoreBothNetEcoLoss) == "" || dataJson.offshoreBothNetEcoLoss == null || dataJson.offshoreBothNetEcoLoss == undefined) {
                    dataJson.offshoreBothNetEcoLoss = "";
                } else {
                    dataJson.offshoreBothNetEcoLoss = dataJson.offshoreBothNetEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeFarmlandNum) == "" || dataJson.offshoreSubmergeFarmlandNum == null || dataJson.offshoreSubmergeFarmlandNum == undefined) {
                    dataJson.offshoreSubmergeFarmlandNum = "";
                } else {
                    dataJson.offshoreSubmergeFarmlandNum = dataJson.offshoreSubmergeFarmlandNum;
                }
                if (String(dataJson.offshoreSubmergeFarmlandEcoLoss) == "" || dataJson.offshoreSubmergeFarmlandEcoLoss == null || dataJson.offshoreSubmergeFarmlandEcoLoss == undefined) {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = "";
                } else {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = dataJson.offshoreSubmergeFarmlandEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldNum) == "" || dataJson.offshoreSubmergeSaltFieldNum == null || dataJson.offshoreSubmergeSaltFieldNum == undefined) {
                    dataJson.offshoreSubmergeSaltFieldNum = "";
                } else {
                    dataJson.offshoreSubmergeSaltFieldNum = dataJson.offshoreSubmergeSaltFieldNum;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldEcoLoss) == "" || dataJson.offshoreSubmergeSaltFieldEcoLoss == null || dataJson.offshoreSubmergeSaltFieldEcoLoss == undefined) {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = "";
                } else {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = dataJson.offshoreSubmergeSaltFieldEcoLoss;
                }
                $("#titleEdit").val(dataJson.title);
                $("#area-edit").find("span.disaster-selectTxt").text(dataJson.districtName + dataJson.townName);
                $("#type-edit").find("span.disaster-selectTxt").text(dataJson.reportType);
                $("#typhoon-edit").find("span.disaster-selectTxt").text(dataJson.typhoonName);
                $("#phoneEdit").val(dataJson.phone);
                $("#remarkEdit").val(dataJson.remark);
                $("#fillUnitEdit").val(dataJson.fillUnit);
                $("#fillByEdit").val(dataJson.fillBy);
                $("#fillCreateTimeEdit").val(dataJson.fillCreateTime);
                $("#disasterPopulationEdit").val(dataJson.disasterPopulation);
                $("#deadPopulationEdit").val(dataJson.deadPopulation);
                $("#missPopulationEdit").val(dataJson.missPopulation);
                $("#transferPopulationEdit").val(dataJson.transferPopulation);
                $("#collapseHouseEdit").val(dataJson.collapseHouse);
                $("#collapseHouseDirectEcoLossEdit").val(dataJson.collapseHouseDirectEcoLoss);
                $("#damagedHouseEdit").val(dataJson.damagedHouse);
                $("#damagedHouseDirectEcoLossEdit").val(dataJson.damagedHouseDirectEcoLoss);
                $("#aquacultureAffectedAreaEdit").val(dataJson.aquacultureAffectedArea);
                $("#aquacultureDirectEcoLossEdit").val(dataJson.aquacultureDirectEcoLoss);
                $("#aquacultureDisasterAreaEdit").val(dataJson.aquacultureDisasterArea);
                $("#aquacultureDisasterDirectEcoLossEdit").val(dataJson.aquacultureDisasterDirectEcoLoss);
                $("#aquacultureNoGainAreaEdit").val(dataJson.aquacultureNoGainArea);
                $("#aquacultureNoGainDirectEcoLossEdit").val(dataJson.aquacultureNoGainDirectEcoLoss);
                $("#aquacultureLossNumEdit").val(dataJson.aquacultureLossNum);
                $("#aquacultureEcoLossEdit").val(dataJson.aquacultureEcoLoss);
                $("#aquacultureDamageDeviceNumEdit").val(dataJson.aquacultureDamageDeviceNum);
                $("#aquacultureDamageDeviceEcoLossEdit").val(dataJson.aquacultureDamageDeviceEcoLoss);
                $("#aquacultureDestroyedFishBoatNumEdit").val(dataJson.aquacultureDestroyedFishBoatNum);
                $("#aquacultureDestroyedFishBoatEcoLossEdit").val(dataJson.aquacultureDestroyedFishBoatEcoLoss);
                $("#aquacultureDamageFishBoatNumEdit").val(dataJson.aquacultureDamageFishBoatNum);
                $("#aquacultureDamageFishBoatEcoLossEdit").val(dataJson.aquacultureDamageFishBoatEcoLoss);
                $("#trafficDestroyedShipNumEdit").val(dataJson.trafficDestroyedShipNum);
                $("#trafficDestroyedShipEcoLossEdit").val(dataJson.trafficDestroyedShipEcoLoss);
                $("#trafficDamageShipNumEdit").val(dataJson.trafficDamageShipNum);
                $("#trafficDamageShipEcoLossEdit").val(dataJson.trafficDamageShipEcoLoss);
                $("#trafficShipCargoLossNumEdit").val(dataJson.trafficShipCargoLossNum);
                $("#trafficShipCargoEcoLossEdit").val(dataJson.trafficShipCargoEcoLoss);
                $("#trafficChannelDepositLengthEdit").val(dataJson.trafficChannelDepositLength);
                $("#trafficChannelDepositEcoLossEdit").val(dataJson.trafficChannelDepositEcoLoss);
                $("#trafficDestroyedNavMarkNumEdit").val(dataJson.trafficDestroyedNavMarkNum);
                $("#trafficDestroyedNavMarkEcoLossEdit").val(dataJson.trafficDestroyedNavMarkEcoLoss);
                $("#coastalDamagedPortNumEdit").val(dataJson.coastalDamagedPortNum);
                $("#coastalDamagedPortEcoLossEdit").val(dataJson.coastalDamagedPortEcoLoss);
                $("#coastalDamagedWharfLengthEdit").val(dataJson.coastalDamagedWharfLength);
                $("#coastalDamagedWharfEcoLossEdit").val(dataJson.coastalDamagedWharfEcoLoss);
                $("#coastalDamagedCargoNumEdit").val(dataJson.coastalDamagedCargoNum);
                $("#coastalDamagedCargoEcoLossEdit").val(dataJson.coastalDamagedCargoEcoLoss);
                $("#coastalDamagedBulwarkLengthEdit").val(dataJson.coastalDamagedBulwarkLength);
                $("#coastalDamagedBulwarkEcoLossEdit").val(dataJson.coastalDamagedBulwarkEcoLoss);
                $("#coastalDamagedSeawallLengthEdit").val(dataJson.coastalDamagedSeawallLength);
                $("#coastalDamagedSeawallEcoLossEdit").val(dataJson.coastalDamagedSeawallEcoLoss);
                $("#coastalDamagedRoadLengthEdit").val(dataJson.coastalDamagedRoadLength);
                $("#coastalDamagedRoadEcoLossEdit").val(dataJson.coastalDamagedRoadEcoLoss);
                $("#coastalDamagedComDeviceNumEdit").val(dataJson.coastalDamagedComDeviceNum);
                $("#coastalDamagedComDeviceEcoLossEdit").val(dataJson.coastalDamagedComDeviceEcoLoss);
                $("#offshoreDamagedOilPlatformNumEdit").val(dataJson.offshoreDamagedOilPlatformNum);
                $("#offshoreDamagedOilPlatformEcoLossEdit").val(dataJson.offshoreDamagedOilPlatformEcoLoss);
                $("#offshoreDamagedOilGasLengthEdit").val(dataJson.offshoreDamagedOilGasLength);
                $("#offshoreDamagedOilGasEcoLossEdit").val(dataJson.offshoreDamagedOilGasEcoLoss);
                $("#offshoreDamagedBridgeNumEdit").val(dataJson.offshoreDamagedBridgeNum);
                $("#offshoreDamagedBridgeEcoLossEdit").val(dataJson.offshoreDamagedBridgeEcoLoss);
                $("#offshoreBothNetLengthEdit").val(dataJson.offshoreBothNetLength);
                $("#offshoreBothNetEcoLossEdit").val(dataJson.offshoreBothNetEcoLoss);
                $("#offshoreSubmergeFarmlandNumEdit").val(dataJson.offshoreSubmergeFarmlandNum);
                $("#offshoreSubmergeFarmlandEcoLossEdit").val(dataJson.offshoreSubmergeFarmlandEcoLoss);
                $("#offshoreSubmergeSaltFieldNumEdit").val(dataJson.offshoreSubmergeSaltFieldNum);
                $("#offshoreSubmergeSaltFieldEcoLossEdit").val(dataJson.offshoreSubmergeSaltFieldEcoLoss);
                if (dataJson.picArray == "" || dataJson.picArray == null || dataJson.picArray == undefined) {
                    $("#uploadEdit").attr('disabled', false);
                    $("#uploadEdit").parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
                } else {
                    var imgList="";
                    for(var i=0;i<dataJson.picArray.length;i++){
                        imgList=imgList+"<div class=\"seawallNumber-imgItem\">\n" +
                            "                                    <i class=\"iconfont upload-imgIcon\">&#xeac5;</i>\n" +
                            "                                    <span>"+dataJson.picArray[i].name+"</span>\n" +
                            "                                    <span class=\"url\" style='display:none;'>"+dataJson.picArray[i].url+"</span>\n" +
                            "                                    <span class=\"suffixUrl\" style='display:none;'>"+dataJson.picArray[i].suffixUrl+"</span>\n" +
                            "                                    <i class=\"iconfont uploadIcon upload-successIcon\">&#xe606;</i>\n" +
                            "                                    <i class=\"iconfont uploadIcon upload-delIcon\">&#xeaf2;</i>\n" +
                            "                                </div>\n";
                        uploadImgLists.push(dataJson.picArray[i].url);
                    }
                    if (uploadImgLists.length >= 6) {
                        //$floodUploadEdit.attr('disabled', true);
                        //$floodUploadEdit.parents('.info-uploadBtn').css('background-color', '#999');
                        $("#uploadEdit").attr('disabled', true);
                        $("#uploadEdit").parents('.info-uploadBtn').css('background-color', '#999');
                    }else{
                        $("#uploadEdit").attr('disabled', false);
                        $("#uploadEdit").parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
                    }
                    $("#disaster-edit .imgList-disaster").show().append(imgList);
                    uploadImgDelEdit();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
}
//图片删除放大效果
function uploadImgDelEdit(){
    $(".seawallNumber-imgItem").hover(function(){
        var href=$(this).find("span.suffixUrl").text();
        $(this).addClass("upload-hover");
        $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
        $("#disaster-edit .seawallNumber-imgItem").mousemove(function(e){
            $("#pic").css({
                "top":(e.pageY-700)+"px",
                "left":(e.pageX-600)+"px"
            }).fadeIn("fast");
        });
    },function(){
        $(this).removeClass("upload-hover");
        $("#pic").remove();
    });
    $(".upload-delIcon").click(function(){
        $(this).parent().remove();
        var url=$(this).siblings("span.url").text();
        if(uploadImgLists.indexOf(url) == "-1"){

        }else{
            uploadImgLists.splice(uploadImgLists.indexOf(url),1);
            if (uploadImgLists.length < 6) {
                //$floodUploadEdit.attr('disabled', false)
                //$floodUploadEdit.parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
                $("#uploadEdit").attr('disabled', false);
                $("#uploadEdit").parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
            }
        }
    });
}
//详情
function tableInfo() {
    $(".table-infoIcon").click(function () {
        var id = $(this).parent().siblings("td").eq(1).text();
        $("#disaster-info").show();
        $.ajax({
            url: srcPath + "admin/disaster/information/detail",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "id": id
            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                var dataJson = data.data;
                console.log(dataJson.disasterPopulation);
                if (dataJson.title == "" || dataJson.title == null || dataJson.title == undefined) {
                    dataJson.title = "无";
                } else {
                    dataJson.title = dataJson.title;
                }
                if (dataJson.districtName == "" || dataJson.districtName == null || dataJson.districtName == undefined) {
                    dataJson.districtName = "无";
                } else {
                    dataJson.districtName = dataJson.districtName;
                }
                if (dataJson.townName == "" || dataJson.townName == null || dataJson.townName == undefined) {
                    dataJson.townName = "";
                } else {
                    dataJson.townName = dataJson.townName;
                }
                if (dataJson.reportType == "" || dataJson.reportType == null || dataJson.reportType == undefined) {
                    dataJson.reportType = "无";
                } else {
                    if (dataJson.reportType == "1") {
                        dataJson.reportType = "初报";
                    } else if (dataJson.reportType == "2") {
                        dataJson.reportType = "续报";
                    } else if (dataJson.reportType == "3") {
                        dataJson.reportType = "核报";
                    } else if (dataJson.reportType == "4") {
                        dataJson.reportType = "一季度报";
                    } else if (dataJson.reportType == "5") {
                        dataJson.reportType = "上半年报";
                    } else if (dataJson.reportType == "6") {
                        dataJson.reportType = "前三季度报";
                    } else if (dataJson.reportType == "7") {
                        dataJson.reportType = "年报";
                    }
                }
                if (dataJson.typhoonName == "" || dataJson.typhoonName == null || dataJson.typhoonName == undefined) {
                    dataJson.typhoonName = "无";
                } else {
                    dataJson.typhoonName = dataJson.typhoonName;
                }
                if (dataJson.phone == "" || dataJson.phone == null || dataJson.phone == undefined) {
                    dataJson.phone = "无";
                } else {
                    dataJson.phone = dataJson.phone;
                }
                if (dataJson.remark == "" || dataJson.remark == null || dataJson.remark == undefined) {
                    dataJson.remark = "无";
                } else {
                    dataJson.remark = dataJson.remark;
                }
                if (dataJson.fillUnit == "" || dataJson.fillUnit == null || dataJson.fillUnit == undefined) {
                    dataJson.fillUnit = "无";
                } else {
                    dataJson.fillUnit = dataJson.fillUnit;
                }
                if (dataJson.fillBy == "" || dataJson.fillBy == null || dataJson.fillBy == undefined) {
                    dataJson.fillBy = "无";
                } else {
                    dataJson.fillBy = dataJson.fillBy;
                }
                if (dataJson.fillCreateTime == "" || dataJson.fillCreateTime == null || dataJson.fillCreateTime == undefined) {
                    dataJson.fillCreateTime = "无";
                } else {
                    dataJson.fillCreateTime = new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                }
                if (String(dataJson.disasterPopulation) == "" || dataJson.disasterPopulation == null || dataJson.disasterPopulation == undefined) {
                    dataJson.disasterPopulation = "无";
                } else {
                    dataJson.disasterPopulation = dataJson.disasterPopulation;
                }
                if (String(dataJson.deadPopulation) == "" || dataJson.deadPopulation == null || dataJson.deadPopulation == undefined) {
                    dataJson.deadPopulation = "无";
                } else {
                    dataJson.deadPopulation = dataJson.deadPopulation;
                }
                if (String(dataJson.missPopulation) == "" || dataJson.missPopulation == null || dataJson.missPopulation == undefined) {
                    dataJson.missPopulation = "无";
                } else {
                    dataJson.missPopulation = dataJson.missPopulation;
                }
                if (String(dataJson.transferPopulation) == "" || dataJson.transferPopulation == null || dataJson.transferPopulation == undefined) {
                    dataJson.transferPopulation = "无";
                } else {
                    dataJson.transferPopulation = dataJson.transferPopulation;
                }
                if (String(dataJson.collapseHouse) == "" || dataJson.collapseHouse == null || dataJson.collapseHouse == undefined) {
                    dataJson.collapseHouse = "无";
                } else {
                    dataJson.collapseHouse = dataJson.collapseHouse;
                }
                if (String(dataJson.collapseHouseDirectEcoLoss) == "" || dataJson.collapseHouseDirectEcoLoss == null || dataJson.collapseHouseDirectEcoLoss == undefined) {
                    dataJson.collapseHouseDirectEcoLoss = "无";
                } else {
                    dataJson.collapseHouseDirectEcoLoss = dataJson.collapseHouseDirectEcoLoss;
                }
                if (String(dataJson.damagedHouse) == "" || dataJson.damagedHouse == null || dataJson.damagedHouse == undefined) {
                    dataJson.damagedHouse = "无";
                } else {
                    dataJson.damagedHouse = dataJson.damagedHouse;
                }
                if (String(dataJson.damagedHouseDirectEcoLoss) == "" || dataJson.damagedHouseDirectEcoLoss == null || dataJson.damagedHouseDirectEcoLoss == undefined) {
                    dataJson.damagedHouseDirectEcoLoss = "无";
                } else {
                    dataJson.damagedHouseDirectEcoLoss = dataJson.damagedHouseDirectEcoLoss;
                }
                if (String(dataJson.aquacultureAffectedArea) == "" || dataJson.aquacultureAffectedArea == null || dataJson.aquacultureAffectedArea == undefined) {
                    dataJson.aquacultureAffectedArea = "无";
                } else {
                    dataJson.aquacultureAffectedArea = dataJson.aquacultureAffectedArea;
                }
                if (String(dataJson.aquacultureDirectEcoLoss) == "" || dataJson.aquacultureDirectEcoLoss == null || dataJson.aquacultureDirectEcoLoss == undefined) {
                    dataJson.aquacultureDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureDirectEcoLoss = dataJson.aquacultureDirectEcoLoss;
                }
                if (String(dataJson.aquacultureDisasterArea) == "" || dataJson.aquacultureDisasterArea == null || dataJson.aquacultureDisasterArea == undefined) {
                    dataJson.aquacultureDisasterArea = "无";
                } else {
                    dataJson.aquacultureDisasterArea = dataJson.aquacultureDisasterArea;
                }
                if (String(dataJson.aquacultureDisasterDirectEcoLoss) == "" || dataJson.aquacultureDisasterDirectEcoLoss == null || dataJson.aquacultureDisasterDirectEcoLoss == undefined) {
                    dataJson.aquacultureDisasterDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureDisasterDirectEcoLoss = dataJson.aquacultureDisasterDirectEcoLoss;
                }
                if (String(dataJson.aquacultureNoGainArea) == "" || dataJson.aquacultureNoGainArea == null || dataJson.aquacultureNoGainArea == undefined) {
                    dataJson.aquacultureNoGainArea = "无";
                } else {
                    dataJson.aquacultureNoGainArea = dataJson.aquacultureNoGainArea;
                }
                if (String(dataJson.aquacultureNoGainDirectEcoLoss) == "" || dataJson.aquacultureNoGainDirectEcoLoss == null || dataJson.aquacultureNoGainDirectEcoLoss == undefined) {
                    dataJson.aquacultureNoGainDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureNoGainDirectEcoLoss = dataJson.aquacultureNoGainDirectEcoLoss;
                }
                if (String(dataJson.aquacultureLossNum) == "" || dataJson.aquacultureLossNum == null || dataJson.aquacultureLossNum == undefined) {
                    dataJson.aquacultureLossNum = "无";
                } else {
                    dataJson.aquacultureLossNum = dataJson.aquacultureLossNum;
                }
                if (String(dataJson.aquacultureEcoLoss) == "" || dataJson.aquacultureEcoLoss == null || dataJson.aquacultureEcoLoss == undefined) {
                    dataJson.aquacultureEcoLoss = "无";
                } else {
                    dataJson.aquacultureEcoLoss = dataJson.aquacultureEcoLoss;
                }
                if (String(dataJson.aquacultureDamageDeviceNum) == "" || dataJson.aquacultureDamageDeviceNum == null || dataJson.aquacultureDamageDeviceNum == undefined) {
                    dataJson.aquacultureDamageDeviceNum = "无";
                } else {
                    dataJson.aquacultureDamageDeviceNum = dataJson.aquacultureDamageDeviceNum;
                }
                if (String(dataJson.aquacultureDamageDeviceEcoLoss) == "" || dataJson.aquacultureDamageDeviceEcoLoss == null || dataJson.aquacultureDamageDeviceEcoLoss == undefined) {
                    dataJson.aquacultureDamageDeviceEcoLoss = "无";
                } else {
                    dataJson.aquacultureDamageDeviceEcoLoss = dataJson.aquacultureDamageDeviceEcoLoss;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatNum) == "" || dataJson.aquacultureDestroyedFishBoatNum == null || dataJson.aquacultureDestroyedFishBoatNum == undefined) {
                    dataJson.aquacultureDestroyedFishBoatNum = "无";
                } else {
                    dataJson.aquacultureDestroyedFishBoatNum = dataJson.aquacultureDestroyedFishBoatNum;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatEcoLoss) == "" || dataJson.aquacultureDestroyedFishBoatEcoLoss == null || dataJson.aquacultureDestroyedFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = "无";
                } else {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = dataJson.aquacultureDestroyedFishBoatEcoLoss;
                }
                if (String(dataJson.aquacultureDamageFishBoatNum) == "" || dataJson.aquacultureDamageFishBoatNum == null || dataJson.aquacultureDamageFishBoatNum == undefined) {
                    dataJson.aquacultureDamageFishBoatNum = "无";
                } else {
                    dataJson.aquacultureDamageFishBoatNum = dataJson.aquacultureDamageFishBoatNum;
                }
                if (String(dataJson.aquacultureDamageFishBoatEcoLoss) == "" || dataJson.aquacultureDamageFishBoatEcoLoss == null || dataJson.aquacultureDamageFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDamageFishBoatEcoLoss = "无";
                } else {
                    dataJson.aquacultureDamageFishBoatEcoLoss = dataJson.aquacultureDamageFishBoatEcoLoss;
                }
                if (String(dataJson.trafficDestroyedShipNum) == "" || dataJson.trafficDestroyedShipNum == null || dataJson.trafficDestroyedShipNum == undefined) {
                    dataJson.trafficDestroyedShipNum = "无";
                } else {
                    dataJson.trafficDestroyedShipNum = dataJson.trafficDestroyedShipNum;
                }
                if (String(dataJson.trafficDestroyedShipEcoLoss) == "" || dataJson.trafficDestroyedShipEcoLoss == null || dataJson.trafficDestroyedShipEcoLoss == undefined) {
                    dataJson.trafficDestroyedShipEcoLoss = "无";
                } else {
                    dataJson.trafficDestroyedShipEcoLoss = dataJson.trafficDestroyedShipEcoLoss;
                }
                if (String(dataJson.trafficDamageShipNum) == "" || dataJson.trafficDamageShipNum == null || dataJson.trafficDamageShipNum == undefined) {
                    dataJson.trafficDamageShipNum = "无";
                } else {
                    dataJson.trafficDamageShipNum = dataJson.trafficDamageShipNum;
                }
                if (String(dataJson.trafficDamageShipEcoLoss) == "" || dataJson.trafficDamageShipEcoLoss == null || dataJson.trafficDamageShipEcoLoss == undefined) {
                    dataJson.trafficDamageShipEcoLoss = "无";
                } else {
                    dataJson.trafficDamageShipEcoLoss = dataJson.trafficDamageShipEcoLoss;
                }
                if (String(dataJson.trafficShipCargoLossNum) == "" || dataJson.trafficShipCargoLossNum == null || dataJson.trafficShipCargoLossNum == undefined) {
                    dataJson.trafficShipCargoLossNum = "无";
                } else {
                    dataJson.trafficShipCargoLossNum = dataJson.trafficShipCargoLossNum;
                }
                if (String(dataJson.trafficShipCargoEcoLoss) == "" || dataJson.trafficShipCargoEcoLoss == null || dataJson.trafficShipCargoEcoLoss == undefined) {
                    dataJson.trafficShipCargoEcoLoss = "无";
                } else {
                    dataJson.trafficShipCargoEcoLoss = dataJson.trafficShipCargoEcoLoss;
                }
                if (String(dataJson.trafficChannelDepositLength) == "" || dataJson.trafficChannelDepositLength == null || dataJson.trafficChannelDepositLength == undefined) {
                    dataJson.trafficChannelDepositLength = "无";
                } else {
                    dataJson.trafficChannelDepositLength = dataJson.trafficChannelDepositLength;
                }
                if (String(dataJson.trafficChannelDepositEcoLoss) == "" || dataJson.trafficChannelDepositEcoLoss == null || dataJson.trafficChannelDepositEcoLoss == undefined) {
                    dataJson.trafficChannelDepositEcoLoss = "无";
                } else {
                    dataJson.trafficChannelDepositEcoLoss = dataJson.trafficChannelDepositEcoLoss;
                }
                if (String(dataJson.trafficDestroyedNavMarkNum) == "" || dataJson.trafficDestroyedNavMarkNum == null || dataJson.trafficDestroyedNavMarkNum == undefined) {
                    dataJson.trafficDestroyedNavMarkNum = "无";
                } else {
                    dataJson.trafficDestroyedNavMarkNum = dataJson.trafficDestroyedNavMarkNum;
                }
                if (String(dataJson.trafficDestroyedNavMarkEcoLoss) == "" || dataJson.trafficDestroyedNavMarkEcoLoss == null || dataJson.trafficDestroyedNavMarkEcoLoss == undefined) {
                    dataJson.trafficDestroyedNavMarkEcoLoss = "无";
                } else {
                    dataJson.trafficDestroyedNavMarkEcoLoss = dataJson.trafficDestroyedNavMarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedPortNum) == "" || dataJson.coastalDamagedPortNum == null || dataJson.coastalDamagedPortNum == undefined) {
                    dataJson.coastalDamagedPortNum = "无";
                } else {
                    dataJson.coastalDamagedPortNum = dataJson.coastalDamagedPortNum;
                }
                if (String(dataJson.coastalDamagedPortEcoLoss) == "" || dataJson.coastalDamagedPortEcoLoss == null || dataJson.coastalDamagedPortEcoLoss == undefined) {
                    dataJson.coastalDamagedPortEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedPortEcoLoss = dataJson.coastalDamagedPortEcoLoss;
                }
                if (String(dataJson.coastalDamagedWharfLength) == "" || dataJson.coastalDamagedWharfLength == null || dataJson.coastalDamagedWharfLength == undefined) {
                    dataJson.coastalDamagedWharfLength = "无";
                } else {
                    dataJson.coastalDamagedWharfLength = dataJson.coastalDamagedWharfLength;
                }
                if (String(dataJson.coastalDamagedWharfEcoLoss) == "" || dataJson.coastalDamagedWharfEcoLoss == null || dataJson.coastalDamagedWharfEcoLoss == undefined) {
                    dataJson.coastalDamagedWharfEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedWharfEcoLoss = dataJson.coastalDamagedWharfEcoLoss;
                }
                if (String(dataJson.coastalDamagedCargoNum) == "" || dataJson.coastalDamagedCargoNum == null || dataJson.coastalDamagedCargoNum == undefined) {
                    dataJson.coastalDamagedCargoNum = "无";
                } else {
                    dataJson.coastalDamagedCargoNum = dataJson.coastalDamagedCargoNum;
                }
                if (String(dataJson.coastalDamagedCargoEcoLoss) == "" || dataJson.coastalDamagedCargoEcoLoss == null || dataJson.coastalDamagedCargoEcoLoss == undefined) {
                    dataJson.coastalDamagedCargoEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedCargoEcoLoss = dataJson.coastalDamagedCargoEcoLoss;
                }
                if (String(dataJson.coastalDamagedBulwarkLength) == "" || dataJson.coastalDamagedBulwarkLength == null || dataJson.coastalDamagedBulwarkLength == undefined) {
                    dataJson.coastalDamagedBulwarkLength = "无";
                } else {
                    dataJson.coastalDamagedBulwarkLength = dataJson.coastalDamagedBulwarkLength;
                }
                if (String(dataJson.coastalDamagedBulwarkEcoLoss) == "" || dataJson.coastalDamagedBulwarkEcoLoss == null || dataJson.coastalDamagedBulwarkEcoLoss == undefined) {
                    dataJson.coastalDamagedBulwarkEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedBulwarkEcoLoss = dataJson.coastalDamagedBulwarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedSeawallLength) == "" || dataJson.coastalDamagedSeawallLength == null || dataJson.coastalDamagedSeawallLength == undefined) {
                    dataJson.coastalDamagedSeawallLength = "无";
                } else {
                    dataJson.coastalDamagedSeawallLength = dataJson.coastalDamagedSeawallLength;
                }
                if (String(dataJson.coastalDamagedSeawallEcoLoss) == "" || dataJson.coastalDamagedSeawallEcoLoss == null || dataJson.coastalDamagedSeawallEcoLoss == undefined) {
                    dataJson.coastalDamagedSeawallEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedSeawallEcoLoss = dataJson.coastalDamagedSeawallEcoLoss;
                }
                if (String(dataJson.coastalDamagedRoadLength) == "" || dataJson.coastalDamagedRoadLength == null || dataJson.coastalDamagedRoadLength == undefined) {
                    dataJson.coastalDamagedRoadLength = "无";
                } else {
                    dataJson.coastalDamagedRoadLength = dataJson.coastalDamagedRoadLength;
                }
                if (String(dataJson.coastalDamagedRoadEcoLoss) == "" || dataJson.coastalDamagedRoadEcoLoss == null || dataJson.coastalDamagedRoadEcoLoss == undefined) {
                    dataJson.coastalDamagedRoadEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedRoadEcoLoss = dataJson.coastalDamagedRoadEcoLoss;
                }
                if (String(dataJson.coastalDamagedComDeviceNum) == "" || dataJson.coastalDamagedComDeviceNum == null || dataJson.coastalDamagedComDeviceNum == undefined) {
                    dataJson.coastalDamagedComDeviceNum = "无";
                } else {
                    dataJson.coastalDamagedComDeviceNum = dataJson.coastalDamagedComDeviceNum;
                }
                if (String(dataJson.coastalDamagedComDeviceEcoLoss) == "" || dataJson.coastalDamagedComDeviceEcoLoss == null || dataJson.coastalDamagedComDeviceEcoLoss == undefined) {
                    dataJson.coastalDamagedComDeviceEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedComDeviceEcoLoss = dataJson.coastalDamagedComDeviceEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilPlatformNum) == "" || dataJson.offshoreDamagedOilPlatformNum == null || dataJson.offshoreDamagedOilPlatformNum == undefined) {
                    dataJson.offshoreDamagedOilPlatformNum = "无";
                } else {
                    dataJson.offshoreDamagedOilPlatformNum = dataJson.offshoreDamagedOilPlatformNum;
                }
                if (String(dataJson.offshoreDamagedOilPlatformEcoLoss) == "" || dataJson.offshoreDamagedOilPlatformEcoLoss == null || dataJson.offshoreDamagedOilPlatformEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = dataJson.offshoreDamagedOilPlatformEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilGasLength) == "" || dataJson.offshoreDamagedOilGasLength == null || dataJson.offshoreDamagedOilGasLength == undefined) {
                    dataJson.offshoreDamagedOilGasLength = "无";
                } else {
                    dataJson.offshoreDamagedOilGasLength = dataJson.offshoreDamagedOilGasLength;
                }
                if (String(dataJson.offshoreDamagedOilGasEcoLoss) == "" || dataJson.offshoreDamagedOilGasEcoLoss == null || dataJson.offshoreDamagedOilGasEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilGasEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedOilGasEcoLoss = dataJson.offshoreDamagedOilGasEcoLoss;
                }
                if (String(dataJson.offshoreDamagedBridgeNum) == "" || dataJson.offshoreDamagedBridgeNum == null || dataJson.offshoreDamagedBridgeNum == undefined) {
                    dataJson.offshoreDamagedBridgeNum = "无";
                } else {
                    dataJson.offshoreDamagedBridgeNum = dataJson.offshoreDamagedBridgeNum;
                }
                if (String(dataJson.offshoreDamagedBridgeEcoLoss) == "" || dataJson.offshoreDamagedBridgeEcoLoss == null || dataJson.offshoreDamagedBridgeEcoLoss == undefined) {
                    dataJson.offshoreDamagedBridgeEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedBridgeEcoLoss = dataJson.offshoreDamagedBridgeEcoLoss;
                }
                if (String(dataJson.offshoreBothNetLength) == "" || dataJson.offshoreBothNetLength == null || dataJson.offshoreBothNetLength == undefined) {
                    dataJson.offshoreBothNetLength = "无";
                } else {
                    dataJson.offshoreBothNetLength = dataJson.offshoreBothNetLength;
                }
                if (String(dataJson.offshoreBothNetEcoLoss) == "" || dataJson.offshoreBothNetEcoLoss == null || dataJson.offshoreBothNetEcoLoss == undefined) {
                    dataJson.offshoreBothNetEcoLoss = "无";
                } else {
                    dataJson.offshoreBothNetEcoLoss = dataJson.offshoreBothNetEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeFarmlandNum) == "" || dataJson.offshoreSubmergeFarmlandNum == null || dataJson.offshoreSubmergeFarmlandNum == undefined) {
                    dataJson.offshoreSubmergeFarmlandNum = "无";
                } else {
                    dataJson.offshoreSubmergeFarmlandNum = dataJson.offshoreSubmergeFarmlandNum;
                }
                if (String(dataJson.offshoreSubmergeFarmlandEcoLoss) == "" || dataJson.offshoreSubmergeFarmlandEcoLoss == null || dataJson.offshoreSubmergeFarmlandEcoLoss == undefined) {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = "无";
                } else {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = dataJson.offshoreSubmergeFarmlandEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldNum) == "" || dataJson.offshoreSubmergeSaltFieldNum == null || dataJson.offshoreSubmergeSaltFieldNum == undefined) {
                    dataJson.offshoreSubmergeSaltFieldNum = "无";
                } else {
                    dataJson.offshoreSubmergeSaltFieldNum = dataJson.offshoreSubmergeSaltFieldNum;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldEcoLoss) == "" || dataJson.offshoreSubmergeSaltFieldEcoLoss == null || dataJson.offshoreSubmergeSaltFieldEcoLoss == undefined) {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = "无";
                } else {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = dataJson.offshoreSubmergeSaltFieldEcoLoss;
                }
                $("#titleInfo").text(dataJson.title);
                $("#addressInfo").text(dataJson.districtName + dataJson.townName);
                $("#reportTypeInfo").text(dataJson.reportType);
                $("#typhoonNameInfo").text(dataJson.typhoonName);
                $("#phoneInfo").text(dataJson.phone);
                $("#remarkInfo").text(dataJson.remark);
                $("#fillUnitInfo").text(dataJson.fillUnit);
                $("#fillByInfo").text(dataJson.fillBy);
                $("#fillCreateTimeInfo").text(dataJson.fillCreateTime);
                $("#disasterPopulationInfo").text(dataJson.disasterPopulation);
                $("#deadPopulationInfo").text(dataJson.deadPopulation);
                $("#missPopulationInfo").text(dataJson.missPopulation);
                $("#transferPopulationInfo").text(dataJson.transferPopulation);
                $("#collapseHouseInfo").text(dataJson.collapseHouse);
                $("#collapseHouseDirectEcoLossInfo").text(dataJson.collapseHouseDirectEcoLoss);
                $("#damagedHouseInfo").text(dataJson.damagedHouse);
                $("#damagedHouseDirectEcoLossInfo").text(dataJson.damagedHouseDirectEcoLoss);
                $("#aquacultureAffectedAreaInfo").text(dataJson.aquacultureAffectedArea);
                $("#aquacultureDirectEcoLossInfo").text(dataJson.aquacultureDirectEcoLoss);
                $("#aquacultureDisasterAreaInfo").text(dataJson.aquacultureDisasterArea);
                $("#aquacultureDisasterDirectEcoLossInfo").text(dataJson.aquacultureDisasterDirectEcoLoss);
                $("#aquacultureNoGainAreaInfo").text(dataJson.aquacultureNoGainArea);
                $("#aquacultureNoGainDirectEcoLossInfo").text(dataJson.aquacultureNoGainDirectEcoLoss);
                $("#aquacultureLossNumInfo").text(dataJson.aquacultureLossNum);
                $("#aquacultureEcoLossInfo").text(dataJson.aquacultureEcoLoss);
                $("#aquacultureDamageDeviceNumInfo").text(dataJson.aquacultureDamageDeviceNum);
                $("#aquacultureDamageDeviceEcoLossInfo").text(dataJson.aquacultureDamageDeviceEcoLoss);
                $("#aquacultureDestroyedFishBoatNumInfo").text(dataJson.aquacultureDestroyedFishBoatNum);
                $("#aquacultureDestroyedFishBoatEcoLossInfo").text(dataJson.aquacultureDestroyedFishBoatEcoLoss);
                $("#aquacultureDamageFishBoatNumInfo").text(dataJson.aquacultureDamageFishBoatNum);
                $("#aquacultureDamageFishBoatEcoLossInfo").text(dataJson.aquacultureDamageFishBoatEcoLoss);
                $("#trafficDestroyedShipNumInfo").text(dataJson.trafficDestroyedShipNum);
                $("#trafficDestroyedShipEcoLossInfo").text(dataJson.trafficDestroyedShipEcoLoss);
                $("#trafficDamageShipNumInfo").text(dataJson.trafficDamageShipNum);
                $("#trafficDamageShipEcoLossInfo").text(dataJson.trafficDamageShipEcoLoss);
                $("#trafficShipCargoLossNumInfo").text(dataJson.trafficShipCargoLossNum);
                $("#trafficShipCargoEcoLossInfo").text(dataJson.trafficShipCargoEcoLoss);
                $("#trafficChannelDepositLengthInfo").text(dataJson.trafficChannelDepositLength);
                $("#trafficChannelDepositEcoLossInfo").text(dataJson.trafficChannelDepositEcoLoss);
                $("#trafficDestroyedNavMarkNumInfo").text(dataJson.trafficDestroyedNavMarkNum);
                $("#trafficDestroyedNavMarkEcoLossInfo").text(dataJson.trafficDestroyedNavMarkEcoLoss);
                $("#coastalDamagedPortNumInfo").text(dataJson.coastalDamagedPortNum);
                $("#coastalDamagedPortEcoLossInfo").text(dataJson.coastalDamagedPortEcoLoss);
                $("#coastalDamagedWharfLengthInfo").text(dataJson.coastalDamagedWharfLength);
                $("#coastalDamagedWharfEcoLossInfo").text(dataJson.coastalDamagedWharfEcoLoss);
                $("#coastalDamagedCargoNumInfo").text(dataJson.coastalDamagedCargoNum);
                $("#coastalDamagedCargoEcoLossInfo").text(dataJson.coastalDamagedCargoEcoLoss);
                $("#coastalDamagedBulwarkLengthInfo").text(dataJson.coastalDamagedBulwarkLength);
                $("#coastalDamagedBulwarkEcoLossInfo").text(dataJson.coastalDamagedBulwarkEcoLoss);
                $("#coastalDamagedSeawallLengthInfo").text(dataJson.coastalDamagedSeawallLength);
                $("#coastalDamagedSeawallEcoLossInfo").text(dataJson.coastalDamagedSeawallEcoLoss);
                $("#coastalDamagedRoadLengthInfo").text(dataJson.coastalDamagedRoadLength);
                $("#coastalDamagedRoadEcoLossInfo").text(dataJson.coastalDamagedRoadEcoLoss);
                $("#coastalDamagedComDeviceNumInfo").text(dataJson.coastalDamagedComDeviceNum);
                $("#coastalDamagedComDeviceEcoLossInfo").text(dataJson.coastalDamagedComDeviceEcoLoss);
                $("#offshoreDamagedOilPlatformNumInfo").text(dataJson.offshoreDamagedOilPlatformNum);
                $("#offshoreDamagedOilPlatformEcoLossInfo").text(dataJson.offshoreDamagedOilPlatformEcoLoss);
                $("#offshoreDamagedOilGasLengthInfo").text(dataJson.offshoreDamagedOilGasLength);
                $("#offshoreDamagedOilGasEcoLossInfo").text(dataJson.offshoreDamagedOilGasEcoLoss);
                $("#offshoreDamagedBridgeNumInfo").text(dataJson.offshoreDamagedBridgeNum);
                $("#offshoreDamagedBridgeEcoLossInfo").text(dataJson.offshoreDamagedBridgeEcoLoss);
                $("#offshoreBothNetLengthInfo").text(dataJson.offshoreBothNetLength);
                $("#offshoreBothNetEcoLossInfo").text(dataJson.offshoreBothNetEcoLoss);
                $("#offshoreSubmergeFarmlandNumInfo").text(dataJson.offshoreSubmergeFarmlandNum);
                $("#offshoreSubmergeFarmlandEcoLossInfo").text(dataJson.offshoreSubmergeFarmlandEcoLoss);
                $("#offshoreSubmergeSaltFieldNumInfo").text(dataJson.offshoreSubmergeSaltFieldNum);
                $("#offshoreSubmergeSaltFieldEcoLossInfo").text(dataJson.offshoreSubmergeSaltFieldEcoLoss);
                var imgList = "";
                if (dataJson.picArray == "" || dataJson.picArray == null || dataJson.picArray == undefined) {
                    imgList = "";
                } else {
                    var imgListItem = "";
                    for (var i = 0; i < dataJson.picArray.length; i++) {
                        imgListItem = imgListItem + "<div class=\"detail-img-item\">\n" +
                            "                                    <img src=\"" + dataJson.picArray[i].suffixUrl + "\"/>\n" +
                            "                                </div>";
                    }
                    imgList = "<div class=\"detail-img-show\">\n" +
                        "                                <img src=\"" + dataJson.picArray[0].suffixUrl + "\"/>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"detail-img-list\">\n" + imgListItem +
                        "                            </div>";
                }
                $(".detail-img-box").html(imgList);
                //图片切换
                $(".detail-img-item img").click(function () {
                    var src = $(this).attr("src");
                    $(".detail-img-show img").attr("src", src);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
}
//删除
function tableDel() {
    var ids = [];
    $(".table-delIcon").click(function () {
        var id = $(this).parent().siblings("td").eq(1).text();
        ids.push(id);
        $("#disaster-del").show();
        $("#disaster-del-sure").click(function () {
            $.ajax({
                url: srcPath + "admin/disaster/information/delete",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "ids": ids
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    console.log(data);
                    if (data.code == 200) {
                        $("#disaster-del").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        }, 1000);
                        var title = $("#infoSearchName").val();
                        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
                    } else if (data.code == "-1") {
                        $("#fail").show();
                        setTimeout(function () {
                            $("#fail").hide();
                        },1000);
                    } else {

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    });
}
//表格行双击获取详细信息
function infoDoubleClick(){
    $("#disaster-table").find("tbody tr").dblclick(function(){
        var id=$(this).find("td").eq(1).text();
        $("#disaster-info").show();
        $.ajax({
            url: srcPath + "admin/disaster/information/detail",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "id": id
            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                console.log(data);
                var dataJson = data.data;
                if (dataJson.title == "" || dataJson.title == null || dataJson.title == undefined) {
                    dataJson.title = "无";
                } else {
                    dataJson.title = dataJson.title;
                }
                if (dataJson.districtName == "" || dataJson.districtName == null || dataJson.districtName == undefined) {
                    dataJson.districtName = "无";
                } else {
                    dataJson.districtName = dataJson.districtName;
                }
                if (dataJson.townName == "" || dataJson.townName == null || dataJson.townName == undefined) {
                    dataJson.townName = "";
                } else {
                    dataJson.townName = dataJson.townName;
                }
                if (dataJson.reportType == "" || dataJson.reportType == null || dataJson.reportType == undefined) {
                    dataJson.reportType = "无";
                } else {
                    if (dataJson.reportType == "1") {
                        dataJson.reportType = "初报";
                    } else if (dataJson.reportType == "2") {
                        dataJson.reportType = "续报";
                    } else if (dataJson.reportType == "3") {
                        dataJson.reportType = "核报";
                    } else if (dataJson.reportType == "4") {
                        dataJson.reportType = "一季度报";
                    } else if (dataJson.reportType == "5") {
                        dataJson.reportType = "上半年报";
                    } else if (dataJson.reportType == "6") {
                        dataJson.reportType = "前三季度报";
                    } else if (dataJson.reportType == "7") {
                        dataJson.reportType = "年报";
                    }
                }
                if (dataJson.typhoonName == "" || dataJson.typhoonName == null || dataJson.typhoonName == undefined) {
                    dataJson.typhoonName = "无";
                } else {
                    dataJson.typhoonName = dataJson.typhoonName;
                }
                if (dataJson.phone == "" || dataJson.phone == null || dataJson.phone == undefined) {
                    dataJson.phone = "无";
                } else {
                    dataJson.phone = dataJson.phone;
                }
                if (dataJson.remark == "" || dataJson.remark == null || dataJson.remark == undefined) {
                    dataJson.remark = "无";
                } else {
                    dataJson.remark = dataJson.remark;
                }
                if (dataJson.fillUnit == "" || dataJson.fillUnit == null || dataJson.fillUnit == undefined) {
                    dataJson.fillUnit = "无";
                } else {
                    dataJson.fillUnit = dataJson.fillUnit;
                }
                if (dataJson.fillBy == "" || dataJson.fillBy == null || dataJson.fillBy == undefined) {
                    dataJson.fillBy = "无";
                } else {
                    dataJson.fillBy = dataJson.fillBy;
                }
                if (dataJson.fillCreateTime == "" || dataJson.fillCreateTime == null || dataJson.fillCreateTime == undefined) {
                    dataJson.fillCreateTime = "无";
                } else {
                    dataJson.fillCreateTime = new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                }
                if (String(dataJson.disasterPopulation) == "" || dataJson.disasterPopulation == null || dataJson.disasterPopulation == undefined) {
                    dataJson.disasterPopulation = "无";
                } else {
                    dataJson.disasterPopulation = dataJson.disasterPopulation;
                }
                if (String(dataJson.deadPopulation) == "" || dataJson.deadPopulation == null || dataJson.deadPopulation == undefined) {
                    dataJson.deadPopulation = "无";
                } else {
                    dataJson.deadPopulation = dataJson.deadPopulation;
                }
                if (String(dataJson.missPopulation) == "" || dataJson.missPopulation == null || dataJson.missPopulation == undefined) {
                    dataJson.missPopulation = "无";
                } else {
                    dataJson.missPopulation = dataJson.missPopulation;
                }
                if (String(dataJson.transferPopulation) == "" || dataJson.transferPopulation == null || dataJson.transferPopulation == undefined) {
                    dataJson.transferPopulation = "无";
                } else {
                    dataJson.transferPopulation = dataJson.transferPopulation;
                }
                if (String(dataJson.collapseHouse) == "" || dataJson.collapseHouse == null || dataJson.collapseHouse == undefined) {
                    dataJson.collapseHouse = "无";
                } else {
                    dataJson.collapseHouse = dataJson.collapseHouse;
                }
                if (String(dataJson.collapseHouseDirectEcoLoss) == "" || dataJson.collapseHouseDirectEcoLoss == null || dataJson.collapseHouseDirectEcoLoss == undefined) {
                    dataJson.collapseHouseDirectEcoLoss = "无";
                } else {
                    dataJson.collapseHouseDirectEcoLoss = dataJson.collapseHouseDirectEcoLoss;
                }
                if (String(dataJson.damagedHouse) == "" || dataJson.damagedHouse == null || dataJson.damagedHouse == undefined) {
                    dataJson.damagedHouse = "无";
                } else {
                    dataJson.damagedHouse = dataJson.damagedHouse;
                }
                if (String(dataJson.damagedHouseDirectEcoLoss) == "" || dataJson.damagedHouseDirectEcoLoss == null || dataJson.damagedHouseDirectEcoLoss == undefined) {
                    dataJson.damagedHouseDirectEcoLoss = "无";
                } else {
                    dataJson.damagedHouseDirectEcoLoss = dataJson.damagedHouseDirectEcoLoss;
                }
                if (String(dataJson.aquacultureAffectedArea) == "" || dataJson.aquacultureAffectedArea == null || dataJson.aquacultureAffectedArea == undefined) {
                    dataJson.aquacultureAffectedArea = "无";
                } else {
                    dataJson.aquacultureAffectedArea = dataJson.aquacultureAffectedArea;
                }
                if (String(dataJson.aquacultureDirectEcoLoss) == "" || dataJson.aquacultureDirectEcoLoss == null || dataJson.aquacultureDirectEcoLoss == undefined) {
                    dataJson.aquacultureDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureDirectEcoLoss = dataJson.aquacultureDirectEcoLoss;
                }
                if (String(dataJson.aquacultureDisasterArea) == "" || dataJson.aquacultureDisasterArea == null || dataJson.aquacultureDisasterArea == undefined) {
                    dataJson.aquacultureDisasterArea = "无";
                } else {
                    dataJson.aquacultureDisasterArea = dataJson.aquacultureDisasterArea;
                }
                if (String(dataJson.aquacultureDisasterDirectEcoLoss) == "" || dataJson.aquacultureDisasterDirectEcoLoss == null || dataJson.aquacultureDisasterDirectEcoLoss == undefined) {
                    dataJson.aquacultureDisasterDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureDisasterDirectEcoLoss = dataJson.aquacultureDisasterDirectEcoLoss;
                }
                if (String(dataJson.aquacultureNoGainArea) == "" || dataJson.aquacultureNoGainArea == null || dataJson.aquacultureNoGainArea == undefined) {
                    dataJson.aquacultureNoGainArea = "无";
                } else {
                    dataJson.aquacultureNoGainArea = dataJson.aquacultureNoGainArea;
                }
                if (String(dataJson.aquacultureNoGainDirectEcoLoss) == "" || dataJson.aquacultureNoGainDirectEcoLoss == null || dataJson.aquacultureNoGainDirectEcoLoss == undefined) {
                    dataJson.aquacultureNoGainDirectEcoLoss = "无";
                } else {
                    dataJson.aquacultureNoGainDirectEcoLoss = dataJson.aquacultureNoGainDirectEcoLoss;
                }
                if (String(dataJson.aquacultureLossNum) == "" || dataJson.aquacultureLossNum == null || dataJson.aquacultureLossNum == undefined) {
                    dataJson.aquacultureLossNum = "无";
                } else {
                    dataJson.aquacultureLossNum = dataJson.aquacultureLossNum;
                }
                if (String(dataJson.aquacultureEcoLoss) == "" || dataJson.aquacultureEcoLoss == null || dataJson.aquacultureEcoLoss == undefined) {
                    dataJson.aquacultureEcoLoss = "无";
                } else {
                    dataJson.aquacultureEcoLoss = dataJson.aquacultureEcoLoss;
                }
                if (String(dataJson.aquacultureDamageDeviceNum) == "" || dataJson.aquacultureDamageDeviceNum == null || dataJson.aquacultureDamageDeviceNum == undefined) {
                    dataJson.aquacultureDamageDeviceNum = "无";
                } else {
                    dataJson.aquacultureDamageDeviceNum = dataJson.aquacultureDamageDeviceNum;
                }
                if (String(dataJson.aquacultureDamageDeviceEcoLoss) == "" || dataJson.aquacultureDamageDeviceEcoLoss == null || dataJson.aquacultureDamageDeviceEcoLoss == undefined) {
                    dataJson.aquacultureDamageDeviceEcoLoss = "无";
                } else {
                    dataJson.aquacultureDamageDeviceEcoLoss = dataJson.aquacultureDamageDeviceEcoLoss;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatNum) == "" || dataJson.aquacultureDestroyedFishBoatNum == null || dataJson.aquacultureDestroyedFishBoatNum == undefined) {
                    dataJson.aquacultureDestroyedFishBoatNum = "无";
                } else {
                    dataJson.aquacultureDestroyedFishBoatNum = dataJson.aquacultureDestroyedFishBoatNum;
                }
                if (String(dataJson.aquacultureDestroyedFishBoatEcoLoss) == "" || dataJson.aquacultureDestroyedFishBoatEcoLoss == null || dataJson.aquacultureDestroyedFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = "无";
                } else {
                    dataJson.aquacultureDestroyedFishBoatEcoLoss = dataJson.aquacultureDestroyedFishBoatEcoLoss;
                }
                if (String(dataJson.aquacultureDamageFishBoatNum) == "" || dataJson.aquacultureDamageFishBoatNum == null || dataJson.aquacultureDamageFishBoatNum == undefined) {
                    dataJson.aquacultureDamageFishBoatNum = "无";
                } else {
                    dataJson.aquacultureDamageFishBoatNum = dataJson.aquacultureDamageFishBoatNum;
                }
                if (String(dataJson.aquacultureDamageFishBoatEcoLoss) == "" || dataJson.aquacultureDamageFishBoatEcoLoss == null || dataJson.aquacultureDamageFishBoatEcoLoss == undefined) {
                    dataJson.aquacultureDamageFishBoatEcoLoss = "无";
                } else {
                    dataJson.aquacultureDamageFishBoatEcoLoss = dataJson.aquacultureDamageFishBoatEcoLoss;
                }
                if (String(dataJson.trafficDestroyedShipNum) == "" || dataJson.trafficDestroyedShipNum == null || dataJson.trafficDestroyedShipNum == undefined) {
                    dataJson.trafficDestroyedShipNum = "无";
                } else {
                    dataJson.trafficDestroyedShipNum = dataJson.trafficDestroyedShipNum;
                }
                if (String(dataJson.trafficDestroyedShipEcoLoss) == "" || dataJson.trafficDestroyedShipEcoLoss == null || dataJson.trafficDestroyedShipEcoLoss == undefined) {
                    dataJson.trafficDestroyedShipEcoLoss = "无";
                } else {
                    dataJson.trafficDestroyedShipEcoLoss = dataJson.trafficDestroyedShipEcoLoss;
                }
                if (String(dataJson.trafficDamageShipNum) == "" || dataJson.trafficDamageShipNum == null || dataJson.trafficDamageShipNum == undefined) {
                    dataJson.trafficDamageShipNum = "无";
                } else {
                    dataJson.trafficDamageShipNum = dataJson.trafficDamageShipNum;
                }
                if (String(dataJson.trafficDamageShipEcoLoss) == "" || dataJson.trafficDamageShipEcoLoss == null || dataJson.trafficDamageShipEcoLoss == undefined) {
                    dataJson.trafficDamageShipEcoLoss = "无";
                } else {
                    dataJson.trafficDamageShipEcoLoss = dataJson.trafficDamageShipEcoLoss;
                }
                if (String(dataJson.trafficShipCargoLossNum) == "" || dataJson.trafficShipCargoLossNum == null || dataJson.trafficShipCargoLossNum == undefined) {
                    dataJson.trafficShipCargoLossNum = "无";
                } else {
                    dataJson.trafficShipCargoLossNum = dataJson.trafficShipCargoLossNum;
                }
                if (String(dataJson.trafficShipCargoEcoLoss) == "" || dataJson.trafficShipCargoEcoLoss == null || dataJson.trafficShipCargoEcoLoss == undefined) {
                    dataJson.trafficShipCargoEcoLoss = "无";
                } else {
                    dataJson.trafficShipCargoEcoLoss = dataJson.trafficShipCargoEcoLoss;
                }
                if (String(dataJson.trafficChannelDepositLength) == "" || dataJson.trafficChannelDepositLength == null || dataJson.trafficChannelDepositLength == undefined) {
                    dataJson.trafficChannelDepositLength = "无";
                } else {
                    dataJson.trafficChannelDepositLength = dataJson.trafficChannelDepositLength;
                }
                if (String(dataJson.trafficChannelDepositEcoLoss) == "" || dataJson.trafficChannelDepositEcoLoss == null || dataJson.trafficChannelDepositEcoLoss == undefined) {
                    dataJson.trafficChannelDepositEcoLoss = "无";
                } else {
                    dataJson.trafficChannelDepositEcoLoss = dataJson.trafficChannelDepositEcoLoss;
                }
                if (String(dataJson.trafficDestroyedNavMarkNum) == "" || dataJson.trafficDestroyedNavMarkNum == null || dataJson.trafficDestroyedNavMarkNum == undefined) {
                    dataJson.trafficDestroyedNavMarkNum = "无";
                } else {
                    dataJson.trafficDestroyedNavMarkNum = dataJson.trafficDestroyedNavMarkNum;
                }
                if (String(dataJson.trafficDestroyedNavMarkEcoLoss) == "" || dataJson.trafficDestroyedNavMarkEcoLoss == null || dataJson.trafficDestroyedNavMarkEcoLoss == undefined) {
                    dataJson.trafficDestroyedNavMarkEcoLoss = "无";
                } else {
                    dataJson.trafficDestroyedNavMarkEcoLoss = dataJson.trafficDestroyedNavMarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedPortNum) == "" || dataJson.coastalDamagedPortNum == null || dataJson.coastalDamagedPortNum == undefined) {
                    dataJson.coastalDamagedPortNum = "无";
                } else {
                    dataJson.coastalDamagedPortNum = dataJson.coastalDamagedPortNum;
                }
                if (String(dataJson.coastalDamagedPortEcoLoss) == "" || dataJson.coastalDamagedPortEcoLoss == null || dataJson.coastalDamagedPortEcoLoss == undefined) {
                    dataJson.coastalDamagedPortEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedPortEcoLoss = dataJson.coastalDamagedPortEcoLoss;
                }
                if (String(dataJson.coastalDamagedWharfLength) == "" || dataJson.coastalDamagedWharfLength == null || dataJson.coastalDamagedWharfLength == undefined) {
                    dataJson.coastalDamagedWharfLength = "无";
                } else {
                    dataJson.coastalDamagedWharfLength = dataJson.coastalDamagedWharfLength;
                }
                if (String(dataJson.coastalDamagedWharfEcoLoss) == "" || dataJson.coastalDamagedWharfEcoLoss == null || dataJson.coastalDamagedWharfEcoLoss == undefined) {
                    dataJson.coastalDamagedWharfEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedWharfEcoLoss = dataJson.coastalDamagedWharfEcoLoss;
                }
                if (String(dataJson.coastalDamagedCargoNum) == "" || dataJson.coastalDamagedCargoNum == null || dataJson.coastalDamagedCargoNum == undefined) {
                    dataJson.coastalDamagedCargoNum = "无";
                } else {
                    dataJson.coastalDamagedCargoNum = dataJson.coastalDamagedCargoNum;
                }
                if (String(dataJson.coastalDamagedCargoEcoLoss) == "" || dataJson.coastalDamagedCargoEcoLoss == null || dataJson.coastalDamagedCargoEcoLoss == undefined) {
                    dataJson.coastalDamagedCargoEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedCargoEcoLoss = dataJson.coastalDamagedCargoEcoLoss;
                }
                if (String(dataJson.coastalDamagedBulwarkLength) == "" || dataJson.coastalDamagedBulwarkLength == null || dataJson.coastalDamagedBulwarkLength == undefined) {
                    dataJson.coastalDamagedBulwarkLength = "无";
                } else {
                    dataJson.coastalDamagedBulwarkLength = dataJson.coastalDamagedBulwarkLength;
                }
                if (String(dataJson.coastalDamagedBulwarkEcoLoss) == "" || dataJson.coastalDamagedBulwarkEcoLoss == null || dataJson.coastalDamagedBulwarkEcoLoss == undefined) {
                    dataJson.coastalDamagedBulwarkEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedBulwarkEcoLoss = dataJson.coastalDamagedBulwarkEcoLoss;
                }
                if (String(dataJson.coastalDamagedSeawallLength) == "" || dataJson.coastalDamagedSeawallLength == null || dataJson.coastalDamagedSeawallLength == undefined) {
                    dataJson.coastalDamagedSeawallLength = "无";
                } else {
                    dataJson.coastalDamagedSeawallLength = dataJson.coastalDamagedSeawallLength;
                }
                if (String(dataJson.coastalDamagedSeawallEcoLoss) == "" || dataJson.coastalDamagedSeawallEcoLoss == null || dataJson.coastalDamagedSeawallEcoLoss == undefined) {
                    dataJson.coastalDamagedSeawallEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedSeawallEcoLoss = dataJson.coastalDamagedSeawallEcoLoss;
                }
                if (String(dataJson.coastalDamagedRoadLength) == "" || dataJson.coastalDamagedRoadLength == null || dataJson.coastalDamagedRoadLength == undefined) {
                    dataJson.coastalDamagedRoadLength = "无";
                } else {
                    dataJson.coastalDamagedRoadLength = dataJson.coastalDamagedRoadLength;
                }
                if (String(dataJson.coastalDamagedRoadEcoLoss) == "" || dataJson.coastalDamagedRoadEcoLoss == null || dataJson.coastalDamagedRoadEcoLoss == undefined) {
                    dataJson.coastalDamagedRoadEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedRoadEcoLoss = dataJson.coastalDamagedRoadEcoLoss;
                }
                if (String(dataJson.coastalDamagedComDeviceNum) == "" || dataJson.coastalDamagedComDeviceNum == null || dataJson.coastalDamagedComDeviceNum == undefined) {
                    dataJson.coastalDamagedComDeviceNum = "无";
                } else {
                    dataJson.coastalDamagedComDeviceNum = dataJson.coastalDamagedComDeviceNum;
                }
                if (String(dataJson.coastalDamagedComDeviceEcoLoss) == "" || dataJson.coastalDamagedComDeviceEcoLoss == null || dataJson.coastalDamagedComDeviceEcoLoss == undefined) {
                    dataJson.coastalDamagedComDeviceEcoLoss = "无";
                } else {
                    dataJson.coastalDamagedComDeviceEcoLoss = dataJson.coastalDamagedComDeviceEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilPlatformNum) == "" || dataJson.offshoreDamagedOilPlatformNum == null || dataJson.offshoreDamagedOilPlatformNum == undefined) {
                    dataJson.offshoreDamagedOilPlatformNum = "无";
                } else {
                    dataJson.offshoreDamagedOilPlatformNum = dataJson.offshoreDamagedOilPlatformNum;
                }
                if (String(dataJson.offshoreDamagedOilPlatformEcoLoss) == "" || dataJson.offshoreDamagedOilPlatformEcoLoss == null || dataJson.offshoreDamagedOilPlatformEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedOilPlatformEcoLoss = dataJson.offshoreDamagedOilPlatformEcoLoss;
                }
                if (String(dataJson.offshoreDamagedOilGasLength) == "" || dataJson.offshoreDamagedOilGasLength == null || dataJson.offshoreDamagedOilGasLength == undefined) {
                    dataJson.offshoreDamagedOilGasLength = "无";
                } else {
                    dataJson.offshoreDamagedOilGasLength = dataJson.offshoreDamagedOilGasLength;
                }
                if (String(dataJson.offshoreDamagedOilGasEcoLoss) == "" || dataJson.offshoreDamagedOilGasEcoLoss == null || dataJson.offshoreDamagedOilGasEcoLoss == undefined) {
                    dataJson.offshoreDamagedOilGasEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedOilGasEcoLoss = dataJson.offshoreDamagedOilGasEcoLoss;
                }
                if (String(dataJson.offshoreDamagedBridgeNum) == "" || dataJson.offshoreDamagedBridgeNum == null || dataJson.offshoreDamagedBridgeNum == undefined) {
                    dataJson.offshoreDamagedBridgeNum = "无";
                } else {
                    dataJson.offshoreDamagedBridgeNum = dataJson.offshoreDamagedBridgeNum;
                }
                if (String(dataJson.offshoreDamagedBridgeEcoLoss) == "" || dataJson.offshoreDamagedBridgeEcoLoss == null || dataJson.offshoreDamagedBridgeEcoLoss == undefined) {
                    dataJson.offshoreDamagedBridgeEcoLoss = "无";
                } else {
                    dataJson.offshoreDamagedBridgeEcoLoss = dataJson.offshoreDamagedBridgeEcoLoss;
                }
                if (String(dataJson.offshoreBothNetLength) == "" || dataJson.offshoreBothNetLength == null || dataJson.offshoreBothNetLength == undefined) {
                    dataJson.offshoreBothNetLength = "无";
                } else {
                    dataJson.offshoreBothNetLength = dataJson.offshoreBothNetLength;
                }
                if (String(dataJson.offshoreBothNetEcoLoss) == "" || dataJson.offshoreBothNetEcoLoss == null || dataJson.offshoreBothNetEcoLoss == undefined) {
                    dataJson.offshoreBothNetEcoLoss = "无";
                } else {
                    dataJson.offshoreBothNetEcoLoss = dataJson.offshoreBothNetEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeFarmlandNum) == "" || dataJson.offshoreSubmergeFarmlandNum == null || dataJson.offshoreSubmergeFarmlandNum == undefined) {
                    dataJson.offshoreSubmergeFarmlandNum = "无";
                } else {
                    dataJson.offshoreSubmergeFarmlandNum = dataJson.offshoreSubmergeFarmlandNum;
                }
                if (String(dataJson.offshoreSubmergeFarmlandEcoLoss) == "" || dataJson.offshoreSubmergeFarmlandEcoLoss == null || dataJson.offshoreSubmergeFarmlandEcoLoss == undefined) {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = "无";
                } else {
                    dataJson.offshoreSubmergeFarmlandEcoLoss = dataJson.offshoreSubmergeFarmlandEcoLoss;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldNum) == "" || dataJson.offshoreSubmergeSaltFieldNum == null || dataJson.offshoreSubmergeSaltFieldNum == undefined) {
                    dataJson.offshoreSubmergeSaltFieldNum = "无";
                } else {
                    dataJson.offshoreSubmergeSaltFieldNum = dataJson.offshoreSubmergeSaltFieldNum;
                }
                if (String(dataJson.offshoreSubmergeSaltFieldEcoLoss) == "" || dataJson.offshoreSubmergeSaltFieldEcoLoss == null || dataJson.offshoreSubmergeSaltFieldEcoLoss == undefined) {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = "无";
                } else {
                    dataJson.offshoreSubmergeSaltFieldEcoLoss = dataJson.offshoreSubmergeSaltFieldEcoLoss;
                }
                $("#titleInfo").text(dataJson.title);
                $("#addressInfo").text(dataJson.districtName + dataJson.townName);
                $("#reportTypeInfo").text(dataJson.reportType);
                $("#typhoonNameInfo").text(dataJson.typhoonName);
                $("#phoneInfo").text(dataJson.phone);
                $("#remarkInfo").text(dataJson.remark);
                $("#fillUnitInfo").text(dataJson.fillUnit);
                $("#fillByInfo").text(dataJson.fillBy);
                $("#fillCreateTimeInfo").text(dataJson.fillCreateTime);
                $("#disasterPopulationInfo").text(dataJson.disasterPopulation);
                $("#deadPopulationInfo").text(dataJson.deadPopulation);
                $("#missPopulationInfo").text(dataJson.missPopulation);
                $("#transferPopulationInfo").text(dataJson.transferPopulation);
                $("#collapseHouseInfo").text(dataJson.collapseHouse);
                $("#collapseHouseDirectEcoLossInfo").text(dataJson.collapseHouseDirectEcoLoss);
                $("#damagedHouseInfo").text(dataJson.damagedHouse);
                $("#damagedHouseDirectEcoLossInfo").text(dataJson.damagedHouseDirectEcoLoss);
                $("#aquacultureAffectedAreaInfo").text(dataJson.aquacultureAffectedArea);
                $("#aquacultureDirectEcoLossInfo").text(dataJson.aquacultureDirectEcoLoss);
                $("#aquacultureDisasterAreaInfo").text(dataJson.aquacultureDisasterArea);
                $("#aquacultureDisasterDirectEcoLossInfo").text(dataJson.aquacultureDisasterDirectEcoLoss);
                $("#aquacultureNoGainAreaInfo").text(dataJson.aquacultureNoGainArea);
                $("#aquacultureNoGainDirectEcoLossInfo").text(dataJson.aquacultureNoGainDirectEcoLoss);
                $("#aquacultureLossNumInfo").text(dataJson.aquacultureLossNum);
                $("#aquacultureEcoLossInfo").text(dataJson.aquacultureEcoLoss);
                $("#aquacultureDamageDeviceNumInfo").text(dataJson.aquacultureDamageDeviceNum);
                $("#aquacultureDamageDeviceEcoLossInfo").text(dataJson.aquacultureDamageDeviceEcoLoss);
                $("#aquacultureDestroyedFishBoatNumInfo").text(dataJson.aquacultureDestroyedFishBoatNum);
                $("#aquacultureDestroyedFishBoatEcoLossInfo").text(dataJson.aquacultureDestroyedFishBoatEcoLoss);
                $("#aquacultureDamageFishBoatNumInfo").text(dataJson.aquacultureDamageFishBoatNum);
                $("#aquacultureDamageFishBoatEcoLossInfo").text(dataJson.aquacultureDamageFishBoatEcoLoss);
                $("#trafficDestroyedShipNumInfo").text(dataJson.trafficDestroyedShipNum);
                $("#trafficDestroyedShipEcoLossInfo").text(dataJson.trafficDestroyedShipEcoLoss);
                $("#trafficDamageShipNumInfo").text(dataJson.trafficDamageShipNum);
                $("#trafficDamageShipEcoLossInfo").text(dataJson.trafficDamageShipEcoLoss);
                $("#trafficShipCargoLossNumInfo").text(dataJson.trafficShipCargoLossNum);
                $("#trafficShipCargoEcoLossInfo").text(dataJson.trafficShipCargoEcoLoss);
                $("#trafficChannelDepositLengthInfo").text(dataJson.trafficChannelDepositLength);
                $("#trafficChannelDepositEcoLossInfo").text(dataJson.trafficChannelDepositEcoLoss);
                $("#trafficDestroyedNavMarkNumInfo").text(dataJson.trafficDestroyedNavMarkNum);
                $("#trafficDestroyedNavMarkEcoLossInfo").text(dataJson.trafficDestroyedNavMarkEcoLoss);
                $("#coastalDamagedPortNumInfo").text(dataJson.coastalDamagedPortNum);
                $("#coastalDamagedPortEcoLossInfo").text(dataJson.coastalDamagedPortEcoLoss);
                $("#coastalDamagedWharfLengthInfo").text(dataJson.coastalDamagedWharfLength);
                $("#coastalDamagedWharfEcoLossInfo").text(dataJson.coastalDamagedWharfEcoLoss);
                $("#coastalDamagedCargoNumInfo").text(dataJson.coastalDamagedCargoNum);
                $("#coastalDamagedCargoEcoLossInfo").text(dataJson.coastalDamagedCargoEcoLoss);
                $("#coastalDamagedBulwarkLengthInfo").text(dataJson.coastalDamagedBulwarkLength);
                $("#coastalDamagedBulwarkEcoLossInfo").text(dataJson.coastalDamagedBulwarkEcoLoss);
                $("#coastalDamagedSeawallLengthInfo").text(dataJson.coastalDamagedSeawallLength);
                $("#coastalDamagedSeawallEcoLossInfo").text(dataJson.coastalDamagedSeawallEcoLoss);
                $("#coastalDamagedRoadLengthInfo").text(dataJson.coastalDamagedRoadLength);
                $("#coastalDamagedRoadEcoLossInfo").text(dataJson.coastalDamagedRoadEcoLoss);
                $("#coastalDamagedComDeviceNumInfo").text(dataJson.coastalDamagedComDeviceNum);
                $("#coastalDamagedComDeviceEcoLossInfo").text(dataJson.coastalDamagedComDeviceEcoLoss);
                $("#offshoreDamagedOilPlatformNumInfo").text(dataJson.offshoreDamagedOilPlatformNum);
                $("#offshoreDamagedOilPlatformEcoLossInfo").text(dataJson.offshoreDamagedOilPlatformEcoLoss);
                $("#offshoreDamagedOilGasLengthInfo").text(dataJson.offshoreDamagedOilGasLength);
                $("#offshoreDamagedOilGasEcoLossInfo").text(dataJson.offshoreDamagedOilGasEcoLoss);
                $("#offshoreDamagedBridgeNumInfo").text(dataJson.offshoreDamagedBridgeNum);
                $("#offshoreDamagedBridgeEcoLossInfo").text(dataJson.offshoreDamagedBridgeEcoLoss);
                $("#offshoreBothNetLengthInfo").text(dataJson.offshoreBothNetLength);
                $("#offshoreBothNetEcoLossInfo").text(dataJson.offshoreBothNetEcoLoss);
                $("#offshoreSubmergeFarmlandNumInfo").text(dataJson.offshoreSubmergeFarmlandNum);
                $("#offshoreSubmergeFarmlandEcoLossInfo").text(dataJson.offshoreSubmergeFarmlandEcoLoss);
                $("#offshoreSubmergeSaltFieldNumInfo").text(dataJson.offshoreSubmergeSaltFieldNum);
                $("#offshoreSubmergeSaltFieldEcoLossInfo").text(dataJson.offshoreSubmergeSaltFieldEcoLoss);
                var imgList = "";
                if (dataJson.picArray == "" || dataJson.picArray == null || dataJson.picArray == undefined) {
                    imgList = "";
                } else {
                    var imgListItem = "";
                    for (var i = 0; i < dataJson.picArray.length; i++) {
                        imgListItem = imgListItem + "<div class=\"detail-img-item\">\n" +
                            "                                    <img src=\"" + dataJson.picArray[i].suffixUrl + "\"/>\n" +
                            "                                </div>";
                    }
                    imgList = "<div class=\"detail-img-show\">\n" +
                        "                                <img src=\"" + dataJson.picArray[0].suffixUrl + "\"/>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"detail-img-list\">\n" + imgListItem +
                        "                            </div>";
                }
                $(".detail-img-box").html(imgList);
                //图片切换
                $(".detail-img-item img").click(function () {
                    var src = $(this).attr("src");
                    $(".detail-img-show img").attr("src", src);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
}
//表格选中与否
var disasterInfoIds = [];
function tableCheck() {
    $(".info-table").find("thead tr th:eq(0)").click(function () {
        $(this).toggleClass("check-click");
        if ($(this).hasClass("check-click")) {
            $(".info-table").find("tbody tr td").addClass("check-click");
            for (var i = 0; i < tableLength.length; i++) {
                disasterInfoIds.push(tableLength[i].id);
            }
        } else {
            $(".info-table").find("tbody tr td").removeClass("check-click");
            disasterInfoIds.splice(0, disasterInfoIds.length);
        }
    });
    $(".info-table").find("tbody tr").click(function(){
        var td=$(this).find("td").eq(0);
        td.click(function(){
            $(this).toggleClass("check-click");
            if ($(this).hasClass("check-click")) {
                var disasterInfoId = $(this).siblings("td").eq(0).text();
                disasterInfoIds.push(disasterInfoId);
            } else {
                $(".info-table").find("thead tr th").removeClass("check-click");
                var txt = $(this).siblings("td").eq(0).text();
                if (disasterInfoIds.indexOf(txt) == "-1") {

                } else {
                    disasterInfoIds.splice(disasterInfoIds.indexOf(txt), 1);
                }
            }
        });
    });
    /*$(".info-table").find("tbody tr td").click(function () {
        $(this).toggleClass("check-click");
        if ($(this).hasClass("check-click")) {
            var disasterInfoId = $(this).siblings("td").eq(0).text();
            disasterInfoIds.push(disasterInfoId);
        } else {
            $(".info-table").find("thead tr th").removeClass("check-click");
            var txt = $(this).siblings("td").eq(0).text();
            if (disasterInfoIds.indexOf(txt) == "-1") {

            } else {
                disasterInfoIds.splice(disasterInfoIds.indexOf(txt), 1);
            }
        }
    });*/
}