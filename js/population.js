function resize() {
    var height=window.parent.document.body.clientHeight;
    //$(".delAll-pop").css({left:220,top:(height-240)/2});
    $(".add-tip-txt").css({left:280,top:(height-62)/2});
    $(".totalPop").css({left:300,top:15});
    $(".loadingBox").css({left:-255,top:(height-48)/2});
    window.onresize=function () {
        //$(".delAll-pop").css({left:220,top:(height-240)/2});
        $(".add-tip-txt").css({left:280,top:(height-62)/2});
        $(".totalPop").css({left:300,top:15});
        $(".loadingBox").css({left:-255,top:(height-48)/2});
    }
}
var districtId="";
var townsId="";
var villageId="";
var statisticalYear="";
var districtIdAdd="";
var townsIdAdd="";
var villageIdAdd="";
var districtIdEdit="";
var townsIdEdit="";
var villageIdEdit="";
var uploadImgList=[];
var uploadImgLists=[];
var uploadImgListSum=[];
var uploadImgListOld=[];
$(function () {
    var loginName=sessionStorage.getItem('userName');
    var loginPass=sessionStorage.getItem('password');
    if(loginName==null||loginPass==null){
        window.location.href="../login.html";
    }else{

    }
    resize();
    //获取token值
    var token=$.cookie("token");
    var width=$(".menu-table",window.parent.document).width();
    var height=$(".menu-table",window.parent.document).height();
    //导航栏放大缩小切换
    $(".nav-open",window.parent.document).click(function () {
        $(".population-content").css("width",width*1.1);
        $(".population-table").css("width",width*1.1);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox-population").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
    });
    $(".nav-close",window.parent.document).click(function () {
        $(".population-content").css("width",width*0.95);
        $(".population-table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox-population").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
    });
    if($(".left",window.parent.document).hasClass("small-menu")){
        $(".population-content").css("width",width*0.98);
        $(".population-table").css("width",width*0.98);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox-population").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
    }else{
        $(".population-content").css("width",width*0.95);
        $(".population-table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox-population").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
    }
    //表格操作
    $(".table-menuItem").click(function () {
        $(this).toggleClass("table-menuClick");
    });
    //获取列表
    var tableLength;
    function page(page,size,searchName,districtId,townId,villageId,statisticalYear){
        $("#loading").show();
        $(".overlayOpacity",window.parent.document).show();
        $.ajax({
            url:srcPath+"admin/population/gathering/area/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "current":page,
                "size":size,
                "name":searchName,
                "districtId":districtId,
                "townId":townId,
                "villageId":villageId,
                "statisticalYear":statisticalYear
            }),
            success:function(data){
                $("#loading").hide();
                $(".overlayOpacity",window.parent.document).hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                console.log(data);
                var dataJson=data.data.records;
                tableLength=dataJson;
                if(dataJson==""){
                    $(".table-no").show();
                    $(".table-yes").hide();
                }else {
                    $(".table-no").hide();
                    $(".table-yes").show();
                    var tableHTML = "<thead>\n" +
                        "            <tr>\n" +
                        "                <th>\n" +
                        "                    <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                        "                    <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                        "                </th>\n" +
                        "                <th style='display: none;'>序号</th>\n" +
                        "                <th>村社区名称</th>\n" +
                        "                <th>统计年度</th>\n" +
                        "                <th>总人口数（人）</th>\n" +
                        "                <th>总户数（人）</th>\n" +
                        "                <th>所属乡镇</th>\n" +
                        "                <th>经度坐标</th>\n" +
                        "                <th>纬度坐标</th>\n" +
                        "                <th>操作</th>\n" +
                        "            </tr>\n" +
                        "            </thead>\n" +
                        "            <tbody>";
                    for (var i = 0; i < dataJson.length; i++) {
                        if (dataJson[i].id == "" || dataJson[i].id == null || dataJson[i].id == undefined) {
                            dataJson[i].id = "无";
                        } else {
                            dataJson[i].id = dataJson[i].id;
                        }
                        if (dataJson[i].name == "" || dataJson[i].name == null || dataJson[i].name == undefined) {
                            dataJson[i].name = "无";
                        } else {
                            dataJson[i].name = dataJson[i].name;
                        }
                        if (dataJson[i].statisticalYear == "" || dataJson[i].statisticalYear == null || dataJson[i].statisticalYear == undefined) {
                            dataJson[i].statisticalYear = "无";
                        } else {
                            dataJson[i].statisticalYear = dataJson[i].statisticalYear;
                        }
                        if (String(dataJson[i].totalPopulation) == "" || dataJson[i].totalPopulation == null || dataJson[i].totalPopulation == undefined) {
                            dataJson[i].totalPopulation = "无";
                        } else {
                            dataJson[i].totalPopulation = dataJson[i].totalPopulation;
                        }
                        if (String(dataJson[i].totalHouseholds) == "" || dataJson[i].totalHouseholds == null || dataJson[i].totalHouseholds == undefined) {
                            dataJson[i].totalHouseholds = "无";
                        } else {
                            dataJson[i].totalHouseholds = dataJson[i].totalHouseholds;
                        }
                        if (dataJson[i].township == "" || dataJson[i].township == null || dataJson[i].township == undefined) {
                            dataJson[i].township = "无";
                        } else {
                            dataJson[i].township = dataJson[i].township;
                        }
                        if (dataJson[i].longitude == "" || dataJson[i].longitude == null || dataJson[i].longitude == undefined) {
                            dataJson[i].longitude = "无";
                        } else {
                            dataJson[i].longitude = dataJson[i].longitude;
                        }
                        if (dataJson[i].latitude == "" || dataJson[i].latitude == null || dataJson[i].latitude == undefined) {
                            dataJson[i].latitude = "无";
                        } else {
                            dataJson[i].latitude = dataJson[i].latitude;
                        }
                        tableHTML = tableHTML + "<tr>\n" +
                            "            <td>\n" +
                            "                <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                            "                <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                            "            </td>\n" +
                            "            <td style='display: none;'>" + dataJson[i].id + "</td>\n" +
                            "            <td>" + dataJson[i].name + "</td>\n" +
                            "            <td>" + dataJson[i].statisticalYear + "</td>\n" +
                            "            <td>" + dataJson[i].totalPopulation + "</td>\n" +
                            "            <td>" + dataJson[i].totalHouseholds + "</td>\n" +
                            "            <td>" + dataJson[i].township + "</td>\n" +
                            "            <td>" + dataJson[i].longitude + "</td>\n" +
                            "            <td>" + dataJson[i].latitude + "</td>\n" +
                            "            <td>\n" +
                            "                 <span class=\"table-infoIcon\"><i class=\"iconfont\">&#xeb46;</i><span class=\"table-txt\">详情</span></span>" +
                            "                 <span class=\"table-editIcon\"><i class=\"iconfont\">&#xeabe;</i><span class=\"table-txt\">编辑</span></span>" +
                            "                 <span class=\"table-delIcon\"><i class=\"iconfont\">&#xeafb;</i><span class=\"table-txt\">删除</span></span>" +
                            "            </td>\n" +
                            "        </tr>";
                    }
                    tableHTML = tableHTML + "</tbody>";
                    $(".population-table").html(tableHTML);
                    tableCheck();
                    tableFilter();
                    tableInfo();
                    tableDel();
                    tableEdit();
                    infoDoubleClick();
                    //分页操作
                    $("#totalPage").text(data.data.pages);
                    $("#currentPage").text(data.data.current);
                    $("#totalRecord").text(data.data.total);
                    var page=parseInt($("#currentPage").text());
                    var total=parseInt($("#totalPage").text());
                    if(page==1){
                        $("#prevPage").addClass("page-item-notClick");
                        $("#nextPage").removeClass("page-item-notClick");
                    }else if(page==total){
                        $("#nextPage").addClass("page-item-notClick");
                        $("#prevPage").removeClass("page-item-notClick");
                    }else {
                        $("#prevPage").removeClass("page-item-notClick");
                        $("#nextPage").removeClass("page-item-notClick");
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    }
    var searchName=$("#searchName").val();
    page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
    //首页
    $("#firstPage").click(function () {
        var searchName=$("#searchName").val();
        page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
    });
    //上一页
    $("#prevPage").click(function () {
        var searchName=$("#searchName").val();
        var pageNow=1;
        var currentPage=parseInt($("#currentPage").text());
        if(pageNow<1){
            return false;
        }else {
            pageNow=currentPage-1;
            page(pageNow,10,searchName,districtId,townsId,villageId,statisticalYear);
        }
    });
    //下一页
    $("#nextPage").click(function () {
        var searchName=$("#searchName").val();
        var pageNow;
        var currentPage=parseInt($("#currentPage").text());
        var totalPage=parseInt($("#totalPage").text());
        if(currentPage >= totalPage){
            return false;
        }else {
            pageNow=currentPage+1;
            page(pageNow,10,searchName,districtId,townsId,villageId,statisticalYear);
        }
    });
    //尾页
    $("#endPage").click(function () {
        var searchName=$("#searchName").val();
        var totalPage=$("#totalPage").text();
        page(totalPage,10,searchName,districtId,townsId,villageId,statisticalYear);
    });
    //跳转
    $("#pageTo").click(function () {
        var searchName=$("#searchName").val();
        var pageNum=$("#pageValue").val();
        if(pageNum==""){

        }else {
            page(pageNum,10,searchName,districtId,townsId,villageId,statisticalYear);
        }
    });
    $("#pageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            var searchName=$("#searchName").val();
            var pageNum = $("#pageValue").val();
            if (pageNum == "") {

            } else {
                page(pageNum, 10, searchName, districtId, townsId, villageId, statisticalYear);
            }
        }
    });
    //搜索功能
    $("#searchName").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var searchName=$("#searchName").val();
            page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
        }
    });
    $(".search-icon").click(function () {
        var searchName=$("#searchName").val();
        page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
    });
    //表格选中与否
    var populationIds=[];
    function tableCheck(){
        $(".population-table").find("thead tr th:eq(0)").click(function () {
            $(this).toggleClass("check-click");
            if($(this).hasClass("check-click")){
                $(".population-table").find("tbody tr td").addClass("check-click");
                for(var i=0;i<tableLength.length;i++){
                    populationIds.push(tableLength[i].id);
                }
            }else {
                $(".population-table").find("tbody tr td").removeClass("check-click");
                populationIds.splice(0,populationIds.length);
            }
        });
        $(".population-table").find("tbody tr").each(function(){
            var td=$(this).find("td").eq(0);
            td.click(function(){
                $(this).toggleClass("check-click");
                if ($(this).hasClass("check-click")){
                    var populationId=$(this).siblings("td").eq(0).text();
                    populationIds.push(populationId);
                } else {
                    $(".population-table").find("thead tr th").removeClass("check-click");
                    var txt=$(this).siblings("td").eq(0).text();
                    if(populationIds.indexOf(txt) == "-1"){
    
                    }else{
                        populationIds.splice(populationIds.indexOf(txt),1);
                    }
                }
            });
        });
        /*$(".population-table").find("tbody tr td").click(function () {
            $(this).toggleClass("check-click");
            if ($(this).hasClass("check-click")){
                var populationId=$(this).siblings("td").eq(0).text();
                populationIds.push(populationId);
            } else {
                $(".population-table").find("thead tr th").removeClass("check-click");
                var txt=$(this).siblings("td").eq(0).text();
                if(populationIds.indexOf(txt) == "-1"){

                }else{
                    populationIds.splice(populationIds.indexOf(txt),1);
                }
            }
        });*/
    }
    //筛选
    function tableFilter() {
        var tableList=[];
        $(".population-table").find("thead tr th").each(function () {
            var txt = $(this).text();
            tableList.push(txt);
        });
        tableList.splice(0,2);
        tableList.splice(tableList.length-3,tableList.length);
        $("#population-select").click(function () {
            $(".filtrate-pop").toggle();
            var html="";
            for (var i=0;i<tableList.length;i++){
                html=html+"<div class=\"filtrate-item\">\n" +
                    "            <i class=\"iconfont filtrate-uncheck\">&#xeadc;</i>\n" +
                    "            <i class=\"iconfont filtrate-check\">&#xead8;</i>\n" +
                    "            <span class=\"filtrate-txt\">"+tableList[i]+"</span>\n" +
                    "        </div>";
            }
            $(".filtrate-pop").html(html);
            $(".filtrate-item").click(function () {
                var txt=$(this).find("span.filtrate-txt").text();
                $(this).toggleClass("filtrate-click");
                if($(this).hasClass("filtrate-click")){
                    var index=tableList.indexOf(txt);
                    var tab=$(".population-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="none";
                    }
                }else {
                    var index=tableList.indexOf(txt);
                    var tab=$(".population-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="";
                    }
                }
            });
        });
    }
    //地区选择
    var areaCity;
    var areaName;
    $("#area-select").click(function () {
        $("#area-city").toggle();
        if($("#area-city").css("display")=="none"){
            $("#area-towns").hide();
            $("#area-street").hide();
        }else{

        }
        $(".area-city-item").removeClass("area-city-click");
        $(".area-towns-item").removeClass("area-towns-click");
        $(".area-street-item").removeClass("area-street-click");
        if($(".area-city-item").hasClass("area-city-click")){

        }else{
            $("#area-city").mouseover(function(){
                $(this).show();
            });
            $("#area-city").mouseout(function(){
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
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                console.log(data);
                var dataJson=data.data;
                var listHtml="";
                for(var i=0;i<dataJson.length;i++){
                    listHtml=listHtml+"<div class=\"area-city-item\">\n" +
                        "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                        "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                        "                <span class=\"area-city-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                        "                <span class=\"area-city-text\">"+dataJson[i].name+"</span>\n" +
                        "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                        "            </div>";
                }
                $("#area-city").html(listHtml);
                citySelect();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    function citySelect(){
        $(".area-city-item").click(function () {
            areaCity=$(this).find("span.area-city-text").text();
            districtId=$(this).find("span.area-city-id").text();
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
                    "districtId":districtId
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-towns").show();
                    var dataJson=data.data;
                    var listHtml="";
                    for(var i=0;i<dataJson.length;i++){
                        listHtml=listHtml+"<div class=\"area-towns-item\">\n" +
                            "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                            "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                            "                <span class=\"area-towns-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                            "                <span class=\"area-towns-text\">"+dataJson[i].name+"</span>\n" +
                            "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                            "            </div>";
                    }
                    $("#area-towns").html(listHtml);
                    townsSelect();
                    $("#area-towns").mouseover(function(){
                        $(this).show();
                        $("#area-city").show();
                    });
                    $("#area-towns").mouseout(function(){
                        $(this).hide();
                        $("#area-city").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function townsSelect(){
        $(".area-towns-item").click(function () {
            areaName=$(this).find("span.area-towns-text").text();
            townsId=$(this).find("span.area-towns-id").text();
            $(".area-towns-item").removeClass("area-towns-click");
            $(this).addClass("area-towns-click");
            $.ajax({
                url: srcPath + "admin/address/village/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "townId":townsId
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-street").show();
                    var dataJson=data.data;
                    if(dataJson==""){

                    }else{
                        var listHtml="";
                        for(var i=0;i<dataJson.length;i++){
                            listHtml=listHtml+"<div class=\"area-street-item\">\n" +
                                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                                "                <span class=\"area-street-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                                "                <span class=\"area-street-text\">"+dataJson[i].name+"</span>\n" +
                                "            </div>";
                        }
                        $("#area-street").html(listHtml);
                        streetSelect();
                        $("#area-street").mouseover(function(){
                            $(this).show();
                            $("#area-city").show();
                            $("#area-towns").show();
                        });
                        $("#area-street").mouseout(function(){
                            $(this).hide();
                            $("#area-city").hide();
                            $("#area-towns").hide();
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function streetSelect(){
        $(".area-street-item").click(function () {
            var areaStreet=$(this).find("span.area-street-text").text();
            villageId=$(this).find("span.area-street-id").text();
            $(".area-street-item").removeClass("area-street-click");
            $(this).addClass("area-street-click");
            $("#area-city").hide();
            $("#area-towns").hide();
            $("#area-street").hide();
            $("#area-select").find("span.info-item-word").text(areaCity+"/"+areaName+"/"+areaStreet);
            var searchName=$("#searchName").val();
            page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
        });
    }
    //年份选择
    var year=(new Date()).getFullYear();
    $("#year-select").click(function () {
        $("#year-drop").toggle();
        var listHtml="";
        for(var i=year;i>=1945;i--){
            listHtml=listHtml+"<div class=\"year-drop-item\">\n" +
                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                "                <span class=\"year-drop-text\">"+i+"</span>\n" +
                "            </div>";
        }
        $("#year-drop").html(listHtml);
        yearSelect();
        $("#year-drop").mouseover(function(){
           $(this).show();
        });
        $("#year-drop").mouseout(function(){
            $(this).hide();
        });
    });
    function yearSelect(){
        $(".year-drop-item").click(function () {
            var year=$(this).find("span.year-drop-text").text();
            statisticalYear=$(this).find("span.year-drop-text").text();
            $(".year-drop-item").removeClass("year-drop-click");
            $(this).addClass("year-drop-click");
            $("#year-drop").hide();
            $("#year-select").find("span.info-item-word").text(year);
            var searchName=$("#searchName").val();
            page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
        });
    }
    //清空选项
    $("#clear-select").click(function () {
        $("#area-select").find("span.info-item-word").text("选择地区");
        $("#year-select").find("span.info-item-word").text("选择年份");
        $("#area-city").hide();
        $("#area-towns").hide();
        $("#area-street").hide();
        $("#year-drop").hide();
        var searchName=$("#searchName").val();
        districtId="";
        townsId="";
        villageId="";
        statisticalYear="";
        page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
    });
    //新建模块
    //新建地区选择
    var areaCityAdd;
    var areaNameAdd;
    $("#area-select-add").click(function () {
        $("#area-city-add").toggle();
        if($("#area-city-add").css("display")=="none"){
            $("#area-towns-add").hide();
            $("#area-street-add").hide();
        }else{

        }
        $(".area-city-add").removeClass("area-city-clickAdd");
        $(".area-towns-add").removeClass("area-towns-clickAdd");
        $(".area-street-add").removeClass("area-street-clickAdd");
        if($(".area-city-add").hasClass("area-city-clickAdd")){

        }else{
            $("#area-city-add").mouseover(function(){
                $(this).show();
            });
            $("#area-city-add").mouseout(function(){
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
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                console.log(data);
                var dataJson=data.data;
                var listHtml="";
                for(var i=0;i<dataJson.length;i++){
                    listHtml=listHtml+"<div class=\"area-city-add\">\n" +
                        "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                        "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                        "                <span class=\"area-city-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                        "                <span class=\"area-city-text\">"+dataJson[i].name+"</span>\n" +
                        "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                        "            </div>";
                }
                $("#area-city-add").html(listHtml);
                citySelectAdd();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    function citySelectAdd(){
        $(".area-city-add").click(function () {
            areaCityAdd=$(this).find("span.area-city-text").text();
            districtIdAdd=$(this).find("span.area-city-id").text();
            $(".area-city-add").removeClass("area-city-clickAdd");
            $(this).addClass("area-city-clickAdd");
            $.ajax({
                url: srcPath + "admin/address/town/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "districtId":districtIdAdd
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-towns-add").show();
                    var dataJson=data.data;
                    var listHtml="";
                    for(var i=0;i<dataJson.length;i++){
                        listHtml=listHtml+"<div class=\"area-towns-add\">\n" +
                            "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                            "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                            "                <span class=\"area-towns-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                            "                <span class=\"area-towns-text\">"+dataJson[i].name+"</span>\n" +
                            "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                            "            </div>";
                    }
                    $("#area-towns-add").html(listHtml);
                    townsSelectAdd();
                    $("#area-towns-add").mouseover(function(){
                        $(this).show();
                        $("#area-city-add").show();
                    });
                    $("#area-towns-add").mouseout(function(){
                        $(this).hide();
                        $("#area-city-add").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function townsSelectAdd(){
        $(".area-towns-add").click(function () {
            areaNameAdd=$(this).find("span.area-towns-text").text();
            townsIdAdd=$(this).find("span.area-towns-id").text();
            $(".area-towns-add").removeClass("area-towns-clickAdd");
            $(this).addClass("area-towns-clickAdd");
            $.ajax({
                url: srcPath + "admin/address/village/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "townId":townsIdAdd
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-street-add").show();
                    var dataJson=data.data;
                    if(dataJson==""){

                    }else{
                        var listHtml="";
                        for(var i=0;i<dataJson.length;i++){
                            listHtml=listHtml+"<div class=\"area-street-add\">\n" +
                                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                                "                <span class=\"area-street-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                                "                <span class=\"area-street-text\">"+dataJson[i].name+"</span>\n" +
                                "            </div>";
                        }
                        $("#area-street-add").html(listHtml);
                        streetSelectAdd();
                        $("#area-street-add").mouseover(function(){
                            $(this).show();
                            $("#area-city-add").show();
                            $("#area-towns-add").show();
                        });
                        $("#area-street-add").mouseout(function(){
                            $(this).hide();
                            $("#area-city-add").hide();
                            $("#area-towns-add").hide();
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function streetSelectAdd(){
        $(".area-street-add").click(function () {
            var areaStreetAdd=$(this).find("span.area-street-text").text();
            villageIdAdd=$(this).find("span.area-street-id").text();
            $(".area-street-add").removeClass("area-street-clickAdd");
            $(this).addClass("area-street-clickAdd");
            $("#area-city-add").hide();
            $("#area-towns-add").hide();
            $("#area-street-add").hide();
            $("#area-select-add").text(areaCityAdd+"/"+areaNameAdd+"/"+areaStreetAdd);
        });
    }
    //新建年份选择
    $("#year-select-add").click(function () {
        $("#year-drop-add").toggle();
        var listHtml="";
        for(var i=year;i>=1945;i--){
            listHtml=listHtml+"<div class=\"year-drop-add\">\n" +
                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                "                <span class=\"year-drop-text\">"+i+"</span>\n" +
                "            </div>";
        }
        $("#year-drop-add").html(listHtml);
        yearSelectAdd();
        $("#year-drop-add").mouseover(function(){
            $(this).show();
        });
        $("#year-drop-add").mouseout(function(){
            $(this).hide();
        });
    });
    function yearSelectAdd(){
        $(".year-drop-add").click(function () {
            var year=$(this).find("span.year-drop-text").text();
            $(".year-drop-add").removeClass("year-drop-clickAdd");
            $(this).addClass("year-drop-clickAdd");
            $("#year-drop-add").hide();
            $("#year-select-add").text(year);
        });
    }
    $("#population-add").click(function () {
        $(".overlay",window.parent.document).show();
        $("#add-pop").show();
        uploadImgList.splice(0,uploadImgList.length);
        $floodUpload.attr('disabled', false);
        $floodUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
    });
    $(".addPopulation-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#population-add").removeClass("table-menuClick");
        $(".add-input").val("");
        $(".add-input").text("请选择");
        $(".population-tips").hide();
        $("#add-pop .imgList-population").hide();
        $("#edit-pop .imgList-population").hide();
        $("#add-pop .imgList-population").html("");
        $("#edit-pop .imgList-population").html("");
    });
    $("#addClose").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#population-add").removeClass("table-menuClick");
        $(".add-input").val("");
        $(".add-input").text("请选择");
        $(".population-tips").hide();
        $("#add-pop .imgList-population").hide();
        $("#add-pop .imgList-population").html("");
    });
    //图片上传
    var $floodUpload =  $("#upload");
    $floodUpload.change(function () {
        if($(this).val() != ""){
            upload(this);
        }
    });
    function upload(ele){
        var files = $(ele)[0].files;
        if (uploadImgList.length + files.length > 6) {
            $(".population-tips").show();
            $(".population-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".population-tips").hide();
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
            $(".population-tips").show();
            $(".population-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".population-tips").hide();
            },1000);
            return;
        }
        var formData = new FormData();
        for(var i=0;i<files.length;i++){
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
                if(responseStr.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(responseStr.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    var dataJson=responseStr.data.list;
                    $("#add-pop .imgList-population").show();
                    var imgList="";
                    for(var i=0;i<dataJson.length;i++){
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
                        $floodUpload.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#add-pop .imgList-population").append(imgList);
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
            error : function (responseStr) {
                
            }
        });
    }
    //图片删除和放大效果
    function uploadImgDelAdd(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#add-pop .seawallNumber-imgItem").mousemove(function(e){
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
                    $floodUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    var fillCreateTimeAdd,checkTimeAdd;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#fillCreateTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#fillCreateTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#fillCreateTime").val(value);
                fillCreateTimeAdd=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#checkTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#checkTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#checkTime").val(value);
                checkTimeAdd=Date.parse(value);
            }
        });
    });
    $("#addSure").click(function () {
        var name=$("#area-select-add").text();
        var statisticalYear=$("#year-select-add").text();
        var totalPopulation=$("#population").val();
        var totalHouseholds=$("#house").val();
        var longitude=$("#longitude").val();
        var latitude=$("#latitude").val();
        var areaCode=$("#areaCode").val();
        var areaName=$("#areaName").val();
        var origin=$("#origin").val();
        var fillBy=$("#fillBy").val();
        //var fillCreateTime=$("#fillCreateTime").val();
        var fillUnit=$("#fillUnit").val();
        var checkBy=$("#checkBy").val();
        //var checkTime=$("#checkTime").val();
        var remark=$("#remark").val();
        if($("#add-pop").find("div.imgList-population").css("display")==="none"){
            uploadImgList.splice(0,uploadImgList.length);
        }else{
            uploadImgList=uploadImgList;
        }
        var picArr;
        if(uploadImgList.length>6){
            picArr=uploadImgList.slice(-6);
        }else{
            picArr=uploadImgList;
        }
        function ajax(){
            $.ajax({
                url: srcPath + "admin/population/gathering/area/save",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "name": name,
                    "statisticalYear": statisticalYear,
                    "totalPopulation": totalPopulation,
                    "totalHouseholds": totalHouseholds,
                    "districtId": districtIdAdd,
                    "townId": townsIdAdd,
                    "villageId":villageIdAdd,
                    "longitude": longitude,
                    "latitude": latitude,
                    "areaCode": areaCode,
                    "areaName": areaName,
                    "origin": origin,
                    "fillBy": fillBy,
                    "fillCreateTime": fillCreateTimeAdd,
                    "fillUnit": fillUnit,
                    "checkBy": checkBy,
                    "checkTime": checkTimeAdd,
                    "picArr": picArr,
                    "remark": remark
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    if(data.code==200){
                        $(".overlay",window.parent.document).hide();
                        $("#add-pop").hide();
                        $("#population-add").removeClass("table-menuClick");
                        $(".add-input").val("");
                        $(".add-input").text("请选择");
                        $("#add-pop .imgList-population").hide();
                        $("#add-pop .imgList-population").html("");
                        $(".population-tips").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        var searchName=$("#searchName").val();
                        districtId="";
                        townsId="";
                        villageId="";
                        statisticalYear="";
                        page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
                    }else if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function () {
                            $("#fail").hide();
                        });
                    }else{

                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
        if(name=="" || name=="请选择"){
            $(".population-tips").show();
            $(".population-tips").find("span").text("名称不能为空");
            setTimeout(function () {
                $(".population-tips").hide();
            },1000);
        }else if(statisticalYear==""||statisticalYear=="请选择"){
            $(".population-tips").show();
            $(".population-tips").find("span").text("统计年度不能为空");
            setTimeout(function () {
                $(".population-tips").hide();
            },1000);
        }else if(totalPopulation!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(totalPopulation))){
                $(".population-tips").show();
                $(".population-tips").find("span").text("总人口数必须为数字类型");
                setTimeout(function () {
                    $(".population-tips").hide();
                },1000);
            }else{
                //ajax();
                if(totalHouseholds!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(totalHouseholds))){
                        $(".population-tips").show();
                        $(".population-tips").find("span").text("总户数必须为数字类型");
                        setTimeout(function () {
                            $(".population-tips").hide();
                        },1000);
                    }else{
                        ajax();
                    }
                }else{
                    ajax();
                }
            }
        }else if(totalHouseholds!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(totalHouseholds))){
                $(".population-tips").show();
                $(".population-tips").find("span").text("总户数必须为数字类型");
                setTimeout(function () {
                    $(".population-tips").hide();
                },1000);
            }else{
                //ajax();
                if(totalPopulation!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(totalPopulation))){
                        $(".population-tips").show();
                        $(".population-tips").find("span").text("总人口数必须为数字类型");
                        setTimeout(function () {
                            $(".population-tips").hide();
                        },1000);
                    }else{
                        ajax();
                    }
                }else{
                    ajax();
                }
            }
        }else{
            ajax();
        }
    });
    //修改模块
    //修改地区选择
    var areaCityEdit;
    var areaNameEdit;
    $("#area-select-edit").click(function () {
        $("#area-city-edit").toggle();
        if($("#area-city-edit").css("display")=="none"){
            $("#area-towns-edit").hide();
            $("#area-street-edit").hide();
        }else{

        }
        $(".area-city-edit").removeClass("area-city-clickEdit");
        $(".area-towns-edit").removeClass("area-towns-clickEdit");
        $(".area-street-edit").removeClass("area-street-clickEdit");
        if($(".area-city-edit").hasClass("area-city-clickEdit")){

        }else{
            $("#area-city-edit").mouseover(function(){
                $(this).show();
            });
            $("#area-city-edit").mouseout(function(){
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
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                console.log(data);
                var dataJson=data.data;
                var listHtml="";
                for(var i=0;i<dataJson.length;i++){
                    listHtml=listHtml+"<div class=\"area-city-edit\">\n" +
                        "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                        "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                        "                <span class=\"area-city-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                        "                <span class=\"area-city-text\">"+dataJson[i].name+"</span>\n" +
                        "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                        "            </div>";
                }
                $("#area-city-edit").html(listHtml);
                citySelectEdit();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });
    function citySelectEdit(){
        $(".area-city-edit").click(function () {
            areaCityEdit=$(this).find("span.area-city-text").text();
            districtIdEdit=$(this).find("span.area-city-id").text();
            $(".area-city-edit").removeClass("area-city-clickEdit");
            $(this).addClass("area-city-clickEdit");
            $.ajax({
                url: srcPath + "admin/address/town/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "districtId":districtIdEdit
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-towns-edit").show();
                    var dataJson=data.data;
                    var listHtml="";
                    for(var i=0;i<dataJson.length;i++){
                        listHtml=listHtml+"<div class=\"area-towns-edit\">\n" +
                            "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                            "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                            "                <span class=\"area-towns-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                            "                <span class=\"area-towns-text\">"+dataJson[i].name+"</span>\n" +
                            "                <i class=\"iconfont area-select-icon\">&#xeb03;</i>\n" +
                            "            </div>";
                    }
                    $("#area-towns-edit").html(listHtml);
                    townsSelectEdit();
                    $("#area-towns-edit").mouseover(function(){
                        $(this).show();
                        $("#area-city-edit").show();
                    });
                    $("#area-towns-edit").mouseout(function(){
                        $(this).hide();
                        $("#area-city-edit").hide();
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function townsSelectEdit(){
        $(".area-towns-edit").click(function () {
            areaNameEdit=$(this).find("span.area-towns-text").text();
            townsIdEdit=$(this).find("span.area-towns-id").text();
            $(".area-towns-edit").removeClass("area-towns-clickEdit");
            $(this).addClass("area-towns-clickEdit");
            $.ajax({
                url: srcPath + "admin/address/village/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "townId":townsIdEdit
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    $("#area-street-edit").show();
                    var dataJson=data.data;
                    if(dataJson==""){

                    }else{
                        var listHtml="";
                        for(var i=0;i<dataJson.length;i++){
                            listHtml=listHtml+"<div class=\"area-street-edit\">\n" +
                                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                                "                <span class=\"area-street-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                                "                <span class=\"area-street-text\">"+dataJson[i].name+"</span>\n" +
                                "            </div>";
                        }
                        $("#area-street-edit").html(listHtml);
                        streetSelectEdit();
                        $("#area-street-edit").mouseover(function () {
                            $(this).show();
                            $("#area-city-edit").show();
                            $("#area-towns-edit").show();
                        });
                        $("#area-street-edit").mouseout(function () {
                            $(this).hide();
                            $("#area-city-edit").hide();
                            $("#area-towns-edit").hide();
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        });
    }
    function streetSelectEdit(){
        $(".area-street-edit").click(function () {
            var areaStreetEdit=$(this).find("span.area-street-text").text();
            villageIdEdit=$(this).find("span.area-street-id").text();
            $(".area-street-edit").removeClass("area-street-clickEdit");
            $(this).addClass("area-street-clickEdit");
            $("#area-city-edit").hide();
            $("#area-towns-edit").hide();
            $("#area-street-edit").hide();
            $("#area-select-edit").text(areaCityEdit+"/"+areaNameEdit+"/"+areaStreetEdit);
        });
    }
    //修改年份选择
    $("#year-select-edit").click(function () {
        $("#year-drop-edit").toggle();
        var listHtml="";
        for(var i=year;i>=1945;i--){
            listHtml=listHtml+"<div class=\"year-drop-edit\">\n" +
                "                <i class=\"iconfont area-radio-uncheck\">&#xeada;</i>\n" +
                "                <i class=\"iconfont area-radio-check\">&#xeadb;</i>\n" +
                "                <span class=\"year-drop-text\">"+i+"</span>\n" +
                "            </div>";
        }
        $("#year-drop-edit").html(listHtml);
        yearSelectEdit();
    });
    function yearSelectEdit(){
        $(".year-drop-edit").click(function () {
            var year=$(this).find("span.year-drop-text").text();
            $(".year-drop-edit").removeClass("year-drop-clickEdit");
            $(this).addClass("year-drop-clickEdit");
            $("#year-drop-edit").hide();
            $("#year-select-edit").text(year);
        });
    }
    var $floodUploadEdit =  $("#uploadEdit");
    $floodUploadEdit.change(function () {
        if($(this).val() != ""){
            uploadEdit(this);
        }
    });
    function uploadEdit(ele){
        var files = $(ele)[0].files;
        if (uploadImgLists.length + files.length > 6) {
            $(".population-tips").show();
            $(".population-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".population-tips").hide();
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
            $(".population-tips").show();
            $(".population-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".population-tips").hide();
            },1000);
            return;
        }
        var formData = new FormData();
        for(var i=0;i<files.length;i++){
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
                if(responseStr.code=="-2"){
                    window.parent.location.href="../login.html";
                } else if (responseStr.code=="200") {
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    var dataJson=responseStr.data.list;
                    $("#edit-pop .imgList-population").show();
                    var imgList="";
                    for(var i=0;i<dataJson.length;i++){
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
                    $("#edit-pop .imgList-population").append(imgList);
                    if (uploadImgLists.length >= 6) {
                        $floodUploadEdit.attr('disabled', true);
                        $floodUploadEdit.parents('.upload-btn').css('background-color', '#999');
                    }
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
            error : function (responseStr) {
                
            }
        });
    }
    //图片删除和放大效果
    function uploadImgDelEdit(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#edit-pop .seawallNumber-imgItem").mousemove(function(e){
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
            if(uploadImgLists.indexOf(url) == "-1"){

            }else{
                uploadImgLists.splice(uploadImgLists.indexOf(url),1);
                if (uploadImgLists.length < 6) {
                    $floodUploadEdit.attr('disabled', false)
                    $floodUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    $("#editClose").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#edit-pop").hide();
        $("#edit-pop .imgList-population").hide();
        $("#edit-pop .imgList-population").html("");
        $(".population-tips").hide();
    });
    var fillCreateTimeEdit,checkTimeEdit;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#fillCreateTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#fillCreateTimeEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#fillCreateTimeEdit").val(value);
                fillCreateTimeEdit=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#checkTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#checkTimeEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#checkTimeEdit").val(value);
                checkTimeEdit=Date.parse(value);
            }
        });
    });
    var populationId;
    function tableEdit() {
        $(".table-editIcon").click(function () {
            uploadImgLists.splice(0,uploadImgLists.length);
            uploadImgListOld.splice(0,uploadImgListOld.length);
            populationId=$(this).parent().siblings("td").eq(1).text();
            $("#edit-pop").show();
            $(".overlay",window.parent.document).show();
            $.ajax({
                url: srcPath + "admin/population/gathering/area/detail",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id":populationId
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    var dataJson=data.data;
                    if(dataJson.name==""||dataJson.name==null||dataJson.name==undefined){
                        dataJson.name="";
                    }else{
                        dataJson.name=dataJson.name;
                    }
                    if(dataJson.statisticalYear==""||dataJson.statisticalYear==null||dataJson.statisticalYear==undefined){
                        dataJson.statisticalYear="";
                    }else{
                        dataJson.statisticalYear=dataJson.statisticalYear;
                    }
                    if(String(dataJson.totalPopulation)==""||dataJson.totalPopulation==null||dataJson.totalPopulation==undefined){
                        dataJson.totalPopulation="";
                    }else{
                        dataJson.totalPopulation=dataJson.totalPopulation;
                    }
                    if(String(dataJson.totalHouseholds)==""||dataJson.totalHouseholds==null||dataJson.totalHouseholds==undefined){
                        dataJson.totalHouseholds="";
                    }else{
                        dataJson.totalHouseholds=dataJson.totalHouseholds;
                    }
                    if(dataJson.districtId==""||dataJson.districtId==null||dataJson.districtId==undefined){
                        dataJson.districtId="";
                    }else{
                        dataJson.districtId=dataJson.districtId;
                    }
                    if(dataJson.districtName==""||dataJson.districtName==null||dataJson.districtName==undefined){
                        dataJson.districtName="";
                    }else{
                        dataJson.districtName=dataJson.districtName;
                    }
                    if(dataJson.townId==""||dataJson.townId==null||dataJson.townId==undefined){
                        dataJson.townId="";
                    }else{
                        dataJson.townId=dataJson.townId;
                    }
                    if(dataJson.townName==""||dataJson.townName==null||dataJson.townName==undefined){
                        dataJson.townName="";
                    }else{
                        dataJson.townName=dataJson.townName;
                    }
                    if(dataJson.villageId==""||dataJson.villageId==null||dataJson.villageId==undefined){
                        dataJson.villageId="";
                    }else{
                        dataJson.villageId=dataJson.villageId;
                    }
                    if(dataJson.longitude==""||dataJson.longitude==null||dataJson.longitude==undefined){
                        dataJson.longitude="";
                    }else{
                        dataJson.longitude=dataJson.longitude;
                    }
                    if(dataJson.latitude==""||dataJson.latitude==null||dataJson.latitude==undefined){
                        dataJson.latitude="";
                    }else{
                        dataJson.latitude=dataJson.latitude;
                    }
                    if(dataJson.remark==""||dataJson.remark==null||dataJson.remark==undefined){
                        dataJson.remark="";
                    }else{
                        dataJson.remark=dataJson.remark;
                    }
                    if(dataJson.areaCode==""||dataJson.areaCode==null||dataJson.areaCode==undefined){
                        dataJson.areaCode="";
                    }else{
                        dataJson.areaCode=dataJson.areaCode;
                    }
                    if(dataJson.areaName==""||dataJson.areaName==null||dataJson.areaName==undefined){
                        dataJson.areaName="";
                    }else{
                        dataJson.areaName=dataJson.areaName;
                    }
                    if(dataJson.origin==""||dataJson.origin==null||dataJson.origin==undefined){
                        dataJson.origin="";
                    }else{
                        dataJson.origin=dataJson.origin;
                    }
                    if(dataJson.fillUnit==""||dataJson.fillUnit==null||dataJson.fillUnit==undefined){
                        dataJson.fillUnit="";
                    }else{
                        dataJson.fillUnit=dataJson.fillUnit;
                    }
                    if(dataJson.fillBy==""||dataJson.fillBy==null||dataJson.fillBy==undefined){
                        dataJson.fillBy="";
                    }else{
                        dataJson.fillBy=dataJson.fillBy;
                    }
                    if(dataJson.fillCreateTime==""||dataJson.fillCreateTime==null||dataJson.fillCreateTime==undefined){
                        dataJson.fillCreateTime="";
                    }else{
                        dataJson.fillCreateTime=new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.checkBy==""||dataJson.checkBy==null||dataJson.checkBy==undefined){
                        dataJson.checkBy="";
                    }else{
                        dataJson.checkBy=dataJson.checkBy;
                    }
                    if(dataJson.checkTime==""||dataJson.checkTime==null||dataJson.checkTime==undefined){
                        dataJson.checkTime="";
                    }else{
                        dataJson.checkTime=new Date(dataJson.checkTime).Format("yyyy-MM-dd");
                    }
                    $("#area-select-edit").text(dataJson.name);
                    $("#year-select-edit").text(dataJson.statisticalYear);
                    $("#populationEdit").val(dataJson.totalPopulation);
                    $("#houseEdit").val(dataJson.totalHouseholds);
                    districtIdEdit=dataJson.districtId;
                    townsIdEdit=dataJson.townId;
                    villageIdEdit=dataJson.villageId;
                    $("#longitudeEdit").val(dataJson.longitude);
                    $("#latitudeEdit").val(dataJson.latitude);
                    $("#areaCodeEdit").val(dataJson.areaCode);
                    $("#areaNameEdit").val(dataJson.areaName);
                    $("#originEdit").val(dataJson.origin);
                    $("#fillUnitEdit").val(dataJson.fillUnit);
                    $("#fillByEdit").val(dataJson.fillBy);
                    $("#fillCreateTimeEdit").val(dataJson.fillCreateTime);
                    $("#checkByEdit").val(dataJson.checkBy);
                    $("#checkTimeEdit").val(dataJson.checkTime);
                    $("#remarkEdit").val(dataJson.remark);
                    if(dataJson.picArray==""||dataJson.picArray==null||dataJson.picArray==undefined){
                        $floodUploadEdit.attr('disabled', false);
                        $floodUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                    }else{
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
                            $floodUploadEdit.attr('disabled', true);
                            $floodUploadEdit.parents('.upload-btn').css('background-color', '#999');
                        }else{
                            $floodUploadEdit.attr('disabled', false);
                            $floodUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                        }
                        $("#edit-pop .imgList-population").show().append(imgList);
                        uploadImgDelEdit();
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
            $("#editSure").click(function () {
                var name=$("#area-select-edit").text();
                var statisticalYear=$("#year-select-edit").text();
                var totalPopulation=$("#populationEdit").val();
                var totalHouseholds=$("#houseEdit").val();
                var longitude=$("#longitudeEdit").val();
                var latitude=$("#latitudeEdit").val();
                var areaCode=$("#areaCodeEdit").val();
                var areaName=$("#areaNameEdit").val();
                var origin=$("#originEdit").val();
                var fillBy=$("#fillByEdit").val();
                //var fillCreateTime=$("#fillCreateTimeEdit").val();
                var fillUnit=$("#fillUnitEdit").val();
                var checkBy=$("#checkByEdit").val();
                //var checkTime=$("#checkTimeEdit").val();
                var remark=$("#remarkEdit").val();
                if($("#edit-pop").find("div.imgList-population").css("display")=="none"){
                    uploadImgLists.splice(0,uploadImgLists.length)
                }else{
                    uploadImgLists=uploadImgLists;
                }
                //uploadImgListSum=uploadImgListOld.concat(uploadImgLists);
                function ajax(){
                    $.ajax({
                        url: srcPath + "admin/population/gathering/area/save",
                        type: "post",
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            token: token
                        },
                        data: JSON.stringify({
                            "id":populationId,
                            "name": name,
                            "statisticalYear": statisticalYear,
                            "totalPopulation": totalPopulation,
                            "totalHouseholds": totalHouseholds,
                            "districtId": districtIdEdit,
                            "townId": townsIdEdit,
                            "villageId":villageIdEdit,
                            "longitude": longitude,
                            "latitude": latitude,
                            "areaCode": areaCode,
                            "areaName": areaName,
                            "origin": origin,
                            "fillBy": fillBy,
                            "fillCreateTime": fillCreateTimeEdit,
                            "fillUnit": fillUnit,
                            "checkBy": checkBy,
                            "checkTime": checkTimeEdit,
                            "picArr": uploadImgLists,
                            "remark": remark
                        }),
                        success: function (data) {
                            if(data.code=="-2"){
                                window.parent.location.href="../login.html";
                            }
                            console.log(data);
                            if(data.code==200){
                                $(".overlay",window.parent.document).hide();
                                $("#edit-pop").hide();
                                $("#edit-pop .imgList-population").hide();
                                $("#edit-pop .imgList-population").html("");
                                $(".population-tips").hide();
                                $("#success").show();
                                setTimeout(function () {
                                    $("#success").hide();
                                },1000);
                                var searchName=$("#searchName").val();
                                districtId="";
                                townsId="";
                                villageId="";
                                statisticalYear="";
                                page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
                            }else if(data.code=="-1"){
                                $("#fail").show();
                                setTimeout(function () {
                                    $("#fail").hide();
                                });
                            }else{

                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                }
                if(name=="" || name=="请选择"){
                    $(".population-tips").show();
                    $(".population-tips").find("span").text("名称不能为空");
                    setTimeout(function () {
                        $(".population-tips").hide();
                    },1000);
                }else if(statisticalYear==""||statisticalYear=="请选择"){
                    $(".population-tips").show();
                    $(".population-tips").find("span").text("统计年度不能为空");
                    setTimeout(function () {
                        $(".population-tips").hide();
                    },1000);
                }else if(totalPopulation!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(totalPopulation))){
                        $(".population-tips").show();
                        $(".population-tips").find("span").text("总人口数必须为数字类型");
                        setTimeout(function () {
                            $(".population-tips").hide();
                        },1000);
                    }else{
                        //ajax();
                        if(totalHouseholds!=""){
                            if(!(/^(-?\d+)(\.\d+)?$/.test(totalHouseholds))){
                                $(".population-tips").show();
                                $(".population-tips").find("span").text("总户数必须为数字类型");
                                setTimeout(function () {
                                    $(".population-tips").hide();
                                },1000);
                            }else{
                                ajax();
                            }
                        }else{
                            ajax();
                        }
                    }
                }else if(totalHouseholds!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(totalHouseholds))){
                        $(".population-tips").show();
                        $(".population-tips").find("span").text("总户数必须为数字类型");
                        setTimeout(function () {
                            $(".population-tips").hide();
                        },1000);
                    }else{
                        //ajax();
                        if(totalPopulation!=""){
                            if(!(/^(-?\d+)(\.\d+)?$/.test(totalPopulation))){
                                $(".population-tips").show();
                                $(".population-tips").find("span").text("总人口数必须为数字类型");
                                setTimeout(function () {
                                    $(".population-tips").hide();
                                },1000);
                            }else{
                                ajax();
                            }
                        }else{
                            ajax();
                        }
                    }
                }else{
                    ajax();
                }
            });
        });
    }
    //详情
    $(".detail-close").click(function () {
        $(this).parent().parent().hide();
    });
    $(".detail-btnIcon").click(function () {
        $(this).parent().parent().hide();
    });
    function tableInfo() {
        $(".table-infoIcon").click(function () {
            var id=$(this).parent().siblings("td").eq(1).text();
            $("#info-pop").show();
            $.ajax({
                url: srcPath + "admin/population/gathering/area/detail",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id":id
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    var dataJson=data.data;
                    if(dataJson.name==""||dataJson.name==null||dataJson.name==undefined){
                        dataJson.name="无";
                    }else{
                        dataJson.name=dataJson.name;
                    }
                    if(dataJson.statisticalYear==""||dataJson.statisticalYear==null||dataJson.statisticalYear==undefined){
                        dataJson.statisticalYear="无";
                    }else{
                        dataJson.statisticalYear=dataJson.statisticalYear;
                    }
                    if(String(dataJson.totalPopulation)==""||dataJson.totalPopulation==null||dataJson.totalPopulation==undefined){
                        dataJson.totalPopulation="无";
                    }else{
                        dataJson.totalPopulation=dataJson.totalPopulation;
                    }
                    if(String(dataJson.totalHouseholds)==""||dataJson.totalHouseholds==null||dataJson.totalHouseholds==undefined){
                        dataJson.totalHouseholds="无";
                    }else{
                        dataJson.totalHouseholds=dataJson.totalHouseholds;
                    }
                    if(dataJson.districtName==""||dataJson.districtName==null||dataJson.districtName==undefined){
                        dataJson.districtName="无";
                    }else{
                        dataJson.districtName=dataJson.districtName;
                    }
                    if(dataJson.townName==""||dataJson.townName==null||dataJson.townName==undefined){
                        dataJson.townName="";
                    }else{
                        dataJson.townName=dataJson.townName;
                    }
                    if(dataJson.longitude==""||dataJson.longitude==null||dataJson.longitude==undefined){
                        dataJson.longitude="无";
                    }else{
                        dataJson.longitude=dataJson.longitude;
                    }
                    if(dataJson.latitude==""||dataJson.latitude==null||dataJson.latitude==undefined){
                        dataJson.latitude="无";
                    }else{
                        dataJson.latitude=dataJson.latitude;
                    }
                    if(dataJson.remark==""||dataJson.remark==null||dataJson.remark==undefined){
                        dataJson.remark="无";
                    }else{
                        dataJson.remark=dataJson.remark;
                    }
                    if(dataJson.areaCode==""||dataJson.areaCode==null||dataJson.areaCode==undefined){
                        dataJson.areaCode="无";
                    }else{
                        dataJson.areaCode=dataJson.areaCode;
                    }
                    if(dataJson.areaName==""||dataJson.areaName==null||dataJson.areaName==undefined){
                        dataJson.areaName="无";
                    }else{
                        dataJson.areaName=dataJson.areaName;
                    }
                    if(dataJson.origin==""||dataJson.origin==null||dataJson.origin==undefined){
                        dataJson.origin="无";
                    }else{
                        dataJson.origin=dataJson.origin;
                    }
                    if(dataJson.fillUnit==""||dataJson.fillUnit==null||dataJson.fillUnit==undefined){
                        dataJson.fillUnit="无";
                    }else{
                        dataJson.fillUnit=dataJson.fillUnit;
                    }
                    if(dataJson.fillBy==""||dataJson.fillBy==null||dataJson.fillBy==undefined){
                        dataJson.fillBy="无";
                    }else{
                        dataJson.fillBy=dataJson.fillBy;
                    }
                    if(dataJson.fillCreateTime==""||dataJson.fillCreateTime==null||dataJson.fillCreateTime==undefined){
                        dataJson.fillCreateTime="无";
                    }else{
                        dataJson.fillCreateTime=new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.checkBy==""||dataJson.checkBy==null||dataJson.checkBy==undefined){
                        dataJson.checkBy="无";
                    }else{
                        dataJson.checkBy=dataJson.checkBy;
                    }
                    if(dataJson.checkTime==""||dataJson.checkTime==null||dataJson.checkTime==undefined){
                        dataJson.checkTime="无";
                    }else{
                        dataJson.checkTime=new Date(dataJson.checkTime).Format("yyyy-MM-dd");
                    }
                    $("#nameInfo").text(dataJson.name);
                    $("#addressInfo").text(dataJson.districtName+dataJson.townName);
                    $("#yearInfo").text(dataJson.statisticalYear);
                    $("#populationInfo").text(dataJson.totalPopulation);
                    $("#houseInfo").text(dataJson.totalHouseholds);
                    $("#longitudeInfo").text(dataJson.longitude);
                    $("#latitudeInfo").text(dataJson.latitude);
                    $("#areaCodeInfo").text(dataJson.areaCode);
                    $("#areaNameInfo").text(dataJson.areaName);
                    $("#originInfo").text(dataJson.origin);
                    $("#fillUnitInfo").text(dataJson.fillUnit);
                    $("#fillByInfo").text(dataJson.fillBy);
                    $("#fillCreateTimeInfo").text(dataJson.fillCreateTime);
                    $("#checkByInfo").text(dataJson.checkBy);
                    $("#checkTimeInfo").text(dataJson.checkTime);
                    $("#remarkInfo").text(dataJson.remark);
                    var imgList="";
                    if(dataJson.picArray==""||dataJson.picArray==null||dataJson.picArray==undefined){
                        imgList="";
                    }else{
                        var imgListItem="";
                        for(var i=0;i<dataJson.picArray.length;i++){
                            imgListItem=imgListItem+"<div class=\"detail-img-item\">\n" +
                                "                                    <img src=\""+dataJson.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"detail-img-show\">\n" +
                            "                                <img src=\""+dataJson.picArray[0].suffixUrl+"\"/>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"detail-img-list\">\n" + imgListItem +
                            "                            </div>";
                    }
                    $(".detail-img-box").html(imgList);
                    //图片切换
                    $(".detail-img-item img").click(function () {
                        var src=$(this).attr("src");
                        $(".detail-img-show img").attr("src",src);
                    });
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    }
    //批量删除
    $("#population-delAll").click(function () {
        $("#delAll-pop").show();
        if(populationIds==""){
            $("#delAll-pop").find("div.del-content").html("至少选择一项才可以进行批量操作！");
            $("#delAllSure").hide();
        }else{
            $("#delAll-pop").find("div.del-content").html("确定对所选的内容进行删除吗？");
            $("#delAllSure").show();
        }
    });
    $(".del-btnIcon").click(function () {
        $(this).parent().parent().hide();
        $("#population-delAll").removeClass("table-menuClick");
        $("#population-export").removeClass("table-menuClick");
    });
    $(".delAll-close").click(function () {
        $(this).parent().parent().hide();
        $("#population-delAll").removeClass("table-menuClick");
        $("#population-export").removeClass("table-menuClick");
    });
    $("#delAllSure").click(function () {
        $.ajax({
            url: srcPath + "admin/population/gathering/area/delete",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "ids":populationIds
            }),
            success: function (data) {
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                console.log(data);
                if(data.code==200){
                    $("#delAll-pop").hide();
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    },1000);
                    var searchName=$("#searchName").val();
                    page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
                }else if(data.code=="-1"){
                    $("#fail").show();
                    setTimeout(function () {
                        $("#fail").hide();
                    });
                }else{

                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
    //删除
    function tableDel(){
        var ids=[];
        $(".table-delIcon").click(function () {
            var id=$(this).parent().siblings("td").eq(1).text();
            ids.push(id);
            $("#del-pop").show();
            $("#delSure").click(function () {
                $.ajax({
                    url: srcPath + "admin/population/gathering/area/delete",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "ids":ids
                    }),
                    success: function (data) {
                        if(data.code=="-2"){
                            window.parent.location.href="../login.html";
                        }
                        console.log(data);
                        if(data.code==200){
                            $("#del-pop").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            var searchName=$("#searchName").val();
                            page(1,10,searchName,districtId,townsId,villageId,statisticalYear);
                        }else if(data.code=="-1"){
                            $("#fail").show();
                            setTimeout(function () {
                                $("#fail").hide();
                            });
                        }else{

                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){

                    }
                });
            });
        });
    }
    //表格行双击获取详细信息
    function infoDoubleClick(){
        $(".population-table").find("tbody tr").dblclick(function(){
            var id=$(this).find("td").eq(1).text();
            $("#info-pop").show();
            $.ajax({
                url: srcPath + "admin/population/gathering/area/detail",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id":id
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    var dataJson=data.data;
                    if(dataJson.name==""||dataJson.name==null||dataJson.name==undefined){
                        dataJson.name="无";
                    }else{
                        dataJson.name=dataJson.name;
                    }
                    if(dataJson.statisticalYear==""||dataJson.statisticalYear==null||dataJson.statisticalYear==undefined){
                        dataJson.statisticalYear="无";
                    }else{
                        dataJson.statisticalYear=dataJson.statisticalYear;
                    }
                    if(String(dataJson.totalPopulation)==""||dataJson.totalPopulation==null||dataJson.totalPopulation==undefined){
                        dataJson.totalPopulation="无";
                    }else{
                        dataJson.totalPopulation=dataJson.totalPopulation;
                    }
                    if(String(dataJson.totalHouseholds)==""||dataJson.totalHouseholds==null||dataJson.totalHouseholds==undefined){
                        dataJson.totalHouseholds="无";
                    }else{
                        dataJson.totalHouseholds=dataJson.totalHouseholds;
                    }
                    if(dataJson.districtName==""||dataJson.districtName==null||dataJson.districtName==undefined){
                        dataJson.districtName="无";
                    }else{
                        dataJson.districtName=dataJson.districtName;
                    }
                    if(dataJson.townName==""||dataJson.townName==null||dataJson.townName==undefined){
                        dataJson.townName="";
                    }else{
                        dataJson.townName=dataJson.townName;
                    }
                    if(dataJson.longitude==""||dataJson.longitude==null||dataJson.longitude==undefined){
                        dataJson.longitude="无";
                    }else{
                        dataJson.longitude=dataJson.longitude;
                    }
                    if(dataJson.latitude==""||dataJson.latitude==null||dataJson.latitude==undefined){
                        dataJson.latitude="无";
                    }else{
                        dataJson.latitude=dataJson.latitude;
                    }
                    if(dataJson.remark==""||dataJson.remark==null||dataJson.remark==undefined){
                        dataJson.remark="无";
                    }else{
                        dataJson.remark=dataJson.remark;
                    }
                    if(dataJson.areaCode==""||dataJson.areaCode==null||dataJson.areaCode==undefined){
                        dataJson.areaCode="无";
                    }else{
                        dataJson.areaCode=dataJson.areaCode;
                    }
                    if(dataJson.areaName==""||dataJson.areaName==null||dataJson.areaName==undefined){
                        dataJson.areaName="无";
                    }else{
                        dataJson.areaName=dataJson.areaName;
                    }
                    if(dataJson.origin==""||dataJson.origin==null||dataJson.origin==undefined){
                        dataJson.origin="无";
                    }else{
                        dataJson.origin=dataJson.origin;
                    }
                    if(dataJson.fillUnit==""||dataJson.fillUnit==null||dataJson.fillUnit==undefined){
                        dataJson.fillUnit="无";
                    }else{
                        dataJson.fillUnit=dataJson.fillUnit;
                    }
                    if(dataJson.fillBy==""||dataJson.fillBy==null||dataJson.fillBy==undefined){
                        dataJson.fillBy="无";
                    }else{
                        dataJson.fillBy=dataJson.fillBy;
                    }
                    if(dataJson.fillCreateTime==""||dataJson.fillCreateTime==null||dataJson.fillCreateTime==undefined){
                        dataJson.fillCreateTime="无";
                    }else{
                        dataJson.fillCreateTime=new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.checkBy==""||dataJson.checkBy==null||dataJson.checkBy==undefined){
                        dataJson.checkBy="无";
                    }else{
                        dataJson.checkBy=dataJson.checkBy;
                    }
                    if(dataJson.checkTime==""||dataJson.checkTime==null||dataJson.checkTime==undefined){
                        dataJson.checkTime="无";
                    }else{
                        dataJson.checkTime=new Date(dataJson.checkTime).Format("yyyy-MM-dd");
                    }
                    $("#nameInfo").text(dataJson.name);
                    $("#addressInfo").text(dataJson.districtName+dataJson.townName);
                    $("#yearInfo").text(dataJson.statisticalYear);
                    $("#populationInfo").text(dataJson.totalPopulation);
                    $("#houseInfo").text(dataJson.totalHouseholds);
                    $("#longitudeInfo").text(dataJson.longitude);
                    $("#latitudeInfo").text(dataJson.latitude);
                    $("#areaCodeInfo").text(dataJson.areaCode);
                    $("#areaNameInfo").text(dataJson.areaName);
                    $("#originInfo").text(dataJson.origin);
                    $("#fillUnitInfo").text(dataJson.fillUnit);
                    $("#fillByInfo").text(dataJson.fillBy);
                    $("#fillCreateTimeInfo").text(dataJson.fillCreateTime);
                    $("#checkByInfo").text(dataJson.checkBy);
                    $("#checkTimeInfo").text(dataJson.checkTime);
                    $("#remarkInfo").text(dataJson.remark);
                    var imgList="";
                    if(dataJson.picArray==""||dataJson.picArray==null||dataJson.picArray==undefined){
                        imgList="";
                    }else{
                        var imgListItem="";
                        for(var i=0;i<dataJson.picArray.length;i++){
                            imgListItem=imgListItem+"<div class=\"detail-img-item\">\n" +
                                "                                    <img src=\""+dataJson.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"detail-img-show\">\n" +
                            "                                <img src=\""+dataJson.picArray[0].suffixUrl+"\"/>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"detail-img-list\">\n" + imgListItem +
                            "                            </div>";
                    }
                    $(".detail-img-box").html(imgList);
                    //图片切换
                    $(".detail-img-item img").click(function () {
                        var src=$(this).attr("src");
                        $(".detail-img-show img").attr("src",src);
                    });
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    }
    //导出
    $("#population-export").click(function () {
        var name=$("#searchName").val();
        $("#export-pop").show();
        $("#exportSure").click(function () {
            $("#loading").show();
            $(".overlayOpacity",window.parent.document).show();
            var url=srcPath + "admin/population/gathering/area/export?name="+name;
            $.ajax({
                url: srcPath + "admin/population/gathering/area/export?name="+name,
                type: "get",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    $("#loading").hide();
                    $(".overlayOpacity",window.parent.document).hide();
                    $("#export-pop").hide();
                    if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function () {
                            $("#fail").hide();
                        },1000);
                    }else{
                        window.location.href=url;
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    });
});