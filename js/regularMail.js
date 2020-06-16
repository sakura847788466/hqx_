var recipientsIds=[],recipientsList=[];
$(function(){
    //点击发送邮件按钮
    $("#emailTab").click(function(){
        if(attachmentList.length==0){
            $("#mailSelect-pop").show();
        }else{
            $("#mailSelect-pop").hide();
            $("#forecastEmail").show();
            $(".overlayForcast",window.parent.document).show();
            $(".email-title-tab").find(".email-title-item").eq(0).addClass("email-title-click").siblings().removeClass("email-title-click");
            $(".email-body-tab").find(".email-body-item").eq(0).show().siblings().hide();
            mailAddressBookList();
            forecastSelect();
            $("#regularMailTitleAdd").val("");
            $("#regularMailContentAdd").val("");
            $("#regularMailRecipientsAdd").html("");
            recipientsIds.splice(0,recipientsIds.length);
            recipientsList.splice(0,recipientsList.length);
            $(".email-address-num").text("0");
        }
    });
    //点击普通邮件导航
    $("#regularMail").click(function(){
        mailAddressBookList();
        forecastSelect();
        $("#regularMailTitleAdd").val("");
        $("#regularMailContentAdd").val("");
        $("#regularMailRecipientsAdd").html("");
        recipientsIds.splice(0,recipientsIds.length);
        recipientsList.splice(0,recipientsList.length);
        $(".email-address-num").text("0");
    });
    //普通邮件发送
    $("#regularMailAddSure").click(function(){
        var content={};
        content.title=$("#regularMailTitleAdd").val();
        content.content=$("#regularMailContentAdd").val();
        var ids=[];
        for(var i=0;i<attachmentList.length;i++){
            ids.push(attachmentList[i].id);
        }
        if(recipientsIds.length==0){
            $(".regularMail-tips").show().find("span").text("收件人不能为空");
            setTimeout(function(){
                $(".regularMail-tips").hide().find("span").text("");
            },1000);
        }else if(content.title==""){
            $(".regularMail-tips").show().find("span").text("主题不能为空");
            setTimeout(function(){
                $(".regularMail-tips").hide().find("span").text("");
            },1000);
        }else if(attachmentList.length==0){
            $(".regularMail-tips").show().find("span").text("附件不能为空");
            setTimeout(function(){
                $(".regularMail-tips").hide().find("span").text("");
            },1000);
        }else{
            $("#loading").show();
            $(".overlayOpacity",window.parent.document).show();
            $.ajax({
                url:srcPath+"admin/work/sheet/email/add",
                type:"post",
                dataType:'json',
                contentType:'application/json',
                headers: {
                    token:  token
                },
                data: JSON.stringify({
                    "content":content,
                    "predicts":ids,
                    "recipients":recipientsIds
                }),
                success:function(data){
                    console.log(data);
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        $("#loading").hide();
                        $(".overlayOpacity",window.parent.document).hide();
                        $("#success").show();
                        setTimeout(function(){
                            $("#success").hide();
                        },1000);
                        $("#sendRecordList").trigger("click");
                        $("#regularMailTitleAdd").val("");
                        $("#regularMailContentAdd").val("");
                        $("#regularMailRecipientsAdd").html("");
                        recipientsIds.splice(0,recipientsIds.length);
                        recipientsList.splice(0,recipientsList.length);
                        $(".email-address-num").text("0");
                    }else{
                        $("#loading").hide();
                        $(".overlayOpacity",window.parent.document).hide();
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                    $(".regularMail-tips").hide().find("span").text("");
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
        
                }
            });
        }
    });
    //普通邮件取消
    $("#regularMailAddClose").click(function(){
        $("#forecastEmail").hide();
        $(".overlayForcast",window.parent.document).hide();
        $(".regularMail-tips").hide().find("span").text("");
        $("#regularMailTitleAdd").val("");
        $("#regularMailContentAdd").val("");
        $("#regularMailRecipientsAdd").html("");
        recipientsIds.splice(0,recipientsIds.length);
        recipientsList.splice(0,recipientsList.length);
        $(".email-address-num").text("0");
    });
});
//普通邮件通讯录列表
function mailAddressBookList(){
    $.ajax({
        url:srcPath+"admin/work/sheet/recipient/list",
        type:"post",
        dataType:'json',
        contentType:'application/json',
        headers: {
            token:  token
        },
        success:function(data){
            if(data.code=="-2"){
                window.parent.location.href="../login.html";
            }
            var dataJson=data.data.records;
            if(dataJson==""){
                $(".email-address-list").html("暂无数据");
            }else{
                var addressHtml='';
                var addressStr='';
                for(var i=0;i<dataJson.length;i++){
                    addressHtml=addressHtml+'<div class="email-address-item">'+
                        '<span class="iconfont email-address-uncheck">&#xeadc;</span>'+
                        '<span class="iconfont email-address-check">&#xead8;</span>'+
                        '<span class="email-address-id" style="display:none;">'+dataJson[i].id+'</span>'+
                        '<span class="email-address-email" style="display:none;">'+dataJson[i].email+'</span>'+
                        '<span class="email-address-name">'+dataJson[i].name+'</span>'+
                    '</div>';
                    addressStr=addressStr+'<span>'+dataJson[i].email+'</span>';
                }
                $(".email-address-list").html(addressHtml);
                $("#email-address-show").html(addressStr);
            }
            //通讯录选择
            $(".email-address-item").click(function(){
                $(this).toggleClass("email-address-checkClick");
                var length=$(".email-address-checkClick").length;
                $(".email-address-num").text(length);
                var id=$(this).find(".email-address-id").text();
                var name=$(this).find(".email-address-name").text();
                var email=$(this).find(".email-address-email").text();
                if($(this).hasClass("email-address-checkClick")){
                    recipientsIds.push(id);
                    var recipientsListJson={};
                    recipientsListJson.name=name;
                    recipientsListJson.email=email;
                    recipientsList.push(recipientsListJson);
                }else{
                    if(recipientsIds.indexOf(id) == "-1"){

                    }else{
                        recipientsIds.splice(recipientsIds.indexOf(id),1);
                    }
                    for(var i=0;i<recipientsList.length;i++){
                        if(recipientsList[i].email==email){
                            recipientsList.splice(i,1);
                        }else{

                        }
                    }
                }
                //获取收件人列表
                if(recipientsList.length==0){
                    $("#regularMailRecipientsAdd").html("");
                }else{
                    var recipientsListHtml='';
                    for(var i=0;i<recipientsList.length;i++){
                        recipientsListHtml=recipientsListHtml+'<div class="email-list-add">'+
                            '<span class="email-list-bold">'+recipientsList[i].name+'</span>'+
                            '<span class="email-list-normal">（'+recipientsList[i].email+'）</span>'+
                        '</div>';
                    }
                    $("#regularMailRecipientsAdd").html(recipientsListHtml);
                }
            });
            //通讯录鼠标悬浮
            $(".email-address-item").hover(function(){
                var index=$(this).index();
                $("#email-address-show").show().find("span").eq(index).show().siblings().hide();
            },function(){
                $("#email-address-show").hide();
            });
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){

        }
    });
}
//获取已选择的预报单列表
function forecastSelect() {
    var attachmentHtml='';
    for(var i=0;i<attachmentList.length;i++){
        attachmentHtml=attachmentHtml+'<div class="form-word">'+
            '<span class="attachmentName">'+attachmentList[i].name+'</span>'+
            '<span class="attachmentId" style="display:none;">'+attachmentList[i].id+'</span>'+
            '<span class="attachmentUrl" style="display:none;">'+attachmentList[i].url+'</span>'+
            '<i class="iconfont form-word-close">&#xeaf2;</i>'+
        '</div>';
    }
    $("#regularMailAttachmentAdd").html(attachmentHtml);
    //附件删除
    $(".form-word-close").click(function(){
        $(this).parent().remove();
        var id=$(this).siblings("span.attachmentId").text();
        var index=$(this).parent().index();
        attachmentList.splice(index,1);
        //清除预报列表勾选
        $(".info-table").find("tbody tr").each(function(){
            if($(this).find("td").eq(1).text()==id){
                $(this).find("td").removeClass("check-click");
            }else{

            }
        });
    });
    //附件下载
    $(".attachmentName").click(function(){
        var url=$(this).siblings("span.attachmentUrl").text();
        window.location.href=url;
    });
}