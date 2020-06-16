function resize() {
    var width=window.innerWidth;
    var height=window.innerHeight;
    $(".left").css("height",height);
    $(".right").css({width:width-560,height:height});
    $(".left-content").css("marginTop",(height-120)/2);
    $(".login-tip").css("left",(width-400)/2);
    window.onresize=function () {
        $(".left").css("height",height);
        $(".right").css({width:width-560,height:height});
        $(".left-content").css("marginTop",(height-120)/2);
        $(".login-tip").css("left",(width-400)/2);
    }
}
$(function () {
    resize();
    $(document).off("keydown.s").on('keydown.s',function(event){
        event = window.event||event;
        if((event.keyCode||event.which)=='9'){
            if($("#userName").is(":focus")){
                $("#password").focus();
            }else{
                $("#userName").focus();
            }
            return false;
        }
    });
    //切换到决策系统
    $(".left-change").click(function () {
        window.location.href="index.html";
    });
    function login(){
        var userName=$("#userName").val();
        var password=$("#password").val();
        sessionStorage.setItem('userName', "userName");
        sessionStorage.setItem('password', "password");
        if(userName==""&&password==""){
            $(".login-tip").show();
            $(".login-tip").find("span").text("不能为空");
            setTimeout(function(){
                $(".login-tip").hide();
            },1000);
            $("#userName").focus();
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('password');
            return false;
        }else if(userName==""){
            $(".login-tip").show();
            $(".login-tip").find("span").text("用户名不能为空");
            setTimeout(function(){
                $(".login-tip").hide();
            },1000);
            $("#userName").focus();
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('password');
            return false;
        }else if(password==""){
            $(".login-tip").show();
            $(".login-tip").find("span").text("密码不能为空");
            setTimeout(function(){
                $(".login-tip").hide();
            },1000);
            $("#password").focus();
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('password');
            return false;
        }else{
            $.ajax({
                url:srcPath+"sys/pub/login",
                type:"post",
                contentType:'application/json',
                dataType:'json',
                data: JSON.stringify({
                    "userName":userName,
                    "password":md5(password)
                }),
                success:function(data){
                    if(data.code==200){
                        var expiresDate=new Date();
                        expiresDate.setTime(expiresDate.getTime()+(60*60*1000));
                        $.cookie("username",userName);
                        $.cookie("password",password);
                        $.cookie("token",data.data.token,{expires:expiresDate});
                        $.cookie("role",data.data.role);
                        $.cookie("realName",data.data.realName);
                        window.location.href="indexManage.html";
                        $(".login-tip").hide();
                    }else if(data.code=="-2"){

                    }else{
                        $(".login-tip").show();
                        $(".login-tip").find("span").text("账号或密码错误");
                        setTimeout(function(){
                            $(".login-tip").hide();
                        },1000);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }
    }
    $(".login-btn").click(function () {
        login();
    });
    $(document).keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            login();
        }
    });
});


