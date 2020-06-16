$(function(){
    //返回发送记录列表
    $(".recordBackIcon").click(function(){
        $("#mainPop").show();
        $("#recordInfoPop").hide();
        $("#addressAddPop").hide();
        $("#addressEditPop").hide();
    });
    //点击发送记录导航
    $("#sendRecordList").click(function(){
        sendRecordList(1,6);
    });
    //首页
    $("#record-firstPage").click(function () {
        sendRecordList(1,6);
    });
    //上一页
    $("#record-prevPage").click(function () {
        var pageNow=1;
        var currentPage=parseInt($("#record-currentPage").text());
        if(pageNow<1){
            return false;
        }else {
            pageNow=currentPage-1;
            sendRecordList(pageNow,6);
        }
    });
    //下一页
    $("#record-nextPage").click(function () {
        var pageNow;
        var currentPage=parseInt($("#record-currentPage").text());
        var totalPage=parseInt($("#record-totalPage").text());
        if(currentPage >= totalPage){
            return false;
        }else {
            pageNow=currentPage+1;
            sendRecordList(pageNow,6);
        }
    });
    //尾页
    $("#record-endPage").click(function () {
        var totalPage=$("#record-totalPage").text();
        sendRecordList(totalPage,6);
    });
    //跳转
    $("#record-pageTo").click(function () {
        var pageNum=$("#recordPageValue").val();
        if(pageNum==""){

        }else {
            sendRecordList(pageNum,6);
        }
    });
    $("#recordPageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            var pageNum = $("#recordPageValue").val();
            if (pageNum == "") {

            } else {
                sendRecordList(pageNum,6);
            }
        }
    });
    //发送记录超出部分以省略号表示
    $(".email-tab-list").each(function(){
        if($(this).find(".email-tab-item").length>1){
            $(this).find(".email-tab-item:gt(1)").html("...").css({marginRight:"0",lineHeight:"56px"});
        }else{
    
        }
    });
});
function sendRecordList(sendCurrent,sendSize){
    $("#loading").show();
    $(".overlayOpacity",window.parent.document).show();
    $.ajax({
        url:srcPath+"admin/work/sheet/email/page",
        type:"post",
        dataType:'json',
        contentType:'application/json',
        headers: {
            token:  token
        },
        data: JSON.stringify({
            "current":sendCurrent,
            "size":sendSize
        }),
        success:function(data){
            $("#loading").hide();
            $(".overlayOpacity",window.parent.document).hide();
            console.log(data);
            if(data.code=="-2"){
                window.parent.location.href="../login.html";
            }
            var dataJson=data.data.records;
            if(dataJson==""){
                $(".email-record-listNo").show();
                $(".email-record-listYes").hide();
            }else{
                $(".email-record-listNo").hide();
                $(".email-record-listYes").show();
                var tbaleHtml='<thead>'+
                    '<tr>'+
                        '<th style="display:none;">id</th>'+
                        '<th>收件人</th>'+
                        '<th>主题</th>'+
                        '<th>发件人</th>'+
                        '<th>时间</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';
                for(var i=0;i<dataJson.length;i++){
                    var recipientsLength=dataJson[i].recipients;
                    //超出部分以省略号显示
                    if(recipientsLength.length>1){
                        var recipients='<div class="email-tab-list">'+
                            '<div class="email-tab-item">'+
                                '<div class="email-tab-name">'+recipientsLength[0].recipientName+'</div>'+
                                '<div class="email-tab-num">'+recipientsLength[0].recipientEmail+'</div>'+
                            '</div>'+
                            '<div style="margin-right:0px;line-height:56px;">...</div>'+
                        '</div>';
                    }else{
                        var recipients='<div class="email-tab-list">'+
                            '<div class="email-tab-item">'+
                                '<div class="email-tab-name">'+recipientsLength[0].recipientName+'</div>'+
                                '<div class="email-tab-num">'+recipientsLength[0].recipientEmail+'</div>'+
                            '</div>'+
                        '</div>';
                    }
                    tbaleHtml=tbaleHtml+'<tr>'+
                        '<td style="display:none;">'+dataJson[i].id+'</td>'+
                        '<td>'+recipients+'</td>'+
                        '<td><a href="javascript:void(0);">'+dataJson[i].title+'</a></td>'+
                        '<td>'+
                            '<div class="email-tab-name">'+dataJson[i].sender.realName+'</div>'+
                            '<div class="email-tab-num">'+dataJson[i].sender.username+'</div>'+
                        '</td>'+
                        '<td>'+new Date(dataJson[i].createTime).Format('yyyy-MM-dd')+'</td>'+
                    '</tr>';
                }
                tbaleHtml=tbaleHtml+'</tbody>';
                $(".email-record-tab").html(tbaleHtml);
                //分页操作
                $("#record-totalPage").text(data.data.pages);
                $("#record-currentPage").text(data.data.current);
                $("#record-totalRecord").text(data.data.total);
                var page=parseInt($("#record-currentPage").text());
                var total=parseInt($("#record-totalPage").text());
                if(page==1){
                    $("#record-prevPage").addClass("page-item-notClick");
                    $("#record-nextPage").removeClass("page-item-notClick");
                }else if(page==total){
                    $("#record-nextPage").addClass("page-item-notClick");
                    $("#record-prevPage").removeClass("page-item-notClick");
                }else {
                    $("#record-prevPage").removeClass("page-item-notClick");
                    $("#record-nextPage").removeClass("page-item-notClick");
                }
                //详情
                sendRecordInfo();
                //发送记录超出部分鼠标悬浮出现
                $(".email-record-tab tbody tr").each(function(){
                    $(this).find("td:eq(1)").hover(function(){
                        var index=$(this).parent().index();
                        var recipientsHover='';
                        for(var i=0;i<dataJson[index].recipients.length;i++){
                            recipientsHover=recipientsHover+'<div class="receive-show-item">'+
                            '<div class="receive-show-name">'+dataJson[index].recipients[i].recipientName+'</div>'+
                            '<div class="receive-show-num">'+dataJson[index].recipients[i].recipientEmail+'</div>'+
                        '</div>';
                        }
                        $("#receive-show").html(recipientsHover);
                        $("#receive-show").show().find(".receive-show-list").eq(index).show().siblings().hide();
                    },function(){
                        $("#receive-show").hide();
                    });
                });
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){

        }
    });
}
//发送记录详情
function sendRecordInfo(){
    $(".email-record-tab").find("tbody tr td").find("a").click(function(){
        var id=$(this).parent().siblings("td").eq(0).text();
        //点击发送记录列表主题获取详情
        $("#mainPop").hide();
        $("#recordInfoPop").show();
        $("#addressAddPop").hide();
        $("#addressEditPop").hide();
        $.ajax({
            url:srcPath+"admin/work/sheet/email/detail",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "id":id
            }),
            success:function(data){
                console.log(data);
                var dataJson=data.data;
                $("#sendRecordTitleInfo").html(dataJson.title);
                $("#sendRecordContentInfo").html(dataJson.content);
                $("#sendRecordSenderInfo").html(dataJson.sender.realName+'('+dataJson.sender.username+')');
                var recipients=dataJson.recipients;
                var recipientsHtml="";
                for(var i=0;i<recipients.length;i++){
                    recipientsHtml=recipientsHtml+'<div class="pop-recive-item">'+
                        '<div class="pop-record-name">'+recipients[i].recipientName+'</div>'+
                        '<div class="pop-record-num">'+recipients[i].recipientEmail+'</div>'+
                    '</div>';
                }
                $("#sendRecordRecipientsInfo").html(recipientsHtml);
                var attachments=dataJson.attachments;
                var attachmentsHtml="";
                for(var i=0;i<attachments.length;i++){
                    attachmentsHtml=attachmentsHtml+'<div class="pop-record-affix"><span>'+attachments[i].linkName+'</span><span class="pop-record-affixId" style="display:none;">'+attachments[i].linkUrl+'</span></div>';
                }
                $("#sendRecordAttachmentsInfo").html(attachmentsHtml);
                //附件下载
                $(".pop-record-affix").click(function(){
                    var url=$(this).find("span.pop-record-affixId").text();
                    if(url=="" || url==undefined || url==null){

                    }else{
                        window.location.href=url;
                    }
                });
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
    
            }
        });
    });
}