var releaseTimeStart="",releaseTimeEnd="",type="",uploadStatus="",id,forecastTableLenght,attachmentList=[];
//获取token值
var token=$.cookie("token");
$(function(){
    //选择预报类型、上传状态、发布时间
    $("#forecastType-select").click(function(e){
        $("#forecastType-drop").toggle();
    });
    $(".forecastType-list-item").click(function(){
        var text=$(this).find(".forecastType-list-text").text();
        $("#forecastType-select").find(".info-item-word").text(text);
        $("#forecastType-drop").hide();
        $(this).addClass("forecastType-list-click").siblings().removeClass("forecastType-list-click");
        if(text=="每日常规预报"){
            type=1;
        }else if(text=="未来三日预报"){
            type=2;
        }
        var title=$("#searchName").val();
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    });
    $("#forecastType-drop").mouseout(function(){
        $(this).hide();
    });
    $("#forecastType-drop").mouseover(function(){
        $(this).show();
    });
    $("#uploadStatus-select").click(function(){
        $("#uploadStatus-drop").toggle();
    });
    $(".uploadStatus-list-item").click(function(){
        var text=$(this).find(".uploadStatus-list-text").text();
        $("#uploadStatus-select").find(".info-item-word").text(text);
        $("#uploadStatus-drop").hide();
        $(this).addClass("uploadStatus-list-click").siblings().removeClass("uploadStatus-list-click");
        if(text=="未上传"){
            uploadStatus=1;
        }else if(text=="已上传"){
            uploadStatus=2;
        }
        var title=$("#searchName").val();
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    });
    $("#uploadStatus-drop").mouseout(function(){
        $(this).hide();
    });
    $("#uploadStatus-drop").mouseover(function(){
        $(this).show();
    });
    layui.use('laydate', function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#reportTime-select', //指定元素
            range: true,
            change: function (value, data) { //监听日期变换
                lay("#reportTime-select").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#reportTime-select").val(value);
                if($("#reportTime-select").val()==""){

                }else{
                    releaseTimeStart=Date.parse($("#reportTime-select").val().split(" ")[0]);
                    releaseTimeEnd=Date.parse($("#reportTime-select").val().split(" ")[2]);
                }
                var title=$("#searchName").val();
                forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
            }
        });
    });
    //搜索功能
    $("#searchName").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){
            var title=$("#searchName").val();
            forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
        }
    });
    $("#searchIcon").click(function () {
        var title=$("#searchName").val();
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    });
    //首页
    $("#info-firstPage").click(function () {
        var title=$("#searchName").val();
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    });
    //上一页
    $("#info-prevPage").click(function () {
        var title=$("#searchName").val();
        var pageNow=1;
        var currentPage=parseInt($("#info-currentPage").text());
        if(pageNow<1){
            return false;
        }else {
            pageNow=currentPage-1;
            forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,pageNow,10);
        }
    });
    //下一页
    $("#info-nextPage").click(function () {
        var title=$("#searchName").val();
        var pageNow;
        var currentPage=parseInt($("#info-currentPage").text());
        var totalPage=parseInt($("#info-totalPage").text());
        if(currentPage >= totalPage){
            return false;
        }else {
            pageNow=currentPage+1;
            forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,pageNow,10);
        }
    });
    //尾页
    $("#info-endPage").click(function () {
        var title=$("#searchName").val();
        var totalPage=$("#info-totalPage").text();
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,totalPage,10);
    });
    //跳转
    $("#info-pageTo").click(function () {
        var title=$("#searchName").val();
        var pageNum=$("#infoPageValue").val();
        if(pageNum==""){

        }else {
            forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,pageNum,10);
        }
    });
    $("#infoPageValue").keydown(function () {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13) {
            var title=$("#searchName").val();
            var pageNum = $("#infoPageValue").val();
            if (pageNum == "") {

            } else {
                forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,pageNum,10);
            }
        }
    });
    //清空选项
    $("#forecastClear").click(function () {
        $("#forecastType-select").find("span.info-item-word").text("选择预报类型");
        $("#uploadStatus-select").find("span.info-item-word").text("选择上传状态");
        $("#reportTime-select").val("");
        var title=$("#searchName").val();
        releaseTimeStart="";
        releaseTimeEnd="";
        type="";
        uploadStatus="";
        forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    });
    //默认加载列表
    var title=$("#searchName").val();
    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
    
    //批量导出
    $("#exportTab").click(function(){
        if(attachmentList.length==0){
            $("#export-pop").show().find("div.del-content").text("至少选择一项才可以导出");
            $("#exportSure").hide();
        }else{
            $("#export-pop").show().find("div.del-content").text("确定对所选的内容进行导出吗？");
            $("#exportSure").show();
        }
    });
    $("#exportSure").click(function(){
        batchExport(0);
        $("#export-pop").hide();
    });
});

//批量导出
function batchExport(i){
    window.location.href=attachmentList[i].url;
    setTimeout(function(){
        i++;
        if(attachmentList.length < i){
            return;
        }
        batchExport(i);
    },1000);
}

//预报制作单列表
function forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,current,size){
    $("#loading").show();
    $(".overlayOpacity",window.parent.document).show();
    attachmentList=[];
    $.ajax({
        url:srcPath+"admin/work/sheet/page",
        type:"post",
        dataType:'json',
        contentType:'application/json',
        headers: {
            token:  token
        },
        data: JSON.stringify({
            "title":title,
            "releaseTimeStart":releaseTimeStart,
            "releaseTimeEnd":releaseTimeEnd,
            "type":type,
            "uploadStatus":uploadStatus,
            "current":current,
            "size":size
        }),
        success:function(data){
            $("#loading").hide();
            $(".overlayOpacity",window.parent.document).hide();
            if(data.code=="-2"){
                window.parent.location.href="../login.html";
            }
            var dataJson=data.data.records;
            forecastTableLenght=dataJson;
            if(dataJson==""){
                $(".info-table-no").show();
                $(".info-table-yes").hide();
            }else{
                $(".info-table-no").hide();
                $(".info-table-yes").show();
                var tbaleHtml='<thead>'+
                    '<tr>'+
                        '<th>'+
                            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>'+
                            '<i class="iconfont checkbox-check">&#xead8;</i>'+
                        '</th>'+
                        '<th style="display:none;">id</th>'+
                        '<th style="display:none;">附件名称</th>'+
                        '<th style="display:none;">附件地址</th>'+
                        '<th>编号</th>'+
                        '<th>标题</th>'+
                        '<th>预报类型</th>'+
                        '<th>发布时间</th>'+
                        '<th>发布人</th>'+
                        '<th style="display:none;">预报类型</th>'+
                        '<th>上传状态</th>'+
                        '<th>操作</th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';
                for(var i=0;i<dataJson.length;i++){
                    var uploadStatus;
                    if(dataJson[i].uploadStatus=="1"){
                        uploadStatus='<span class="table-unload">未上传</span>';
                    }else{
                        uploadStatus='<span class="table-load">已上传</span>';
                    }
                    var forecastType;
                    if(dataJson[i].type=="1"){
                        forecastType="每日常规预报";
                    }else{
                        forecastType="未来三日预报";
                    }
                    var opearatorHtml;
                    if(dataJson[i].allowUpload==true){
                        if(dataJson[i].allowOperate==true){
                            if(dataJson[i].uploadStatus=="1"){
                                opearatorHtml='<span class="table-uploadIcon"><i class="iconfont">&#xeb15;</i><span class="table-txt">上传</span></span>'+
                                '<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                                '<span class="table-editIcon"><i class="iconfont">&#xeabe;</i><span class="table-txt">编辑</span></span>'+
                                '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>'+
                                '<span class="table-delIcon"><i class="iconfont">&#xeafb;</i><span class="table-txt">删除</span></span>';
                            }else{
                                opearatorHtml='<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                                '<span class="table-editIcon"><i class="iconfont">&#xeabe;</i><span class="table-txt">编辑</span></span>'+
                                '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>'+
                                '<span class="table-delIcon"><i class="iconfont">&#xeafb;</i><span class="table-txt">删除</span></span>';
                            }
                        }else{
                            if(dataJson[i].uploadStatus=="1"){
                                opearatorHtml='<span class="table-uploadIcon"><i class="iconfont">&#xeb15;</i><span class="table-txt">上传</span></span>'+
                                '<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                                '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>';
                            }else{
                                opearatorHtml='<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                                '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>';
                            }
                        }
                    }else{
                        if(dataJson[i].allowOperate==true){
                            opearatorHtml='<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                            '<span class="table-editIcon"><i class="iconfont">&#xeabe;</i><span class="table-txt">编辑</span></span>'+
                            '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>'+
                            '<span class="table-delIcon"><i class="iconfont">&#xeafb;</i><span class="table-txt">删除</span></span>';
                        }else{
                            opearatorHtml='<span class="table-infoIcon"><i class="iconfont">&#xeb46;</i><span class="table-txt">详情</span></span>'+
                            '<span class="table-loadIcon"><i class="iconfont">&#xeb13;</i><span class="table-txt">下载</span></span>';
                        }
                    }
                    tbaleHtml=tbaleHtml+'<tr>'+
                        '<td>'+
                            '<i class="iconfont checkbox-uncheck">&#xeadc;</i>'+
                            '<i class="iconfont checkbox-check">&#xead8;</i>'+
                        '</td>'+
                        '<td style="display:none;">'+dataJson[i].id+'</td>'+
                        '<td style="display:none;">'+dataJson[i].linkName+'</td>'+
                        '<td style="display:none;">'+dataJson[i].linkUrl+'</td>'+
                        '<td>'+dataJson[i].number+'</td>'+
                        '<td>'+dataJson[i].title+'</td>'+
                        '<td>'+forecastType+'</td>'+
                        '<td>'+new Date(dataJson[i].releaseTime).Format('yyyy-MM-dd hh:mm:ss')+'</td>'+
                        '<td>'+dataJson[i].author+'</td>'+
                        '<td style="display:none;">'+dataJson[i].type+'</td>'+
                        '<td>'+uploadStatus+'</td>'+
                        '<td>'+opearatorHtml+'</td>'+
                    '</tr>';
                }
                tbaleHtml=tbaleHtml+'</tbody>';
                $(".info-table").html(tbaleHtml);
                //表格操作
                forecastUpload();
                forecastInfo();
                forecastEdit();
                forecastDel();
                forecastLoad();
                forecastCheck();
                //分页操作
                $("#info-totalPage").text(data.data.pages);
                $("#info-currentPage").text(data.data.current);
                $("#info-totalRecord").text(data.data.total);
                var page=parseInt($("#info-currentPage").text());
                var total=parseInt($("#info-totalPage").text());
                if(page==1){
                    $("#info-prevPage").addClass("page-item-notClick");
                    $("#info-nextPage").removeClass("page-item-notClick");
                }else if(page==total){
                    $("#info-nextPage").addClass("page-item-notClick");
                    $("#info-prevPage").removeClass("page-item-notClick");
                }else {
                    $("#info-prevPage").removeClass("page-item-notClick");
                    $("#info-nextPage").removeClass("page-item-notClick");
                }
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){

        }
    });
}
//列表是否被选中
function forecastCheck(){
    $(".info-table").find("thead tr th:eq(0)").click(function () {
        $(this).toggleClass("check-click");
        if($(this).hasClass("check-click")){
            $(".info-table").find("tbody tr td").addClass("check-click");
            for(var i=0;i<forecastTableLenght.length;i++){
                var attachmentListJson={};
                attachmentListJson.id=forecastTableLenght[i].id;
                attachmentListJson.name=forecastTableLenght[i].linkName;
                attachmentListJson.url=forecastTableLenght[i].linkUrl;
                attachmentList.push(attachmentListJson);
            }
        }else {
            $(".info-table").find("tbody tr td").removeClass("check-click");
            attachmentList.splice(0,attachmentList.length);
        }
    });
    $(".info-table").find("tbody tr").each(function(){
        var td=$(this).find("td").eq(0);
        td.click(function(){
            $(this).toggleClass("check-click");
            var id=$(this).siblings("td").eq(0).text();
            if ($(this).hasClass("check-click")){
                var attachmentListJson={};
                attachmentListJson.id=$(this).siblings("td").eq(0).text();
                attachmentListJson.name=$(this).siblings("td").eq(1).text();
                attachmentListJson.url=$(this).siblings("td").eq(2).text();
                attachmentList.push(attachmentListJson);
            } else {
                $(".info-table").find("thead tr th").removeClass("check-click");
                for(var i=0;i<attachmentList.length;i++){
                    if(attachmentList[i].id==id){
                        attachmentList.splice(i,1);
                    }else{
    
                    }
                }
            }
        });
    });
    /*$(".info-table").find("tbody tr td").click(function () {
        $(this).toggleClass("check-click");
        var id=$(this).siblings("td").eq(0).text();
        if ($(this).hasClass("check-click")){
            var attachmentListJson={};
            attachmentListJson.id=$(this).siblings("td").eq(0).text();
            attachmentListJson.name=$(this).siblings("td").eq(1).text();
            attachmentListJson.url=$(this).siblings("td").eq(2).text();
            attachmentList.push(attachmentListJson);
        } else {
            $(".info-table").find("thead tr th").removeClass("check-click");
            for(var i=0;i<attachmentList.length;i++){
                if(attachmentList[i].id==id){
                    attachmentList.splice(i,1);
                }else{

                }
            }
        }
    });*/
}
//列表上传
function forecastUpload(){
    $(".table-uploadIcon").click(function(e){
        id=$(this).parent().siblings("td").eq(1).text();
        $("#upload-pop").show();
        e.stopPropagation();
    });
}
//列表下载
function forecastLoad(){
    $(".table-loadIcon").click(function(e){
        var url=$(this).parent().siblings("td").eq(3).text();
        if(url=="" || url==undefined || url==null){

        }else{
            window.location.href=url;
        }
        e.stopPropagation();
    });
}
//列表详情
function forecastInfo(){
    $(".table-infoIcon").click(function(e){
        var id=$(this).parent().siblings("td").eq(1).text();
        var foresastType=$(this).parent().siblings("td").eq(9).text();
        if(foresastType=="1"){
            $.ajax({
                url:srcPath+"admin/work/sheet/daily/record/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        //每日预报单制作
                        $("#forecastDailyInfo").show();
                        $("#titleOneInfo").val(data.data.title);
                        $("#releaseTimeOneInfo").val(new Date(data.data.releaseTime).Format("yyyy-MM-dd hh:mm:ss"));
                        $("#authorOneInfo").val(data.data.author);
                        $("#numberOneInfo").val(data.data.number);
                        $("#messageOneInfo").val(data.data.content);
                        $("#relationOneInfo").val(data.data.contact);
                        $("#mobileOneInfo").val(data.data.phone);
                        $("#foxOneInfo").val(data.data.fax);
                        $("#addressOneInfo").val(data.data.address);
                        $("#signatureBoxOneInfo").find("img").attr("src",data.data.signerUrl);
                        $("#signatureBoxOneInfo").find("img").attr("props",data.data.signer);
                    }else{
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }else{
            $.ajax({
                url:srcPath+"admin/work/sheet/threeDay/record/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        //三日预报单制作
                        $("#forecastThreeInfo").show();
                        $("#forecastThreeInfo").find(".form-tab-title").find(".form-title-item").eq(0).addClass("form-title-click").siblings().removeClass("form-title-click");
                        $("#forecastThreeInfo").find(".form-tab-body").find(".form-body-item").eq(0).show().siblings().hide();
                        $("#titleThreeInfo").val(data.data.title);
                        $("#releaseTimeThreeInfo").val(new Date(data.data.releaseTime).Format("yyyy-MM-dd hh:mm:ss"));
                        $("#authorThreeInfo").val(data.data.author);
                        $("#numberThreeInfo").val(data.data.number);
                        $("#relationThreeInfo").val(data.data.contact);
                        $("#mobileThreeInfo").val(data.data.phone);
                        $("#foxThreeInfo").val(data.data.fax);
                        $("#addressThreeInfo").val(data.data.address);
                        $("#signatureBoxThreeInfo").find("img").attr("src",data.data.signerUrl);
                        $("#signatureBoxThreeInfo").find("img").attr("props",data.data.signer);
                        var dataJson=data.data.forecast;
                        //时间
                        $(".threeTableNowInfo").text(new Date(data.data.releaseTime).Format("MM-dd"));
                        $(".threeTableTomorrowInfo").text(new Date(new Date(data.data.releaseTime).getTime() + 1*24*60*60*1000).Format("MM-dd"));
                        $(".threeTableAfterTomorrowInfo").text(new Date(new Date(data.data.releaseTime).getTime() + 2*24*60*60*1000).Format("MM-dd"));
                        if(dataJson==""){
                            
                        }else{
                            for(var i=0;i<dataJson.length;i++){
                                //$(".threeTableNowInfo").text(new Date(dataJson[0].predictTargetTime).Format("MM-dd"));
                                //$(".threeTableTomorrowInfo").text(new Date(dataJson[1].predictTargetTime).Format("MM-dd"));
                                //$(".threeTableAfterTomorrowInfo").text(new Date(dataJson[2].predictTargetTime).Format("MM-dd"));
                                //水温
                                $("#waterTempOneInfo").val(dataJson[0].temp.temp);
                                $("#waterTempTwoInfo").val(dataJson[1].temp.temp);
                                $("#waterTempThreeInfo").val(dataJson[2].temp.temp);
                                $("#waterIdOneInfo").val(dataJson[0].temp.id);
                                $("#waterIdTwoInfo").val(dataJson[1].temp.id);
                                $("#waterIdThreeInfo").val(dataJson[2].temp.id);
                                //海面风
                                $("#windIdOneInfo").val(dataJson[0].wind.id);
                                $("#windIdTwoInfo").val(dataJson[1].wind.id);
                                $("#windIdThreeInfo").val(dataJson[2].wind.id);
                                $("#windDirOneInfo").val(dataJson[0].wind.direction);
                                $("#windDirTwoInfo").val(dataJson[1].wind.direction);
                                $("#windDirThreeInfo").val(dataJson[2].wind.direction);
                                $("#windLevelOneInfo").val(dataJson[0].wind.power);
                                $("#windLevelTwoInfo").val(dataJson[1].wind.power);
                                $("#windLevelThreeInfo").val(dataJson[2].wind.power);
                                //海浪
                                $("#waveIdDayOneInfo").val(dataJson[0].waves.day.id);
                                $("#waveIdNightOneInfo").val(dataJson[0].waves.night.id);
                                $("#waveIdDayTwoInfo").val(dataJson[1].waves.day.id);
                                $("#waveIdNightTwoInfo").val(dataJson[1].waves.night.id);
                                $("#waveIdDayThreeInfo").val(dataJson[2].waves.day.id);
                                $("#waveIdNightThreeInfo").val(dataJson[2].waves.night.id);
                                $("#waveHeightDayOneInfo").val(dataJson[0].waves.day.level);
                                $("#waveHeightNightOneInfo").val(dataJson[0].waves.night.level);
                                $("#waveHeightDayTwoInfo").val(dataJson[1].waves.day.level);
                                $("#waveHeightNightTwoInfo").val(dataJson[1].waves.night.level);
                                $("#waveHeightDayThreeInfo").val(dataJson[2].waves.day.level);
                                $("#waveHeightNightThreeInfo").val(dataJson[2].waves.night.level);
                                $("#waveLevelDayOneInfo").val(dataJson[0].waves.day.grade);
                                $("#waveLevelNightOneInfo").val(dataJson[0].waves.night.grade);
                                $("#waveLevelDayTwoInfo").val(dataJson[1].waves.day.grade);
                                $("#waveLevelNightTwoInfo").val(dataJson[1].waves.night.grade);
                                $("#waveLevelDayThreeInfo").val(dataJson[2].waves.day.grade);
                                $("#waveLevelNightThreeInfo").val(dataJson[2].waves.night.grade);
                                //潮汐
                                $("#tideIdOneInfo").val(dataJson[0].tides[0].id);
                                $("#tideIdTwoInfo").val(dataJson[0].tides[1].id);
                                $("#tideIdThreeInfo").val(dataJson[0].tides[2].id);
                                $("#tideIdFourInfo").val(dataJson[0].tides[3].id);
                                $("#tideIdFiveInfo").val(dataJson[0].tides[4].id);
                                $("#tideIdSixInfo").val(dataJson[0].tides[5].id);
                                $("#tideIdSevenInfo").val(dataJson[1].tides[0].id);
                                $("#tideIdEightInfo").val(dataJson[1].tides[1].id);
                                $("#tideIdNightInfo").val(dataJson[1].tides[2].id);
                                $("#tideIdTenInfo").val(dataJson[1].tides[3].id);
                                $("#tideIdElevenInfo").val(dataJson[1].tides[4].id);
                                $("#tideIdTwelveInfo").val(dataJson[1].tides[5].id);
                                $("#tideIdthirteenInfo").val(dataJson[2].tides[0].id);
                                $("#tideIdFourteenInfo").val(dataJson[2].tides[1].id);
                                $("#tideIdFifteenInfo").val(dataJson[2].tides[2].id);
                                $("#tideIdSixteenInfo").val(dataJson[2].tides[3].id);
                                $("#tideIdSeventeenInfo").val(dataJson[2].tides[4].id);
                                $("#tideIdEighteenInfo").val(dataJson[2].tides[5].id);
                                if(dataJson[0].tides[0].time==null || dataJson[0].tides[0].time==undefined){
                                    $("#tideTimeOneInfo").val("");
                                }else{
                                    $("#tideTimeOneInfo").val(new Date(dataJson[0].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[1].time==null || dataJson[0].tides[1].time==undefined){
                                    $("#tideTimeTwoInfo").val("");
                                }else{
                                    $("#tideTimeTwoInfo").val(new Date(dataJson[0].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[2].time==null || dataJson[0].tides[2].time==undefined){
                                    $("#tideTimeThreeInfo").val("");
                                }else{
                                    $("#tideTimeThreeInfo").val(new Date(dataJson[0].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[3].time==null || dataJson[0].tides[3].time==undefined){
                                    $("#tideTimeFourInfo").val("");
                                }else{
                                    $("#tideTimeFourInfo").val(new Date(dataJson[0].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[4].time==null || dataJson[0].tides[4].time==undefined){
                                    $("#tideTimeFiveInfo").val("");
                                }else{
                                    $("#tideTimeFiveInfo").val(new Date(dataJson[0].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[5].time==null || dataJson[0].tides[5].time==undefined){
                                    $("#tideTimeSixInfo").val("");
                                }else{
                                    $("#tideTimeSixInfo").val(new Date(dataJson[0].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[0].time==null || dataJson[1].tides[0].time==undefined){
                                    $("#tideTimeSevenInfo").val("");
                                }else{
                                    $("#tideTimeSevenInfo").val(new Date(dataJson[1].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[1].time==null || dataJson[1].tides[1].time==undefined){
                                    $("#tideTimeEightInfo").val("");
                                }else{
                                    $("#tideTimeEightInfo").val(new Date(dataJson[1].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[2].time==null || dataJson[1].tides[2].time==undefined){
                                    $("#tideTimeNightInfo").val("");
                                }else{
                                    $("#tideTimeNightInfo").val(new Date(dataJson[1].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[3].time==null || dataJson[1].tides[3].time==undefined){
                                    $("#tideTimeTenInfo").val("");
                                }else{
                                    $("#tideTimeTenInfo").val(new Date(dataJson[1].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[4].time==null || dataJson[1].tides[4].time==undefined){
                                    $("#tideTimeElevenInfo").val("");
                                }else{
                                    $("#tideTimeElevenInfo").val(new Date(dataJson[1].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[5].time==null || dataJson[1].tides[5].time==undefined){
                                    $("#tideTimeTwelveInfo").val("");
                                }else{
                                    $("#tideTimeTwelveInfo").val(new Date(dataJson[1].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[0].time==null || dataJson[2].tides[0].time==undefined){
                                    $("#tideTimethirteenInfo").val("");
                                }else{
                                    $("#tideTimethirteenInfo").val(new Date(dataJson[2].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[1].time==null || dataJson[2].tides[1].time==undefined){
                                    $("#tideTimeFourteenInfo").val("");
                                }else{
                                    $("#tideTimeFourteenInfo").val(new Date(dataJson[2].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[2].time==null || dataJson[2].tides[2].time==undefined){
                                    $("#tideTimeFifteenInfo").val("");
                                }else{
                                    $("#tideTimeFifteenInfo").val(new Date(dataJson[2].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[3].time==null || dataJson[2].tides[3].time==undefined){
                                    $("#tideTimeSixteenInfo").val("");
                                }else{
                                    $("#tideTimeSixteenInfo").val(new Date(dataJson[2].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[4].time==null || dataJson[2].tides[4].time==undefined){
                                    $("#tideTimeSeventeenInfo").val("");
                                }else{
                                    $("#tideTimeSeventeenInfo").val(new Date(dataJson[2].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[5].time==null || dataJson[2].tides[5].time==undefined){
                                    $("#tideTimeEighteenInfo").val("");
                                }else{
                                    $("#tideTimeEighteenInfo").val(new Date(dataJson[2].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[0].level==null || dataJson[0].tides[0].level==undefined){
                                    $("#tideHeightOneInfo").val("");
                                }else{
                                    $("#tideHeightOneInfo").val(dataJson[0].tides[0].level);
                                }
                                if(dataJson[0].tides[1].level==null || dataJson[0].tides[1].level==undefined){
                                    $("#tideHeightTwoInfo").val("");
                                }else{
                                    $("#tideHeightTwoInfo").val(dataJson[0].tides[1].level);
                                }
                                if(dataJson[0].tides[2].level==null || dataJson[0].tides[2].level==undefined){
                                    $("#tideHeightThreeInfo").val("");
                                }else{
                                    $("#tideHeightThreeInfo").val(dataJson[0].tides[2].level);
                                }
                                if(dataJson[0].tides[3].level==null || dataJson[0].tides[3].level==undefined){
                                    $("#tideHeightFourInfo").val("");
                                }else{
                                    $("#tideHeightFourInfo").val(dataJson[0].tides[3].level);
                                }
                                if(dataJson[0].tides[4].level==null || dataJson[0].tides[4].level==undefined){
                                    $("#tideHeightFiveInfo").val("");
                                }else{
                                    $("#tideHeightFiveInfo").val(dataJson[0].tides[4].level);
                                }
                                if(dataJson[0].tides[5].level==null || dataJson[0].tides[5].level==undefined){
                                    $("#tideHeightSixInfo").val("");
                                }else{
                                    $("#tideHeightSixInfo").val(dataJson[0].tides[5].level);
                                }
                                if(dataJson[1].tides[0].level==null || dataJson[1].tides[0].level==undefined){
                                    $("#tideHeightSevenInfo").val("");
                                }else{
                                    $("#tideHeightSevenInfo").val(dataJson[1].tides[0].level);
                                }
                                if(dataJson[1].tides[1].level==null || dataJson[1].tides[1].level==undefined){
                                    $("#tideHeightEightInfo").val("");
                                }else{
                                    $("#tideHeightEightInfo").val(dataJson[1].tides[1].level);
                                }
                                if(dataJson[1].tides[2].level==null || dataJson[1].tides[2].level==undefined){
                                    $("#tideHeightNightInfo").val("");
                                }else{
                                    $("#tideHeightNightInfo").val(dataJson[1].tides[2].level);
                                }
                                if(dataJson[1].tides[3].level==null || dataJson[1].tides[3].level==undefined){
                                    $("#tideHeightTenInfo").val("");
                                }else{
                                    $("#tideHeightTenInfo").val(dataJson[1].tides[3].level);
                                }
                                if(dataJson[1].tides[4].level==null || dataJson[1].tides[4].level==undefined){
                                    $("#tideHeightElevenInfo").val("");
                                }else{
                                    $("#tideHeightElevenInfo").val(dataJson[1].tides[4].level);
                                }
                                if(dataJson[1].tides[5].level==null || dataJson[1].tides[5].level==undefined){
                                    $("#tideHeightTwelveInfo").val("");
                                }else{
                                    $("#tideHeightTwelveInfo").val(dataJson[1].tides[5].level);
                                }
                                if(dataJson[2].tides[0].level==null || dataJson[2].tides[0].level==undefined){
                                    $("#tideHeightthirteenInfo").val("");
                                }else{
                                    $("#tideHeightthirteenInfo").val(dataJson[2].tides[0].level);
                                }
                                if(dataJson[2].tides[1].level==null || dataJson[2].tides[1].level==undefined){
                                    $("#tideHeightFourteenInfo").val("");
                                }else{
                                    $("#tideHeightFourteenInfo").val(dataJson[2].tides[1].level);
                                }
                                if(dataJson[2].tides[2].level==null || dataJson[2].tides[2].level==undefined){
                                    $("#tideHeightFifteenInfo").val("");
                                }else{
                                    $("#tideHeightFifteenInfo").val(dataJson[2].tides[2].level);
                                }
                                if(dataJson[2].tides[3].level==null || dataJson[2].tides[3].level==undefined){
                                    $("#tideHeightSixteenInfo").val("");
                                }else{
                                    $("#tideHeightSixteenInfo").val(dataJson[2].tides[3].level);
                                }
                                if(dataJson[2].tides[4].level==null || dataJson[2].tides[4].level==undefined){
                                    $("#tideHeightSeventeenInfo").val("");
                                }else{
                                    $("#tideHeightSeventeenInfo").val(dataJson[2].tides[4].level);
                                }
                                if(dataJson[2].tides[5].level==null || dataJson[2].tides[5].level==undefined){
                                    $("#tideHeightEighteenInfo").val("");
                                }else{
                                    $("#tideHeightEighteenInfo").val(dataJson[2].tides[5].level);
                                }
                            }
                        }
                    }else{
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }
        e.stopPropagation();
    });
}
//列表修改
function forecastEdit(){
    $(".table-editIcon").click(function(e){
        id=$(this).parent().siblings("td").eq(1).text();
        var foresastType=$(this).parent().siblings("td").eq(9).text();
        if(foresastType=="1"){
            $.ajax({
                url:srcPath+"admin/work/sheet/daily/record/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        //每日预报
                        $("#forecastDailyEdit").show();
                        $(".overlayForcast",window.parent.document).show();
                        $("#titleOneEdit").val(data.data.title);
                        $("#releaseTimeOneEdit").val(new Date(data.data.releaseTime).Format("yyyy-MM-dd hh:mm:ss"));
                        $("#authorOneEdit").val(data.data.author);
                        $("#numberOneEdit").val(data.data.number);
                        $("#messageOneEdit").val(data.data.content);
                        $("#relationOneEdit").val(data.data.contact);
                        $("#mobileOneEdit").val(data.data.phone);
                        $("#foxOneEdit").val(data.data.fax);
                        $("#addressOneEdit").val(data.data.address);
                        $("#signatureBoxOneEdit").find("img").attr("src",data.data.signerUrl);
                        $("#signatureBoxOneEdit").find("img").attr("props",data.data.signer);
                    }else{
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }else{
            $.ajax({
                url:srcPath+"admin/work/sheet/threeDay/record/detail",
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
                    if(data.code=="-2"){
                        window.parent.location.href="../login.html";
                    }else if(data.code=="200"){
                        //三日预报
                        $("#forecastThreeEdit").show();
                        $(".overlayForcast",window.parent.document).show();
                        $("#forecastThreeEdit").find(".form-tab-title").find(".form-title-item").eq(0).addClass("form-title-click").siblings().removeClass("form-title-click");
                        $("#forecastThreeEdit").find(".form-tab-body").find(".form-body-item").eq(0).show().siblings().hide();
                        $("#titleThreeEdit").val(data.data.title);
                        $("#releaseTimeThreeEdit").val(new Date(data.data.releaseTime).Format("yyyy-MM-dd hh:mm:ss"));
                        $("#authorThreeEdit").val(data.data.author);
                        $("#numberThreeEdit").val(data.data.number);
                        $("#relationThreeEdit").val(data.data.contact);
                        $("#mobileThreeEdit").val(data.data.phone);
                        $("#foxThreeEdit").val(data.data.fax);
                        $("#addressThreeEdit").val(data.data.address);
                        $("#signatureBoxThreeEdit").find("img").attr("src",data.data.signerUrl);
                        $("#signatureBoxThreeEdit").find("img").attr("props",data.data.signer);
                        var dataJson=data.data.forecast;
                        //时间
                        $(".threeTableNowEdit").text(new Date(data.data.releaseTime).Format("MM-dd"));
                        $(".threeTableTomorrowEdit").text(new Date(new Date(data.data.releaseTime).getTime() + 1*24*60*60*1000).Format("MM-dd"));
                        $(".threeTableAfterTomorrowEdit").text(new Date(new Date(data.data.releaseTime).getTime() + 2*24*60*60*1000).Format("MM-dd"));
                        if(dataJson==""){
                            
                        }else{
                            for(var i=0;i<dataJson.length;i++){
                                //$(".threeTableNowInfo").text(new Date(dataJson[0].predictTargetTime).Format("MM-dd"));
                                //$(".threeTableTomorrowInfo").text(new Date(dataJson[1].predictTargetTime).Format("MM-dd"));
                                //$(".threeTableAfterTomorrowInfo").text(new Date(dataJson[2].predictTargetTime).Format("MM-dd"));
                                //水温
                                $("#waterTempOneEdit").val(dataJson[0].temp.temp);
                                $("#waterTempTwoEdit").val(dataJson[1].temp.temp);
                                $("#waterTempThreeEdit").val(dataJson[2].temp.temp);
                                $("#waterIdOneEdit").val(dataJson[0].temp.id);
                                $("#waterIdTwoEdit").val(dataJson[1].temp.id);
                                $("#waterIdThreeEdit").val(dataJson[2].temp.id);
                                //海面风
                                $("#windIdOneEdit").val(dataJson[0].wind.id);
                                $("#windIdTwoEdit").val(dataJson[1].wind.id);
                                $("#windIdThreeEdit").val(dataJson[2].wind.id);
                                $("#windDirOneEdit").val(dataJson[0].wind.direction);
                                $("#windDirTwoEdit").val(dataJson[1].wind.direction);
                                $("#windDirThreeEdit").val(dataJson[2].wind.direction);
                                $("#windLevelOneEdit").val(dataJson[0].wind.power);
                                $("#windLevelTwoEdit").val(dataJson[1].wind.power);
                                $("#windLevelThreeEdit").val(dataJson[2].wind.power);
                                //海浪
                                $("#waveIdDayOneEdit").val(dataJson[0].waves.day.id);
                                $("#waveIdNightOneEdit").val(dataJson[0].waves.night.id);
                                $("#waveIdDayTwoEdit").val(dataJson[1].waves.day.id);
                                $("#waveIdNightTwoEdit").val(dataJson[1].waves.night.id);
                                $("#waveIdDayThreeEdit").val(dataJson[2].waves.day.id);
                                $("#waveIdNightThreeEdit").val(dataJson[2].waves.night.id);
                                $("#waveHeightDayOneEdit").val(dataJson[0].waves.day.level);
                                $("#waveHeightNightOneEdit").val(dataJson[0].waves.night.level);
                                $("#waveHeightDayTwoEdit").val(dataJson[1].waves.day.level);
                                $("#waveHeightNightTwoEdit").val(dataJson[1].waves.night.level);
                                $("#waveHeightDayThreeEdit").val(dataJson[2].waves.day.level);
                                $("#waveHeightNightThreeEdit").val(dataJson[2].waves.night.level);
                                $("#waveLevelDayOneEdit").val(dataJson[0].waves.day.grade);
                                $("#waveLevelNightOneEdit").val(dataJson[0].waves.night.grade);
                                $("#waveLevelDayTwoEdit").val(dataJson[1].waves.day.grade);
                                $("#waveLevelNightTwoEdit").val(dataJson[1].waves.night.grade);
                                $("#waveLevelDayThreeEdit").val(dataJson[2].waves.day.grade);
                                $("#waveLevelNightThreeEdit").val(dataJson[2].waves.night.grade);
                                //潮汐
                                $("#tideIdOneEdit").val(dataJson[0].tides[0].id);
                                $("#tideIdTwoEdit").val(dataJson[0].tides[1].id);
                                $("#tideIdThreeEdit").val(dataJson[0].tides[2].id);
                                $("#tideIdFourEdit").val(dataJson[0].tides[3].id);
                                $("#tideIdFiveEdit").val(dataJson[0].tides[4].id);
                                $("#tideIdSixEdit").val(dataJson[0].tides[5].id);
                                $("#tideIdSevenEdit").val(dataJson[1].tides[0].id);
                                $("#tideIdEightEdit").val(dataJson[1].tides[1].id);
                                $("#tideIdNightEdit").val(dataJson[1].tides[2].id);
                                $("#tideIdTenEdit").val(dataJson[1].tides[3].id);
                                $("#tideIdElevenEdit").val(dataJson[1].tides[4].id);
                                $("#tideIdTwelveEdit").val(dataJson[1].tides[5].id);
                                $("#tideIdthirteenEdit").val(dataJson[2].tides[0].id);
                                $("#tideIdFourteenEdit").val(dataJson[2].tides[1].id);
                                $("#tideIdFifteenEdit").val(dataJson[2].tides[2].id);
                                $("#tideIdSixteenEdit").val(dataJson[2].tides[3].id);
                                $("#tideIdSeventeenEdit").val(dataJson[2].tides[4].id);
                                $("#tideIdEighteenEdit").val(dataJson[2].tides[5].id);
                                if(dataJson[0].tides[0].time==null || dataJson[0].tides[0].time==undefined){
                                    $("#tideTimeOneEdit").val("");
                                }else{
                                    $("#tideTimeOneEdit").val(new Date(dataJson[0].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[1].time==null || dataJson[0].tides[1].time==undefined){
                                    $("#tideTimeTwoEdit").val("");
                                }else{
                                    $("#tideTimeTwoEdit").val(new Date(dataJson[0].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[2].time==null || dataJson[0].tides[2].time==undefined){
                                    $("#tideTimeThreeEdit").val("");
                                }else{
                                    $("#tideTimeThreeEdit").val(new Date(dataJson[0].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[3].time==null || dataJson[0].tides[3].time==undefined){
                                    $("#tideTimeFourEdit").val("");
                                }else{
                                    $("#tideTimeFourEdit").val(new Date(dataJson[0].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[4].time==null || dataJson[0].tides[4].time==undefined){
                                    $("#tideTimeFiveEdit").val("");
                                }else{
                                    $("#tideTimeFiveEdit").val(new Date(dataJson[0].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[5].time==null || dataJson[0].tides[5].time==undefined){
                                    $("#tideTimeSixEdit").val("");
                                }else{
                                    $("#tideTimeSixEdit").val(new Date(dataJson[0].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[0].time==null || dataJson[1].tides[0].time==undefined){
                                    $("#tideTimeSevenEdit").val("");
                                }else{
                                    $("#tideTimeSevenEdit").val(new Date(dataJson[1].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[1].time==null || dataJson[1].tides[1].time==undefined){
                                    $("#tideTimeEightEdit").val("");
                                }else{
                                    $("#tideTimeEightEdit").val(new Date(dataJson[1].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[2].time==null || dataJson[1].tides[2].time==undefined){
                                    $("#tideTimeNightEdit").val("");
                                }else{
                                    $("#tideTimeNightEdit").val(new Date(dataJson[1].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[3].time==null || dataJson[1].tides[3].time==undefined){
                                    $("#tideTimeTenEdit").val("");
                                }else{
                                    $("#tideTimeTenEdit").val(new Date(dataJson[1].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[4].time==null || dataJson[1].tides[4].time==undefined){
                                    $("#tideTimeElevenEdit").val("");
                                }else{
                                    $("#tideTimeElevenEdit").val(new Date(dataJson[1].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[1].tides[5].time==null || dataJson[1].tides[5].time==undefined){
                                    $("#tideTimeTwelveEdit").val("");
                                }else{
                                    $("#tideTimeTwelveEdit").val(new Date(dataJson[1].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[0].time==null || dataJson[2].tides[0].time==undefined){
                                    $("#tideTimethirteenEdit").val("");
                                }else{
                                    $("#tideTimethirteenEdit").val(new Date(dataJson[2].tides[0].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[1].time==null || dataJson[2].tides[1].time==undefined){
                                    $("#tideTimeFourteenEdit").val("");
                                }else{
                                    $("#tideTimeFourteenEdit").val(new Date(dataJson[2].tides[1].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[2].time==null || dataJson[2].tides[2].time==undefined){
                                    $("#tideTimeFifteenEdit").val("");
                                }else{
                                    $("#tideTimeFifteenEdit").val(new Date(dataJson[2].tides[2].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[3].time==null || dataJson[2].tides[3].time==undefined){
                                    $("#tideTimeSixteenEdit").val("");
                                }else{
                                    $("#tideTimeSixteenEdit").val(new Date(dataJson[2].tides[3].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[4].time==null || dataJson[2].tides[4].time==undefined){
                                    $("#tideTimeSeventeenEdit").val("");
                                }else{
                                    $("#tideTimeSeventeenEdit").val(new Date(dataJson[2].tides[4].time).Format("hh:mm"));
                                }
                                if(dataJson[2].tides[5].time==null || dataJson[2].tides[5].time==undefined){
                                    $("#tideTimeEighteenEdit").val("");
                                }else{
                                    $("#tideTimeEighteenEdit").val(new Date(dataJson[2].tides[5].time).Format("hh:mm"));
                                }
                                if(dataJson[0].tides[0].level==null || dataJson[0].tides[0].level==undefined){
                                    $("#tideHeightOneEdit").val("");
                                }else{
                                    $("#tideHeightOneEdit").val(dataJson[0].tides[0].level);
                                }
                                if(dataJson[0].tides[1].level==null || dataJson[0].tides[1].level==undefined){
                                    $("#tideHeightTwoEdit").val("");
                                }else{
                                    $("#tideHeightTwoEdit").val(dataJson[0].tides[1].level);
                                }
                                if(dataJson[0].tides[2].level==null || dataJson[0].tides[2].level==undefined){
                                    $("#tideHeightThreeEdit").val("");
                                }else{
                                    $("#tideHeightThreeEdit").val(dataJson[0].tides[2].level);
                                }
                                if(dataJson[0].tides[3].level==null || dataJson[0].tides[3].level==undefined){
                                    $("#tideHeightFourEdit").val("");
                                }else{
                                    $("#tideHeightFourEdit").val(dataJson[0].tides[3].level);
                                }
                                if(dataJson[0].tides[4].level==null || dataJson[0].tides[4].level==undefined){
                                    $("#tideHeightFiveInfo").val("");
                                }else{
                                    $("#tideHeightFiveEdit").val(dataJson[0].tides[4].level);
                                }
                                if(dataJson[0].tides[5].level==null || dataJson[0].tides[5].level==undefined){
                                    $("#tideHeightSixEdit").val("");
                                }else{
                                    $("#tideHeightSixEdit").val(dataJson[0].tides[5].level);
                                }
                                if(dataJson[1].tides[0].level==null || dataJson[1].tides[0].level==undefined){
                                    $("#tideHeightSevenEdit").val("");
                                }else{
                                    $("#tideHeightSevenEdit").val(dataJson[1].tides[0].level);
                                }
                                if(dataJson[1].tides[1].level==null || dataJson[1].tides[1].level==undefined){
                                    $("#tideHeightEightEdit").val("");
                                }else{
                                    $("#tideHeightEightEdit").val(dataJson[1].tides[1].level);
                                }
                                if(dataJson[1].tides[2].level==null || dataJson[1].tides[2].level==undefined){
                                    $("#tideHeightNightEdit").val("");
                                }else{
                                    $("#tideHeightNightEdit").val(dataJson[1].tides[2].level);
                                }
                                if(dataJson[1].tides[3].level==null || dataJson[1].tides[3].level==undefined){
                                    $("#tideHeightTenEdit").val("");
                                }else{
                                    $("#tideHeightTenEdit").val(dataJson[1].tides[3].level);
                                }
                                if(dataJson[1].tides[4].level==null || dataJson[1].tides[4].level==undefined){
                                    $("#tideHeightElevenEdit").val("");
                                }else{
                                    $("#tideHeightElevenEdit").val(dataJson[1].tides[4].level);
                                }
                                if(dataJson[1].tides[5].level==null || dataJson[1].tides[5].level==undefined){
                                    $("#tideHeightTwelveEdit").val("");
                                }else{
                                    $("#tideHeightTwelveEdit").val(dataJson[1].tides[5].level);
                                }
                                if(dataJson[2].tides[0].level==null || dataJson[2].tides[0].level==undefined){
                                    $("#tideHeightthirteenEdit").val("");
                                }else{
                                    $("#tideHeightthirteenEdit").val(dataJson[2].tides[0].level);
                                }
                                if(dataJson[2].tides[1].level==null || dataJson[2].tides[1].level==undefined){
                                    $("#tideHeightFourteenEdit").val("");
                                }else{
                                    $("#tideHeightFourteenEdit").val(dataJson[2].tides[1].level);
                                }
                                if(dataJson[2].tides[2].level==null || dataJson[2].tides[2].level==undefined){
                                    $("#tideHeightFifteenEdit").val("");
                                }else{
                                    $("#tideHeightFifteenEdit").val(dataJson[2].tides[2].level);
                                }
                                if(dataJson[2].tides[3].level==null || dataJson[2].tides[3].level==undefined){
                                    $("#tideHeightSixteenEdit").val("");
                                }else{
                                    $("#tideHeightSixteenEdit").val(dataJson[2].tides[3].level);
                                }
                                if(dataJson[2].tides[4].level==null || dataJson[2].tides[4].level==undefined){
                                    $("#tideHeightSeventeenEdit").val("");
                                }else{
                                    $("#tideHeightSeventeenEdit").val(dataJson[2].tides[4].level);
                                }
                                if(dataJson[2].tides[5].level==null || dataJson[2].tides[5].level==undefined){
                                    $("#tideHeightEighteenEdit").val("");
                                }else{
                                    $("#tideHeightEighteenEdit").val(dataJson[2].tides[5].level);
                                }
                            }
                        }
                    }else{
                        $("#fail").show();
                        setTimeout(function(){
                            $("#fail").hide();
                        },1000);
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){

                }
            });
        }
        e.stopPropagation();
    });
}
//列表删除
function forecastDel(){
    $(".table-delIcon").click(function(e){
        id=$(this).parent().siblings("td").eq(1).text();
        $("#del-pop").show();
        e.stopPropagation();
    });
}