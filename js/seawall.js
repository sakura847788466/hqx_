function resize() {
    var height=window.parent.document.body.clientHeight;
    //$(".delAll-pop").css({left:220,top:(height-240)/2});
    $(".add-tip-txt").css({left:280,top:(height-62)/2});
    $(".totalPop").css({left:300,top:15});
    $(".loadingBox").css({left:-255,top:(height-48)/2});
    $(".item-content").css("height",height*0.80);
    window.onresize=function () {
        //$(".delAll-pop").css({left:220,top:(height-240)/2});
        $(".add-tip-txt").css({left:280,top:(height-62)/2});
        $(".totalPop").css({left:300,top:15});
        $(".loadingBox").css({left:-255,top:(height-48)/2});
        $(".item-content").css("height",height*0.80);
    }
}
//分段新建、更新图片数组
var seawallNumberImgList=[];
var seawallNumberImgListEdit=[];
var seawallNumberImgLists=[];
var imgListOld=[];
//测量点新建、更新图片数组
var seawallPointImgList=[];
var seawallPointImgListEdit=[];
var seawallPointImgLists=[];
var imgPointListOld=[];
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
        $(".item-content").css("width",width*1.1);
        $(".table").css("width",width*1.1);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
        $(".seawall-showBox").css({left:(width-570)/2-88,top:(height-280)/2});
        /*$(".seawall-yes-detail").css("width",1255);
        $(".seawall-content").css("width",1225);*/
        $(".seawall-yes-detail").css("width",width*0.92);
        $(".seawall-content").css("width",width*0.9);
    });
    $(".nav-close",window.parent.document).click(function () {
        $(".table-content").css("width",width*0.95);
        $(".item-content").css("width",width*0.95);
        $(".table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
        $(".seawall-showBox").css({left:(width-570)/2-270,top:(height-280)/2});
        /*$(".seawall-yes-detail").css("width",1055);
        $(".seawall-content").css("width",1025);*/
        $(".seawall-yes-detail").css("width",width*0.77);
        $(".seawall-content").css("width",width*0.75);
    });
    if($(".left",window.parent.document).hasClass("small-menu")){
        $(".table-content").css("width",width*0.98);
        $(".item-content").css("width",width*0.98);
        $(".table").css("width",width*0.98);
        $(".detail-pop").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-88,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-88,top:(height-240)/2});
        $(".seawall-showBox").css({left:(width-570)/2-88,top:(height-280)/2});
        /*$(".seawall-yes-detail").css("width",1255);
        $(".seawall-content").css("width",1225);*/
        $(".seawall-yes-detail").css("width",width*0.92);
        $(".seawall-content").css("width",width*0.9);
    }else{
        $(".table-content").css("width",width*0.95);
        $(".item-content").css("width",width*0.95);
        $(".table").css("width",width*0.95);
        $(".detail-pop").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".showBox").css({left:(width-800)/2-270,top:(height-680)/2});
        $(".delAll-pop").css({left:(width-400)/2-270,top:(height-240)/2});
        $(".seawall-showBox").css({left:(width-570)/2-270,top:(height-280)/2});
        /*$(".seawall-yes-detail").css("width",1055);
        $(".seawall-content").css("width",1025);*/
        $(".seawall-yes-detail").css("width",width*0.77);
        $(".seawall-content").css("width",width*0.75);
    }
    var numberCreateEdit,numberFillTimeEdit,numberCheckTimeEdit;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#numberCreateEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberCreateEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberCreateEdit").val(value);
                numberCreateEdit=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#numberFillTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberFillTimeEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberFillTimeEdit").val(value);
                numberFillTimeEdit=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#numberCheckTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberCheckTimeEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberCheckTimeEdit").val(value);
                numberCheckTimeEdit=Date.parse(value);
            }
        });
    });
    //海堤列表获取
    function seawallPage(name){
        $("#loading").show();
        $(".overlayOpacity",window.parent.document).show();
        $.ajax({
            url:srcPath+"admin/seawall/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "name":name
            }),
            success:function(data){
                $("#loading").hide();
                $(".overlayOpacity",window.parent.document).hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                if(JSON.stringify(data.data)=="{}"){
                    $(".seawallList-yes").hide();
                    $(".seawallList-no").show();
                }else{
                    $(".seawallList-yes").show();
                    $(".seawallList-no").hide();
                    var dataJson=data.data.list;
                    var seawallList="";
                    for(var i=0;i<dataJson.length;i++){
                        seawallList=seawallList+"<div class=\"seawall-item\">\n" +
                            "                    <div class=\"seawall-item-id\" style='display:none;'>"+dataJson[i].id+"</div>\n" +
                            "                    <div class=\"seawall-item-head\">"+dataJson[i].name+"</div>\n" +
                            "                    <div class=\"seawall-item-subTxt\">\n" +
                            "                        <div class=\"seawall-item-num\">分段数量："+dataJson[i].subNum+"</div>\n" +
                            "                        <div class=\"seawall-item-time\">创建时间："+new Date(dataJson[i].createTime).Format('yyyy-MM-dd')+"</div>\n" +
                            "                    </div>\n" +
                            "                    <div class=\"seawall-item-btn\">\n" +
                            "                        <div class=\"seawall-item-icon seawall-item-edit\">\n" +
                            "                            <i class=\"iconfont seawall-icon\">&#xeabe;</i>\n" +
                            "                            <span>编辑</span>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"seawall-item-icon seawall-item-del\">\n" +
                            "                            <i class=\"iconfont seawall-icon\">&#xeafb;</i>\n" +
                            "                            <span>删除</span>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>";
                    }
                    $(".seawall-list").html(seawallList);
                    //堤防工程鼠标移动效果
                    $(".seawall-item").hover(function () {
                        $(this).toggleClass("seawall-hover");
                    });
                    seawallPointList();
                    seawallEdit();
                    seawallDel();
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    }
    var seawallSearch=$("#seawallSearch").val();
    seawallPage(seawallSearch);
    //海堤列表搜索功能
    $("#seawallSearch").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var txt=$("#seawallSearch").val();
            seawallPage(txt);
        }
    });
    $("#searchIcon").click(function () {
        var txt=$("#seawallSearch").val();
        seawallPage(txt);
    });
    //堤防工程导航菜单操作
    $(".table-menuItem").click(function () {
        $(this).toggleClass("table-menuClick");
    });
    //返回堤防工程列表
    $("#seawall-back").click(function () {
        $("#seawall-list").show();
        $("#seawall-number").hide();
        var seawallSearch=$("#seawallSearch").val();
        seawallPage(seawallSearch);
    });
    //堤防工程新建
    $("#seawall-add").click(function () {
        $(".overlay",window.parent.document).show();
        $("#seawall-pop").show();
    });
    $(".add-seawall-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#seawall-add").removeClass("table-menuClick");
        $("#seawallName").val("");
    });
    $("#addSeawall-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#seawall-add").removeClass("table-menuClick");
        $("#seawallName").val("");
    });
    $("#addSeawall-sure").click(function () {
        var name=$("#seawallName").val();
        if(name==""){

        }else{
            $.ajax({
                url: srcPath + "admin/seawall/save",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "name": name
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    if(data.code==200){
                        $(".overlay",window.parent.document).hide();
                        $("#seawall-pop").hide();
                        $("#seawall-add").removeClass("table-menuClick");
                        $("#seawallName").val("");
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        var txt=$("#seawallSearch").val();
                        seawallPage(txt);
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
        }
    });
    //堤防工程修改
    $(".edit-seawall-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#seawallEdit-pop").hide();
    });
    $("#editSeawall-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#seawallEdit-pop").hide();
    });
    function seawallEdit(){
        $(".seawall-item-edit").click(function () {
            var id=$(this).parent().siblings("div.seawall-item-id").text();
            var head=$(this).parent().siblings("div.seawall-item-head").text();
            $("#seawallNameEdit").val(head);
            $(".overlay",window.parent.document).show();
            $("#seawallEdit-pop").show();
            $("#editSeawall-sure").click(function () {
                var name=$("#seawallNameEdit").val();
                if(name=="") {

                }else{
                    $.ajax({
                        url: srcPath + "admin/seawall/save",
                        type: "post",
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            token: token
                        },
                        data: JSON.stringify({
                            "id":id,
                            "name": name
                        }),
                        success: function (data) {
                            if(data.code=="-2"){
                                window.parent.location.href="../login.html";
                            }
                            if(data.code==200){
                                $(".overlay",window.parent.document).hide();
                                $("#seawallEdit-pop").hide();
                                $("#success").show();
                                setTimeout(function () {
                                    $("#success").hide();
                                },1000);
                                var txt=$("#seawallSearch").val();
                                seawallPage(txt);
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
                }
            });
        });
    }
    //堤防工程删除
    function seawallDel(){
        $(".seawall-item-del").click(function () {
            var id=$(this).parent("div.seawall-item-btn").siblings("div.seawall-item-id").text();
            $("#seawallDel-pop").show();
            $("#delSeawall-sure").click(function () {
                $.ajax({
                    url: srcPath + "admin/seawall/delete",
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
                        if(data.code==200){
                            $("#seawallDel-pop").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            var txt=$("#seawallSearch").val();
                            seawallPage(txt);
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
    //获取堤防分段列表
    var seawallId;
    function seawallPointList(){
        $(".seawall-item-head").click(function () {
            $("#seawall-list").hide();
            $("#seawall-number").show();
            var seawallName=$(this).text();
            $("#seawall-name").text(seawallName);
            seawallId=$(this).siblings("div.seawall-item-id").text();
            $.ajax({
                url: srcPath + "admin/seawall/sub/list",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "seawallId":seawallId
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    var dataJson=data.data.list;
                    if(dataJson==""){
                        $(".seawall-no").show();
                        $(".seawall-yes").hide();
                    }else{
                        $(".seawall-no").hide();
                        $(".seawall-yes").show();
                        var seawallPointList="";
                        for (var i=0;i<dataJson.length;i++){
                            seawallPointList=seawallPointList+"<div class=\"seawall-number-item\">\n" +
                                "                        <span class=\"seawall-number-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                                "                        <span class=\"seawall-number-name\">"+dataJson[i].name+"</span>\n" +
                                "                        <i class=\"iconfont seawall-number-del\">&#xeafb;</i>\n" +
                                "                    </div>";
                        }
                        $(".seawall-number-list").html(seawallPointList);
                        seawallPointHover();
                        seawallPointClick();
                        seawallPointDel();
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    }
    function seawallPointListRefresh(seawallId) {
        $.ajax({
            url: srcPath + "admin/seawall/sub/list",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "seawallId":seawallId
            }),
            success: function (data) {
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                var dataJson=data.data.list;
                if(dataJson==""){
                    $(".seawall-no").show();
                    $(".seawall-yes").hide();
                }else{
                    $(".seawall-no").hide();
                    $(".seawall-yes").show();
                    var seawallPointList="";
                    for (var i=0;i<dataJson.length;i++){
                        seawallPointList=seawallPointList+"<div class=\"seawall-number-item\">\n" +
                            "                        <span class=\"seawall-number-id\" style='display: none;'>"+dataJson[i].id+"</span>\n" +
                            "                        <span class=\"seawall-number-name\">"+dataJson[i].name+"</span>\n" +
                            "                        <i class=\"iconfont seawall-number-del\">&#xeafb;</i>\n" +
                            "                    </div>";
                    }
                    $(".seawall-number-list").html(seawallPointList);
                    seawallPointHover();
                    seawallPointClick();
                    seawallPointDel();
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    }
    //分段菜单鼠标移动效果
    function seawallPointHover(){
        $(".seawall-number-item").hover(function () {
            $(this).toggleClass("seawall-number-hover");
        });
    }
    //分段列表删除
    function seawallPointDel() {
        $(".seawall-number-del").click(function () {
            var id=$(this).siblings("span.seawall-number-id").text();
            $("#seawallNumberDel-pop").show();
            $("#seawallNumberDel-sure").click(function () {
                $.ajax({
                    url: srcPath + "admin/seawall/sub/delete",
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
                        if(data.code==200){
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            $("#seawallNumberDel-pop").hide();
                            seawallPointListRefresh(seawallId);
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
    //分段菜单鼠标点击效果获取分段详情
    var subId;
    function seawallPointClick(){
        $(".seawall-number-item").click(function () {
            $(".seawall-number-item").removeClass("seawall-number-click");
            $(this).addClass("seawall-number-click");
            var id=$(this).find("span.seawall-number-id").text();
            subId=id;
            seawallPointPage(1,10,subId);
            $("#pageValue").val("");
            $.ajax({
                url: srcPath + "admin/seawall/sub/detail",
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
                    if(dataJson==""){

                    }else{
                        if(dataJson.name==""||dataJson.name==null||dataJson.name==undefined){
                            dataJson.name="无";
                        }
                        if(dataJson.type==""||dataJson.type==null||dataJson.type==undefined){
                            dataJson.type="无";
                        }
                        if(String(dataJson.length)==""||dataJson.length==null||dataJson.length==undefined){
                            dataJson.length="无";
                        }
                        if(String(dataJson.height)==""||dataJson.height==null||dataJson.height==undefined){
                            dataJson.height="无";
                        }
                        if(dataJson.waveWallHeight==""||dataJson.waveWallHeight==null||dataJson.waveWallHeight==undefined){
                            dataJson.waveWallHeight="无";
                        }
                        if(String(dataJson.width)==""||dataJson.width==null||dataJson.width==undefined){
                            dataJson.width="无";
                        }
                        if(dataJson.material==""||dataJson.material==null||dataJson.material==undefined){
                            dataJson.material="无";
                        }
                        if(dataJson.revetmentForm==""||dataJson.revetmentForm==null||dataJson.revetmentForm==undefined){
                            dataJson.revetmentForm="无";
                        }
                        if(dataJson.protectionStandard==""||dataJson.protectionStandard==null||dataJson.protectionStandard==undefined){
                            dataJson.protectionStandard="无";
                        }
                        if(dataJson.highTideLevel==""||dataJson.highTideLevel==null||dataJson.highTideLevel==undefined){
                            dataJson.highTideLevel="无";
                        }
                        if(dataJson.seawallCreateTime==""||dataJson.seawallCreateTime==null||dataJson.seawallCreateTime==undefined){
                            dataJson.seawallCreateTime="无";
                        }else {
                            dataJson.seawallCreateTime=new Date(dataJson.seawallCreateTime).Format("yyyy-MM-dd");
                        }
                        if(dataJson.seawallAddress==""||dataJson.seawallAddress==null||dataJson.seawallAddress==undefined){
                            dataJson.seawallAddress="无";
                        }
                        if(dataJson.startLatitude==""||dataJson.startLatitude==null||dataJson.startLatitude==undefined){
                            dataJson.startLatitude="无";
                        }
                        if(dataJson.startLongitude==""||dataJson.startLongitude==null||dataJson.startLongitude==undefined){
                            dataJson.startLongitude="无";
                        }
                        if(dataJson.endLatitude==""||dataJson.endLatitude==null||dataJson.endLatitude==undefined){
                            dataJson.endLatitude="无";
                        }
                        if(dataJson.endLongitude==""||dataJson.endLongitude==null||dataJson.endLongitude==undefined){
                            dataJson.endLongitude="无";
                        }
                        if(dataJson.remark==""||dataJson.remark==null||dataJson.remark==undefined){
                            dataJson.remark="无";
                        }
                        if(dataJson.createTime==""||dataJson.createTime==null||dataJson.createTime==undefined){
                            dataJson.createTime="无";
                        }else{
                            dataJson.createTime=new Date(dataJson.createTime).Format("yyyy-MM-dd");
                        }
                        if(dataJson.areaCode==""||dataJson.areaCode==null||dataJson.areaCode==undefined){
                            dataJson.areaCode="无";
                        }
                        if(dataJson.areaName==""||dataJson.areaName==null||dataJson.areaName==undefined){
                            dataJson.areaName="无";
                        }
                        if(dataJson.origin==""||dataJson.origin==null||dataJson.origin==undefined){
                            dataJson.origin="无";
                        }
                        if(dataJson.fillUnit==""||dataJson.fillUnit==null||dataJson.fillUnit==undefined){
                            dataJson.fillUnit="无";
                        }
                        if(dataJson.fillBy==""||dataJson.fillBy==null||dataJson.fillBy==undefined){
                            dataJson.fillBy="无";
                        }
                        if(dataJson.fillCreateTime==""||dataJson.fillCreateTime==null||dataJson.fillCreateTime==undefined){
                            dataJson.fillCreateTime="无";
                        }else{
                            dataJson.fillCreateTime=new Date(dataJson.fillCreateTime).Format("yyyy-MM-dd");
                        }
                        if(dataJson.checkBy==""||dataJson.checkBy==null||dataJson.checkBy==undefined){
                            dataJson.checkBy="无";
                        }
                        if(dataJson.checkTime==""||dataJson.checkTime==null||dataJson.checkTime==undefined){
                            dataJson.checkTime="无";
                        }
                        var seawallPointDetail="<div class=\"seawall-info-head\">\n" +
                            "                            <div class=\"seawall-info-left\">\n" +
                            "                                <span class=\"seawall-info-name\">"+dataJson.name+"</span>\n" +
                            "                                <span class=\"seawall-info-type\">"+dataJson.type+"</span>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-right\">\n" +
                            "                                <i class=\"iconfont seawall-info-edit\">&#xeabe;</i>\n" +
                            "                                <span>编辑</span>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"seawall-info-address\">\n" +
                            "                            <i class=\"iconfont seawall-info-addressIcon\">&#xeb33;</i>\n" +
                            "                            <span>"+dataJson.seawallAddress+"</span>\n" +
                            "                        </div>\n" +
                            "                        <div class=\"seawall-info-list\">\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">海堤长度(米)</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.length+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">堤顶高程(米)</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.height+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">挡浪墙高程(米)</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.waveWallHeight+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">海堤宽度(米)</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.width+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">筑堤材料</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.material+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">护岸形式</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.revetmentForm+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">设计防护标准</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.protectionStandard+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">设计高潮位(厘米)</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.highTideLevel+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">建成时间</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.seawallCreateTime+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">起点经纬度坐标</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.startLongitude+"；"+dataJson.startLatitude+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">终点经纬度坐标</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.endLongitude+"；"+dataJson.endLatitude+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">行政代码区划</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.areaCode+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">行政区划</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.areaName+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">资料来源</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.origin+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">填表单位</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.fillUnit+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">填表人</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.fillBy+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">填表日期</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.fillCreateTime+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">审核人</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.checkBy+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">审核时间</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.checkTime+"</div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-item\">\n" +
                            "                                <div class=\"seawall-info-txt\">备注</div>\n" +
                            "                                <div class=\"seawall-info-word\">"+dataJson.remark+"</div>\n" +
                            "                            </div>\n" +
                            "                        </div>";
                        var imgList;
                        if(dataJson.picArray==""||dataJson.picArray==null||dataJson.picArray==undefined){
                            imgList="";
                        }else {
                            var imgListItem="";
                            for(var i=0;i<dataJson.picArray.length;i++){
                                imgListItem=imgListItem+"<div class=\"seawall-info-imgItem\">\n" +
                                    "                                    <img src=\""+dataJson.picArray[i].suffixUrl+"\"/>\n" +
                                    "                                    <span style='display:none;'>"+dataJson.picArray[i].name+"</span>"+
                                    "                                    <span style='display:none;'>"+dataJson.picArray[i].suffixUrl+"</span>"+
                                    "                                </div>";
                            }
                            imgList="<div class=\"seawall-info-img\">\n" +
                                "                            <div class=\"seawall-info-imgShow\">\n" +
                                "                                <img src=\""+dataJson.picArray[0].suffixUrl+"\"/>\n" +
                                "                            </div>\n" +
                                "                            <div class=\"seawall-info-imgList\">\n" + imgListItem +
                                "                            </div>\n" +
                                "                        </div>";
                        }
                        $("#seawall-info-box").html(seawallPointDetail+imgList);
                        //分段详情图片切换
                        $(".seawall-info-imgItem").click(function () {
                            var imgSrc=$(this).find("img").attr("src");
                            $(".seawall-info-imgShow").find("img").attr("src",imgSrc);
                        });
                        //测点信息标题
                        $("#seawallPointName").text(dataJson.name);
                        //分段修改
                        $(".seawall-info-right").click(function () {
                            imgListOld.splice(0,imgListOld.length);
                            seawallNumberImgLists.splice(0,seawallNumberImgLists.length);
                            if($("#seawall-info-box").find("div.seawall-info-img").text()==""){
                                $seawallNumberUploadEdit.attr('disabled', false);
                                $seawallNumberUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                            }else{
                                var imgList=$("#seawall-info-box").find("div.seawall-info-img").find("div.seawall-info-imgItem");
                                var imgListHtml="";
                                imgList.each(function () {
                                    var imgSrc="/image"+($(this).find("img").attr("src")).split("image")[1];
                                    // imgListOld.push(imgSrc);
                                    var name = $(this).find("span").eq(0).text();
                                    var suffixUrl = $(this).find("span").eq(1).text()
                                    // for(var i=0;i<dataJson.length;i++){
                                        imgListHtml=imgListHtml+"<div class=\"seawallNumber-imgItem\">\n" +
                                            "                                    <i class=\"iconfont upload-imgIcon\">&#xeac5;</i>\n" +
                                            "                                    <span>"+name+"</span>\n" +
                                            "                                    <span class=\"url\" style='display:none;'>"+imgSrc+"</span>\n" +
                                            "                                    <span class=\"suffixUrl\" style='display:none;'>"+suffixUrl+"</span>\n" +
                                            "                                    <i class=\"iconfont uploadIcon upload-successIcon\">&#xe606;</i>\n" +
                                            "                                    <i class=\"iconfont uploadIcon upload-delIcon\">&#xeaf2;</i>\n" +
                                            "                                </div>\n";
                                        seawallNumberImgLists.push(imgSrc);
                                    // }
                                });
                                if (seawallNumberImgLists.length >= 6) {
                                    $seawallNumberUploadEdit.attr('disabled', true);
                                    $seawallNumberUploadEdit.parents('.upload-btn').css('background-color', '#999');
                                }else{
                                    $seawallNumberUploadEdit.attr('disabled', false);
                                    $seawallNumberUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                                }
                                $("#seawallNumEdit-pop .seawallNumber-imgList").show().append(imgListHtml);
                                uploadImgDelEditNumber();
                            }
                            $(".overlay",window.parent.document).show();
                            $("#seawallNumEdit-pop").show();
                            if(dataJson.name=="无"){
                                dataJson.name="";
                            }
                            if(dataJson.type=="无"){
                                dataJson.type="";
                            }
                            if(dataJson.length=="无"){
                                dataJson.length="";
                            }
                            if(dataJson.height=="无"){
                                dataJson.height="";
                            }
                            if(dataJson.waveWallHeight=="无"){
                                dataJson.waveWallHeight="";
                            }
                            if(dataJson.width=="无"){
                                dataJson.width="";
                            }
                            if(dataJson.material=="无"){
                                dataJson.material="";
                            }
                            if(dataJson.revetmentForm=="无"){
                                dataJson.revetmentForm="";
                            }
                            if(dataJson.protectionStandard=="无"){
                                dataJson.protectionStandard="";
                            }
                            if(dataJson.highTideLevel=="无"){
                                dataJson.highTideLevel="";
                            }
                            if(dataJson.seawallCreateTime=="无"){
                                dataJson.seawallCreateTime="";
                            }
                            if(dataJson.seawallAddress=="无"){
                                dataJson.seawallAddress="";
                            }
                            if(dataJson.startLatitude=="无"){
                                dataJson.startLatitude="";
                            }
                            if(dataJson.startLongitude=="无"){
                                dataJson.startLongitude="";
                            }
                            if(dataJson.endLatitude=="无"){
                                dataJson.endLatitude="";
                            }
                            if(dataJson.endLongitude=="无"){
                                dataJson.endLongitude="";
                            }
                            if(dataJson.remark=="无"){
                                dataJson.remark="";
                            }
                            if(dataJson.createTime=="无"){
                                dataJson.createTime="";
                            }
                            if(dataJson.areaCode=="无"){
                                dataJson.areaCode="";
                            }
                            if(dataJson.areaName=="无"){
                                dataJson.areaName="";
                            }
                            if(dataJson.origin=="无"){
                                dataJson.origin="";
                            }
                            if(dataJson.fillUnit=="无"){
                                dataJson.fillUnit="";
                            }
                            if(dataJson.fillBy=="无"){
                                dataJson.fillBy="";
                            }
                            if(dataJson.fillCreateTime=="无"){
                                dataJson.fillCreateTime="";
                            }
                            if(dataJson.checkBy=="无"){
                                dataJson.checkBy="";
                            }
                            if(dataJson.checkTime=="无"){
                                dataJson.checkTime="";
                            }
                            $("#numberNameEdit").val(dataJson.name);
                            $("#numberTypeEdit").val(dataJson.type);
                            $("#numberLengthEdit").val(dataJson.length);
                            $("#numberHeightEdit").val(dataJson.height);
                            $("#numberWallHeightEdit").val(dataJson.waveWallHeight);
                            $("#numberWidthEdit").val(dataJson.width);
                            $("#numberMaterialEdit").val(dataJson.material);
                            $("#numberRevetmentEdit").val(dataJson.revetmentForm);
                            $("#numberStandardEdit").val(dataJson.protectionStandard);
                            $("#numberLevelEdit").val(dataJson.highTideLevel);
                            $("#numberCreateEdit").val(dataJson.seawallCreateTime);
                            $("#numberAddressEdit").val(dataJson.seawallAddress);
                            $("#numberStartLatEdit").val(dataJson.startLatitude);
                            $("#numberStartLonEdit").val(dataJson.startLongitude);
                            $("#numberEndLatEdit").val(dataJson.endLatitude);
                            $("#numberEndLonEdit").val(dataJson.endLongitude);
                            $("#numberRemarkEdit").val(dataJson.remark);
                            $("#numberCodeEdit").val(dataJson.areaCode);
                            $("#numberAreaEdit").val(dataJson.areaName);
                            $("#numberOriginEdit").val(dataJson.origin);
                            $("#numberUnitEdit").val(dataJson.fillUnit);
                            $("#numberByEdit").val(dataJson.fillBy);
                            $("#numberFillTimeEdit").val(dataJson.fillCreateTime);
                            $("#numberCheckerEdit").val(dataJson.checkBy);
                            $("#numberCheckTimeEdit").val(dataJson.checkTime);
                            $("#seawallPointEdit-sure").click(function () {
                                if($("#seawallNumEdit-pop").find("div.seawallNumber-imgList").css("display")=="none"){
                                    seawallNumberImgLists.splice(0,seawallNumberImgLists.length);
                                }else{
                                    seawallNumberImgLists=seawallNumberImgLists;
                                }
                                seawallNumberImgListEdit=imgListOld.concat(seawallNumberImgLists);
                                var name=$("#numberNameEdit").val();
                                var type=$("#numberTypeEdit").val();
                                var length=$("#numberLengthEdit").val();
                                var height=$("#numberHeightEdit").val();
                                var waveWallHeight=$("#numberWallHeightEdit").val();
                                var width=$("#numberWidthEdit").val();
                                var material=$("#numberMaterialEdit").val();
                                var revetmentForm=$("#numberRevetmentEdit").val();
                                var protectionStandard=$("#numberStandardEdit").val();
                                var highTideLevel=$("#numberLevelEdit").val();
                                //var seawallCreateTime=$("#numberCreateEdit").val();
                                //var createTime=new Date(seawallCreateTime).getTime();
                                var seawallAddress=$("#numberAddressEdit").val();
                                var startLatitude=$("#numberStartLatEdit").val();
                                var startLongitude=$("#numberStartLonEdit").val();
                                var endLatitude=$("#numberEndLatEdit").val();
                                var endLongitude=$("#numberEndLonEdit").val();
                                var remark=$("#numberRemarkEdit").val();
                                var areaCode=$("#numberCodeEdit").val();
                                var areaName=$("#numberAreaEdit").val();
                                var origin=$("#numberOriginEdit").val();
                                var fillBy=$("#numberByEdit").val();
                                //var fillCreateTime=$("#numberFillTimeEdit").val();
                                var fillUnit=$("#numberUnitEdit").val();
                                var checkBy=$("#numberCheckerEdit").val();
                                //var checkTime=$("#numberCheckTimeEdit").val();
                                var imgList;
                                if(seawallNumberImgListEdit.length>6){
                                    imgList=seawallNumberImgListEdit.slice(-6);
                                }else{
                                    imgList=seawallNumberImgListEdit;
                                }
                                function ajax() {
                                    $.ajax({
                                        url: srcPath + "admin/seawall/sub/save",
                                        type: "post",
                                        dataType: 'json',
                                        contentType: 'application/json',
                                        headers: {
                                            token: token
                                        },
                                        data: JSON.stringify({
                                            "id":subId,
                                            "seawallId": seawallId,
                                            "name": name,
                                            "type": type,
                                            "length": length,
                                            "height": height,
                                            "waveWallHeight": waveWallHeight,
                                            "width": width,
                                            "material": material,
                                            "revetmentForm": revetmentForm,
                                            "protectionStandard": protectionStandard,
                                            "highTideLevel": highTideLevel,
                                            "seawallCreateTime": numberCreateEdit,
                                            "seawallAddress": seawallAddress,
                                            "startLatitude": startLatitude,
                                            "startLongitude": startLongitude,
                                            "endLatitude": endLatitude,
                                            "endLongitude": endLongitude,
                                            "picArr": seawallNumberImgLists,
                                            "remark": remark,
                                            "areaCode": areaCode,
                                            "areaName": areaName,
                                            "origin": origin,
                                            "fillBy": fillBy,
                                            "fillCreateTime": numberFillTimeEdit,
                                            "fillUnit": fillUnit,
                                            "checkBy": checkBy,
                                            "checkTime": numberCheckTimeEdit
                                        }),
                                        success: function (data) {
                                            if(data.code=="-2"){
                                                window.parent.location.href="../login.html";
                                            }
                                            if (data.code == 200) {
                                                $(".overlay",window.parent.document).hide();
                                                $("#seawallNumEdit-pop").hide();
                                                $(".seawallNumberEdit-tips").hide();
                                                $("#seawallNumEdit-pop .seawallNumber-imgList").hide();
                                                $("#seawallNumEdit-pop .seawallNumber-imgList").html("");
                                                $("#success").show();
                                                setTimeout(function () {
                                                    $("#success").hide();
                                                }, 1000);
                                                seawallPointListRefresh(seawallId);
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
                                    $(".seawallNumberEdit-tips").show();
                                    $(".seawallNumberEdit-tips").find("span").text("名称不能为空");
                                    setTimeout(function () {
                                        $(".seawallNumberEdit-tips").hide();
                                    },1000);
                                }else if(length!=""){
                                    if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                                        $(".seawallNumberEdit-tips").show();
                                        $(".seawallNumberEdit-tips").find("span").text("海堤长度必须为数字类型");
                                        setTimeout(function () {
                                            $(".seawallNumberEdit-tips").hide();
                                        },1000);
                                    }else{
                                        //ajax();
                                        if(height!=""){
                                            if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                                                $(".seawallNumberEdit-tips").show();
                                                $(".seawallNumberEdit-tips").find("span").text("堤顶高程必须为数字类型");
                                                setTimeout(function () {
                                                    $(".seawallNumberEdit-tips").hide();
                                                },1000);
                                            }else{
                                                //ajax();
                                                if(width!=""){
                                                    if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                                                        $(".seawallNumberEdit-tips").show();
                                                        $(".seawallNumberEdit-tips").find("span").text("海堤宽度必须为数字类型");
                                                        setTimeout(function () {
                                                            $(".seawallNumberEdit-tips").hide();
                                                        },1000);
                                                    }else{
                                                        ajax();
                                                    }
                                                }else {
                                                    ajax();
                                                }
                                            }
                                        }else {
                                            ajax();
                                        }
                                    }
                                }else if(height!=""){
                                    if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                                        $(".seawallNumberEdit-tips").show();
                                        $(".seawallNumberEdit-tips").find("span").text("堤顶高程必须为数字类型");
                                        setTimeout(function () {
                                            $(".seawallNumberEdit-tips").hide();
                                        },1000);
                                    }else{
                                        //ajax();
                                        if(length!=""){
                                            if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                                                $(".seawallNumberEdit-tips").show();
                                                $(".seawallNumberEdit-tips").find("span").text("海堤长度必须为数字类型");
                                                setTimeout(function () {
                                                    $(".seawallNumberEdit-tips").hide();
                                                },1000);
                                            }else{
                                                //ajax();
                                                if(width!=""){
                                                    if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                                                        $(".seawallNumberEdit-tips").show();
                                                        $(".seawallNumberEdit-tips").find("span").text("海堤宽度必须为数字类型");
                                                        setTimeout(function () {
                                                            $(".seawallNumberEdit-tips").hide();
                                                        },1000);
                                                    }else{
                                                        ajax();
                                                    }
                                                }else {
                                                    ajax();
                                                }
                                            }
                                        }else {
                                            ajax();
                                        }
                                    }
                                }else if(width!=""){
                                    if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                                        $(".seawallNumberEdit-tips").show();
                                        $(".seawallNumberEdit-tips").find("span").text("海堤宽度必须为数字类型");
                                        setTimeout(function () {
                                            $(".seawallNumberEdit-tips").hide();
                                        },1000);
                                    }else{
                                        //ajax();
                                        if(length!=""){
                                            if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                                                $(".seawallNumberEdit-tips").show();
                                                $(".seawallNumberEdit-tips").find("span").text("海堤长度必须为数字类型");
                                                setTimeout(function () {
                                                    $(".seawallNumberEdit-tips").hide();
                                                },1000);
                                            }else{
                                                //ajax();
                                                if(height!=""){
                                                    if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                                                        $(".seawallNumberEdit-tips").show();
                                                        $(".seawallNumberEdit-tips").find("span").text("堤顶高程必须为数字类型");
                                                        setTimeout(function () {
                                                            $(".seawallNumberEdit-tips").hide();
                                                        },1000);
                                                    }else{
                                                        ajax();
                                                    }
                                                }else {
                                                    ajax();
                                                }
                                            }
                                        }else {
                                            ajax();
                                        }
                                    }
                                }else {
                                    ajax();
                                }
                            });
                        });
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
        $(".seawall-number-item").eq(0).trigger("click");
    }
    //堤防分段新建
    $(".seawall-no-btn").click(function () {
        $(".overlay",window.parent.document).show();
        $("#seawallNum-pop").show();
        seawallNumberImgList.splice(0,seawallNumberImgList.length);
        $seawallNumberUpload.attr('disabled', false);
        $seawallNumberUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
    });
    $(".seawall-number-add").click(function () {
        $(".overlay",window.parent.document).show();
        $("#seawallNum-pop").show();
    });
    $(".seawallNumberAdd-iconClose").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $(this).parent().siblings("div.add-content").find("input.add-input").val("");
        $(".seawallNumber-tips").hide();
        $("#seawallNum-pop .seawallNumber-imgList").hide();
        $("#seawallNum-pop .seawallNumber-imgList").html("");
    });
    $("#seawallPoint-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $(this).parent().siblings("div.add-content").find("input.add-input").val("");
        $(".seawallNumber-tips").hide();
        $("#seawallNum-pop .seawallNumber-imgList").hide();
        $("#seawallNum-pop .seawallNumber-imgList").html("");
    });
    //图片上传
    var $seawallNumberUpload =  $("#seawallNumber-upload");
    $seawallNumberUpload.change(function () {
        if($(this).val() != ""){
            seawallNumberUpload(this);
        }
    });
    function seawallNumberUpload(ele){
        var files = $(ele)[0].files;
        if (seawallNumberImgList.length + files.length > 6) {
            $(".seawallNumber-tips").show();
            $(".seawallNumber-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".seawallNumber-tips").hide();
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
            $(".seawallNumber-tips").show();
            $(".seawallNumber-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".seawallNumber-tips").hide();
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
                    $("#seawallNum-pop .seawallNumber-imgList").show();
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
                        seawallNumberImgList.push(dataJson[i].url);
                    }
                    if (seawallNumberImgList.length >= 6) {
                        $seawallNumberUpload.attr('disabled', true);
                        $seawallNumberUpload.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#seawallNum-pop .seawallNumber-imgList").append(imgList);
                    uploadImgDelAddNumber();
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
    function uploadImgDelAddNumber(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#seawallNum-pop .seawallNumber-imgItem").mousemove(function(e){
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
            if(seawallNumberImgList.indexOf(url) == "-1"){

            }else{
                seawallNumberImgList.splice(seawallNumberImgList.indexOf(url),1);
                if (seawallNumberImgList.length < 6) {
                    $seawallNumberUpload.attr('disabled', false)
                    $seawallNumberUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    var $seawallNumberUploadEdit =  $("#seawallNumberEdit-upload");
    $seawallNumberUploadEdit.change(function () {
        if($(this).val() != ""){
            seawallNumberUploadEdit(this);
        }
    });
    function seawallNumberUploadEdit(ele){
        var files = $(ele)[0].files;
        var formData = new FormData();
        if (seawallNumberImgLists.length + files.length > 6) {
            $(".seawallNumber-tips").show();
            $(".seawallNumber-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".seawallNumber-tips").hide();
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
            $(".seawallNumber-tips").show();
            $(".seawallNumber-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".seawallNumber-tips").hide();
            },1000);
            return;
        }
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
                    var dataJson=responseStr.data.list;
                    $("#seawallNumEdit-pop .seawallNumber-imgList").show();
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
                        seawallNumberImgLists.push(dataJson[i].url);
                    }
                    if (seawallNumberImgLists.length >= 6) {
                        $seawallNumberUploadEdit.attr('disabled', true);
                        $seawallNumberUploadEdit.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#seawallNumEdit-pop .seawallNumber-imgList").append(imgList);
                    uploadImgDelEditNumber();
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
    function uploadImgDelEditNumber(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#seawallNumEdit-pop .seawallNumber-imgItem").mousemove(function(e){
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
            if(seawallNumberImgLists.indexOf(url) == "-1"){

            }else{
                seawallNumberImgLists.splice(seawallNumberImgLists.indexOf(url),1);
                if (seawallNumberImgLists.length < 6) {
                    $seawallNumberUploadEdit.attr('disabled', false);
                    $seawallNumberUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    var numberCreateAdd,numberFillTimeAdd,numberCheckTimeAdd;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#numberCreate',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberCreate").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberCreate").val(value);
                numberCreateAdd=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#numberFillTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberFillTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberFillTime").val(value);
                numberFillTimeAdd=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#numberCheckTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#numberCheckTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#numberCheckTime").val(value);
                numberCheckTimeAdd=Date.parse(value);
            }
        });
    });
    $("#seawallPoint-sure").click(function () {
        var name=$("#numberName").val();
        var type=$("#numberType").val();
        var length=$("#numberLength").val();
        var height=$("#numberHeight").val();
        var waveWallHeight=$("#numberWallHeight").val();
        var width=$("#numberWidth").val();
        var material=$("#numberMaterial").val();
        var revetmentForm=$("#numberRevetment").val();
        var protectionStandard=$("#numberStandard").val();
        var highTideLevel=$("#numberLevel").val();
        //var seawallCreateTime=$("#numberCreate").val();
        //var createTime=new Date(seawallCreateTime).getTime();
        var seawallAddress=$("#numberAddress").val();
        var startLatitude=$("#numberStartLat").val();
        var startLongitude=$("#numberStartLon").val();
        var endLatitude=$("#numberEndLat").val();
        var endLongitude=$("#numberEndLon").val();
        var remark=$("#numberRemark").val();
        var areaCode=$("#numberCode").val();
        var areaName=$("#numberArea").val();
        var origin=$("#numberOrigin").val();
        var fillBy=$("#numberBy").val();
        //var fillCreateTime=$("#numberFillTime").val();
        var fillUnit=$("#numberUnit").val();
        var checkBy=$("#numberChecker").val();
        //var checkTime=$("#numberCheckTime").val();
        if($("#seawallNum-pop").find("div.seawallNumber-imgList").css("display")=="none"){
            seawallNumberImgList.splice(0,seawallNumberImgList.length);
        }else{
            seawallNumberImgList=seawallNumberImgList;
        }
        var imgList;
        if(seawallNumberImgList.length>6){
            imgList=seawallNumberImgList.slice(-6);
        }else{
            imgList=seawallNumberImgList;
        }
        function ajax() {
            $.ajax({
                url: srcPath + "admin/seawall/sub/save",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "seawallId":seawallId,
                    "name":name,
                    "type":type,
                    "length":length,
                    "height":height,
                    "waveWallHeight":waveWallHeight,
                    "width":width,
                    "material":material,
                    "revetmentForm":revetmentForm,
                    "protectionStandard":protectionStandard,
                    "highTideLevel":highTideLevel,
                    "seawallCreateTime":numberCreateAdd,
                    "seawallAddress":seawallAddress,
                    "startLatitude":startLatitude,
                    "startLongitude":startLongitude,
                    "endLatitude":endLatitude,
                    "endLongitude":endLongitude,
                    "picArr":imgList,
                    "remark":remark,
                    "areaCode":areaCode,
                    "areaName":areaName,
                    "origin":origin,
                    "fillBy":fillBy,
                    "fillCreateTime":numberFillTimeAdd,
                    "fillUnit":fillUnit,
                    "checkBy":checkBy,
                    "checkTime":numberCheckTimeAdd
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    if(data.code==200){
                        $(".overlay",window.parent.document).hide();
                        $("#seawallNum-pop").hide();
                        $("#seawallNum-pop").find("div.add-content").find("input.add-input").val("");
                        $(".seawallNumber-tips").hide();
                        $("#seawallNum-pop .seawallNumber-imgList").hide();
                        $("#seawallNum-pop .seawallNumber-imgList").html("");
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        seawallPointListRefresh(seawallId);
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
        }
        if(name==""){
            $(".seawallNumber-tips").show();
            $(".seawallNumber-tips").find("span").text("名称不能为空");
            setTimeout(function () {
                $(".seawallNumber-tips").hide();
            },1000);
        }else if(length!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                $(".seawallNumber-tips").show();
                $(".seawallNumber-tips").find("span").text("海堤长度必须为数字类型");
                setTimeout(function () {
                    $(".seawallNumber-tips").hide();
                },1000);
            }else{
                //ajax();
                if(height!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                        $(".seawallNumber-tips").show();
                        $(".seawallNumber-tips").find("span").text("堤顶高程必须为数字类型");
                        setTimeout(function () {
                            $(".seawallNumber-tips").hide();
                        },1000);
                    }else{
                        //ajax();
                        if(width!=""){
                            if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                                $(".seawallNumber-tips").show();
                                $(".seawallNumber-tips").find("span").text("海堤宽度必须为数字类型");
                                setTimeout(function () {
                                    $(".seawallNumber-tips").hide();
                                },1000);
                            }else{
                                ajax();
                            }
                        }else {
                            ajax();
                        }
                    }
                }else {
                    ajax();
                }
            }
        }else if(height!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                $(".seawallNumber-tips").show();
                $(".seawallNumber-tips").find("span").text("堤顶高程必须为数字类型");
                setTimeout(function () {
                    $(".seawallNumber-tips").hide();
                },1000);
            }else{
                //ajax();
                if(length!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                        $(".seawallNumber-tips").show();
                        $(".seawallNumber-tips").find("span").text("海堤长度必须为数字类型");
                        setTimeout(function () {
                            $(".seawallNumber-tips").hide();
                        },1000);
                    }else{
                        //ajax();
                        if(width!=""){
                            if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                                $(".seawallNumber-tips").show();
                                $(".seawallNumber-tips").find("span").text("海堤宽度必须为数字类型");
                                setTimeout(function () {
                                    $(".seawallNumber-tips").hide();
                                },1000);
                            }else{
                                ajax();
                            }
                        }else {
                            ajax();
                        }
                    }
                }else {
                    ajax();
                }
            }
        }else if(width!=""){
            if(!(/^(-?\d+)(\.\d+)?$/.test(width))){
                $(".seawallNumber-tips").show();
                $(".seawallNumber-tips").find("span").text("海堤宽度必须为数字类型");
                setTimeout(function () {
                    $(".seawallNumber-tips").hide();
                },1000);
            }else{
                //ajax();
                if(length!=""){
                    if(!(/^(-?\d+)(\.\d+)?$/.test(length))){
                        $(".seawallNumber-tips").show();
                        $(".seawallNumber-tips").find("span").text("海堤长度必须为数字类型");
                        setTimeout(function () {
                            $(".seawallNumber-tips").hide();
                        },1000);
                    }else{
                        //ajax();
                        if(height!=""){
                            if(!(/^(-?\d+)(\.\d+)?$/.test(height))){
                                $(".seawallNumber-tips").show();
                                $(".seawallNumber-tips").find("span").text("堤顶高程必须为数字类型");
                                setTimeout(function () {
                                    $(".seawallNumber-tips").hide();
                                },1000);
                            }else{
                                ajax();
                            }
                        }else {
                            ajax();
                        }
                    }
                }else {
                    ajax();
                }
            }
        }else {
            ajax();
        }
    });
    //分段修改
    $(".seawallNumberEdit-iconClose").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#seawallNumEdit-pop").hide();
        $(".seawallNumberEdit-tips").hide();
        $(".seawallNumber-imgList").hide();
        $(".seawallNumber-imgList").html("");
    });
    $("#seawallPointEdit-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#seawallNumEdit-pop").hide();
        $(".seawallNumberEdit-tips").hide();
        $(".seawallNumber-imgList").hide();
        $(".seawallNumber-imgList").html("");
    });
    //分段详情和测点信息切换
    $(".seawall-number-txt").click(function () {
        $(".seawall-number-txt").removeClass("seawall-tab");
        $(this).addClass("seawall-tab");
        var id=$(this).attr("id");
        $(".seawall-number-box").hide();
        $("#"+id+"-box").show();
    });
    $("#seawall-info").trigger("click");
    //测点信息导航选中效果
    $(".seawall-tab-item").click(function () {
        $(this).toggleClass("seawall-tab-click");
    });
    //获取堤防测量点列表
    var tableLength;
    function seawallPointPage(current,size,subSeawallId) {
        $("#loading").show();
        $(".overlayOpacity",window.parent.document).show();
        $.ajax({
            url:srcPath+"admin/seawall/point/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "current":current,
                "size":size,
                "subSeawallId":subSeawallId
            }),
            success:function(data){
                $("#loading").hide();
                $(".overlayOpacity",window.parent.document).hide();
                console.log(data);
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
                    var tableHtml="<thead>\n" +
                        "                                        <tr>\n" +
                        "                                            <th>\n" +
                        "                                                <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                        "                                                <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                        "                                            </th>\n" +
                        "                                            <th style='display: none;'>id</th>\n" +
                        "                                            <th>点位编号</th>\n" +
                        "                                            <th>点位经度</th>\n" +
                        "                                            <th>点位纬度</th>\n" +
                        "                                            <th>点位堤顶高程（米）</th>\n" +
                        "                                            <th>点位防浪墙高程（米）</th>\n" +
                        "                                            <th>操作</th>\n" +
                        "                                        </tr>\n" +
                        "                                    </thead>\n" +
                        "                                    <tbody>";
                    for(var i=0;i<dataJson.length;i++){
                        if(dataJson[i].pointNumber==null||dataJson[i].pointNumber==undefined||dataJson[i].pointNumber==""){
                            dataJson[i].pointNumber="无";
                        }else{
                            dataJson[i].pointNumber=dataJson[i].pointNumber;
                        }
                        if(dataJson[i].longitude==null||dataJson[i].longitude==undefined||dataJson[i].longitude==""){
                            dataJson[i].longitude="无";
                        }else{
                            dataJson[i].longitude=dataJson[i].longitude;
                        }
                        if(dataJson[i].latitude==null||dataJson[i].latitude==undefined||dataJson[i].latitude==""){
                            dataJson[i].latitude="无";
                        }else{
                            dataJson[i].latitude=dataJson[i].latitude;
                        }
                        if(dataJson[i].height==null||dataJson[i].height==undefined||dataJson[i].height==""){
                            dataJson[i].height="无";
                        }else{
                            dataJson[i].height=dataJson[i].height;
                        }
                        if(dataJson[i].waveWallHeight==null||dataJson[i].waveWallHeight==undefined||dataJson[i].waveWallHeight==""){
                            dataJson[i].waveWallHeight="无";
                        }else{
                            dataJson[i].waveWallHeight=dataJson[i].waveWallHeight;
                        }
                        tableHtml=tableHtml+"<tr>\n" +
                            "                                <td>\n" +
                            "                                    <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                            "                                    <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                            "                                </td>\n" +
                            "                                <td style='display: none;'>"+dataJson[i].id+"</td>\n" +
                            "                                <td>"+dataJson[i].pointNumber+"</td>\n" +
                            "                                <td>"+dataJson[i].longitude+"</td>\n" +
                            "                                <td>"+dataJson[i].latitude+"</td>\n" +
                            "                                <td>"+dataJson[i].height+"</td>\n" +
                            "                                <td>"+dataJson[i].waveWallHeight+"</td>\n" +
                            "                                <td>\n" +
                            "                                     <span class=\"table-infoIcon\"><i class=\"iconfont\">&#xeb46;</i><span class=\"table-txt\">详情</span></span>" +
                            "                                     <span class=\"table-editIcon\"><i class=\"iconfont\">&#xeabe;</i><span class=\"table-txt\">编辑</span></span>" +
                            "                                     <span class=\"table-delIcon\"><i class=\"iconfont\">&#xeafb;</i><span class=\"table-txt\">删除</span></span>" +
                            "                                  </td>\n" +
                            "                            </tr>";
                    }
                    tableHtml=tableHtml+"</tbody>";
                    $("#seawallPoint-table").html(tableHtml);
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
                    tableFilter();
                    tableSelect();
                    tableInfo();
                    tableEdit();
                    tableDel();
                    infoDoubleClick();
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    }
    //首页
    $("#firstPage").click(function () {
        seawallPointPage(1,10,subId);
        $("#pageValue").val("");
    });
    //上一页
    $("#prevPage").click(function () {
        var currentPage=parseInt($("#currentPage").text());
        var pageNow=1;
        if(currentPage<1){
            return false;
        }else {
            pageNow=currentPage-1;
            seawallPointPage(pageNow,10,subId);
        }
        $("#pageValue").val("");
    });
    //下一页
    $("#nextPage").click(function () {
        var currentPage=parseInt($("#currentPage").text());
        var totalPage=parseInt($("#totalPage").text());
        var pageNow=1;
        if(currentPage >= totalPage){
            return false;
        }else {
            pageNow=currentPage+1;
            seawallPointPage(pageNow,10,subId);
        }
        $("#pageValue").val("");
    });
    //尾页
    $("#endPage").click(function () {
        var totalPage=$("#totalPage").text();
        seawallPointPage(totalPage,10,subId);
        $("#pageValue").val("");
    });
    //跳转
    $("#pageTo").click(function () {
        var pageNum=$("#pageValue").val();
        if(pageNum==""){

        }else {
            seawallPointPage(pageNum,10,subId);
        }
    });
    $("#pageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var pageNum=$("#pageValue").val();
            seawallPointPage(pageNum,10,subId);
        }
    });
    //堤防测量点筛选
    function tableFilter() {
        var tableList=[];
        $("#seawallPoint-table").find("thead tr th").each(function () {
            var txt = $(this).text();
            tableList.push(txt);
        });
        tableList.splice(0,2);
        tableList.splice(tableList.length-3,tableList.length);
        $("#seawallPoint-select").click(function () {
            $("#seawallPoint-pop").toggle();
            var html="";
            for (var i=0;i<tableList.length;i++){
                html=html+"<div class=\"filtrate-item\">\n" +
                    "            <i class=\"iconfont filtrate-uncheck\">&#xeadc;</i>\n" +
                    "            <i class=\"iconfont filtrate-check\">&#xead8;</i>\n" +
                    "            <span class=\"filtrate-txt\">"+tableList[i]+"</span>\n" +
                    "        </div>";
            }
            $("#seawallPoint-pop").html(html);
            $(".filtrate-item").click(function () {
                var txt=$(this).find("span.filtrate-txt").text();
                $(this).toggleClass("filtrate-click");
                if($(this).hasClass("filtrate-click")){
                    var index=tableList.indexOf(txt);
                    var tab=$("#seawallPoint-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="none";
                    }
                }else {
                    var index=tableList.indexOf(txt);
                    var tab=$("#seawallPoint-table")[0];
                    var trs=tab.rows;
                    for(var i=0;i<trs.length;i++){
                        var cell=trs[i].cells[index+2];
                        cell.style.display="";
                    }
                }
            });
        });
    }
    //表格选中与否
    var seawallPointIds=[];
    function tableSelect() {
        $("#seawallPoint-table").find("thead tr th:eq(0)").click(function () {
            $(this).toggleClass("check-click");
            if($(this).hasClass("check-click")){
                $("#seawallPoint-table").find("tbody tr td").addClass("check-click");
                for(var i=0;i<tableLength.length;i++){
                    seawallPointIds.push(tableLength[i].id);
                }
            }else {
                $("#seawallPoint-table").find("tbody tr td").removeClass("check-click");
                seawallPointIds.splice(0,seawallPointIds.length);
            }
        });
        $("#seawallPoint-table").find("tbody tr").each(function(){
            var td=$(this).find("td").eq(0);
            td.click(function(){
                $(this).toggleClass("check-click");
                if ($(this).hasClass("check-click")){
                    var seawallPointId=$(this).siblings("td").eq(0).text();
                    seawallPointIds.push(seawallPointId);
                } else {
                    var txt=$(this).siblings("td").eq(0).text();
                    $("#seawallPoint-table").find("thead tr th").removeClass("check-click");
                    if(seawallPointIds.indexOf(txt) == "-1"){
    
                    }else{
                        seawallPointIds.splice(seawallPointIds.indexOf(txt),1);
                    }
                }
            });
        });
        /*$("#seawallPoint-table").find("tbody tr td").click(function () {
            $(this).toggleClass("check-click");
            if ($(this).hasClass("check-click")){
                var seawallPointId=$(this).siblings("td").eq(0).text();
                seawallPointIds.push(seawallPointId);
            } else {
                var txt=$(this).siblings("td").eq(0).text();
                $("#seawallPoint-table").find("thead tr th").removeClass("check-click");
                if(seawallPointIds.indexOf(txt) == "-1"){

                }else{
                    seawallPointIds.splice(seawallPointIds.indexOf(txt),1);
                }
            }
        });*/
    }
    //堤防测量点新建
    $("#seawallPoint-add").click(function () {
        $(".overlay",window.parent.document).show();
        $("#seawallPointAdd-pop").show();
        seawallPointImgList.splice(0,seawallPointImgList.length);
        $seawallPointUpload.attr('disabled', false);
        $seawallPointUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
    });
    $(".addSeawall-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#seawallPoint-add").removeClass("seawall-tab-click");
        $("#seawallPointAdd-pop").find("input.add-input").val("");
        $("#seawallPointAdd-pop .seawallPoint-imgList").hide();
        $("#seawallPointEdit-pop .seawallPoint-imgList").hide();
        $("#seawallPointAdd-pop .seawallPoint-imgList").html("");
        $("#seawallPointEdit-pop .seawallPoint-imgList").html("");
    });
    $("#seawallPointAdd-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $(this).parent().parent().parent().hide();
        $("#seawallPoint-add").removeClass("seawall-tab-click");
        $("#seawallPointAdd-pop").find("input.add-input").val("");
        $("#seawallPointAdd-pop .seawallPoint-imgList").hide();
        $("#seawallPointAdd-pop .seawallPoint-imgList").html("");
    });
    //测量点图片上传
    var $seawallPointUpload =  $("#seawallPoint-upload");
    $seawallPointUpload.change(function () {
        if($(this).val() != ""){
            seawallPointUpload(this);
        }
    });
    function seawallPointUpload(ele){
        var files = $(ele)[0].files;
        if (seawallPointImgList.length + files.length > 6) {
            $(".seawallPoint-tips").show();
            $(".seawallPoint-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".seawallPoint-tips").hide();
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
            $(".seawallPoint-tips").show();
            $(".seawallPoint-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".seawallPoint-tips").hide();
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
                    $("#seawallPointAdd-pop .seawallPoint-imgList").show();
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
                        seawallPointImgList.push(dataJson[i].url);
                    }
                    if (seawallPointImgList.length >= 6) {
                        $seawallPointUpload.attr('disabled', true);
                        $seawallPointUpload.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#seawallPointAdd-pop .seawallPoint-imgList").append(imgList);
                    uploadImgDelAddPoint();
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
    function uploadImgDelAddPoint(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#seawallPointAdd-pop .seawallNumber-imgItem").mousemove(function(e){
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
            if(seawallPointImgList.indexOf(url) == "-1"){

            }else{
                seawallPointImgList.splice(seawallPointImgList.indexOf(url),1);
                if (seawallPointImgList.length < 6) {
                    $seawallPointUpload.attr('disabled', false)
                    $seawallPointUpload.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    var pointDateAdd,pointTimeAdd;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#pointDate',//指定元素
            change:function(value,data){//监听日期变换
                lay("#pointDate").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#pointDate").val(value);
                pointDateAdd=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#pointTime',//指定元素
            change:function(value,data){//监听日期变换
                lay("#pointTime").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#pointTime").val(value);
                pointTimeAdd=Date.parse(value);
            }
        });
    });
    $("#seawallPointAdd-sure").click(function () {
        $(".overlay",window.parent.document).show();
        $("#seawallPointAdd-pop").show();
        var pointNumber=$("#pointNumber").val();
        var longitude=$("#pointLon").val();
        var latitude=$("#pointLat").val();
        var height=$("#pointHeight").val();
        var waveWallHeight=$("#pointWall").val();
        var remark=$("#pointRemark").val();
        var areaCode=$("#pointCode").val();
        var areaName=$("#pointArea").val();
        var origin=$("#pointOrigin").val();
        var fillBy=$("#pointBy").val();
        //var fillCreateTime=$("#pointDate").val();
        var fillUnit=$("#pointUnit").val();
        var checkBy=$("#pointCheck").val();
        //var checkTime=$("#pointTime").val();
        if($("#seawallPointAdd-pop").find("div.seawallPoint-imgList").css("display")==="none"){
            seawallPointImgList.splice(0,seawallPointImgList.length);
        }else{
            seawallPointImgList=seawallPointImgList;
        }
        var imgList;
        if(seawallPointImgList.length>6){
            imgList=seawallPointImgList.slice(-6);
        }else{
            imgList=seawallPointImgList;
        }
        $.ajax({
            url: srcPath + "admin/seawall/point/save",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "subSeawallId":subId,
                "pointNumber": pointNumber,
                "longitude":longitude,
                "latitude":latitude,
                "height":height,
                "waveWallHeight":waveWallHeight,
                "picArr":imgList,
                "remark":remark,
                "areaCode":areaCode,
                "areaName":areaName,
                "origin":origin,
                "fillBy":fillBy,
                "fillCreateTime":pointDateAdd,
                "fillUnit":fillUnit,
                "checkBy":checkBy,
                "checkTime":pointTimeAdd
            }),
            success: function (data) {
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                if(data.code==200){
                    $(".overlay",window.parent.document).hide();
                    $("#seawallPointAdd-pop").hide();
                    $("#seawallPoint-add").removeClass("seawall-tab-click");
                    $("#seawallPointAdd-pop").find("input.add-input").val("");
                    $("#seawallPointAdd-pop .seawallPoint-imgList").hide();
                    $("#seawallPointAdd-pop .seawallPoint-imgList").html("");
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    },1000);
                    seawallPointPage(1,10,subId);
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
    //测量点详情
    $("#seawallDotInfo-close").click(function () {
        $("#seawallPointInfo-pop").hide();
        $(".overlay",window.parent.document).hide();
    });
    $("#seawallDotInfo-sure").click(function () {
        $("#seawallPointInfo-pop").hide();
        $(".overlay",window.parent.document).hide();
    });
    function tableInfo(){
        $(".table-infoIcon").click(function () {
            var id=$(this).parent().siblings("td").eq(1).text();
            $("#seawallPointInfo-pop").show();
            $(".overlay",window.parent.document).show();
            $.ajax({
                url: srcPath + "admin/seawall/point/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    if(data.data.pointNumber==""||data.data.pointNumber==null||data.data.pointNumber==undefined){
                        data.data.pointNumber="无";
                    }else{
                        data.data.pointNumber=data.data.pointNumber;
                    }
                    if(data.data.longitude==""||data.data.longitude==null||data.data.longitude==undefined){
                        data.data.longitude="无";
                    }else{
                        data.data.longitude=data.data.longitude;
                    }
                    if(data.data.latitude==""||data.data.latitude==null||data.data.latitude==undefined){
                        data.data.latitude="无";
                    }else{
                        data.data.latitude=data.data.latitude;
                    }
                    if(data.data.height==""||data.data.height==null||data.data.height==undefined){
                        data.data.height="无";
                    }else{
                        data.data.height=data.data.height;
                    }
                    if(data.data.waveWallHeight==""||data.data.waveWallHeight==null||data.data.waveWallHeight==undefined){
                        data.data.waveWallHeight="无";
                    }else{
                        data.data.waveWallHeight=data.data.waveWallHeight;
                    }
                    if(data.data.areaCode==""||data.data.areaCode==null||data.data.areaCode==undefined){
                        data.data.areaCode="无";
                    }else{
                        data.data.areaCode=data.data.areaCode;
                    }
                    if(data.data.areaName==""||data.data.areaName==null||data.data.areaName==undefined){
                        data.data.areaName="无";
                    }else{
                        data.data.areaName=data.data.areaName;
                    }
                    if(data.data.origin==""||data.data.origin==null||data.data.origin==undefined){
                        data.data.origin="无";
                    }else{
                        data.data.origin=data.data.origin;
                    }
                    if(data.data.fillBy==""||data.data.fillBy==null||data.data.fillBy==undefined){
                        data.data.fillBy="无";
                    }else{
                        data.data.fillBy=data.data.fillBy;
                    }
                    if(data.data.fillCreateTime==""||data.data.fillCreateTime==null||data.data.fillCreateTime==undefined){
                        data.data.fillCreateTime="无";
                    }else{
                        data.data.fillCreateTime=new Date(data.data.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(data.data.fillUnit==""||data.data.fillUnit==null||data.data.fillUnit==undefined){
                        data.data.fillUnit="无";
                    }else{
                        data.data.fillUnit=data.data.fillUnit;
                    }
                    if(data.data.checkBy==""||data.data.checkBy==null||data.data.checkBy==undefined){
                        data.data.checkBy="无";
                    }else{
                        data.data.checkBy=data.data.checkBy;
                    }
                    if(data.data.checkTime==""||data.data.checkTime==null||data.data.checkTime==undefined){
                        data.data.checkTime="无";
                    }else{
                        data.data.checkTime=new Date(data.data.checkTime).Format("yyyy-MM-dd");
                    }
                    if(data.data.remark==""||data.data.remark==null||data.data.remark==undefined){
                        data.data.remark="无";
                    }else{
                        data.data.remark=data.data.remark;
                    }
                    $("#pointNumberInfo").val(data.data.pointNumber);
                    $("#pointLonInfo").val(data.data.longitude);
                    $("#pointLatInfo").val(data.data.latitude);
                    $("#pointHeightInfo").val(data.data.height);
                    $("#pointWallInfo").val(data.data.waveWallHeight);
                    $("#pointCodeInfo").val(data.data.areaCode);
                    $("#pointAreaInfo").val(data.data.areaName);
                    $("#pointOriginInfo").val(data.data.origin);
                    $("#pointByInfo").val(data.data.fillBy);
                    $("#pointDateInfo").val(data.data.fillCreateTime);
                    $("#pointUnitInfo").val(data.data.fillUnit);
                    $("#pointCheckInfo").val(data.data.checkBy);
                    $("#pointTimeInfo").val(data.data.checkTime);
                    $("#pointRemarkInfo").val(data.data.remark);
                    var imgList;
                    if(data.data.picArray==""||data.data.picArray==null||data.data.picArray==undefined){
                        imgList="";
                    }else {
                        var imgListItem="";
                        for(var i=0;i<data.data.picArray.length;i++){
                            imgListItem=imgListItem+"<div class=\"seawall-info-imgItem\">\n" +
                                "                                    <img src=\""+data.data.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"seawall-info-img\">\n" +
                            "                            <div class=\"seawall-info-imgShow\">\n" +
                            "                                <img src=\""+data.data.picArray[0].suffixUrl+"\"/>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-imgList\">\n" + imgListItem +
                            "                            </div>\n" +
                            "                        </div>";
                    }
                    $(".seawallPointInfo-imgList").html(imgList);
                    //图片切换
                    $(".seawall-info-imgItem").click(function () {
                        var imgSrc=$(this).find("img").attr("src");
                        $(".seawall-info-imgShow").find("img").attr("src",imgSrc);
                    });
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    }
    //测量点修改
    $("#seawallDotEdit-close").click(function () {
        $(".overlay",window.parent.document).hide();
        $("#seawallPointEdit-pop").hide();
        $("#seawallPointEdit-pop .seawallPoint-imgList").hide();
        $("#seawallPointEdit-pop .seawallPoint-imgList").html("");
    });
    var $seawallPointUploadEdit =  $("#seawallPoint-uploadEdit");
    $seawallPointUploadEdit.change(function () {
        if($(this).val() != ""){
            seawallPointUploadEdit(this);
        }
    });
    function seawallPointUploadEdit(ele){
        var files = $(ele)[0].files;
        if (seawallPointImgLists.length + files.length > 6) {
            $(".seawallPoint-tips").show();
            $(".seawallPoint-tips").find("span").text("最多只能上传6张图片，请重新上传");
            setTimeout(function () {
                $(".seawallPoint-tips").hide();
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
            $(".seawallPoint-tips").show();
            $(".seawallPoint-tips").find("span").text(errorText);
            setTimeout(function () {
                $(".seawallPoint-tips").hide();
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
                    $("#seawallPointEdit-pop .seawallPoint-imgList").show();
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
                        seawallPointImgLists.push(dataJson[i].url);
                    }
                    if (seawallPointImgLists.length >= 6) {
                        $seawallPointUploadEdit.attr('disabled', true);
                        $seawallPointUploadEdit.parents('.upload-btn').css('background-color', '#999');
                    }
                    $("#seawallPointEdit-pop .seawallPoint-imgList").append(imgList);
                    uploadImgDelEditPoint();
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
    function uploadImgDelEditPoint(){
        $(".seawallNumber-imgItem").hover(function(){
            var href=$(this).find("span.suffixUrl").text();
            $(this).addClass("upload-hover");
            $(this).append("<p id='pic'><img src='"+href+"' id='pic1'></p>");
            $("#seawallPointEdit-pop .seawallNumber-imgItem").mousemove(function(e){
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
            if(seawallPointImgLists.indexOf(url) == "-1"){

            }else{
                seawallPointImgLists.splice(seawallPointImgLists.indexOf(url),1);
                if (seawallPointImgLists.length < 6) {
                    $seawallPointUploadEdit.attr('disabled', false);
                    $seawallPointUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                }
            }
        });
    }
    var pointDateEdit,pointTimeEdit;
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem:'#pointDateEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#pointDateEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#pointDateEdit").val(value);
                pointDateEdit=Date.parse(value);
            }
        });
        laydate.render({
            elem:'#pointTimeEdit',//指定元素
            change:function(value,data){//监听日期变换
                lay("#pointTimeEdit").val(value);
            },
            done:function(value,date){//日期选择完毕之后的函数
                $("#pointTimeEdit").val(value);
                pointTimeEdit=Date.parse(value);
            }
        });
    });
    var pointId;
    function tableEdit(){
        $(".table-editIcon").click(function () {
            seawallPointImgLists.splice(0,seawallPointImgLists.length);
            imgPointListOld.splice(0,imgPointListOld.length);
            pointId=$(this).parent().siblings("td").eq(1).text();
            $("#seawallPointEdit-pop").show();
            $(".overlay",window.parent.document).show();
            $.ajax({
                url: srcPath + "admin/seawall/point/detail",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "id": pointId
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    var subPointData=data;
                    if(subPointData.data.pointNumber==""||subPointData.data.pointNumber==null||subPointData.data.pointNumber==undefined){
                        subPointData.data.pointNumber="";
                    }else{
                        subPointData.data.pointNumber=subPointData.data.pointNumber;
                    }
                    if(subPointData.data.longitude==""||subPointData.data.longitude==null||subPointData.data.longitude==undefined){
                        subPointData.data.longitude="";
                    }else{
                        subPointData.data.longitude=subPointData.data.longitude;
                    }
                    if(subPointData.data.latitude==""||subPointData.data.latitude==null||subPointData.data.latitude==undefined){
                        subPointData.data.latitude="";
                    }else{
                        subPointData.data.latitude=subPointData.data.latitude;
                    }
                    if(subPointData.data.height==""||subPointData.data.height==null||subPointData.data.height==undefined){
                        subPointData.data.height="";
                    }else{
                        subPointData.data.height=subPointData.data.height;
                    }
                    if(subPointData.data.waveWallHeight==""||subPointData.data.waveWallHeight==null||subPointData.data.waveWallHeight==undefined){
                        subPointData.data.waveWallHeight="";
                    }else{
                        subPointData.data.waveWallHeight=subPointData.data.waveWallHeight;
                    }
                    if(subPointData.data.areaCode==""||subPointData.data.areaCode==null||subPointData.data.areaCode==undefined){
                        subPointData.data.areaCode="";
                    }else{
                        subPointData.data.areaCode=subPointData.data.areaCode;
                    }
                    if(subPointData.data.areaName==""||subPointData.data.areaName==null||subPointData.data.areaName==undefined){
                        subPointData.data.areaName="";
                    }else{
                        subPointData.data.areaName=subPointData.data.areaName;
                    }
                    if(subPointData.data.origin==""||subPointData.data.origin==null||subPointData.data.origin==undefined){
                        subPointData.data.origin="";
                    }else{
                        subPointData.data.origin=subPointData.data.origin;
                    }
                    if(subPointData.data.fillBy==""||subPointData.data.fillBy==null||subPointData.data.fillBy==undefined){
                        subPointData.data.fillBy="";
                    }else{
                        subPointData.data.fillBy=subPointData.data.fillBy;
                    }
                    if(subPointData.data.fillCreateTime==""||subPointData.data.fillCreateTime==null||subPointData.data.fillCreateTime==undefined){
                        subPointData.data.fillCreateTime="";
                    }else{
                        subPointData.data.fillCreateTime=new Date(subPointData.data.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(subPointData.data.fillUnit==""||subPointData.data.fillUnit==null||subPointData.data.fillUnit==undefined){
                        subPointData.data.fillUnit="";
                    }else{
                        subPointData.data.fillUnit=subPointData.data.fillUnit;
                    }
                    if(subPointData.data.checkBy==""||subPointData.data.checkBy==null||subPointData.data.checkBy==undefined){
                        subPointData.data.checkBy="";
                    }else{
                        subPointData.data.checkBy=subPointData.data.checkBy;
                    }
                    if(subPointData.data.checkTime==""||subPointData.data.checkTime==null||subPointData.data.checkTime==undefined){
                        subPointData.data.checkTime="";
                    }else{
                        subPointData.data.checkTime=new Date(subPointData.data.checkTime).Format("yyyy-MM-dd");
                    }
                    if(subPointData.data.remark==""||subPointData.data.remark==null||subPointData.data.remark==undefined){
                        subPointData.data.remark="";
                    }else{
                        subPointData.data.remark=subPointData.data.remark;
                    }
                    $("#pointNumberEdit").val(subPointData.data.pointNumber);
                    $("#pointLonEdit").val(subPointData.data.longitude);
                    $("#pointLatEdit").val(subPointData.data.latitude);
                    $("#pointHeightEdit").val(subPointData.data.height);
                    $("#pointWallEdit").val(subPointData.data.waveWallHeight);
                    $("#pointRemarkEdit").val(subPointData.data.remark);
                    $("#pointCodeEdit").val(subPointData.data.areaCode);
                    $("#pointAreaEdit").val(subPointData.data.areaName);
                    $("#pointOriginEdit").val(subPointData.data.origin);
                    $("#pointByEdit").val(subPointData.data.fillBy);
                    $("#pointDateEdit").val(subPointData.data.fillCreateTime);
                    $("#pointUnitEdit").val(subPointData.data.fillUnit);
                    $("#pointCheckEdit").val(subPointData.data.checkBy);
                    $("#pointTimeEdit").val(subPointData.data.checkTime);
                    if(data.data.picArray==""||data.data.picArray==null||data.data.picArray==undefined){
                        $seawallPointUploadEdit.attr('disabled', false);
                        $seawallPointUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                    }else{
                        // for(var i=0;i<data.data.picArray.length;i++){
                        //     var imgSrc="/image"+(data.data.picArray[i]).split("image")[1];
                        //     imgPointListOld.push(imgSrc);
                        // }
                        var imgList="";
                        for(var i=0;i<data.data.picArray.length;i++){
                            imgList=imgList+"<div class=\"seawallNumber-imgItem\">\n" +
                                "                                    <i class=\"iconfont upload-imgIcon\">&#xeac5;</i>\n" +
                                "                                    <span>"+data.data.picArray[i].name+"</span>\n" +
                                "                                    <span class=\"url\" style='display:none;'>"+data.data.picArray[i].url+"</span>\n" +
                                "                                    <span class=\"suffixUrl\" style='display:none;'>"+data.data.picArray[i].suffixUrl+"</span>\n" +
                                "                                    <i class=\"iconfont uploadIcon upload-successIcon\">&#xe606;</i>\n" +
                                "                                    <i class=\"iconfont uploadIcon upload-delIcon\">&#xeaf2;</i>\n" +
                                "                                </div>\n";
                            seawallPointImgLists.push(data.data.picArray[i].url);
                        }
                        if (seawallPointImgLists.length >= 6) {
                            $seawallPointUploadEdit.attr('disabled', true);
                            $seawallPointUploadEdit.parents('.upload-btn').css('background-color', '#999');
                        }else{
                            $seawallPointUploadEdit.attr('disabled', false);
                            $seawallPointUploadEdit.parents('.upload-btn').css('background-color', 'rgba(28,155,201,1)');
                        }
                        $("#seawallPointEdit-pop .seawallPoint-imgList").show().append(imgList);
                        uploadImgDelEditPoint();
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
            $("#seawallDotEdit-sure").click(function () {
                if($("#seawallPointEdit-pop").find("div.seawallPoint-imgList").css("display")=="none"){
                    seawallPointImgLists.splice(0,seawallPointImgLists.length)
                }else{
                    seawallPointImgLists=seawallPointImgLists;
                }
                seawallPointImgListEdit=imgPointListOld.concat(seawallPointImgLists);
                var pointNumber=$("#pointNumberEdit").val();
                var longitude=$("#pointLonEdit").val();
                var latitude=$("#pointLatEdit").val();
                var height=$("#pointHeightEdit").val();
                var waveWallHeight=$("#pointWallEdit").val();
                var remark=$("#pointRemarkEdit").val();
                var areaCode=$("#pointCodeEdit").val();
                var areaName=$("#pointAreaEdit").val();
                var origin=$("#pointOriginEdit").val();
                var fillBy=$("#pointByEdit").val();
                //var fillCreateTime=$("#pointDateEdit").val();
                var fillUnit=$("#pointUnitEdit").val();
                var checkBy=$("#pointCheckEdit").val();
                //var checkTime=$("#pointTimeEdit").val();
                var imgList;
                if(seawallPointImgListEdit.length>6){
                    imgList=seawallPointImgListEdit.slice(-6);
                }else{
                    imgList=seawallPointImgListEdit;
                }
                $.ajax({
                    url: srcPath + "admin/seawall/point/save",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "subSeawallId":subId,
                        "id":pointId,
                        "pointNumber": pointNumber,
                        "longitude":longitude,
                        "latitude":latitude,
                        "height":height,
                        "waveWallHeight":waveWallHeight,
                        "picArr":imgList,
                        "remark":remark,
                        "areaCode":areaCode,
                        "areaName":areaName,
                        "origin":origin,
                        "fillBy":fillBy,
                        "fillCreateTime":pointDateEdit,
                        "fillUnit":fillUnit,
                        "checkBy":checkBy,
                        "checkTime":pointTimeEdit
                    }),
                    success: function (data) {
                        if(data.code=="-2"){
                            window.parent.location.href="../login.html";
                        }
                        console.log(data);
                        if(data.code==200){
                            $(".overlay",window.parent.document).hide();
                            $("#seawallPointEdit-pop").hide();
                            $("#seawallPointEdit-pop .seawallPoint-imgList").hide();
                            $("#seawallPointEdit-pop .seawallPoint-imgList").html("");
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            seawallPointPage(1,10,subId);
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
    //测量点删除
    function tableDel(){
        var ids=[];
        $(".table-delIcon").click(function () {
            var id=$(this).parent().siblings("td").eq(1).text();
            ids.push(id);
            $("#seawallPointDel-pop").show();
            $("#seawallPointDel-sure").click(function () {
                $.ajax({
                    url: srcPath + "admin/seawall/point/delete",
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
                        if(data.code=="-2"){
                            window.parent.location.href="../login.html";
                        }
                        console.log(data);
                        if(data.code==200){
                            $("#seawallPointDel-pop").hide();
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            seawallPointPage(1,10,subId);
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
    //测量点批量删除
    $("#seawallPoint-delAll").click(function () {
        $("#seawallPointDelAll-pop").show();
        if(seawallPointIds==""){
            $("#seawallPointDelAll-pop").find("div.del-content").html("至少选择一项才可以进行批量操作！");
            $("#seawallPointDelAll-sure").hide();
        }else{
            $("#seawallPointDelAll-pop").find("div.del-content").html("确定对所选的内容进行删除吗？");
            $("#seawallPointDelAll-sure").show();
        }
        $("#seawallPointDelAll-sure").click(function () {
            $.ajax({
                url: srcPath + "admin/seawall/point/delete",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "ids": seawallPointIds
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    console.log(data);
                    if(data.code==200){
                        $("#seawallPoint-delAll").removeClass("seawall-tab-click");
                        $("#seawallPointDelAll-pop").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        seawallPointPage(1,10,subId);
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
    //删除
    $(".del-btnIcon").click(function () {
        $(this).parent().parent().hide();
        $("#seawallNumber-export").removeClass("table-menuClick");
        $("#seawallPoint-export").removeClass("table-menuClick");
    });
    $(".delAll-close").click(function () {
        $(this).parent().parent().hide();
        $("#seawallNumber-export").removeClass("table-menuClick");
        $("#seawallPoint-export").removeClass("table-menuClick");
    });
    //表格行双击获取详细信息
    function infoDoubleClick(){
        $("#seawallPoint-table").find("tbody tr").dblclick(function(){
            var id=$(this).find("td").eq(1).text();
            $("#seawallPointInfo-pop").show();
            $(".overlay",window.parent.document).show();
            $.ajax({
                url: srcPath + "admin/seawall/point/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }
                    if(data.data.pointNumber==""||data.data.pointNumber==null||data.data.pointNumber==undefined){
                        data.data.pointNumber="无";
                    }else{
                        data.data.pointNumber=data.data.pointNumber;
                    }
                    if(data.data.longitude==""||data.data.longitude==null||data.data.longitude==undefined){
                        data.data.longitude="无";
                    }else{
                        data.data.longitude=data.data.longitude;
                    }
                    if(data.data.latitude==""||data.data.latitude==null||data.data.latitude==undefined){
                        data.data.latitude="无";
                    }else{
                        data.data.latitude=data.data.latitude;
                    }
                    if(data.data.height==""||data.data.height==null||data.data.height==undefined){
                        data.data.height="无";
                    }else{
                        data.data.height=data.data.height;
                    }
                    if(data.data.waveWallHeight==""||data.data.waveWallHeight==null||data.data.waveWallHeight==undefined){
                        data.data.waveWallHeight="无";
                    }else{
                        data.data.waveWallHeight=data.data.waveWallHeight;
                    }
                    if(data.data.areaCode==""||data.data.areaCode==null||data.data.areaCode==undefined){
                        data.data.areaCode="无";
                    }else{
                        data.data.areaCode=data.data.areaCode;
                    }
                    if(data.data.areaName==""||data.data.areaName==null||data.data.areaName==undefined){
                        data.data.areaName="无";
                    }else{
                        data.data.areaName=data.data.areaName;
                    }
                    if(data.data.origin==""||data.data.origin==null||data.data.origin==undefined){
                        data.data.origin="无";
                    }else{
                        data.data.origin=data.data.origin;
                    }
                    if(data.data.fillBy==""||data.data.fillBy==null||data.data.fillBy==undefined){
                        data.data.fillBy="无";
                    }else{
                        data.data.fillBy=data.data.fillBy;
                    }
                    if(data.data.fillCreateTime==""||data.data.fillCreateTime==null||data.data.fillCreateTime==undefined){
                        data.data.fillCreateTime="无";
                    }else{
                        data.data.fillCreateTime=new Date(data.data.fillCreateTime).Format("yyyy-MM-dd");
                    }
                    if(data.data.fillUnit==""||data.data.fillUnit==null||data.data.fillUnit==undefined){
                        data.data.fillUnit="无";
                    }else{
                        data.data.fillUnit=data.data.fillUnit;
                    }
                    if(data.data.checkBy==""||data.data.checkBy==null||data.data.checkBy==undefined){
                        data.data.checkBy="无";
                    }else{
                        data.data.checkBy=data.data.checkBy;
                    }
                    if(data.data.checkTime==""||data.data.checkTime==null||data.data.checkTime==undefined){
                        data.data.checkTime="无";
                    }else{
                        data.data.checkTime=new Date(data.data.checkTime).Format("yyyy-MM-dd");
                    }
                    if(data.data.remark==""||data.data.remark==null||data.data.remark==undefined){
                        data.data.remark="无";
                    }else{
                        data.data.remark=data.data.remark;
                    }
                    $("#pointNumberInfo").val(data.data.pointNumber);
                    $("#pointLonInfo").val(data.data.longitude);
                    $("#pointLatInfo").val(data.data.latitude);
                    $("#pointHeightInfo").val(data.data.height);
                    $("#pointWallInfo").val(data.data.waveWallHeight);
                    $("#pointCodeInfo").val(data.data.areaCode);
                    $("#pointAreaInfo").val(data.data.areaName);
                    $("#pointOriginInfo").val(data.data.origin);
                    $("#pointByInfo").val(data.data.fillBy);
                    $("#pointDateInfo").val(data.data.fillCreateTime);
                    $("#pointUnitInfo").val(data.data.fillUnit);
                    $("#pointCheckInfo").val(data.data.checkBy);
                    $("#pointTimeInfo").val(data.data.checkTime);
                    $("#pointRemarkInfo").val(data.data.remark);
                    var imgList;
                    if(data.data.picArray==""||data.data.picArray==null||data.data.picArray==undefined){
                        imgList="";
                    }else {
                        var imgListItem="";
                        for(var i=0;i<data.data.picArray.length;i++){
                            imgListItem=imgListItem+"<div class=\"seawall-info-imgItem\">\n" +
                                "                                    <img src=\""+data.data.picArray[i].suffixUrl+"\"/>\n" +
                                "                                </div>";
                        }
                        imgList="<div class=\"seawall-info-img\">\n" +
                            "                            <div class=\"seawall-info-imgShow\">\n" +
                            "                                <img src=\""+data.data.picArray[0].suffixUrl+"\"/>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"seawall-info-imgList\">\n" + imgListItem +
                            "                            </div>\n" +
                            "                        </div>";
                    }
                    $(".seawallPointInfo-imgList").html(imgList);
                    //图片切换
                    $(".seawall-info-imgItem").click(function () {
                        var imgSrc=$(this).find("img").attr("src");
                        $(".seawall-info-imgShow").find("img").attr("src",imgSrc);
                    });
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    }
    //堤防分段导出
    $("#seawallNumber-export").click(function () {
        var name=$("#seawallSearch").val();
        $("#exportNumber-pop").show();
        $("#exportNumberSure").click(function () {
            $("#loading").show();
            $(".overlayOpacity",window.parent.document).show();
            var url=srcPath + "admin/seawall/export?name="+name;
            $.ajax({
                url: srcPath + "admin/seawall/export?name="+name,
                type: "get",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    $("#loading").hide();
                    $(".overlayOpacity",window.parent.document).hide();
                    $("#exportNumber-pop").hide();
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
    //测量点分段导出
    $("#seawallPoint-export").click(function () {
        var name=$("#seawallSearch").val();
        $("#exportPoint-pop").show();
        $("#exportPointSure").click(function () {
            $("#loading").show();
            $(".overlayOpacity",window.parent.document).show();
            var url=srcPath + "admin/seawall/point/export?name="+name;
            $.ajax({
                url: srcPath + "admin/seawall/point/export?name="+name,
                type: "get",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    $("#loading").hide();
                    $(".overlayOpacity",window.parent.document).hide();
                    $("#exportPoint-pop").hide();
                    if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function () {
                            $("#fail").hide();
                        },1000);
                    }else {
                        window.location.href = url;
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        });
    });
});