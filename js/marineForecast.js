function resize() {
    var height=window.parent.document.body.clientHeight;
    var width=window.parent.document.body.clientWidth;
    $(".showBox").css({left:(width-905)/2-150,top:(height-680)/2});
    $(".showBoxLarge").css({left:(width-905)/2-150,top:(height-720)/2});
    $(".totalPop").css({left:(width-400)/2-150,top:15});
    $(".delAll-pop").css({left:(width-400)/2-150,top:(height-240)/2});
    $(".loadingBox").css({left:0,top:(height-48)/2});
    window.onresize=function () {
        $(".showBox").css({left:(width-905)/2-150,top:(height-680)/2});
        $(".showBoxLarge").css({left:(width-905)/2-150,top:(height-720)/2});
        $(".totalPop").css({left:(width-400)/2-150,top:15});
        $(".delAll-pop").css({left:(width-400)/2-150,top:(height-240)/2});
        $(".loadingBox").css({left:0,top:(height-48)/2});
    }
}
$(function(){
    var loginName=sessionStorage.getItem('userName');
    var loginPass=sessionStorage.getItem('password');
    if(loginName==null||loginPass==null){
        window.location.href="../login.html";
    }else{

    }
    resize();
    var width=$(".forecast-box",window.parent.document).width();
    var height=$(".forecast-box",window.parent.document).height();
    //导航栏放大缩小切换
    $(".nav-open",window.parent.document).click(function () {
        $(".showBox").css({left:(width-905)/2-150,top:(height-680)/2});
        $(".showBoxLarge").css({left:(width-905)/2-150,top:(height-720)/2});
        if(width>1600){
            $(".previewContent").css({left:width*0.41,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.31,bottom:(height-733)/2});
        }else{
            $(".previewContent").css({left:width*0.38,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.26,bottom:(height-733)/2});
        }
        $(".previewBtn").css("left",width*0.48);
    });
    $(".nav-close",window.parent.document).click(function () {
        $(".showBox").css({left:(width-905)/2-270,top:(height-680)/2});
        $(".showBoxLarge").css({left:(width-905)/2-270,top:(height-720)/2});
        if(width>1600){
            $(".previewContent").css({left:width*0.29,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.21,bottom:(height-733)/2});
        }else{
            $(".previewContent").css({left:width*0.25,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.14,bottom:(height-733)/2});
        }
        $(".previewBtn").css("left",width*0.36);
    });
    if($(".left",window.parent.document).hasClass("small-menu")){
        $(".showBox").css({left:(width-905)/2-150,top:(height-680)/2});
        $(".showBoxLarge").css({left:(width-905)/2-150,top:(height-720)/2});
        if(width>1600){
            $(".previewContent").css({left:width*0.41,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.31,bottom:(height-733)/2});
        }else{
            $(".previewContent").css({left:width*0.38,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.26,bottom:(height-733)/2});
        }
        $(".previewBtn").css("left",width*0.48);
    }else{
        $(".showBox").css({left:(width-905)/2-270,top:(height-680)/2});
        $(".showBoxLarge").css({left:(width-905)/2-270,top:(height-720)/2});
        if(width>1600){
            $(".previewContent").css({left:width*0.29,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.21,bottom:(height-733)/2});
        }else{
            $(".previewContent").css({left:width*0.25,bottom:(height-717)/2});
            $(".previewContentThree").css({left:width*0.14,bottom:(height-733)/2});
        }
        $(".previewBtn").css("left",width*0.36);
    }

    //每日预报单制作、三日预报单制作其他信息
    $(".form-item-tip").click(function(){
        $(".form-other").toggle();
    });

    //弹窗公共操作
    $(".close-btn").click(function(){
        $(this).parent().parent().parent().hide();
        $(".overlayForcast",window.parent.document).hide();
        $("#numberOneAdd").val("");
        $("#titleOneAdd").val("");
        $("#messageOneAdd").val("");
        $("#numberThreeAdd").val("");
        $("#titleThreeAdd").val("");
        $(".form-table-input").val("");
        $(".pop-tips").hide().find("span").html("");
    });
    $(".delAll-close").click(function(){
        $(this).parent().parent().hide();
    });
    $(".delclose-btn").click(function(){
        $(this).parent().parent().hide();
    });
    //潮汐、海浪、海面风、水温切换
    $(".form-title-item").click(function(){
        var index=$(this).index();
        $(this).addClass("form-title-click").siblings().removeClass("form-title-click");
        $(this).parent().siblings(".form-tab-body").find(".form-body-item").eq(index).show().siblings().hide();
    });
    //每日预报单制作、三天预报单制作详情弹窗关闭
    $("#forecastPreviewOneInfo").click(function(){
        $(this).parent().parent().parent().hide();
    });
    $("#forecastPreviewThreeInfo").click(function(){
        $(this).parent().parent().parent().hide();
    });

    //普通邮件、发送记录、通讯录切换
    $(".email-title-item").click(function(){
        var index=$(this).index();
        $(this).addClass("email-title-click").siblings().removeClass("email-title-click");
        $(".email-body-item").eq(index).show().siblings().hide();
    });

    /***************普通邮件模块**************/
    //当前附件删除信息
    $(".form-word-close").click(function(){
        $(this).parent().hide();
    });
    
    //新增、返回通讯录
    $("#address-addIcon").click(function(){
        $("#addressAddPop").show();
        $("#mainPop").hide();
        $("#recordInfoPop").hide();
        $("#addressEditPop").hide();
    });
    $(".addressAddBackIcon").click(function(){
        $("#addressAddPop").hide();
        $("#mainPop").show();
        $("#recordInfoPop").hide();
        $("#addressEditPop").hide();
        $(".addressBook-tips").hide().html("");
        $(".address-input").val("");
    });
    $(".addressEditBackIcon").click(function(){
        $("#addressEditPop").hide();
        $("#addressAddPop").hide();
        $("#mainPop").show();
        $("#recordInfoPop").hide();
        $(".addressBook-tips").hide().html("");
    });
});
//获取鼠标位置
function getclientx()
{
	return window.event.clientX;
}
function getclienty()
{
	return window.event.clientY;
}
$(document).mousemove(function(event){
    receiveRecord_move();
    emailAddress_move();
});
function receiveRecord_move(){
	var div = document.getElementById("receive-show");
	if (!div) {
		return;
	}
	var intX = getclientx();
	var intY = getclienty();
	div.style.left = (intX+10)+ "px";
	div.style.top = (intY+20)+ "px";
}
function emailAddress_move(){
    var div = document.getElementById("email-address-show");
	if (!div) {
		return;
	}
	var intX = getclientx();
	var intY = getclienty();
	div.style.left = (intX+10)+ "px";
	div.style.top = (intY+20)+ "px";
}