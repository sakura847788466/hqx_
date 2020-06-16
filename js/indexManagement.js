function resize() {
    var width=window.innerWidth;
    var height=window.innerHeight;
    $(".left").css("height",height);
    $(".right").css({width:width-288,height:height});
    $(".right-main").css("height",height-32);
    $(".menu-content").css("height",height-150);
    $(".menu-table").css({width:width-560,height:height-32});
    $(".forecast-box").css({width:width-320,height:height-32});
    $(".account-showBox").css({left:(width-560)/2,top:(height-504)/2});
    $(".delAll-pop").css({left:(width-400)/2,top:(height-240)/2});
    $(".info-pop").css({left:(width-800)/2,top:(height-680)/2});
    $(".disaster-showBox").css({left:(width-800)/2,top:(height-680)/2});
    $(".add-tip-txt").css({left:(width-120)/2,top:(height-30)/2});
    $(".totalPop").css({left:(width-400)/2,top:15});
    $(".equipment-addAlert").css({left:(width-400)/2,top:(height-48)/2});
    $(".loadingBox").css("top",(height-32)/2);
    $(".info-body").css("height",height*0.80);
    window.onresize=function () {
        $(".left").css("height",height);
        $(".right").css({width:width-288,height:height});
        $(".right-main").css("height",height-32);
        $(".menu-content").css("height",height-150);
        $(".menu-table").css({width:width-560,height:height-32});
        $(".forecast-box").css({width:width-320,height:height-32});
        $(".account-showBox").css({left:(width-560)/2,top:(height-504)/2});
        $(".delAll-pop").css({left:(width-400)/2,top:(height-240)/2});
        $(".info-pop").css({left:(width-800)/2,top:(height-680)/2});
        $(".disaster-showBox").css({left:(width-800)/2,top:(height-680)/2});
        $(".add-tip-txt").css({left:(width-120)/2,top:(height-30)/2});
        $(".totalPop").css({left:(width-400)/2,top:15});
        $(".equipment-addAlert").css({left:(width-400)/2,top:(height-48)/2});
        $(".loadingBox").css("top",(height-32)/2);
        $(".info-body").css("height",height*0.80);
    }
}
$(function () {
    var loginName=sessionStorage.getItem('userName');
    var loginPass=sessionStorage.getItem('password');
    if(loginName==null||loginPass==null){
        window.location.href="login.html";
    }else{

    }
   resize();
   //切换到决策系统
    $(".nav-change").click(function () {
        window.location.href="index.html";
    });
    var screenWidth=window.innerWidth;
    var screenHeight=window.innerHeight;
    //导航栏放大缩小切换
    $(".nav-open").click(function () {
        $(this).hide();
        $(".nav-close").show();
        $('.nav-control').css("width",89);
        $(".left").addClass("small-menu");
        $(".right").css({width:screenWidth-89,height:screenHeight,left:89});
        $(".menu-table").css("width",screenWidth-361);
        $(".forecast-box").css("width",screenWidth-121);
        //子页面遮罩层
        $(".overlay-left").css("width",345);
        $(".overlay-top").css("left",345);
        $(".overlay-bottom").css("left",345);
        $(".overlayForcast-left").css("width",105);
        $(".overlayForcast-top").css("left",105);
        $(".overlayForcast-bottom").css("left",105);
        $(".overlayPreview-left").css("width",105);
        $(".overlayPreview-top").css("left",105);
        $(".overlayPreview-bottom").css("left",105);
    });
    $(".nav-close").click(function () {
        $(this).hide();
        $(".nav-open").show();
        $('.nav-control').css("width",288);
        $(".left").removeClass("small-menu");
        $(".right").css({width:screenWidth-288,height:screenHeight,left:288});
        $(".menu-table").css("width",screenWidth-560);
        $(".forecast-box").css("width",screenWidth-320);
        //子页面遮罩层
        $(".overlay-left").css("width",544);
        $(".overlay-top").css("left",544);
        $(".overlay-bottom").css("left",544);
        $(".overlayForcast-left").css("width",304);
        $(".overlayForcast-top").css("left",304);
        $(".overlayForcast-bottom").css("left",304);
        $(".overlayPreview-left").css("width",304);
        $(".overlayPreview-top").css("left",304);
        $(".overlayPreview-bottom").css("left",304);
    });
    //导航栏菜单选择
    $(".nav-item").click(function () {
        var id=$(this).attr("id");
        $(".nav-item").removeClass("nav-click");
        $(this).addClass("nav-click");
        $(".right-main").hide();
        $("#"+id+"-box").show();
    });
    $("#hazard-nav").trigger("click");
    //菜单列表选择
    $(".menu-item").click(function () {
        $(".menu-item").removeClass("menu-click");
        $(this).addClass("menu-click");
        var txt=$(this).text();
        if(txt == "堤防工程"){
            $("#menuTable").attr("src","managePage/seawall.html");
        }else if(txt == "水闸"){
            $("#menuTable").attr("src","managePage/flood.html");
        }else if(txt == "泵站"){
            $("#menuTable").attr("src","managePage/pump.html");
        }else if(txt == "渔港"){
            $("#menuTable").attr("src","managePage/fishPort.html");
        }else if(txt == "避风锚地"){
            $("#menuTable").attr("src","managePage/haven.html");
        }else if(txt == "港口码头"){
            $("#menuTable").attr("src","managePage/wharf.html");
        }else if(txt == "机场"){
            $("#menuTable").attr("src","managePage/airport.html");
        }else if(txt == "主要公路"){
            $("#menuTable").attr("src","managePage/highway.html");
        }else if(txt == "铁路"){
            $("#menuTable").attr("src","managePage/railway.html");
        }else if(txt == "发电设施"){
            $("#menuTable").attr("src","managePage/electricity.html");
        }else if(txt == "变电设施"){
            $("#menuTable").attr("src","managePage/power.html");
        }else if(txt == "钢铁基地"){
            $("#menuTable").attr("src","managePage/steel.html");
        }else if(txt == "石油化工基地工程"){
            $("#menuTable").attr("src","managePage/petroleum.html");
        }else if(txt == "油气运输管道"){
            $("#menuTable").attr("src","managePage/pipeline.html");
        }else if(txt == "危险化学品设施"){
            $("#menuTable").attr("src","managePage/chemical.html");
        }else if(txt == "物资储备基地"){
            $("#menuTable").attr("src","managePage/material.html");
        }else if(txt == "工业园区"){
            $("#menuTable").attr("src","managePage/industry.html");
        }else if(txt == "旅游娱乐区"){
            $("#menuTable").attr("src","managePage/tourism.html");
        }else if(txt == "自然保护区"){
            $("#menuTable").attr("src","managePage/naturalReserve.html");
        }else if(txt == "修造船厂"){
            $("#menuTable").attr("src","managePage/ship.html");
        }else if(txt == "医院"){
            $("#menuTable").attr("src","managePage/hospital.html");
        }else if(txt == "学校"){
            $("#menuTable").attr("src","managePage/school.html");
        }else if(txt == "社会经济状况"){
            $("#menuTable").attr("src","managePage/economy.html");
        }else if(txt == "人口聚集区"){
            $("#menuTable").attr("src","managePage/population.html");
        }else if(txt == "避灾点"){
            $("#menuTable").attr("src","managePage/disasterPoint.html");
        }else if(txt == "航标信息"){
            $("#menuTable").attr("src","managePage/navigation.html");
        }
    });
    $(".menu-item").eq(0).trigger("click");
    //表格操作
    $(".table-menuItem").click(function () {
        $(this).toggleClass("table-menuClick");
    });
});