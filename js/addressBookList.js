var addressCurrent=1,addressSize=10,addressId;
$(function(){
    //点击通讯录获取列表
    $("#addressBookList").click(function(){
        var keyword=$("#addressBookSearchName").val();
        addressBookList(keyword,addressCurrent,true);
    });
    //通讯录搜索功能
    $("#addressBookSearchIcon").click(function () {
        var keyword=$("#addressBookSearchName").val();
        addressBookList(keyword,1,true);
    });
    $("#addressBookSearchName").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            var keyword=$("#addressBookSearchName").val();
            addressBookList(keyword,1,true);
        }
    });
    //新增通讯录
    $("#addressAddSure").click(function(){
        var name=$("#nameAddressAdd").val();
        var unit=$("#unitAddressAdd").val();
        var email=$("#emailAddressAdd").val();
        var phone=$("#phoneAddressAdd").val();
        if(name==""){
            $(".addressBook-tips").show().html("姓名不能为空");
        }else if(unit==""){
            $(".addressBook-tips").show().html("单位不能为空");
        }else if(email==""){
            $(".addressBook-tips").show().html("邮箱不能为空");
        }else if(phone==""){
            $(".addressBook-tips").show().html("电话不能为空");
        }else if(email!=""){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(!reg.test(email)){
                $(".addressBook-tips").show().html("邮箱格式不对");
            }else{
                ajax();
            }
        }else{
            ajax();
        }
        function ajax(){
            $.ajax({
                url:srcPath+"admin/work/sheet/recipient/add",
                type:"post",
                dataType:'json',
                contentType:'application/json',
                headers: {
                    token:  token
                },
                data: JSON.stringify({
                    "name":name,
                    "unit":unit,
                    "email":email,
                    "phone":phone
                }),
                success:function(data){
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        $("#success").show();
                        setTimeout(function(){
                            $("#success").hide();
                        },1000);
                        var keyword=$("#addressBookSearchName").val();
                        addressBookList(keyword,1,true);
                    }else if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                    $("#addressAddPop").hide();
                    $("#mainPop").show();
                    $("#recordInfoPop").hide();
                    $("#addressEditPop").hide();
                    $(".addressBook-tips").hide().html("");
                    $(".address-input").val("");
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
    
                }
            });
        }
    });
    //修改通讯录确定按钮
    $("#addressEditSure").click(function(){
        var name=$("#nameAddressEdit").val();
        var unit=$("#unitAddressEdit").val();
        var email=$("#emailAddressEdit").val();
        var phone=$("#phoneAddressEdit").val();
        if(name==""){
            $(".addressBook-tips").show().html("姓名不能为空");
        }else if(unit==""){
            $(".addressBook-tips").show().html("单位不能为空");
        }else if(email==""){
            $(".addressBook-tips").show().html("邮箱不能为空");
        }else if(phone==""){
            $(".addressBook-tips").show().html("电话不能为空");
        }else if(email!=""){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(!reg.test(email)){
                $(".addressBook-tips").show().html("邮箱格式不对");
            }else{
                ajax();
            }
        }else{
            ajax();
        }
        function ajax(){
            $.ajax({
                url:srcPath+"admin/work/sheet/recipient/update",
                type:"post",
                dataType:'json',
                contentType:'application/json',
                headers: {
                    token:  token
                },
                data: JSON.stringify({
                    "id":addressId,
                    "name":name,
                    "unit":unit,
                    "email":email,
                    "phone":phone
                }),
                success:function(data){
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        $("#success").show();
                        setTimeout(function(){
                            $("#success").hide();
                        },1000);
                        var keyword=$("#addressBookSearchName").val();
                        addressBookList(keyword,1,true);
                    }else if(data.code=="-1"){
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                    $("#addressAddPop").hide();
                    $("#mainPop").show();
                    $("#recordInfoPop").hide();
                    $("#addressEditPop").hide();
                    $(".addressBook-tips").hide().html("");
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
    
                }
            });
        }
    });
    //删除通讯录确定按钮
    $("#delSureAddress").click(function(){
        $.ajax({
            url:srcPath+"admin/work/sheet/recipient/delete",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "id":addressId
            }),
            success:function(data){
                $("#delAddress-pop").hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(data.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    var keyword=$("#addressBookSearchName").val();
                    addressBookList(keyword,1,true);
                }else if(data.code=="-1"){
                    $("#fail").show();
                    setTimeout(function(){
                        $("#fail").hide();
                    },1000);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
});
//通讯录列表
function addressBookList(keyword,addressCurrent,isFirst){
    $.ajax({
        url:srcPath+"admin/work/sheet/recipient/page",
        type:"post",
        dataType:'json',
        contentType:'application/json',
        headers: {
            token:  token
        },
        data: JSON.stringify({
            "keyword":keyword,
            "current":addressCurrent,
            "size":addressSize
        }),
        success:function(data){
            if(data.code=="-2"){
                window.parent.location.href="../login.html";
            }
            var dataJson=data.data.records;
            if(dataJson==""){
                $("#address-book-tabNo").show();
                $("#address-book-tabYes").hide();
            }else{
                $("#address-book-tabNo").hide();
                $("#address-book-tabYes").show();
            }
            if(isFirst){
                var addressHtml='<thead>'+
                    '<tr>'+
                        '<th>'+
                            '<div class="iconfont address-uncheckIcon">&#xeadc;</div>'+
                            '<div class="iconfont address-checkIcon">&#xead8;</div>'+
                        '</th>'+
                        '<th style="display:none;">id</th>'+
                        '<th>姓名</th>'+
                        '<th>单位</th>'+
                        '<th>邮箱</th>'+
                        '<th>电话</th>'+
                        '<th></th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody class="scrollbarStyle">';
                for(var i=0;i<dataJson.length;i++){
                    addressHtml=addressHtml+'<tr>'+
                        '<td>'+
                            '<div class="iconfont address-uncheckIcon">&#xeadc;</div>'+
                            '<div class="iconfont address-checkIcon">&#xead8;</div>'+
                        '</td>'+
                        '<td style="display:none;">'+dataJson[i].id+'</td>'+
                        '<td>'+dataJson[i].name+'</td>'+
                        '<td>'+dataJson[i].unit+'</td>'+
                        '<td>'+dataJson[i].email+'</td>'+
                        '<td>'+dataJson[i].phone+'</td>'+
                        '<td>'+
                            '<span class="address-editIcon">'+
                                '<i class="iconfont commonIcon">&#xeabe;</i>'+
                                '<span>编辑</span>'+
                            '</span>'+
                            '<span class="address-delIcon">'+
                                '<i class="iconfont commonIcon">&#xeafb;</i>'+
                                '<span>删除</span>'+
                            '</span>'+
                        '</td>'+
                    '</tr>';
                }
                addressHtml=addressHtml+'</tbody>';
                $(".address-book-table").html(addressHtml);
            }else{
                var addressHtml;
                for(var i=0;i<dataJson.length;i++){
                    addressHtml=addressHtml+'<tr>'+
                        '<td>'+
                            '<div class="iconfont address-uncheckIcon">&#xeadc;</div>'+
                            '<div class="iconfont address-checkIcon">&#xead8;</div>'+
                        '</td>'+
                        '<td style="display:none;">'+dataJson[i].id+'</td>'+
                        '<td>'+dataJson[i].name+'</td>'+
                        '<td>'+dataJson[i].unit+'</td>'+
                        '<td>'+dataJson[i].email+'</td>'+
                        '<td>'+dataJson[i].phone+'</td>'+
                        '<td>'+
                            '<span class="address-editIcon">'+
                                '<i class="iconfont commonIcon">&#xeabe;</i>'+
                                '<span>编辑</span>'+
                            '</span>'+
                            '<span class="address-delIcon">'+
                                '<i class="iconfont commonIcon">&#xeafb;</i>'+
                                '<span>删除</span>'+
                            '</span>'+
                        '</td>'+
                    '</tr>';
                }
                $(".address-book-table tbody").append(addressHtml);
            }
            //滚动加载列表
            $(".address-book-table tbody").scroll(function(event){
                var dom=event.target;
                var scrollDistance=dom.scrollHeight-dom.scrollTop-dom.clientHeight;
                if (scrollDistance <= 0) {
                    addressCurrent+=1;
                    var keyword=$("#addressBookSearchName").val();
                    addressBookList(keyword,addressCurrent,false);
                }else{

                }
            });
            //表格编辑、删除操作
            addressBookEdit();
            addressBookDel();
            addressBookCheck();
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){

        }
    });
}
//通讯录表格是否选中
function addressBookCheck(){
    $(".address-book-table").find("thead tr th").click(function () {
        $(this).toggleClass("address-tabClick");
        if($(this).hasClass("address-tabClick")){
            $(".address-book-table").find("tbody tr td").addClass("address-tabClick");
        }else {
            $(".address-book-table").find("tbody tr td").removeClass("address-tabClick");
        }
    });
    $(".address-book-table").find("tbody tr td").click(function () {
        $(this).toggleClass("address-tabClick");
        if ($(this).hasClass("address-tabClick")){
            
        } else {
            $(".address-book-table").find("thead tr th").removeClass("address-tabClick");
        }
    });
}
//通讯录修改
function addressBookEdit(){
    $(".address-editIcon").click(function(){
        addressId=$(this).parent().siblings("td").eq(1).text();
        var name=$(this).parent().siblings("td").eq(2).text();
        var unit=$(this).parent().siblings("td").eq(3).text();
        var email=$(this).parent().siblings("td").eq(4).text();
        var phone=$(this).parent().siblings("td").eq(5).text();
        $("#addressEditPop").show();
        $("#addressAddPop").hide();
        $("#mainPop").hide();
        $("#recordInfoPop").hide();
        $("#nameAddressEdit").val(name);
        $("#unitAddressEdit").val(unit);
        $("#emailAddressEdit").val(email);
        $("#phoneAddressEdit").val(phone);
    });
}
//通讯录删除
function addressBookDel(){
    $(".address-delIcon").click(function(){
        addressId=$(this).parent().siblings("td").eq(1).text();
        $("#delAddress-pop").show();
    });
}