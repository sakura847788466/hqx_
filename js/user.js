
var userIds=[];
$(function () {
    /*********************人员管理************************/
    //个人信息模块
    $(document).click(function(){
        $(".info-dropDown").hide();
        $(".info-drop").removeClass("info-dropClick");
    });
    $(".info-select").click(function (e) {
        $(".info-dropDown").toggle();
        $(".info-drop").toggleClass("info-dropClick");
        e.stopPropagation();
    });
    $(".info-dropDown-item").click(function () {
        var txt=$(this).text();
        if(txt == "修改密码"){
            $("#update-account").show();
            $(".info-dropDown").hide();
            $("#passOld").val("");
            $("#newPass").val("");
            $("#newPassSure").val("");
        }
    });
    var personalName=$.cookie("realName");
    $("#passOld").focus(function(){
        $(this).attr("type","password");
    });
    $("#newPass").focus(function(){
        $(this).attr("type","password");
    });
    $("#newPassSure").focus(function(){
        $(this).attr("type","password");
    });
    //var personalPass=$.cookie("password");
    //$("#passOld").val(personalPass);
    var token=$.cookie("token");
    var personalRole=$.cookie("role");
    if(personalRole=="admin"){
        personalRole="普通管理员";
        $("#addAccount-drop").find("div.account-drop-item").eq(0).hide();
        $("#editAccount-drop").find("div.account-drop-items").eq(0).hide();
    }else if(personalRole=="superAdmin"){
        personalRole="超级管理员";
        $("#addAccount-drop").find("div.account-drop-item").eq(0).show();
        $("#editAccount-drop").find("div.account-drop-items").eq(0).show();
    }else if(personalRole=="forecaster"){
        personalRole="预报员";
        $("#account-nav").hide();
        $("#info-nav").hide();
        $("#hazard-nav").hide();
        $("#forecast-nav").trigger("click");
    }
    $("#userName").text(personalName);
    $("#userRole").text(personalRole);
    //退出登录
    $("#login-out").click(function () {
        $.ajax({
            url:srcPath+"sys/pub/logout",
            type:"post",
            contentType:'application/json',
            headers: {
                token:  token
            },
            dataType:'json',
            success:function(data){
                window.location.href="login.html";
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
    //点击人员管理菜单
    $("#account-nav").click(function () {
        var userNameOrAccount=$("#user-search").val();
        $("#userPage-input").val("");
        peoplePage(1,10,userNameOrAccount);
    });
    //获取用户列表
    var tableLength;
    function peoplePage(page,size,userNameOrAccount) {
        $("#loading").show();
        userIds=[];
        $.ajax({
            url:srcPath+"sys/user/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "current":page,
                "size":size,
                "userNameOrAccount":userNameOrAccount
            }),
            success:function(data){
                $("#loading").hide();
                if(data.code=="-2"){
                    window.location.href="login.html";
                }
                var dataJson=data.data.records;
                tableLength=dataJson;
                if(dataJson==""){
                    $(".user-table-no").show();
                    $(".user-table-yes").hide();
                }else {
                    $(".user-table-no").hide();
                    $(".user-table-yes").show();
                    var tableHtml="<thead>\n" +
                        "                            <tr>\n" +
                        "                                <th>\n" +
                        "                                    <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                        "                                    <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                        "                                </th>\n" +
                        "                                <th style='display: none;'>id</th>\n" +
                        "                                <th>用户名</th>\n" +
                        "                                <th>账号</th>\n" +
                        "                                <th>手机号码</th>\n" +
                        "                                <th>用户角色</th>\n" +
                        "                                <th>操作</th>\n" +
                        "                            </tr>\n" +
                        "                            </thead>\n" +
                        "                            <tbody>";
                    for(var i=0;i<dataJson.length;i++){
                        tableHtml=tableHtml+"<tr>\n" +
                            "                                <td>\n" +
                            "                                    <i class=\"iconfont checkbox-uncheck\">&#xeadc;</i>\n" +
                            "                                    <i class=\"iconfont checkbox-check\">&#xead8;</i>\n" +
                            "                                </td>\n" +
                            "                                <td style='display: none;'>"+dataJson[i].id+"</td>\n" +
                            "                                <td>"+dataJson[i].realName+"</td>\n" +
                            "                                <td>"+dataJson[i].username+"</td>\n" +
                            "                                <td>"+dataJson[i].phone+"</td>\n" +
                            "                                <td>"+dataJson[i].roleName+"</td>\n" +
                            "                                <td>\n" +
                            "                                    <span class=\"table-resetIcon\"><i class=\"iconfont\">&#xeac6;</i><span class=\"table-txt\">重置密码</span></span>" +
                            "                                    <span class=\"table-editIcon\"><i class=\"iconfont\">&#xeabe;</i><span class=\"table-txt\">编辑</span></span>" +
                            "                                    <span class=\"table-delIcon\"><i class=\"iconfont\">&#xeafb;</i><span class=\"table-txt\">删除</span></span>" +
                            "                                </td>\n" +
                            "                            </tr>";
                    }
                    tableHtml=tableHtml+"</tbody>";
                    $("#user-table").html(tableHtml);
                    personSelect();
                    personReset();
                    personEdit();
                    personDel();
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
        })
    }
    //首页
    $("#firstPage").click(function () {
        var userNameOrAccount=$("#user-search").val();
        peoplePage(1,10,userNameOrAccount);
        $("#userPage-input").val("");
    });
    //上一页
    $("#prevPage").click(function () {
        var userNameOrAccount=$("#user-search").val();
        var currentPage=parseInt($("#currentPage").text());
        var pageNow=1;
        if(currentPage<1){
            return false;
        }else {
            pageNow=currentPage-1;
            peoplePage(pageNow,10,userNameOrAccount);
        }
        $("#userPage-input").val("");
    });
    //下一页
    $("#nextPage").click(function () {
        var userNameOrAccount=$("#user-search").val();
        var currentPage=parseInt($("#currentPage").text());
        var totalPage=parseInt($("#totalPage").text());
        var pageNow=1;
        if(currentPage >= totalPage){
            return false;
        }else {
            pageNow=currentPage+1;
            peoplePage(pageNow,10,userNameOrAccount);
        }
        $("#userPage-input").val("");
    });
    //尾页
    $("#endPage").click(function () {
        var userNameOrAccount=$("#user-search").val();
        var totalPage=$("#totalPage").text();
        peoplePage(totalPage,10,userNameOrAccount);
        $("#userPage-input").val("");
    });
    //跳转
    $("#pageTo").click(function () {
        var userNameOrAccount=$("#user-search").val();
        var pageNum=$("#userPage-input").val();
        if(pageNum==""){

        }else {
            peoplePage(pageNum,10,userNameOrAccount);
        }
    });
    $("#userPage-input").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var userNameOrAccount=$("#user-search").val();
            var pageNum=$("#userPage-input").val();
            peoplePage(pageNum,10,userNameOrAccount);
        }
    });
    //搜索功能
    $("#user-search").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var txt=$("#user-search").val();
            peoplePage(1,10,txt);
        }
    });
    $("#userSearchIcon").click(function () {
        var txt=$("#user-search").val();
        peoplePage(1,10,txt);
    });
    //表格选中与否
    function personSelect() {
        $("#user-table").find("thead tr th:eq(0)").click(function () {
            $(this).toggleClass("check-click");
            if($(this).hasClass("check-click")){
                $("#user-table").find("tbody tr td").addClass("check-click");
                for(var i=0;i<tableLength.length;i++){
                    userIds.push(tableLength[i].id);
                }
            }else {
                $("#user-table").find("tbody tr td").removeClass("check-click");
                userIds.splice(0,userIds.length);
            }
        });
        $("#user-table").find("tbody tr").each(function(){
            var td=$(this).find("td").eq(0);
            td.click(function(){
                $(this).toggleClass("check-click");
                if ($(this).hasClass("check-click")){
                    var userId=$(this).siblings("td").eq(0).text();
                    userIds.push(userId);
                } else {
                    var txt=$(this).siblings("td").eq(0).text();
                    $("#user-table").find("thead tr th").removeClass("check-click");
                    if(userIds.indexOf(txt) == "-1"){
    
                    }else{
                        userIds.splice(userIds.indexOf(txt),1);
                    }
                }
            });
        });
        /*$("#user-table").find("tbody tr td").click(function () {
            $(this).toggleClass("check-click");
            if ($(this).hasClass("check-click")){
                var userId=$(this).siblings("td").eq(0).text();
                userIds.push(userId);
            } else {
                var txt=$(this).siblings("td").eq(0).text();
                $("#user-table").find("thead tr th").removeClass("check-click");
                if(userIds.indexOf(txt) == "-1"){

                }else{
                    userIds.splice(userIds.indexOf(txt),1);
                }
            }
        });*/
    }
    //新建人员
    $("#account-add").click(function () {
        $("#add-account").show();
    });
    $(".addAccount-closeIcon").click(function () {
        $(this).parent().parent().parent().hide();
        $("#account-add").removeClass("table-menuClick");
        $("#usernameAdd").val("");
        $("#accountAdd").val("");
        $("#phoneAdd").val("");
        $("#addAccount-drop").hide();
        $("#addAccount-select").find("span.account-select-txt").text("请选择");
    });
    $("#addPerson-close").click(function () {
        $(this).parent().parent().parent().hide();
        $("#account-add").removeClass("table-menuClick");
        $("#usernameAdd").val("");
        $("#accountAdd").val("");
        $("#phoneAdd").val("");
        $("#addAccount-drop").hide();
        $("#addAccount-select").find("span.account-select-txt").text("请选择");
    });
    //新建用户角色选择
    $("#addAccount-select").click(function () {
       $("#addAccount-drop").toggle();
    });
    $(".account-drop-item").click(function () {
       var txt=$(this).text();
       $(this).parent().hide();
       $("#addAccount-select").find("span.account-select-txt").text(txt);
    });
    $("#addPerson-sure").click(function () {
        var realName=$("#usernameAdd").val();
        var username=$("#accountAdd").val();
        var phone=$("#phoneAdd").val();
        var roleName=$("#addAccount-select").find("span.account-select-txt").text();
        var roleId;
        if(roleName=="普通管理员"){
            roleId=2;
        }else if(roleName=="预报员"){
            roleId=3;
        }
        if(realName==""){
            $(".add-tips").show();
            $(".add-tips").find("span").text("用户名不能为空");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(username==""){
            $(".add-tips").show();
            $(".add-tips").find("span").text("账号不能为空");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(/[\u4E00-\u9FA5]/g.test(username)){ 
            $(".add-tips").show();
            $(".add-tips").find("span").text("账号不能为中文");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(!(/^\w{4,16}$/.test(username))){
            $(".add-tips").show();
            $(".add-tips").find("span").text("账号长度为4-16位");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(phone==""){
            $(".add-tips").show();
            $(".add-tips").find("span").text("手机号码不能为空");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(!(/^1[3456789]\d{9}$/.test(phone))){
            $(".add-tips").show();
            $(".add-tips").find("span").text("手机号码格式不对");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else if(roleName=="请选择"){
            $(".add-tips").show();
            $(".add-tips").find("span").text("用户角色不能为空");
            setTimeout(function () {
                $(".add-tips").hide();
            },1000);
        }else{
            $.ajax({
                url: srcPath + "sys/user/add",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "realName": realName,
                    "username": username,
                    "phone": phone,
                    "roleId": roleId
                }),
                success: function (data) {
                    console.log(data);
                    if(data.code=="-2"){
                        window.location.href="login.html";
                    }else if(data.code == 200){
                        $(".add-tips").hide();
                        $("#add-account").hide();
                        $("#account-add").removeClass("table-menuClick");
                        $("#usernameAdd").val("");
                        $("#accountAdd").val("");
                        $("#phoneAdd").val("");
                        $("#addAccount-drop").hide();
                        $("#addAccount-select").find("span.account-select-txt").text("请选择");
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                        var txt=$("#user-search").val();
                        peoplePage(1,10,txt);
                    }else if(data.code=="-1"){
                        $("#fail").show().find("span").text(data.msg);
                        setTimeout(function () {
                            $("#fail").hide().find("span").text("操作失败");
                        },1000);
                    }else{

                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }
    });
    //批量删除
    $("#account-delAll").click(function () {
        $("#delAll-box").show();
        if(userIds==""){
            $("#delAll-box").find("div.del-content").html("至少选择一项才可以进行批量操作！");
            $("#delAll-sure").hide();
        }else{
            $("#delAll-box").find("div.del-content").html("确定对所选的内容进行删除吗？");
            $("#delAll-sure").show();
        }
    });
    $(".delAll-close").click(function () {
        $(this).parent().parent().hide();
        $("#account-delAll").removeClass("table-menuClick");
    });
    $(".del-btnIcon").click(function () {
        $(this).parent().parent().hide();
        $("#account-delAll").removeClass("table-menuClick");
    });
    $("#delAll-sure").click(function () {
        $.ajax({
            url: srcPath + "sys/user/delete",
            type: "post",
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                token: token
            },
            data: JSON.stringify({
                "ids": userIds
            }),
            success: function (data) {
                if(data.code=="-2"){
                    window.location.href="login.html";
                }
                if(data.code==200){
                    $("#success").show();
                    setTimeout(function () {
                        $("#success").hide();
                    },1000);
                    var txt=$("#user-search").val();
                    var current=$("#currentPage").text();
                    peoplePage(current,10,txt);
                }else if(data.code=="-1"){
                    $("#fail").show();
                    setTimeout(function () {
                        $("#fail").hide();
                    },1000);
                }else{

                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
    //重置密码
    function personReset() {
        $(".table-resetIcon").click(function () {
            var userId=$(this).parent().siblings("td").eq(1).text();
            $("#rePass-box").show();
            $("#rePass-sure").click(function () {
                $.ajax({
                    url: srcPath + "sys/user/reset/password",
                    type: "post",
                    dataType: 'json',
                    contentType: 'application/json',
                    headers: {
                        token: token
                    },
                    data: JSON.stringify({
                        "userId": userId
                    }),
                    success: function (data) {
                        if(data.code=="-2"){
                            window.location.href="login.html";
                        }
                        if(data.code==200){
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            var txt=$("#user-search").val();
                            var current=$("#currentPage").text();
                            peoplePage(current,10,txt);
                        }else if(data.code=="-1"){
                            $("#fail").show();
                            setTimeout(function () {
                                $("#fail").hide();
                            },1000);
                        }else{

                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){

                    }
                });
            });
        });
    }
    //修改人员
    $(".editAccount-closeIcon").click(function () {
        $(this).parent().parent().parent().hide();
    });
    $("#accountEdit-close").click(function () {
        $(this).parent().parent().parent().hide();
    });
    $("#editAccount-select").click(function () {
        $("#editAccount-drop").toggle();
    });
    $(".account-drop-items").click(function () {
        var txt=$(this).text();
        $(this).parent().hide();
        $("#editAccount-select").find("span.account-select-txt").text(txt);
    });
    var userId;
    function personEdit() {
        $(".table-editIcon").click(function () {
            userId=$(this).parent().siblings("td").eq(1).text();
            var realName=$(this).parent().siblings("td").eq(2).text();
            var userName=$(this).parent().siblings("td").eq(3).text();
            var phone=$(this).parent().siblings("td").eq(4).text();
            var roleName=$(this).parent().siblings("td").eq(5).text();
            $("#edit-account").show();
            $("#username-edit").val(realName);
            $("#account-edit").val(userName);
            $("#phone-edit").val(phone);
            $("#editAccount-select").find("span.account-select-txt").text(roleName);
            $("#accountEdit-sure").click(function () {
                var realName=$("#username-edit").val();
                var userName=$("#account-edit").val();
                var phone=$("#phone-edit").val();
                var roleName=$("#editAccount-select").find("span.account-select-txt").text();
                var roleId;
                if(roleName=="普通管理员"){
                    roleId=2;
                }else{
                    roleId=3;
                }
                if(realName==""){
                    $(".editAccount-tips").show();
                    $(".editAccount-tips").find("span").text("用户名不能为空");
                    setTimeout(function () {
                        $(".editAccount-tips").hide();
                    },1000);
                }else if(userName==""){
                    $(".editAccount-tips").show();
                    $(".editAccount-tips").find("span").text("账号不能为空");
                    setTimeout(function () {
                        $(".editAccount-tips").hide();
                    },1000);
                }else if(phone==""){
                    $(".editAccount-tips").show();
                    $(".editAccount-tips").find("span").text("手机号码不能为空");
                    setTimeout(function () {
                        $(".editAccount-tips").hide();
                    },1000);
                }else if(!(/^1[3456789]\d{9}$/.test(phone))){
                    $(".editAccount-tips").show();
                    $(".editAccount-tips").find("span").text("手机号码格式不对");
                    setTimeout(function () {
                        $(".editAccount-tips").hide();
                    },1000);
                }else if(roleName==""){
                    $(".editAccount-tips").show();
                    $(".editAccount-tips").find("span").text("用户角色不能为空");
                    setTimeout(function () {
                        $(".editAccount-tips").hide();
                    },1000);
                }else{
                    $.ajax({
                        url: srcPath + "sys/user/add",
                        type: "post",
                        dataType: 'json',
                        contentType: 'application/json',
                        headers: {
                            token: token
                        },
                        data: JSON.stringify({
                            "id": userId,
                            "realName":realName,
                            "username":userName,
                            "phone":phone,
                            "roleId":roleId
                        }),
                        success: function (data) {
                            if(data.code=="-2"){
                                window.location.href="login.html";
                            }
                            if(data.code==200){
                                $("#edit-account").hide();
                                $("#editAccount-drop").hide();
                                $(".editAccount-tips").hide();
                                $("#success").show();
                                setTimeout(function () {
                                    $("#success").hide();
                                },1000);
                                var txt=$("#user-search").val();
                                var current=$("#currentPage").text();
                                peoplePage(current,10,txt);
                            }else if(data.code=="-1"){
                                $("#fail").show();
                                setTimeout(function () {
                                    $("#fail").hide();
                                },1000);
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
    //删除人员
    function personDel() {
        $(".table-delIcon").click(function () {
            $("#del-box").show();
            var ids=[];
            var id=$(this).parent().siblings("td").eq(1).text();
            ids.push(id);
            $("#del-sure").click(function () {
                $.ajax({
                    url: srcPath + "sys/user/delete",
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
                            window.location.href="login.html";
                        }
                        if(data.code==200){
                            $("#success").show();
                            setTimeout(function () {
                                $("#success").hide();
                            },1000);
                            var txt=$("#user-search").val();
                            var current=$("#currentPage").text();
                            peoplePage(current,10,txt);
                        }else if(data.code=="-1"){
                            $("#fail").show();
                            setTimeout(function () {
                                $("#fail").hide();
                            },1000);
                        }else{

                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){

                    }
                });
            });
        });
    }
    //修改个人信息
    $(".editPass-closeIcon").click(function () {
        $(this).parent().parent().parent().hide();
        $("#newPass").val("");
        $("#newPassSure").val("");
        $(".editPass-tips").hide();
    });
    $("#editPass-close").click(function () {
        $(this).parent().parent().parent().hide();
        $("#newPass").val("");
        $("#newPassSure").val("");
        $(".editPass-tips").hide();
    });
    $("#editPass-sure").click(function () {
        var newPass=$("#newPass").val();
        var rePass=$("#newPassSure").val();
        var oldPass=$("#passOld").val();
        function ajax() {
            $.ajax({
                url: srcPath + "sys/user/update/password",
                type: "post",
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    token: token
                },
                data: JSON.stringify({
                    "newPassword": md5(newPass)
                }),
                success: function (data) {
                    if(data.code=="-2"){
                        window.location.href="login.html";
                    }
                    if(data.code==200){
                        $("#update-account").hide();
                        $("#newPass").val("");
                        $("#newPassSure").val("");
                        $(".editPass-tips").hide();
                        $("#success").show();
                        setTimeout(function () {
                            $("#success").hide();
                        },1000);
                    }else if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function () {
                            $("#fail").hide();
                        },1000);
                    }else{

                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }
        if(oldPass==""){
            $(".editPass-tips").show();
            $(".editPass-tips").find("span").text("旧密码不能为空");
            setTimeout(function () {
                $(".editPass-tips").hide();
            },1000);
        }else if(newPass==""){
            $(".editPass-tips").show();
            $(".editPass-tips").find("span").text("新密码不能为空");
            setTimeout(function () {
                $(".editPass-tips").hide();
            },1000);
        }else if (newPass!="") {
            if(!(/^(?![^a-zA-Z]+$)(?!\D+$).{6,12}$/.test(newPass))){
                $(".editPass-tips").show();
                $(".editPass-tips").find("span").text("新密码必须包含数字字母，长度为6-12位");
                setTimeout(function () {
                    $(".editPass-tips").hide();
                },1000);
            }else if(rePass!=""){
                if(newPass!=rePass){
                    $(".editPass-tips").show();
                    $(".editPass-tips").find("span").text("确认密码与新密码不同");
                    setTimeout(function () {
                        $(".editPass-tips").hide();
                    },1000);
                }else{
                    ajax();
                }
            }else if(rePass==""){
                $(".editPass-tips").show();
                $(".editPass-tips").find("span").text("确认密码不能为空");
                setTimeout(function () {
                    $(".editPass-tips").hide();
                },1000);
            }else{
                ajax();
            }
        }else{
            ajax();
        }
    });
});