
var typhoonIdAdd = "";
var districtIdAdd = "";
var townIdAdd = "";
var reportTypeAdd = "";
var fillCreateTimeAdd = "";
$(function(){
    var year = (new Date()).getFullYear();
    //新增灾情模块
    $("#info-add").click(function () {
        $("#infoDisaster-list").hide();
        $("#infoDisaster-add").show();
        $("#infoDisaster-add .imgList-disaster").hide();
        $("#infoDisaster-add .imgList-disaster").html("");
        $(".equipment-tips").hide();
        $(".addInfo-input").val("");
        $(".info-equipment-input").val("");
        $("#nature-add").find("span.info-basic-selectTxt").text("请选择");
        $("#area-add").find("span.info-basic-selectTxt").text("请选择");
        $("#typhoon-add").find("span.info-basic-selectTxt").text("请选择");
        uploadImgList.splice(0,uploadImgList.length);
        districtIdAdd="";
        townIdAdd="";
        typhoonIdAdd="";
        reportTypeAdd="";
        $("#upload").attr('disabled', false);
        $("#upload").parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
    });
    $(".menu-info-back").click(function () {
        $("#infoDisaster-list").show();
        $("#infoDisaster-add").hide();
        $("#info-add").removeClass("table-menuClick");
        var title = $("#infoSearchName").val();
        page(1, 10, title, typhoonId, townId, reportType, fillStartTime, fillEndTime);
    });
    $(".info-equipment-txt").click(function () {
        $(this).toggleClass("info-equipment-click");
        if($(this).hasClass("info-equipment-click")){
            $(".info-equipment-content").slideUp();
            $(this).siblings("div.info-equipment-content").slideDown();
        }else{
            $(".info-equipment-txt").removeClass("info-equipment-click");
            $(this).siblings("div.info-equipment-content").slideUp();
        }
    });
    $(".info-equipment-list").eq(0).find("div.info-equipment-txt").trigger("click");
    //新增灾情报送性质选择
    $("#nature-add").click(function () {
        $("#nature-addBox").toggle();
        $(".nature-add-item").removeClass("nature-add-click");
    });
    $("#nature-addBox").mouseover(function () {
        $(this).show();
    });
    $("#nature-addBox").mouseout(function () {
        $(this).hide();
    });
    $(".nature-add-item").click(function () {
        $(".nature-add-item").removeClass("nature-add-click");
        $(this).addClass("nature-add-click");
        var natureName = $(this).find("span.nature-add-text").text();
        $("#nature-add").find("span.info-basic-selectTxt").text(natureName);
        $("#nature-addBox").hide();
        if (natureName == "初报") {
            reportTypeAdd = 1;
        } else if (natureName == "续报") {
            reportTypeAdd = 2;
        } else if (natureName == "核报") {
            reportTypeAdd = 3;
        } else if (natureName == "一季度报") {
            reportTypeAdd = 4;
        } else if (natureName == "上半年报") {
            reportTypeAdd = 5;
        } else if (natureName == "前三季度报") {
            reportTypeAdd = 6;
        } else if (natureName == "年报") {
            reportTypeAdd = 7;
        }
    });
    //新增灾情地区选择
    var areaCityAdd;
    $("#area-add").click(function () {
        $("#area-cityAdd").toggle();
        if ($("#area-cityAdd").css("display") == "none") {
            $("#area-townsAdd").hide();
        } else {

        }
        $(".area-cityAdd-list").removeClass("area-cityAdd-click");
        $(".area-townsAdd-list").removeClass("area-townsAdd-click");
        if ($(".area-cityAdd-list").hasClass("area-cityAdd-click")) {

        } else {
            $("#area-cityAdd").mouseover(function () {
                $(this).show();
            });
            $("#area-cityAdd").mouseout(function () {
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
                console.log(data);
                var dataJson = data.data;
                var listHtml = "";
                for (var i = 0; i < dataJson.length; i++) {
                    listHtml = listHtml + "<div class=\"area-cityAdd-list\">\n" +
                        "                                                <i class=\"iconfont cityAdd-radio-uncheck\">&#xeada;</i>\n" +
                        "                                                <i class=\"iconfont cityAdd-radio-check\">&#xeadb;</i>\n" +
                        "                                                <span class=\"city-add-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                        "                                                <span class=\"city-add-text\">" + dataJson[i].name + "</span>\n" +
                        "                                                <i class=\"iconfont city-add-icon\">&#xeb03;</i>\n" +
                        "                                            </div>";
                }
                $("#area-cityAdd").html(listHtml);
                citySelectAdd();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    function citySelectAdd() {
        $(".area-cityAdd-list").click(function () {
            $(".area-cityAdd-list").removeClass("area-cityAdd-click");
            $(this).addClass("area-cityAdd-click");
            areaCityAdd = $(this).find("span.city-add-text").text();
            districtIdAdd = $(this).find("span.city-add-id").text();
            $.ajax({
                url: srcPath + "admin/address/town/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "districtId": districtIdAdd
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    console.log(data);
                    $("#area-townsAdd").show();
                    var dataJson = data.data;
                    var listHtml = "";
                    for (var i = 0; i < dataJson.length; i++) {
                        listHtml = listHtml + "<div class=\"area-townsAdd-list\">\n" +
                            "                                                <i class=\"iconfont townsAdd-radio-uncheck\">&#xeada;</i>\n" +
                            "                                                <i class=\"iconfont townsAdd-radio-check\">&#xeadb;</i>\n" +
                            "                                                <span class=\"towns-add-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                            "                                                <span class=\"towns-add-text\">" + dataJson[i].name + "</span>\n" +
                            "                                            </div>";
                    }
                    $("#area-townsAdd").html(listHtml);
                    townsSelectAdd();
                    $("#area-townsAdd").mouseover(function () {
                        $(this).show();
                        $("#area-cityAdd").show();
                    });
                    $("#area-townsAdd").mouseout(function () {
                        $(this).hide();
                        $("#area-cityAdd").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function townsSelectAdd() {
        $(".area-townsAdd-list").click(function () {
            var areaTownsAdd = $(this).find("span.towns-add-text").text();
            townIdAdd = $(this).find("span.towns-add-id").text();
            $(".area-townsAdd-list").removeClass("area-townsAdd-click");
            $(this).addClass("area-townsAdd-click");
            $("#area-add").find("span.info-basic-selectTxt").text(areaCityAdd + areaTownsAdd);
            $("#area-cityAdd").hide();
            $("#area-townsAdd").hide();
        });
    }
    //新增灾情台风选择
    var typhoonYearAdd;
    $("#typhoon-add").click(function () {
        $("#typhoon-yearAdd").toggle();
        if ($("#typhoon-yearAdd").css("display") == "none") {
            $("#typhoon-listAdd").hide();
        } else {

        }
        $(".typhoon-yearAdd-list").removeClass("typhoon-yearAdd-click");
        $(".typhoon-listAdd-list").removeClass("typhoon-listAdd-click");
        var listHtml = "";
        for (var i = year; i >= 1945; i--) {
            listHtml = listHtml + "<div class=\"typhoon-yearAdd-list\">\n" +
                "                                                <i class=\"iconfont yearAdd-radio-uncheck\">&#xeada;</i>\n" +
                "                                                <i class=\"iconfont yearAdd-radio-check\">&#xeadb;</i>\n" +
                "                                                <span class=\"year-add-text\">" + i + "</span>\n" +
                "                                                <i class=\"iconfont year-add-icon\">&#xeb03;</i>\n" +
                "                                            </div>";
        }
        $("#typhoon-yearAdd").html(listHtml);
        typhoonYearListAdd();
        if ($(".typhoon-yearAdd-list").hasClass("typhoon-yearAdd-click")) {

        } else {
            $("#typhoon-yearAdd").mouseover(function () {
                $(this).show();
            });
            $("#typhoon-yearAdd").mouseout(function () {
                $(this).hide();
            });
        }
    });
    function typhoonYearListAdd() {
        $(".typhoon-yearAdd-list").click(function () {
            $(".typhoon-yearAdd-list").removeClass("typhoon-yearAdd-click");
            $(this).addClass("typhoon-yearAdd-click");
            typhoonYearAdd = $(this).find("span.year-add-text").text();
            $.ajax({
                url: srcPath + "admin/disaster/information/typhoon/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "year": typhoonYearAdd
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    console.log(data);
                    $("#typhoon-listAdd").show();
                    var dataJson = data.data.list;
                    if (dataJson == "" || dataJson == undefined || dataJson == null) {
                        $("#typhoon-listAdd").html("");
                    } else {
                        var listHtml = "";
                        for (var i = 0; i < dataJson.length; i++) {
                            listHtml = listHtml + "<div class=\"typhoon-listAdd-list\">\n" +
                                "                                                <i class=\"iconfont listAdd-radio-uncheck\">&#xeada;</i>\n" +
                                "                                                <i class=\"iconfont listAdd-radio-check\">&#xeadb;</i>\n" +
                                "                                                <span class=\"list-add-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                                "                                                <span class=\"list-add-text\">" + dataJson[i].number + "-" + dataJson[i].zhName + "</span>\n" +
                                "                                            </div>";
                        }
                        $("#typhoon-listAdd").html(listHtml);
                        typhoonListAdd();
                        $("#typhoon-listAdd").mouseover(function () {
                            $(this).show();
                            $("#typhoon-yearAdd").show();
                        });
                        $("#typhoon-listAdd").mouseout(function () {
                            $(this).hide();
                            $("#typhoon-yearAdd").hide();
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function typhoonListAdd() {
        $(".typhoon-listAdd-list").click(function () {
            var typhoonListAdd = $(this).find("span.list-add-text").text();
            typhoonIdAdd = $(this).find("span.list-add-id").text();
            $(".typhoon-listAdd-list").removeClass("typhoon-listAdd-click");
            $(this).addClass("typhoon-listAdd-click");
            $("#typhoon-add").find("span.info-basic-selectTxt").text(typhoonListAdd);
            $("#typhoon-yearAdd").hide();
            $("#typhoon-listAdd").hide();
        });
    }
    //新增灾情填表时间选择
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#fillCreateTime', //指定元素
            change: function (value, data) { //监听日期变换
                lay("#fillCreateTime").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#fillCreateTime").val(value);
                fillCreateTimeAdd = Date.parse($("#fillCreateTime").val());
            }
        });
    });
    //新建图片上传
    var $floodUpload = $("#upload");
    $floodUpload.change(function () {
        if ($(this).val() != "") {
            upload(this);
        }
    });
    function upload(ele) {
        var files = $(ele)[0].files;
        if (uploadImgList.length + files.length > 6) {
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".equipment-tips").hide();
            },1000);
            return;
        }
        var errorText = ''
        for(var i=0;i<files.length;i++){
            if (files[i].size > 1024 * 1024 * 2) {
                errorText = "上传图片均不能大于2M，请重新上传";
                break;
            }
            if (!/\.(jpg|png|JPG|PNG)$/.test(files[i].name)) {
                errorText = "文件格式暂不支持，请上传jpg、png格式图片";
                break;
            }
            if((files[i].name).length > 20){
                errorText = "文件名不能超过20个字符，请重新上传";
                break;
            }
        }
        if (errorText) {
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".equipment-tips").hide();
            },1000);
            return;
        }
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }
        $.ajax({
            url: srcPath + "admin/file/upload",
            type: 'post',
            dataType: 'json',
            headers: {
                token: token
            },
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                //alert("我还没开始发送呢");
            },
            success: function (responseStr) {
                if (responseStr.code == "-2") {
                    window.location.href = "login.html";
                }else if(responseStr.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    var dataJson = responseStr.data.list;
                    $("#infoDisaster-add .imgList-disaster").show();
                    var imgList = "";
                    for (var i = 0; i < dataJson.length; i++) {
                        imgList=imgList+"<div class=\"seawallNumber-imgItem\">\n" +
                            "                                    <i class=\"iconfont upload-imgIcon\">&#xeac5;</i>\n" +
                            "                                    <span>"+dataJson[i].name+"</span>\n" +
                            "                                    <span class=\"url\" style='display:none;'>"+dataJson[i].url+"</span>\n" +
                            "                                    <span class=\"suffixUrl\" style='display:none;'>"+dataJson[i].suffixUrl+"</span>\n" +
                            "                                    <i class=\"iconfont uploadIcon upload-successIcon\">&#xe606;</i>\n" +
                            "                                    <i class=\"iconfont uploadIcon upload-delIcon\">&#xeaf2;</i>\n" +
                            "                                </div>\n";
                        uploadImgList.push(dataJson[i].url);
                    }
                    if (uploadImgList.length >= 6) {
                        $floodUpload.attr('disabled', true);
                        $floodUpload.parents('.info-uploadBtn').css('background-color', '#999');
                    }
                    $("#infoDisaster-add .imgList-disaster").append(imgList);
                    uploadImgDelAdd();
                }else if(responseStr.code=="-1"){
                    $("#fail").show().find("span").text(responseStr.msg);
                    setTimeout(function(){
                        $("#fail").hide();
                    },1000);
                }else{
                    $("#fail").show();
                    setTimeout(function(){
                        $("#fail").hide().find("span").text("操作失败");
                    },1000);
                }
            },
            error: function (responseStr) {
                
            }
        });
    }
    //图片删除和放大效果
    function uploadImgDelAdd(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#infoDisaster-add .seawallNumber-imgItem").mousemove(function(e){
                $("#pic").css({
                    "top":(e.pageY-300)+"px",
                    "left":(e.pageX+20)+"px"
                }).fadeIn("fast");
            });
        },function(){
            $(this).removeClass("upload-hover");
            $("#pic").remove();
        });
        $(".upload-delIcon").click(function(){
            $(this).parent().remove();
            var url=$(this).siblings("span.url").text();
            if(uploadImgList.indexOf(url) == "-1"){

            }else{
                uploadImgList.splice(uploadImgList.indexOf(url),1);
                if (uploadImgList.length < 6) {
                    $floodUpload.attr('disabled', false)
                    $floodUpload.parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    $("#disasterAdd").click(function () {
        var title = $("#title").val();
        var districtId = districtIdAdd;
        var townId = townIdAdd;
        var reportType = reportTypeAdd;
        var fillBy = $("#fillBy").val();
        var fillCreateTime = fillCreateTimeAdd;
        var fillUnit = $("#fillUnit").val();
        var typhoonId = typhoonIdAdd;
        var disasterZone = $("#area-add").find("span.info-basic-selectTxt").text();
        var phone = $("#phone").val();
        var disasterPopulation = $("#disasterPopulation").val();
        var deadPopulation = $("#deadPopulation").val();
        var missPopulation = $("#missPopulation").val();
        var transferPopulation = $("#transferPopulation").val();
        var collapseHouse = $("#collapseHouse").val();
        var collapseHouseDirectEcoLoss = $("#collapseHouseDirectEcoLoss").val();
        var damagedHouse = $("#damagedHouse").val();
        var damagedHouseDirectEcoLoss = $("#damagedHouseDirectEcoLoss").val();
        var aquacultureAffectedArea = $("#aquacultureAffectedArea").val();
        var aquacultureDirectEcoLoss = $("#aquacultureDirectEcoLoss").val();
        var aquacultureDisasterArea = $("#aquacultureDisasterArea").val();
        var aquacultureDisasterDirectEcoLoss = $("#aquacultureDisasterDirectEcoLoss").val();
        var aquacultureNoGainArea = $("#aquacultureNoGainArea").val();
        var aquacultureNoGainDirectEcoLoss = $("#aquacultureNoGainDirectEcoLoss").val();
        var aquacultureLossNum = $("#aquacultureLossNum").val();
        var aquacultureEcoLoss = $("#aquacultureEcoLoss").val();
        var aquacultureDamageDeviceNum = $("#aquacultureDamageDeviceNum").val();
        var aquacultureDamageDeviceEcoLoss = $("#aquacultureDamageDeviceEcoLoss").val();
        var aquacultureDestroyedFishBoatNum = $("#aquacultureDestroyedFishBoatNum").val();
        var aquacultureDestroyedFishBoatEcoLoss = $("#aquacultureDestroyedFishBoatEcoLoss").val();
        var aquacultureDamageFishBoatNum = $("#aquacultureDamageFishBoatNum").val();
        var aquacultureDamageFishBoatEcoLoss = $("#aquacultureDamageFishBoatEcoLoss").val();
        var trafficDestroyedShipNum = $("#trafficDestroyedShipNum").val();
        var trafficDestroyedShipEcoLoss = $("#trafficDestroyedShipEcoLoss").val();
        var trafficDamageShipNum = $("#trafficDamageShipNum").val();
        var trafficDamageShipEcoLoss = $("#trafficDamageShipEcoLoss").val();
        var trafficShipCargoLossNum = $("#trafficShipCargoLossNum").val();
        var trafficShipCargoEcoLoss = $("#trafficShipCargoEcoLoss").val();
        var trafficChannelDepositLength = $("#trafficChannelDepositLength").val();
        var trafficChannelDepositEcoLoss = $("#trafficChannelDepositEcoLoss").val();
        var trafficDestroyedNavMarkNum = $("#trafficDestroyedNavMarkNum").val();
        var trafficDestroyedNavMarkEcoLoss = $("#trafficDestroyedNavMarkEcoLoss").val();
        var coastalDamagedPortNum = $("#coastalDamagedPortNum").val();
        var coastalDamagedPortEcoLoss = $("#coastalDamagedPortEcoLoss").val();
        var coastalDamagedWharfLength = $("#coastalDamagedWharfLength").val();
        var coastalDamagedWharfEcoLoss = $("#coastalDamagedWharfEcoLoss").val();
        var coastalDamagedCargoNum = $("#coastalDamagedCargoNum").val();
        var coastalDamagedCargoEcoLoss = $("#coastalDamagedCargoEcoLoss").val();
        var coastalDamagedBulwarkLength = $("#coastalDamagedBulwarkLength").val();
        var coastalDamagedBulwarkEcoLoss = $("#coastalDamagedBulwarkEcoLoss").val();
        var coastalDamagedSeawallLength = $("#coastalDamagedSeawallLength").val();
        var coastalDamagedSeawallEcoLoss = $("#coastalDamagedSeawallEcoLoss").val();
        var coastalDamagedRoadLength = $("#coastalDamagedRoadLength").val();
        var coastalDamagedRoadEcoLoss = $("#coastalDamagedRoadEcoLoss").val();
        var coastalDamagedComDeviceNum = $("#coastalDamagedComDeviceNum").val();
        var coastalDamagedComDeviceEcoLoss = $("#coastalDamagedComDeviceEcoLoss").val();
        var offshoreDamagedOilPlatformNum = $("#offshoreDamagedOilPlatformNum").val();
        var offshoreDamagedOilPlatformEcoLoss = $("#offshoreDamagedOilPlatformEcoLoss").val();
        var offshoreDamagedOilGasLength = $("#offshoreDamagedOilGasLength").val();
        var offshoreDamagedOilGasEcoLoss = $("#offshoreDamagedOilGasEcoLoss").val();
        var offshoreDamagedBridgeNum = $("#offshoreDamagedBridgeNum").val();
        var offshoreDamagedBridgeEcoLoss = $("#offshoreDamagedBridgeEcoLoss").val();
        var offshoreBothNetLength = $("#offshoreBothNetLength").val();
        var offshoreBothNetEcoLoss = $("#offshoreBothNetEcoLoss").val();
        var offshoreSubmergeFarmlandNum = $("#offshoreSubmergeFarmlandNum").val();
        var offshoreSubmergeFarmlandEcoLoss = $("#offshoreSubmergeFarmlandEcoLoss").val();
        var offshoreSubmergeSaltFieldNum = $("#offshoreSubmergeSaltFieldNum").val();
        var offshoreSubmergeSaltFieldEcoLoss = $("#offshoreSubmergeSaltFieldEcoLoss").val();
        var remark = $("#remark").val();
        if ($("#infoDisaster-add").find("div.imgList-disaster").css("display") === "none") {
            uploadImgList.splice(0, uploadImgList.length);
        } else {
            uploadImgList = uploadImgList;
        }
        var picArr;
        if (uploadImgList.length > 6) {
            picArr = uploadImgList.slice(-6);
        } else {
            picArr = uploadImgList;
        }
        if (title == "") {
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("标题不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if(fillBy == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("填表人不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if(fillUnit == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("填表单位不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if($("#fillCreateTime").val() == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("填表时间不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if(phone == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("联系电话不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if(typhoonId == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("所属台风不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if (districtId == "") {
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("县/乡行政区不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if (reportType == "") {
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("报送性质类型不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if(disasterPopulation!=""){
            if (!(/^[0-9]\d*$/.test(disasterPopulation))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("受灾人口必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(deadPopulation!=""){
            if (!(/^[0-9]\d*$/.test(deadPopulation))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("死亡人口必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(missPopulation!=""){
            if (!(/^[0-9]\d*$/.test(missPopulation))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("失踪人口必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(transferPopulation!=""){
            if (!(/^[0-9]\d*$/.test(transferPopulation))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("紧急转移安置人口必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(collapseHouse!=""){
            if (!(/^[0-9]\d*$/.test(collapseHouse))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("倒塌房屋必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(collapseHouseDirectEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(collapseHouseDirectEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("倒塌房屋直接经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(damagedHouse!=""){
            if (!(/^[0-9]\d*$/.test(damagedHouse))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏房屋必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(damagedHouseDirectEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(damagedHouseDirectEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏房屋直接经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureAffectedArea!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureAffectedArea))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖受灾面积必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDirectEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDirectEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖受灾直接经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDisasterArea!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDisasterArea))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖成灾面积必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDisasterDirectEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDisasterDirectEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖成灾直接经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureNoGainArea!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureNoGainArea))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖绝收面积必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureNoGainDirectEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureNoGainDirectEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("水产养殖绝收直接经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureLossNum!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureLossNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损失水产养殖数量必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损失水产养殖经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDamageDeviceNum!=""){
            if (!(/^[0-9]\d*$/.test(aquacultureDamageDeviceNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("养殖设备、设施损失必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDamageDeviceEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDamageDeviceEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("养殖设备、设施经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDestroyedFishBoatNum!=""){
            if (!(/^[0-9]\d*$/.test(aquacultureDestroyedFishBoatNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("毁坏渔船数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDestroyedFishBoatEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDestroyedFishBoatEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("毁坏渔船经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDamageFishBoatNum!=""){
            if (!(/^[0-9]\d*$/.test(aquacultureDamageFishBoatNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏渔船数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(aquacultureDamageFishBoatEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(aquacultureDamageFishBoatEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏渔船经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficDestroyedShipNum!=""){
            if (!(/^[0-9]\d*$/.test(trafficDestroyedShipNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("毁坏船只数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficDestroyedShipEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficDestroyedShipEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("毁坏船只经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficDamageShipNum!=""){
            if (!(/^[0-9]\d*$/.test(trafficDamageShipNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏船只数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficDamageShipEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficDamageShipEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏船只经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficShipCargoLossNum!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficShipCargoLossNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("船只货物损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficShipCargoEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficShipCargoEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("船只货物经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficChannelDepositLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficChannelDepositLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("航道淤积长度必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficChannelDepositEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficChannelDepositEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("航道淤积经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
            }
        }
        if(trafficDestroyedNavMarkNum!=""){
            if (!(/^[0-9]\d*$/.test(trafficDestroyedNavMarkNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁航标必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(trafficDestroyedNavMarkEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(trafficDestroyedNavMarkEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁航标经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedPortNum!=""){
            if (!(/^[0-9]\d*$/.test(coastalDamagedPortNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("受损港口/渔港数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedPortEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedPortEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("毁受损港口/渔港经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedWharfLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedWharfLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏码头必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedWharfEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedWharfEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损坏码头经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedCargoNum!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedCargoNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("冲走、损毁货物必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedCargoEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedCargoEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("冲走、损毁货物经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedBulwarkLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedBulwarkLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁防波堤必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
            }
        }
        if(coastalDamagedBulwarkEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedBulwarkEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁防波堤经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedSeawallLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedSeawallLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁海堤、护岸必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
            }
        }
        if(coastalDamagedSeawallEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedSeawallEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁海堤、护岸经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedRoadLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedRoadLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁道路必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedRoadEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedRoadEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁道路经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedComDeviceNum!=""){
            if (!(/^[0-9]\d*$/.test(coastalDamagedComDeviceNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁通讯设施必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(coastalDamagedComDeviceEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(coastalDamagedComDeviceEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁通讯设施经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedOilPlatformNum!=""){
            if (!(/^[0-9]\d*$/.test(offshoreDamagedOilPlatformNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁石油平台数量必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedOilPlatformEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreDamagedOilPlatformEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁石油平台经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedOilGasLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreDamagedOilGasLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁油气输送设备长度必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedOilGasEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreDamagedOilGasEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁油气输送设备经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedBridgeNum!=""){
            if (!(/^[0-9]\d*$/.test(offshoreDamagedBridgeNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁海上桥梁必须是大于等于0的整数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreDamagedBridgeEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreDamagedBridgeEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("损毁海上桥梁经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreBothNetLength!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreBothNetLength))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("海水浴场护网必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreBothNetEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreBothNetEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("海水浴场护网经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreSubmergeFarmlandNum!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreSubmergeFarmlandNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("淹没农田面积必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreSubmergeFarmlandEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreSubmergeFarmlandEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("淹没农田经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreSubmergeSaltFieldNum!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreSubmergeSaltFieldNum))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("淹没盐田必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            }
        }
        if(offshoreSubmergeSaltFieldEcoLoss!=""){
            if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(offshoreSubmergeSaltFieldEcoLoss))) {
                $(".equipment-tips").show();
                $(".equipment-tips").find("span").text("淹没盐田经济损失必须是大于等于0的数");
                setTimeout(function () {
                    $(".equipment-tips").hide();
                }, 1000);
                return false;
            } 
        }
        $.ajax({
            url: srcPath + "admin/disaster/information/save",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "title": title,
                "districtId": districtId,
                "townId": townId,
                "reportType": reportType,
                "fillBy": fillBy,
                "fillCreateTime": fillCreateTime,
                "fillUnit": fillUnit,
                "typhoonId": typhoonId,
                "disasterZone": disasterZone,
                "phone": phone,
                "disasterPopulation": disasterPopulation,
                "deadPopulation": deadPopulation,
                "missPopulation": missPopulation,
                "transferPopulation": transferPopulation,
                "collapseHouse": collapseHouse,
                "collapseHouseDirectEcoLoss": collapseHouseDirectEcoLoss,
                "damagedHouse": damagedHouse,
                "damagedHouseDirectEcoLoss": damagedHouseDirectEcoLoss,
                "aquacultureAffectedArea": aquacultureAffectedArea,
                "aquacultureDirectEcoLoss": aquacultureDirectEcoLoss,
                "aquacultureDisasterArea": aquacultureDisasterArea,
                "aquacultureDisasterDirectEcoLoss": aquacultureDisasterDirectEcoLoss,
                "aquacultureNoGainArea": aquacultureNoGainArea,
                "aquacultureNoGainDirectEcoLoss": aquacultureNoGainDirectEcoLoss,
                "aquacultureLossNum": aquacultureLossNum,
                "aquacultureEcoLoss": aquacultureEcoLoss,
                "aquacultureDamageDeviceNum": aquacultureDamageDeviceNum,
                "aquacultureDamageDeviceEcoLoss": aquacultureDamageDeviceEcoLoss,
                "aquacultureDestroyedFishBoatNum": aquacultureDestroyedFishBoatNum,
                "aquacultureDestroyedFishBoatEcoLoss": aquacultureDestroyedFishBoatEcoLoss,
                "aquacultureDamageFishBoatNum": aquacultureDamageFishBoatNum,
                "aquacultureDamageFishBoatEcoLoss": aquacultureDamageFishBoatEcoLoss,
                "trafficDestroyedShipNum": trafficDestroyedShipNum,
                "trafficDestroyedShipEcoLoss": trafficDestroyedShipEcoLoss,
                "trafficDamageShipNum": trafficDamageShipNum,
                "trafficDamageShipEcoLoss": trafficDamageShipEcoLoss,
                "trafficShipCargoLossNum": trafficShipCargoLossNum,
                "trafficShipCargoEcoLoss": trafficShipCargoEcoLoss,
                "trafficChannelDepositLength": trafficChannelDepositLength,
                "trafficChannelDepositEcoLoss": trafficChannelDepositEcoLoss,
                "trafficDestroyedNavMarkNum": trafficDestroyedNavMarkNum,
                "trafficDestroyedNavMarkEcoLoss": trafficDestroyedNavMarkEcoLoss,
                "coastalDamagedPortNum": coastalDamagedPortNum,
                "coastalDamagedPortEcoLoss": coastalDamagedPortEcoLoss,
                "coastalDamagedWharfLength": coastalDamagedWharfLength,
                "coastalDamagedWharfEcoLoss": coastalDamagedWharfEcoLoss,
                "coastalDamagedCargoNum": coastalDamagedCargoNum,
                "coastalDamagedCargoEcoLoss": coastalDamagedCargoEcoLoss,
                "coastalDamagedBulwarkLength": coastalDamagedBulwarkLength,
                "coastalDamagedBulwarkEcoLoss": coastalDamagedBulwarkEcoLoss,
                "coastalDamagedSeawallLength": coastalDamagedSeawallLength,
                "coastalDamagedSeawallEcoLoss": coastalDamagedSeawallEcoLoss,
                "coastalDamagedRoadLength": coastalDamagedRoadLength,
                "coastalDamagedRoadEcoLoss": coastalDamagedRoadEcoLoss,
                "coastalDamagedComDeviceNum": coastalDamagedComDeviceNum,
                "coastalDamagedComDeviceEcoLoss": coastalDamagedComDeviceEcoLoss,
                "offshoreDamagedOilPlatformNum": offshoreDamagedOilPlatformNum,
                "offshoreDamagedOilPlatformEcoLoss": offshoreDamagedOilPlatformEcoLoss,
                "offshoreDamagedOilGasLength": offshoreDamagedOilGasLength,
                "offshoreDamagedOilGasEcoLoss": offshoreDamagedOilGasEcoLoss,
                "offshoreDamagedBridgeNum": offshoreDamagedBridgeNum,
                "offshoreDamagedBridgeEcoLoss": offshoreDamagedBridgeEcoLoss,
                "offshoreBothNetLength": offshoreBothNetLength,
                "offshoreBothNetEcoLoss": offshoreBothNetEcoLoss,
                "offshoreSubmergeFarmlandNum": offshoreSubmergeFarmlandNum,
                "offshoreSubmergeFarmlandEcoLoss": offshoreSubmergeFarmlandEcoLoss,
                "offshoreSubmergeSaltFieldNum": offshoreSubmergeSaltFieldNum,
                "offshoreSubmergeSaltFieldEcoLoss": offshoreSubmergeSaltFieldEcoLoss,
                "remark": remark,
                "picArr": picArr
            }),
            success: function (data) {
                if (data.code == "-2") {
                    window.location.href = "login.html";
                }
                console.log(data);
                if (data.code == 200) {
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    }, 1000);
                    $("#infoDisaster-add .imgList-disaster").hide();
                    $("#infoDisaster-add .imgList-disaster").html("");
                    $(".equipment-tips").hide();
                    $(".addInfo-input").val("");
                    $(".info-equipment-input").val("");
                    $("#nature-add").find("span.info-basic-selectTxt").text("请选择");
                    $("#area-add").find("span.info-basic-selectTxt").text("请选择");
                    $("#typhoon-add").find("span.info-basic-selectTxt").text("请选择");
                    //返回列表
                    $("#infoDisaster-list").show();
                    $("#infoDisaster-add").hide();
                    var title = $("#infoSearchName").val();
                    typhoonId = "";
                    townId = "";
                    reportType = "";
                    fillStartTime = "";
                    fillEndTime = "";
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
