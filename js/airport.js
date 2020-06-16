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
        $(".table-content").css("width",width*1.1);
        $(".table").css("width",width*1.1);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
    });
    $(".nav-close",window.parent.document).click(function () {
        $(".table-content").css("width",width*0.95);
        $(".table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
    });
    if($(".left",window.parent.document).hasClass("small-menu")){
        $(".table-content").css("width",width*0.98);
        $(".table").css("width",width*0.98);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
    }else{
        $(".table-content").css("width",width*0.95);
        $(".table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
    }
    //表格操作
    $(".table-menuItem").click(function () {
        $(this).toggleClass("table-menuClick");
    });
    //获取列表
    var tableLength;
    function page(current,size,searchName) {
        $("#loading").show();
        $(".overlayOpacity",window.parent.document).show();
        $.ajax({
            url:srcPath+"admin/airport/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "current":page,
                "size":size,
                "name":searchName
            }),
            success:function(data){
                $("#loading").hide();
                $(".overlayOpacity",window.parent.document).hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
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
                        "                <th>名称</th>\n" +
                        "                <th>面积（公顷）</th>\n" +
                        "                <th>日航班流量（架次）</th>\n" +
                        "                <th>总投资（万元）</th>\n" +
                        "                <th>建成时间</th>\n" +
                        "                <th>高程（米）</th>\n" +
                        "                <th>地理位置</th>\n" +
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
                        if (dataJson[i].area == "" || dataJson[i].area == null || dataJson[i].area == undefined) {
                            dataJson[i].area = "无";
                        } else {
                            dataJson[i].area = dataJson[i].area;
                        }
                        if (dataJson[i].dailyFlightFlow == "" || dataJson[i].dailyFlightFlow == null || dataJson[i].dailyFlightFlow == undefined) {
                            dataJson[i].dailyFlightFlow = "无";
                        } else {
                            dataJson[i].dailyFlightFlow = dataJson[i].dailyFlightFlow;
                        }
                        if (dataJson[i].totalInvestment == "" || dataJson[i].totalInvestment == null || dataJson[i].totalInvestment == undefined) {
                            dataJson[i].totalInvestment = "无";
                        } else {
                            dataJson[i].totalInvestment = dataJson[i].totalInvestment;
                        }
                        if (dataJson[i].airportCreateTime == "" || dataJson[i].airportCreateTime == null || dataJson[i].airportCreateTime == undefined) {
                            dataJson[i].airportCreateTime = "无";
                        } else {
                            dataJson[i].airportCreateTime = new Date(dataJson[i].airportCreateTime).Format('yyyy-MM-dd');
                        }
                        if (dataJson[i].altitude == "" || dataJson[i].altitude == null || dataJson[i].altitude == undefined) {
                            dataJson[i].altitude = "无";
                        } else {
                            dataJson[i].altitude = dataJson[i].altitude;
                        }
                        if (dataJson[i].address == "" || dataJson[i].address == null || dataJson[i].address == undefined) {
                            dataJson[i].address = "无";
                        } else {
                            dataJson[i].address = dataJson[i].address;
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
                            "                <td>\n" +
                            "                    <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                            "                    <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                            "                </td>\n" +
                            "                <td style='display: none;'>" + dataJson[i].id + "</td>\n" +
                            "                <td>" + dataJson[i].name + "</td>\n" +
                            "                <td>" + dataJson[i].area + "</td>\n" +
                            "                <td>" + dataJson[i].dailyFlightFlow + "</td>\n" +
                            "                <td>" + dataJson[i].totalInvestment + "</td>\n" +
                            "                <td>" + dataJson[i].airportCreateTime + "</td>\n" +
                            "                <td>" + dataJson[i].altitude + "</td>\n" +
                            "                <td>" + dataJson[i].address + "</td>\n" +
                            "                <td>" + dataJson[i].longitude + "</td>\n" +
                            "                <td>" + dataJson[i].latitude + "</td>\n" +
                            "                <td>\n" +
                            "                       <span class=\"table-infoIcon\"><i class=\"iconfont\">&#xeb46;</i><span class=\"table-txt\">详情</span></span>" +
                            "                       <span class=\"table-editIcon\"><i class=\"iconfont\">&#xeabe;</i><span class=\"table-txt\">编辑</span></span>" +
                            "                       <span class=\"table-delIcon\"><i class=\"iconfont\">&#xeafb;</i><span class=\"table-txt\">删除</span></span>" +
                            "                </td>\n" +
                            "            </tr>";
                    }
                    tableHTML = tableHTML + "</tbody>";
                    $(".table").html(tableHTML);
                    tableCheck();
                    tableFilter();
                    tableInfo();
                    tableEdit();
                    tableDel();
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
    page(1,10,searchName);
    //首页
    $("#firstPage").click(function () {
        var searchName=$("#searchName").val();
        page(1,10,searchName);
        $("#pageValue").val("");
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
            page(pageNow,10,searchName);
        }
        $("#pageValue").val("");
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
            page(pageNow,10,searchName);
        }
        $("#pageValue").val("");
    });
    //尾页
    $("#endPage").click(function () {
        var searchName=$("#searchName").val();
        var totalPage=$("#totalPage").text();
        page(totalPage,10,searchName);
        $("#pageValue").val("");
    });
    //跳转
    $("#pageTo").click(function () {
        var searchName=$("#searchName").val();
        var pageNum=$("#pageValue").val();
        if(pageNum==""){

        }else {
            page(pageNum,10,searchName);
        }
    });
    $("#pageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            var searchName = $("#searchName").val();
            var pageNum = $("#pageValue").val();
            page(pageNum, 10, searchName);
        }
    });
    //搜索功能
    $("#searchName").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var txt=$("#searchName").val();
            page(1,10,txt);
        }
    });
    $(".search-icon").click(function () {
        var txt=$("#searchName").val();
        page(1,10,txt);
    });
    //表格选中与否
    var airportIds=[];
    function tableCheck(){
        $(".table").find("thead tr th:eq(0)").click(function () {
            $(this).toggleClass("check-click");
            if($(this).hasClass("check-click")){
                $(".table").find("tbody tr td").addClass("check-click");
                for(var i=0;i<tableLength.length;i++){
                    airportIds.push(tableLength[i].id);
                }
            }else {
                $(".table").find("tbody tr td").removeClass("check-click");
                airportIds.splice(0,airportIds.length);
            }
        });
        $(".table").find("tbody tr").each(function(){
            var td=$(this).find("td").eq(0);
            td.click(function(){
                $(this).toggleClass("check-click");
                if ($(this).hasClass("check-click")){
                    var airportId=$(this).siblings("td").eq(0).text();
                    airportIds.push(airportId);
                } else {
                    $(".table").find("thead tr th").removeClass("check-click");
                    var txt=$(this).siblings("td").eq(0).text();
                    if(airportIds.indexOf(txt) == "-1"){

                    }else{
                        airportIds.splice(airportIds.indexOf(txt),1);
                    }
                }
            });
        });
        /*$(".table").find("tbody tr td").click(function () {
            $(this).toggleClass("check-click");
            if ($(this).hasClass("check-click")){
                var airportId=$(this).siblings("td").eq(0).text();
                airportIds.push(airportId);
            } else {
                $(".table").find("thead tr th").removeClass("check-click");
                var txt=$(this).siblings("td").eq(0).text();
                if(airportIds.indexOf(txt) == "-1"){

                }else{
                    airportIds.splice(airportIds.indexOf(txt),1);
                }
            }
        });*/
    }
    //筛选
    function tableFilter() {
        var tableList=[];
        $("#airport-table").find("thead tr th").each(function () {
            var txt = $(this).text();
            tableList.push(txt);
        });
        tableList.splice(0,2);
        tableList.splice(tableList.length-3,tableList.length);
        $("#airport-select").click(function () {
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
                    var tab=$("#airport-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="none";
                    }
                }else {
                    var index=tableList.indexOf(txt);
                    var tab=$("#airport-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="";
                    }
                }
            });
        });
    }
    //新建
    $("#airport-add").click(function () {
        $(".overlay",window.parent.document).show();
        $("#add-pop").show();
        uploadImgList.splice(0,uploadImgList.length);
        $floodUpload.attr('disabled', false);
        $floodUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
    });
    $(".add-close").click(function () {
        $(this).parent().parent().parent().hide();
        $("#airport-add").removeClass("table-menuClick");
        $(".overlay",window.parent.document).hide();
        $(".add-input").val("");
        $("#edit-pop .imgList-airport").hide();
        $("#edit-pop .imgList-airport").html("");
        $("#add-pop .imgList-airport").hide();
        $("#add-pop .imgList-airport").html("");
        $(".airport-tips").hide();
    });
    $("#addClose").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#airport-add").removeClass("table-menuClick");
        $(".add-input").val("");
        $("#add-pop .imgList-airport").hide();
        $("#add-pop .imgList-airport").html("");
        $(".airport-tips").hide();
    });
    var $floodUpload =  $("#upload");
    $floodUpload.change(function () {
        if($(this).val() != ""){
            upload(this);
        }
    });
    function upload(ele){
        var files = $(ele)[0].files;
        if (uploadImgList.length + files.length > 6) {
            $(".airport-tips").show();
            $(".airport-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".airport-tips").hide();
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
            $(".airport-tips").show();
            $(".airport-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".airport-tips").hide();
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
                    console.log(dataJson);
                    $("#add-pop .imgList-airport").show();
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
                    $("#add-pop .imgList-airport").append(imgList);
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
    var airportCreateTimeAdd,fillCreateTimeAdd,checkTimeAdd;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#createTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#createTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#createTime").val(value);
                airportCreateTimeAdd=Date.parse(value);
            }
        });
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
        var name=$("#name").val();
        var area=$("#area").val();
        var dailyFlightFlow=$("#flow").val();
        var totalInvestment=$("#total").val();
        //var airportCreateTime=$("#createTime").val();
        //var createTime=new Date(airportCreateTime).getTime();
        var altitude=$("#altitude").val();
        var address=$("#address").val();
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
        if($("#add-pop").find("div.imgList-airport").css("display")==="none"){
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
        function ajax() {
            $.ajax({
                url: srcPath + "admin/airport/save",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "name": name,
                    "area": area,
                    "dailyFlightFlow":dailyFlightFlow,
                    "totalInvestment":totalInvestment,
                    "airportCreateTime":airportCreateTimeAdd,
                    "altitude":altitude,
                    "address": address,
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
                    console.log(data);
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    if(data.code==200){
                        $(".overlay",window.parent.document).hide();
                        $("#add-pop").hide();
                        $("#airport-add").removeClass("table-menuClick");
                        $(".add-input").val("");
                        $("#add-pop .imgList-airport").hide();
                        $("#add-pop .imgList-airport").html("");
                        $(".airport-tips").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        var searchName=$("#searchName").val();
                        page(1,10,searchName);
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
        if(name==""){
            $(".airport-tips").show();
            $(".airport-tips").find("span").text("名称不能为空");
            setTimeout(function () {
                $(".airport-tips").hide();
            },1000);
        }else if(totalInvestment!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(totalInvestment))){
                $(".airport-tips").show();
                $(".airport-tips").find("span").text("总投资必须为数字类型");
                setTimeout(function () {
                    $(".airport-tips").hide();
                },1000);
            }else{
                ajax();
            }
        }else{
            ajax();
        }
    });
    //批量删除
    $("#airport-delAll").click(function () {
        $("#delAll-pop").show();
        if(airportIds==""){
            $("#delAll-pop").find("div.del-content").html("至少选择一项才可以进行批量操作！");
            $("#delAllSure").hide();
        }else{
            $("#delAll-pop").find("div.del-content").html("确定对所选的内容进行删除吗？");
            $("#delAllSure").show();
        }
    });
    $(".del-btnIcon").click(function () {
        $(this).parent().parent().hide();
        $("#airport-delAll").removeClass("table-menuClick");
        $("#airport-export").removeClass("table-menuClick");
    });
    $(".delAll-close").click(function () {
        $(this).parent().parent().hide();
        $("#airport-delAll").removeClass("table-menuClick");
        $("#airport-export").removeClass("table-menuClick");
    });
    $("#delAllSure").click(function () {
        $.ajax({
            url: srcPath + "admin/airport/delete",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "ids":airportIds
            }),
            success: function (data) {
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                if(data.code==200){
                    $("#delAll-pop").hide();
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    },1000);
                    var searchName=$("#searchName").val();
                    page(1,10,searchName);
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
                url: srcPath + "admin/airport/detail",
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
                    if(dataJson.area==""||dataJson.area==null||dataJson.area==undefined){
                        dataJson.area="无";
                    }else{
                        dataJson.area=dataJson.area;
                    }
                    if(dataJson.dailyFlightFlow==""||dataJson.dailyFlightFlow==null||dataJson.dailyFlightFlow==undefined){
                        dataJson.dailyFlightFlow="无";
                    }else{
                        dataJson.dailyFlightFlow=dataJson.dailyFlightFlow;
                    }
                    if(dataJson.totalInvestment==""||dataJson.totalInvestment==null||dataJson.totalInvestment==undefined){
                        dataJson.totalInvestment="无";
                    }else{
                        dataJson.totalInvestment=dataJson.totalInvestment;
                    }
                    if(dataJson.airportCreateTime==""||dataJson.airportCreateTime==null||dataJson.airportCreateTime==undefined){
                        dataJson.airportCreateTime="无";
                    }else{
                        dataJson.airportCreateTime=new Date(dataJson.airportCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.altitude==""||dataJson.altitude==null||dataJson.altitude==undefined){
                        dataJson.altitude="无";
                    }else{
                        dataJson.altitude=dataJson.altitude;
                    }
                    if(dataJson.address==""||dataJson.address==null||dataJson.address==undefined){
                        dataJson.address="无";
                    }else{
                        dataJson.address=dataJson.address;
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
                    $("#areaInfo").text(dataJson.area);
                    $("#flowInfo").text(dataJson.dailyFlightFlow);
                    $("#totalInfo").text(dataJson.totalInvestment);
                    $("#airportCreateTime").text(dataJson.airportCreateTime);
                    $("#altitudeInfo").text(dataJson.altitude);
                    $("#addressInfo").text(dataJson.address);
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
                                "                                    <img src=\""+data.data.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"detail-img-show\">\n" +
                            "                                <img src=\""+data.data.picArray[0].suffixUrl+"\"/>\n" +
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
    //修改
    var $floodUploadEdit =  $("#uploadEdit");
    $floodUploadEdit.change(function () {
        if($(this).val() != ""){
            uploadEdit(this);
        }
    });
    function uploadEdit(ele){
        var files = $(ele)[0].files;
        if (uploadImgLists.length + files.length > 6) {
            $(".airport-tips").show();
            $(".airport-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".airport-tips").hide();
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
            $(".airport-tips").show();
            $(".airport-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".airport-tips").hide();
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
                    $("#edit-pop .imgList-airport").show();
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
                    if (uploadImgLists.length >= 6) {
                        $floodUploadEdit.attr('disabled', true);
                        $floodUploadEdit.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#edit-pop .imgList-airport").append(imgList);
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
        $("edit-pop .imgList-airport").hide();
        $("edit-pop .imgList-airport").html("");
        $(".airport-tips").hide();
    });
    var airportCreateTimeEdit,fillCreateTimeEdit,checkTimeEdit;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#createTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#createTimeEditEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#createTimeEdit").val(value);
                airportCreateTimeEdit=Date.parse(value);
            }
        });
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
    var airportId;
    function tableEdit() {
        $(".table-editIcon").click(function () {
            uploadImgLists.splice(0,uploadImgLists.length);
            uploadImgListOld.splice(0,uploadImgListOld.length);
            airportId=$(this).parent().siblings("td").eq(1).text();
            $("#edit-pop").show();
            $(".overlay",window.parent.document).show();
            $.ajax({
                url: srcPath + "admin/airport/detail",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id":airportId
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
                    if(dataJson.area==""||dataJson.area==null||dataJson.area==undefined){
                        dataJson.area="";
                    }else{
                        dataJson.area=dataJson.area;
                    }
                    if(dataJson.dailyFlightFlow==""||dataJson.dailyFlightFlow==null||dataJson.dailyFlightFlow==undefined){
                        dataJson.dailyFlightFlow="";
                    }else{
                        dataJson.dailyFlightFlow=dataJson.dailyFlightFlow;
                    }
                    if(dataJson.totalInvestment==""||dataJson.totalInvestment==null||dataJson.totalInvestment==undefined){
                        dataJson.totalInvestment="";
                    }else{
                        dataJson.totalInvestment=dataJson.totalInvestment;
                    }
                    if(dataJson.airportCreateTime==""||dataJson.airportCreateTime==null||dataJson.airportCreateTime==undefined){
                        dataJson.airportCreateTime="";
                    }else{
                        dataJson.airportCreateTime=new Date(dataJson.airportCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.altitude==""||dataJson.altitude==null||dataJson.altitude==undefined){
                        dataJson.altitude="";
                    }else{
                        dataJson.altitude=dataJson.altitude;
                    }
                    if(dataJson.address==""||dataJson.address==null||dataJson.address==undefined){
                        dataJson.address="";
                    }else{
                        dataJson.address=dataJson.address;
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
                    $("#nameEdit").val(dataJson.name);
                    $("#areaEdit").val(dataJson.area);
                    $("#flowEdit").val(dataJson.dailyFlightFlow);
                    $("#totalEdit").val(dataJson.totalInvestment);
                    $("#createTimeEdit").val(dataJson.airportCreateTime);
                    $("#altitudeEdit").val(dataJson.altitude);
                    $("#addressEdit").val(dataJson.address);
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
                        $("#edit-pop .imgList-airport").show().append(imgList);
                        uploadImgDelEdit();
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
            $("#editSure").click(function () {
                var name=$("#nameEdit").val();
                var area=$("#areaEdit").val();
                var dailyFlightFlow=$("#flowEdit").val();
                var totalInvestment=$("#totalEdit").val();
                //var airportCreateTime=$("#createTimeEdit").val();
                //var createTime=new Date(airportCreateTime).getTime();
                var altitude=$("#altitudeEdit").val();
                var address=$("#addressEdit").val();
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
                if($("#edit-pop").find("div.imgList-airport").css("display")==="none"){
                    uploadImgLists.splice(0,uploadImgLists.length);
                }else{
                    uploadImgLists=uploadImgLists;
                }
                function ajax() {
                    $.ajax({
                        url: srcPath + "admin/airport/save",
                        type: "post",
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            token: token
                        },
                        data: JSON.stringify({
                            "id": airportId,
                            "name": name,
                            "area": area,
                            "dailyFlightFlow":dailyFlightFlow,
                            "totalInvestment":totalInvestment,
                            "airportCreateTime":airportCreateTimeEdit,
                            "altitude":altitude,
                            "address": address,
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
                            if (data.code == 200) {
                                $(".overlay", window.parent.document).hide();
                                $("#edit-pop").hide();
                                $("#edit-pop .imgList-airport").hide();
                                $("#edit-pop .imgList-airport").html("");
                                $(".airport-tips").hide();
                                $("#success").show();
                                setTimeout(function () {
                                    $("#success").hide();
                                }, 1000);
                                var searchName = $("#searchName").val();
                                page(1, 10, searchName);
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
                if(name==""){
                    $(".airport-tips").show();
                    $(".airport-tips").find("span").text("名称不能为空");
                    setTimeout(function () {
                        $(".airport-tips").hide();
                    },1000);
                }else if(totalInvestment!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(totalInvestment))){
                        $(".airport-tips").show();
                        $(".airport-tips").find("span").text("总投资必须为数字类型");
                        setTimeout(function () {
                            $(".airport-tips").hide();
                        },1000);
                    }else{
                        ajax();
                    }
                }else{
                    ajax();
                }
            });
        });
    }
    //删除
    function tableDel(){
        var ids=[];
        $(".table-delIcon").click(function () {
            var id=$(this).parent().siblings("td").eq(1).text();
            ids.push(id);
            $("#del-pop").show();
            $("#delSure").click(function () {
                $.ajax({
                    url: srcPath + "admin/airport/delete",
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
                        if(data.code==200){
                            $("#del-pop").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            var searchName=$("#searchName").val();
                            page(1,10,searchName);
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
        $(".table").find("tbody tr").dblclick(function(){
            var id=$(this).find("td").eq(1).text();
            $("#info-pop").show();
            $.ajax({
                url: srcPath + "admin/airport/detail",
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
                    if(dataJson.area==""||dataJson.area==null||dataJson.area==undefined){
                        dataJson.area="无";
                    }else{
                        dataJson.area=dataJson.area;
                    }
                    if(dataJson.dailyFlightFlow==""||dataJson.dailyFlightFlow==null||dataJson.dailyFlightFlow==undefined){
                        dataJson.dailyFlightFlow="无";
                    }else{
                        dataJson.dailyFlightFlow=dataJson.dailyFlightFlow;
                    }
                    if(dataJson.totalInvestment==""||dataJson.totalInvestment==null||dataJson.totalInvestment==undefined){
                        dataJson.totalInvestment="无";
                    }else{
                        dataJson.totalInvestment=dataJson.totalInvestment;
                    }
                    if(dataJson.airportCreateTime==""||dataJson.airportCreateTime==null||dataJson.airportCreateTime==undefined){
                        dataJson.airportCreateTime="无";
                    }else{
                        dataJson.airportCreateTime=new Date(dataJson.airportCreateTime).Format("yyyy-MM-dd");
                    }
                    if(dataJson.altitude==""||dataJson.altitude==null||dataJson.altitude==undefined){
                        dataJson.altitude="无";
                    }else{
                        dataJson.altitude=dataJson.altitude;
                    }
                    if(dataJson.address==""||dataJson.address==null||dataJson.address==undefined){
                        dataJson.address="无";
                    }else{
                        dataJson.address=dataJson.address;
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
                    $("#areaInfo").text(dataJson.area);
                    $("#flowInfo").text(dataJson.dailyFlightFlow);
                    $("#totalInfo").text(dataJson.totalInvestment);
                    $("#airportCreateTime").text(dataJson.airportCreateTime);
                    $("#altitudeInfo").text(dataJson.altitude);
                    $("#addressInfo").text(dataJson.address);
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
                                "                                    <img src=\""+data.data.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"detail-img-show\">\n" +
                            "                                <img src=\""+data.data.picArray[0].suffixUrl+"\"/>\n" +
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
    $("#airport-export").click(function () {
        var name=$("#searchName").val();
        $("#export-pop").show();
        $("#exportSure").click(function () {
            $("#loading").show();
            $(".overlayOpacity",window.parent.document).show();
            var url=srcPath + "admin/airport/export?name="+name;
            $.ajax({
                url: srcPath + "admin/airport/export?name="+name,
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