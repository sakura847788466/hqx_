
var typhoonIdEdit = "";
var districtIdEdit = "";
var townIdEdit = "";
var reportTypeEdit = "";
var fillCreateTimeEdit = "";
$(function(){
    var year = (new Date()).getFullYear();
    //修改模块
    $(".disaster-closeIcon").click(function () {
        $("#disaster-edit").hide();
        $(".equipment-tips").hide();
        $("#disaster-edit .imgList-disaster").hide();
        $("#disaster-edit .imgList-disaster").html("");
    });
    $("#disasterEditClose").click(function () {
        $("#disaster-edit").hide();
        $(".equipment-tips").hide();
        $("#disaster-edit .imgList-disaster").hide();
        $("#disaster-edit .imgList-disaster").html("");
    });
    //修改模块台风选择
    var typhoonYearEdit;
    $("#typhoon-edit").click(function () {
        $("#typhoon-yearEdit").toggle();
        if ($("#typhoon-yearEdit").css("display") == "none") {
            $("#typhoon-listEdit").hide();
        } else {

        }
        $(".typhoon-yearEdit-list").removeClass("typhoon-yearEdit-click");
        $(".typhoon-listEdit-list").removeClass("typhoon-listEdit-click");
        var listHtml = "";
        for (var i = year; i >= 1945; i--) {
            listHtml = listHtml + "<div class=\"typhoon-yearEdit-list\">\n" +
                "                                    <i class=\"iconfont disaster-radio-uncheck\">&#xeada;</i>\n" +
                "                                    <i class=\"iconfont disaster-radio-check\">&#xeadb;</i>\n" +
                "                                    <span class=\"disaster-edit-text\">" + i + "</span>\n" +
                "                                    <i class=\"iconfont disaster-edit-icon\">&#xeb03;</i>\n" +
                "                                </div>";
        }
        $("#typhoon-yearEdit").html(listHtml);
        typhoonYearListEdit();
        if ($(".typhoon-yearEdit-list").hasClass("typhoon-yearEdit-click")) {

        } else {
            $("#typhoon-yearEdit").mouseover(function () {
                $(this).show();
            });
            $("#typhoon-yearEdit").mouseout(function () {
                $(this).hide();
            });
        }
    });
    function typhoonYearListEdit() {
        $(".typhoon-yearEdit-list").click(function () {
            $(".typhoon-yearEdit-list").removeClass("typhoon-yearEdit-click");
            $(this).addClass("typhoon-yearEdit-click");
            typhoonYearEdit = $(this).find("span.disaster-edit-text").text();
            $.ajax({
                url: srcPath + "admin/disaster/information/typhoon/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "year": typhoonYearEdit
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    $("#typhoon-listEdit").show();
                    var dataJson = data.data.list;
                    if (dataJson == "" || dataJson == undefined || dataJson == null) {
                        $("#typhoon-listEdit").html("");
                    } else {
                        var listHtml = "";
                        for (var i = 0; i < dataJson.length; i++) {
                            listHtml = listHtml + "<div class=\"typhoon-listEdit-list\">\n" +
                                "                                    <i class=\"iconfont disaster-radio-uncheck\">&#xeada;</i>\n" +
                                "                                    <i class=\"iconfont disaster-radio-check\">&#xeadb;</i>\n" +
                                "                                    <span class=\"disaster-edit-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                                "                                    <span class=\"disaster-edit-text\">" + dataJson[i].number + "-" + dataJson[i].zhName + "</span>\n" +
                                "                                </div>";
                        }
                        $("#typhoon-listEdit").html(listHtml);
                        typhoonListEdit();
                        $("#typhoon-listEdit").mouseover(function () {
                            $(this).show();
                            $("#typhoon-yearEdit").show();
                        });
                        $("#typhoon-listEdit").mouseout(function () {
                            $(this).hide();
                            $("#typhoon-yearEdit").hide();
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function typhoonListEdit() {
        $(".typhoon-listEdit-list").click(function () {
            var typhoonListEdit = $(this).find("span.disaster-edit-text").text();
            typhoonIdEdit = $(this).find("span.disaster-edit-id").text();
            $(".typhoon-listAdd-list").removeClass("typhoon-listEdit-click");
            $(this).addClass("typhoon-listEdit-click");
            $("#typhoon-edit").find("span.disaster-selectTxt").text(typhoonListEdit);
            $("#typhoon-yearEdit").hide();
            $("#typhoon-listEdit").hide();
        });
    }
    //修改模块区域选择
    var areaCityEdit;
    $("#area-edit").click(function () {
        $("#area-cityEdit").toggle();
        if ($("#area-cityEdit").css("display") == "none") {
            $("#area-townEdit").hide();
        } else {

        }
        $(".typhoon-yearEdit-list").removeClass("typhoon-yearEdit-click");
        $(".typhoon-listEdit-list").removeClass("typhoon-listEdit-click");
        if ($(".typhoon-yearEdit-list").hasClass("typhoon-yearEdit-click")) {

        } else {
            $("#area-cityEdit").mouseover(function () {
                $(this).show();
            });
            $("#area-cityEdit").mouseout(function () {
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
                    listHtml = listHtml + "<div class=\"typhoon-yearEdit-list\">\n" +
                        "                                    <i class=\"iconfont disaster-radio-uncheck\">&#xeada;</i>\n" +
                        "                                    <i class=\"iconfont disaster-radio-check\">&#xeadb;</i>\n" +
                        "                                    <span class=\"disaster-edit-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                        "                                    <span class=\"disaster-edit-text\">" + dataJson[i].name + "</span>\n" +
                        "                                    <i class=\"iconfont disaster-edit-icon\">&#xeb03;</i>\n" +
                        "                                </div>";
                }
                $("#area-cityEdit").html(listHtml);
                citySelectEdit();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    function citySelectEdit() {
        $(".typhoon-yearEdit-list").click(function () {
            $(".typhoon-yearEdit-list").removeClass("typhoon-yearEdit-click");
            $(this).addClass("typhoon-yearEdit-click");
            areaCityEdit = $(this).find("span.disaster-edit-text").text();
            districtIdEdit = $(this).find("span.disaster-edit-id").text();
            $.ajax({
                url: srcPath + "admin/address/town/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "districtId": districtIdEdit
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    console.log(data);
                    $("#area-townEdit").show();
                    var dataJson = data.data;
                    var listHtml = "";
                    for (var i = 0; i < dataJson.length; i++) {
                        listHtml = listHtml + "<div class=\"typhoon-listEdit-list\">\n" +
                            "                                    <i class=\"iconfont disaster-radio-uncheck\">&#xeada;</i>\n" +
                            "                                    <i class=\"iconfont disaster-radio-check\">&#xeadb;</i>\n" +
                            "                                    <span class=\"disaster-edit-id\" style='display: none;'>" + dataJson[i].id + "</span>\n" +
                            "                                    <span class=\"disaster-edit-text\">" + dataJson[i].name + "</span>\n" +
                            "                                </div>";
                    }
                    $("#area-townEdit").html(listHtml);
                    townsSelectEdit();
                    $("#area-townEdit").mouseover(function () {
                        $(this).show();
                        $("#area-cityEdit").show();
                    });
                    $("#area-townEdit").mouseout(function () {
                        $(this).hide();
                        $("#area-cityEdit").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function townsSelectEdit() {
        $(".typhoon-listEdit-list").click(function () {
            var areaTownsEdit = $(this).find("span.disaster-edit-text").text();
            townIdEdit = $(this).find("span.disaster-edit-id").text();
            $(".typhoon-listEdit-list").removeClass("typhoon-listEdit-click");
            $(this).addClass("typhoon-listEdit-click");
            $("#area-edit").find("span.disaster-selectTxt").text(areaCityEdit + areaTownsEdit);
            $("#area-cityEdit").hide();
            $("#area-townEdit").hide();
        });
    }
    //修改模块报送性质选择
    $("#type-edit").click(function () {
        $("#type-dropEdit").toggle();
        $(".type-drop-list").removeClass("type-edit-click");
    });
    $(".type-drop-list").click(function () {
        $(".type-drop-list").removeClass("type-edit-click");
        $(this).addClass("type-edit-click");
        var text = $(this).find("span.disaster-edit-text").text();
        $("#type-edit").find("span.disaster-selectTxt").text(text);
        if (text == "初报") {
            reportTypeEdit = 1;
        } else if (text == "续报") {
            reportTypeEdit = 2;
        } else if (text == "核报") {
            reportTypeEdit = 3;
        } else if (text == "一季度报") {
            reportTypeEdit = 4;
        } else if (text == "上半年报") {
            reportTypeEdit = 5;
        } else if (text == "前三季度报") {
            reportTypeEdit = 6;
        } else if (text == "年报") {
            reportTypeEdit = 7;
        }
        $("#type-dropEdit").hide();
    });
    $("#type-dropEdit").mouseover(function () {
        $(this).show();
    });
    $("#type-dropEdit").mouseout(function () {
        $(this).hide();
    });
    //修改填表日期选择
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#fillCreateTimeEdit', //指定元素
            change: function (value, data) { //监听日期变换
                lay("#fillCreateTimeEdit").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#fillCreateTimeEdit").val(value);
                fillCreateTimeEdit = Date.parse($("#fillCreateTimeEdit").val());
            }
        });
    });
    var $floodUploadEdit = $("#uploadEdit");
    $floodUploadEdit.change(function () {
        if ($(this).val() != "") {
            uploadEdit(this);
        }
    });
    function uploadEdit(ele) {
        var files = $(ele)[0].files;
        if (uploadImgLists.length + files.length > 6) {
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
                    var dataJson = responseStr.data.list;
                    $("#disaster-edit .imgList-disaster").show();
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
                        uploadImgLists.push(dataJson[i].url);
                    }
                    if (uploadImgLists.length >= 6) {
                        $floodUploadEdit.attr('disabled', true);
                        $floodUploadEdit.parents('.info-uploadBtn').css('background-color', '#999');
                    }
                    $("#disaster-edit .imgList-disaster").append(imgList);
                    uploadImgDelEdit();
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
                    $floodUploadEdit.attr('disabled', false)
                    $floodUploadEdit.parents('.info-uploadBtn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    //修改确定按钮
    $("#disasterEditSure").click(function () {
        var title = $("#titleEdit").val();
        //var districtId = districtIdEdit;
        //var townId = townIdEdit;
        var reportType;
        if($("#type-edit").find("span.disaster-selectTxt").text()=="初报"){
            reportType=1;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="续报"){
            reportType=2;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="核报"){
            reportType=3;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="一季度报"){
            reportType=4;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="上半年报"){
            reportType=5;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="前三季度报"){
            reportType=6;
        }else if($("#type-edit").find("span.disaster-selectTxt").text()=="年报"){
            reportType=7;
        }else{

        }
        //var reportType = reportTypeEdit;
        var fillBy = $("#fillByEdit").val();
        ///var fillCreateTime = fillCreateTimeEdit;
        var fillCreateTime=$("#fillCreateTimeEdit").val();
        var fillUnit = $("#fillUnitEdit").val();
        //var typhoonId = typhoonIdEdit;
        var disasterZone = $("#area-edit").find("span.disaster-selectTxt").text();
        var phone = $("#phoneEdit").val();
        var disasterPopulation = $("#disasterPopulationEdit").val();
        var deadPopulation = $("#deadPopulationEdit").val();
        var missPopulation = $("#missPopulationEdit").val();
        var transferPopulation = $("#transferPopulationEdit").val();
        var collapseHouse = $("#collapseHouseEdit").val();
        var collapseHouseDirectEcoLoss = $("#collapseHouseDirectEcoLossEdit").val();
        var damagedHouse = $("#damagedHouseEdit").val();
        var damagedHouseDirectEcoLoss = $("#damagedHouseDirectEcoLossEdit").val();
        var aquacultureAffectedArea = $("#aquacultureAffectedAreaEdit").val();
        var aquacultureDirectEcoLoss = $("#aquacultureDirectEcoLossEdit").val();
        var aquacultureDisasterArea = $("#aquacultureDisasterAreaEdit").val();
        var aquacultureDisasterDirectEcoLoss = $("#aquacultureDisasterDirectEcoLossEdit").val();
        var aquacultureNoGainArea = $("#aquacultureNoGainAreaEdit").val();
        var aquacultureNoGainDirectEcoLoss = $("#aquacultureNoGainDirectEcoLossEdit").val();
        var aquacultureLossNum = $("#aquacultureLossNumEdit").val();
        var aquacultureEcoLoss = $("#aquacultureEcoLossEdit").val();
        var aquacultureDamageDeviceNum = $("#aquacultureDamageDeviceNumEdit").val();
        var aquacultureDamageDeviceEcoLoss = $("#aquacultureDamageDeviceEcoLossEdit").val();
        var aquacultureDestroyedFishBoatNum = $("#aquacultureDestroyedFishBoatNumEdit").val();
        var aquacultureDestroyedFishBoatEcoLoss = $("#aquacultureDestroyedFishBoatEcoLossEdit").val();
        var aquacultureDamageFishBoatNum = $("#aquacultureDamageFishBoatNumEdit").val();
        var aquacultureDamageFishBoatEcoLoss = $("#aquacultureDamageFishBoatEcoLossEdit").val();
        var trafficDestroyedShipNum = $("#trafficDestroyedShipNumEdit").val();
        var trafficDestroyedShipEcoLoss = $("#trafficDestroyedShipEcoLossEdit").val();
        var trafficDamageShipNum = $("#trafficDamageShipNumEdit").val();
        var trafficDamageShipEcoLoss = $("#trafficDamageShipEcoLossEdit").val();
        var trafficShipCargoLossNum = $("#trafficShipCargoLossNumEdit").val();
        var trafficShipCargoEcoLoss = $("#trafficShipCargoEcoLossEdit").val();
        var trafficChannelDepositLength = $("#trafficChannelDepositLengthEdit").val();
        var trafficChannelDepositEcoLoss = $("#trafficChannelDepositEcoLossEdit").val();
        var trafficDestroyedNavMarkNum = $("#trafficDestroyedNavMarkNumEdit").val();
        var trafficDestroyedNavMarkEcoLoss = $("#trafficDestroyedNavMarkEcoLossEdit").val();
        var coastalDamagedPortNum = $("#coastalDamagedPortNumEdit").val();
        var coastalDamagedPortEcoLoss = $("#coastalDamagedPortEcoLossEdit").val();
        var coastalDamagedWharfLength = $("#coastalDamagedWharfLengthEdit").val();
        var coastalDamagedWharfEcoLoss = $("#coastalDamagedWharfEcoLossEdit").val();
        var coastalDamagedCargoNum = $("#coastalDamagedCargoNumEdit").val();
        var coastalDamagedCargoEcoLoss = $("#coastalDamagedCargoEcoLossEdit").val();
        var coastalDamagedBulwarkLength = $("#coastalDamagedBulwarkLengthEdit").val();
        var coastalDamagedBulwarkEcoLoss = $("#coastalDamagedBulwarkEcoLossEdit").val();
        var coastalDamagedSeawallLength = $("#coastalDamagedSeawallLengthEdit").val();
        var coastalDamagedSeawallEcoLoss = $("#coastalDamagedSeawallEcoLossEdit").val();
        var coastalDamagedRoadLength = $("#coastalDamagedRoadLengthEdit").val();
        var coastalDamagedRoadEcoLoss = $("#coastalDamagedRoadEcoLossEdit").val();
        var coastalDamagedComDeviceNum = $("#coastalDamagedComDeviceNumEdit").val();
        var coastalDamagedComDeviceEcoLoss = $("#coastalDamagedComDeviceEcoLossEdit").val();
        var offshoreDamagedOilPlatformNum = $("#offshoreDamagedOilPlatformNumEdit").val();
        var offshoreDamagedOilPlatformEcoLoss = $("#offshoreDamagedOilPlatformEcoLossEdit").val();
        var offshoreDamagedOilGasLength = $("#offshoreDamagedOilGasLengthEdit").val();
        var offshoreDamagedOilGasEcoLoss = $("#offshoreDamagedOilGasEcoLossEdit").val();
        var offshoreDamagedBridgeNum = $("#offshoreDamagedBridgeNumEdit").val();
        var offshoreDamagedBridgeEcoLoss = $("#offshoreDamagedBridgeEcoLossEdit").val();
        var offshoreBothNetLength = $("#offshoreBothNetLengthEdit").val();
        var offshoreBothNetEcoLoss = $("#offshoreBothNetEcoLossEdit").val();
        var offshoreSubmergeFarmlandNum = $("#offshoreSubmergeFarmlandNumEdit").val();
        var offshoreSubmergeFarmlandEcoLoss = $("#offshoreSubmergeFarmlandEcoLossEdit").val();
        var offshoreSubmergeSaltFieldNum = $("#offshoreSubmergeSaltFieldNumEdit").val();
        var offshoreSubmergeSaltFieldEcoLoss = $("#offshoreSubmergeSaltFieldEcoLossEdit").val();
        var remark = $("#remarkEdit").val();
        if ($("#disaster-edit").find("div.imgList-disaster").css("display") == "none") {
            uploadImgLists.splice(0, uploadImgLists.length)
        } else {
            uploadImgLists = uploadImgLists;
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
        if(fillCreateTime == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("填表日期不能为空");
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
        if(phone == ""){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("联系电话不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if($("#typhoon-edit").find("span.disaster-selectTxt").text() == ""||$("#typhoon-edit").find("span.disaster-selectTxt").text() == "请选择"){
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("选择台风不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if ($("#area-edit").find("span.disaster-selectTxt").text() == ""||$("#area-edit").find("span.disaster-selectTxt").text() == "请选择") {  
            $(".equipment-tips").show();
            $(".equipment-tips").find("span").text("选择区域不能为空");
            setTimeout(function () {
                $(".equipment-tips").hide();
            }, 1000);
            return false;
        }
        if ($("#type-edit").find("span.disaster-selectTxt").text() == ""||$("#type-edit").find("span.disaster-selectTxt").text() == "请选择") {   
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
        console.log(districtIdEdit);
        console.log(typhoonIdEdit);
        console.log(reportType);
        
        if(districtIdEdit==""){
            if(typhoonIdEdit==""){
                $.ajax({
                    url: srcPath + "admin/disaster/information/save",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "id": disasterInfoId,
                        "title": title,
                        "reportType": reportType,
                        "fillBy": fillBy,
                        "fillCreateTime": fillCreateTime,
                        "fillUnit": fillUnit,
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
                        "picArr": uploadImgLists
                    }),
                    success: function (data) {
                        if (data.code == "-2") {
                            window.location.href = "login.html";
                        }
                        console.log(data);
                        if (data.code == 200) {
                            $("#disaster-edit").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            }, 1000);
                            $("#disaster-edit .imgList-disaster").hide();
                            $("#disaster-edit .imgList-disaster").html("");
                            $(".equipment-tips").hide();
                            var title = $("#infoSearchName").val();
                            var typhoonId = "";
                            var townId = "";
                            var reportType = "";
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
            }else{
                $.ajax({
                    url: srcPath + "admin/disaster/information/save",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "id": disasterInfoId,
                        "title": title,
                        "reportType": reportType,
                        "fillBy": fillBy,
                        "fillCreateTime": fillCreateTime,
                        "fillUnit": fillUnit,
                        "disasterZone": disasterZone,
                        "phone": phone,
                        "typhoonId": typhoonIdEdit,
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
                        "picArr": uploadImgLists
                    }),
                    success: function (data) {
                        if (data.code == "-2") {
                            window.location.href = "login.html";
                        }
                        console.log(data);
                        if (data.code == 200) {
                            $("#disaster-edit").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            }, 1000);
                            $("#disaster-edit .imgList-disaster").hide();
                            $("#disaster-edit .imgList-disaster").html("");
                            $(".equipment-tips").hide();
                            var title = $("#infoSearchName").val();
                            var typhoonId = "";
                            var townId = "";
                            var reportType = "";
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
            }
        }else if(typhoonIdEdit==""){
            if(districtIdEdit==""){
                $.ajax({
                    url: srcPath + "admin/disaster/information/save",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "id": disasterInfoId,
                        "title": title,
                        "reportType": reportType,
                        "fillBy": fillBy,
                        "fillCreateTime": fillCreateTime,
                        "fillUnit": fillUnit,
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
                        "picArr": uploadImgLists
                    }),
                    success: function (data) {
                        if (data.code == "-2") {
                            window.location.href = "login.html";
                        }
                        console.log(data);
                        if (data.code == 200) {
                            $("#disaster-edit").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            }, 1000);
                            $("#disaster-edit .imgList-disaster").hide();
                            $("#disaster-edit .imgList-disaster").html("");
                            $(".equipment-tips").hide();
                            var title = $("#infoSearchName").val();
                            var typhoonId = "";
                            var townId = "";
                            var reportType = "";
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
            }else{
                $.ajax({
                    url: srcPath + "admin/disaster/information/save",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "id": disasterInfoId,
                        "title": title,
                        "districtId": districtIdEdit,
                        "townId": townIdEdit,
                        "reportType": reportType,
                        "fillBy": fillBy,
                        "fillCreateTime": fillCreateTime,
                        "fillUnit": fillUnit,
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
                        "picArr": uploadImgLists
                    }),
                    success: function (data) {
                        if (data.code == "-2") {
                            window.location.href = "login.html";
                        }
                        console.log(data);
                        if (data.code == 200) {
                            $("#disaster-edit").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            }, 1000);
                            $("#disaster-edit .imgList-disaster").hide();
                            $("#disaster-edit .imgList-disaster").html("");
                            $(".equipment-tips").hide();
                            var title = $("#infoSearchName").val();
                            var typhoonId = "";
                            var townId = "";
                            var reportType = "";
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
            }
        }else{
            $.ajax({
                url: srcPath + "admin/disaster/information/save",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id": disasterInfoId,
                    "title": title,
                    "districtId": districtIdEdit,
                    "townId": townIdEdit,
                    "reportType": reportType,
                    "fillBy": fillBy,
                    "fillCreateTime": fillCreateTime,
                    "fillUnit": fillUnit,
                    "typhoonId": typhoonIdEdit,
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
                    "picArr": uploadImgLists
                }),
                success: function (data) {
                    if (data.code == "-2") {
                        window.location.href = "login.html";
                    }
                    console.log(data);
                    if (data.code == 200) {
                        $("#disaster-edit").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        }, 1000);
                        $("#disaster-edit .imgList-disaster").hide();
                        $("#disaster-edit .imgList-disaster").html("");
                        $(".equipment-tips").hide();
                        var title = $("#infoSearchName").val();
                        var typhoonId = "";
                        var townId = "";
                        var reportType = "";
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
        }
    });
});