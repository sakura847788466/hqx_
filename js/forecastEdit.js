$(function(){
    //获取当天日期
    var currentTime=(new Date().Format("yyyy-MM-dd"));
    //每日预报、三天预报修改发布时间选择
    layui.use('laydate',function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#releaseTimeOneEdit', //指定元素
            type:"datetime",
            format:"yyyy-MM-dd HH:mm:ss",
            max:currentTime+" 23:59:59",
            change: function (value, data) { //监听日期变换
                lay("#releaseTimeOneEdit").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#releaseTimeOneEdit").val(value);
            }
        });
        laydate.render({
            elem: '#releaseTimeThreeEdit', //指定元素
            type:"datetime",
            format:"yyyy-MM-dd HH:mm:ss",
            max:currentTime+" 23:59:59",
            change: function (value, data) { //监听日期变换
                lay("#releaseTimeThreeEdit").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#releaseTimeThreeEdit").val(value);
                //获取潮汐、海浪、海面风、水温时间
                $(".threeTableNowEdit").text(new Date($("#releaseTimeThreeEdit").val()).Format("MM-dd"));
                $(".threeTableTomorrowEdit").text(new Date(new Date($("#releaseTimeThreeEdit").val()).getTime() + 1*24*60*60*1000).Format("MM-dd"));
                $(".threeTableAfterTomorrowEdit").text(new Date(new Date($("#releaseTimeThreeEdit").val()).getTime() + 2*24*60*60*1000).Format("MM-dd"));
            }
        });
    });

    //每日预报修改签发人
    var $oneEditUpload =  $("#uploadOneEdit");
    $oneEditUpload.change(function () {
        if($(this).val() != ""){
            oneEditUpload(this);
        }
    });
    //每日预报修改确定按钮
    $("#forecastSureOneEdit").click(function(){
        var number=$("#numberOneEdit").val();
        var title=$("#titleOneEdit").val();
        var time=$("#releaseTimeOneEdit").val();
        var releaseTime=Date.parse(new Date(time));
        var contact=$("#relationOneEdit").val();
        var phone=$("#mobileOneEdit").val();
        var fax=$("#foxOneEdit").val();
        var signer=$("#signatureBoxOneEdit").find("img").attr("props");
        var address=$("#addressOneEdit").val();
        var content=$("#messageOneEdit").val();
        if(title==""){
            $(".pop-tips").show().find("span").html("标题不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(number==""){
            $(".pop-tips").show().find("span").html("编号不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(releaseTime==""){
            $(".pop-tips").show().find("span").html("发布时间不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(content==""){
            $(".pop-tips").show().find("span").html("海况信息不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(content!=""){
            if(content.length > 130){
                $(".pop-tips").show().find("span").html("海况信息内容长度不能超过130个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if(contact==""){
            $(".pop-tips").show().find("span").html("联系人不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(phone==""){
            $(".pop-tips").show().find("span").html("电话不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(fax==""){
            $(".pop-tips").show().find("span").html("传真不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(signer=="" || signer==undefined){
            $(".pop-tips").show().find("span").html("签发人不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(address==""){
            $(".pop-tips").show().find("span").html("通信地址不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        $("#loading").show();
        $(".overlayOpacity",window.parent.document).show();
        $.ajax({
            url:srcPath+"admin/work/sheet/daily/record/update",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "id":id,
                "number":number,
                "title":title,
                "releaseTime":releaseTime,
                "contact":contact,
                "phone":phone,
                "fax":fax,
                "signer":signer,
                "address":address,
                "content":content
            }),
            success:function(data){
                $("#loading").hide();
                $(".overlayOpacity",window.parent.document).hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(data.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    $("#forecastDailyEdit").hide();
                    $(".overlayForcast",window.parent.document).hide();
                    var title=$("#searchName").val();
                    var page=$("#info-currentPage").text();
                    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,page,10);
                }else{
                    $("#fail").show();
                    $("#fail").find("span").text("发布时间或者编号不能重复");
                    setTimeout(function(){
                        $("#fail").hide();
                        $("#fail").find("span").text("操作失败");
                    },1000);
                }
                $(".pop-tips").hide().find("span").html("");
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });

    //三日预报修改签发人
    var $threeEditUpload =  $("#uploadThreeEdit");
    $threeEditUpload.change(function () {
        if($(this).val() != ""){
            threeEditUpload(this);
        }
    });
    //三日预报修改确定按钮
    $("#forecastSureThreeEdit").click(function(){
        var number=$("#numberThreeEdit").val();
        var title=$("#titleThreeEdit").val();
        var time=$("#releaseTimeThreeEdit").val();
        var releaseTime=Date.parse(new Date(time));
        var contact=$("#relationThreeEdit").val();
        var phone=$("#mobileThreeEdit").val();
        var fax=$("#foxThreeEdit").val();
        var signer=$("#signatureBoxThreeEdit").find("img").attr("props");
        var address=$("#addressThreeEdit").val();
        var tides=[],waves=[],winds=[],temps=[];
        //获取海面风、水温
        for(var i=1;i<4;i++){
            var tempsJson={};
            var windsJson={};
            tempsJson.predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".temperature-tableEdit").find("thead tr th").eq(i).text()));
            tempsJson.id=$(".temperature-tableEdit").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            tempsJson.temp=$(".temperature-tableEdit").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            temps.push(tempsJson);
            windsJson.predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wind-tableEdit").find("thead tr th").eq(i).text()));
            windsJson.id=$(".wind-tableEdit").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            windsJson.direction=$(".wind-tableEdit").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            windsJson.power=$(".wind-tableEdit").find("tbody tr").eq(2).find("td").eq(i).find("input").val();
            winds.push(windsJson);
        }
        //获取海浪
        for(var i=1;i<7;i++){
            var wavesJson={};
            wavesJson.predictTargetTime=i;
            if($(".wave-tableEdit").find("thead tr").eq(1).find("th").eq(i-1).text()=="白天"){
                wavesJson.day=1;
            }else{
                wavesJson.day=2;
            }
            wavesJson.id=$(".wave-tableEdit").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            wavesJson.level=$(".wave-tableEdit").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            wavesJson.grade=$(".wave-tableEdit").find("tbody tr").eq(2).find("td").eq(i).find("input").val();
            waves.push(wavesJson);
        }
        waves[0].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        waves[1].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        waves[2].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        waves[3].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        waves[4].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        waves[5].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        //获取潮汐
        for(var i=2;i<20;i++){
            var tidesJson={};
            tidesJson.predictTargetTime=i;
            tidesJson.id=$(".tide-tableEdit").find("tbody tr").eq(0).find("td").eq(i-1).find("input").val();
            tidesJson.time=$(".tide-tableEdit").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            tidesJson.level=$(".tide-tableEdit").find("tbody tr").eq(2).find("td").eq(i-1).find("input").val();
            tides.push(tidesJson);
        }
        tides[0].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[1].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[2].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[3].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[4].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[5].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[6].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[7].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[8].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[9].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[10].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[11].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[12].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[13].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[14].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[15].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[16].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[17].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableEdit").find("thead tr").eq(0).find("th").eq(3).text()));
        if(title==""){
            $(".pop-tips").show().find("span").html("标题不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(number==""){
            $(".pop-tips").show().find("span").html("编号不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(releaseTime==""){
            $(".pop-tips").show().find("span").html("发布时间不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(contact==""){
            $(".pop-tips").show().find("span").html("联系人不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(phone==""){
            $(".pop-tips").show().find("span").html("电话不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(fax==""){
            $(".pop-tips").show().find("span").html("传真不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(signer=="" || signer==undefined){
            $(".pop-tips").show().find("span").html("签发人不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if(address==""){
            $(".pop-tips").show().find("span").html("通信地址不能为空");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
            return false;
        }
        if($("#tideTimeOneEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeOneEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTwoEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTwoEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeThreeEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeThreeEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFourEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFourEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFiveEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFiveEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSixEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSixEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSevenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSevenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeEightEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeEightEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeNightEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeNightEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeElevenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeElevenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTwelveEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTwelveEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimethirteenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimethirteenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFourteenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFourteenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFifteenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFifteenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSixteenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSixteenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSeventeenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSeventeenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeEighteenEdit").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeEighteenEdit").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideHeightOneEdit").val()!=""){
            if($("#tideHeightOneEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightOneEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightOneEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightTwoEdit").val()!=""){
            if($("#tideHeightTwoEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTwoEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTwoEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightThreeEdit").val()!=""){
            if($("#tideHeightThreeEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightThreeEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightThreeEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightFourEdit").val()!=""){
            if($("#tideHeightFourEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFourEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFourEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightFiveEdit").val()!=""){
            if($("#tideHeightFiveEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFiveEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFiveEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightSixEdit").val()!=""){
            if($("#tideHeightSixEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSixEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSixEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightSevenEdit").val()!=""){
            if($("#tideHeightSevenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSevenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSevenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightEightEdit").val()!=""){
            if($("#tideHeightEightEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightEightEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightEightEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightNightEdit").val()!=""){
            if($("#tideHeightNightEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightNightEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightNightEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightTenEdit").val()!=""){
            if($("#tideHeightTenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightElevenEdit").val()!=""){
            if($("#tideHeightElevenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightElevenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightElevenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightTwelveEdit").val()!=""){
            if($("#tideHeightTwelveEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTwelveEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTwelveEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightthirteenEdit").val()!=""){
            if($("#tideHeightthirteenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightthirteenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightthirteenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightFourteenEdit").val()!=""){
            if($("#tideHeightFourteenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFourteenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFourteenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightFifteenEdit").val()!=""){
            if($("#tideHeightFifteenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFifteenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFifteenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightSixteenEdit").val()!=""){
            if($("#tideHeightSixteenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSixteenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSixteenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightSeventeenEdit").val()!=""){
            if($("#tideHeightSeventeenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSeventeenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSeventeenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#tideHeightEighteenEdit").val()!=""){
            if($("#tideHeightEighteenEdit").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightEighteenEdit").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightEighteenEdit").val()) < parseFloat(1000)){ 
                        
                    }else{
                        $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                        setTimeout(function(){
                            $(".pop-tips").hide().find("span").html("");
                        },1000);
                        return false;
                    }
                }
            }
        }
        if($("#waveHeightDayOneEdit").val()!=""){
            if(($("#waveHeightDayOneEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightOneEdit").val()!=""){
            if(($("#waveHeightNightOneEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightDayTwoEdit").val()!=""){
            if(($("#waveHeightDayTwoEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightTwoEdit").val()!=""){
            if(($("#waveHeightNightTwoEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightDayThreeEdit").val()!=""){
            if(($("#waveHeightDayThreeEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightThreeEdit").val()!=""){
            if(($("#waveHeightNightThreeEdit").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayOneEdit").val()!=""){
            if(($("#waveLevelDayOneEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightOneEdit").val()!=""){
            if(($("#waveLevelNightOneEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayTwoEdit").val()!=""){
            if(($("#waveLevelDayTwoEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightTwoEdit").val()!=""){
            if(($("#waveLevelNightTwoEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayThreeEdit").val()!=""){
            if(($("#waveLevelDayThreeEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightThreeEdit").val()!=""){
            if(($("#waveLevelNightThreeEdit").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirOneEdit").val()!=""){
            if(($("#windDirOneEdit").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirTwoEdit").val()!=""){
            if(($("#windDirTwoEdit").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirThreeEdit").val()!=""){
            if(($("#windDirThreeEdit").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelOneEdit").val()!=""){
            if(($("#windLevelOneEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelTwoEdit").val()!=""){
            if(($("#windLevelTwoEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelThreeEdit").val()!=""){
            if(($("#windLevelThreeEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempOneEdit").val()!=""){
            if(($("#waterTempOneEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempTwoEdit").val()!=""){
            if(($("#waterTempTwoEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempThreeEdit").val()!=""){
            if(($("#waterTempThreeEdit").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        $.ajax({
            url:srcPath+"admin/work/sheet/threeDay/record/update",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "id":id,
                "number":number,
                "title":title,
                "releaseTime":releaseTime,
                "contact":contact,
                "phone":phone,
                "fax":fax,
                "signer":signer,
                "address":address,
                "tides":tides,
                "waves":waves,
                "winds":winds,
                "temps":temps
            }),
            success:function(data){
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(data.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    $("#forecastThreeEdit").hide();
                    $(".overlayForcast",window.parent.document).hide();
                    var title=$("#searchName").val();
                    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
                }else if(data.code=="-1"){
                    $("#fail").show().find("span").text(data.msg);
                    setTimeout(function(){
                        $("#fail").hide().find("span").text("操作失败");
                    },1000);
                }else{
                    $("#fail").show();
                    setTimeout(function(){
                        $("#fail").hide();
                    },1000);
                }
                $(".pop-tips").hide().find("span").html("");
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });

    //三日预报修改从天文潮数据库获取数据
    $("#astronomicTideEdit").click(function(){
        var predictTargetTime=Date.parse(new Date($("#releaseTimeThreeEdit").val()));
        $.ajax({
            url:srcPath+"admin/work/sheet/dayHighLowTide/list",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "predictTargetTime":predictTargetTime
            }),
            success:function(data){
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(data.code=="-1"){
                    $("#fail").show();
                    setTimeout(function(){
                        $("#fail").hide();
                    });
                }
                var dataJson=data.data.records;
                if(dataJson==""){
                    $("#tideTimeOneEdit").val("");
                    $("#tideHeightOneEdit").val("");
                    $("#tideTimeTwoEdit").val("");
                    $("#tideHeightTwoEdit").val("");
                    $("#tideTimeThreeEdit").val("");
                    $("#tideHeightThreeEdit").val("");
                    $("#tideTimeFourEdit").val("");
                    $("#tideHeightFourEdit").val("");
                    $("#tideTimeFiveEdit").val("");
                    $("#tideHeightFiveEdit").val("");
                    $("#tideTimeSixEdit").val("");
                    $("#tideHeightSixEdit").val("");
                    $("#tideTimeSevenEdit").val("");
                    $("#tideHeightSevenEdit").val("");
                    $("#tideTimeEightEdit").val("");
                    $("#tideHeightEightEdit").val("");
                    $("#tideTimeNightEdit").val("");
                    $("#tideHeightNightEdit").val("");
                    $("#tideTimeTenEdit").val("");
                    $("#tideHeightTenEdit").val("");
                    $("#tideTimeElevenEdit").val("");
                    $("#tideHeightElevenEdit").val("");
                    $("#tideTimeTwelveEdit").val("");
                    $("#tideHeightTwelveEdit").val("");
                    $("#tideTimethirteenEdit").val("");
                    $("#tideHeightthirteenEdit").val("");
                    $("#tideTimeFourteenEdit").val("");
                    $("#tideHeightFourteenEdit").val("");
                    $("#tideTimeFifteenEdit").val("");
                    $("#tideHeightFifteenEdit").val("");
                    $("#tideTimeSixteenEdit").val("");
                    $("#tideHeightSixteenEdit").val("");
                    $("#tideTimeSeventeenEdit").val("");
                    $("#tideHeightSeventeenEdit").val("");
                    $("#tideTimeEighteenEdit").val("");
                    $("#tideHeightEighteenEdit").val("");
                    $("#alert").show();
                    setTimeout(function(){
                        $("#alert").hide();
                    },1000);
                }else{
                    $("#success").show().find("span").text("从天文潮数据库获取数据成功");
                    setTimeout(function(){
                        $("#success").hide().find("span").text("操作成功");
                    },1000);
                    if(dataJson[0]==undefined || dataJson[0]=="" || dataJson[0]==null){

                    }else{
                        if(dataJson[0].tides[0]==undefined || dataJson[0].tides[0]=="" || dataJson[0].tides[0]==null){
                            $("#tideTimeOneEdit").val("");
                            $("#tideHeightOneEdit").val("");
                        }else{
                            $("#tideTimeOneEdit").val(new Date(dataJson[0].tides[0].time).Format("hh:mm"));
                            $("#tideHeightOneEdit").val(dataJson[0].tides[0].level);
                        }
                        if(dataJson[0].tides[1]==undefined || dataJson[0].tides[1]=="" || dataJson[0].tides[1]==null){
                            $("#tideTimeTwoEdit").val("");
                            $("#tideHeightTwoEdit").val("");
                        }else{
                            $("#tideTimeTwoEdit").val(new Date(dataJson[0].tides[1].time).Format("hh:mm"));
                            $("#tideHeightTwoEdit").val(dataJson[0].tides[1].level);
                        }
                        if(dataJson[0].tides[2]==undefined || dataJson[0].tides[2]=="" || dataJson[0].tides[2]==null){
                            $("#tideTimeThreeEdit").val("");
                            $("#tideHeightThreeEdit").val("");
                        }else{
                            $("#tideTimeThreeEdit").val(new Date(dataJson[0].tides[2].time).Format("hh:mm"));
                            $("#tideHeightThreeEdit").val(dataJson[0].tides[2].level);
                        }
                        if(dataJson[0].tides[3]==undefined || dataJson[0].tides[3]=="" || dataJson[0].tides[3]==null){
                            $("#tideTimeFourEdit").val("");
                            $("#tideHeightFourEdit").val("");
                        }else{
                            $("#tideTimeFourEdit").val(new Date(dataJson[0].tides[3].time).Format("hh:mm"));
                            $("#tideHeightFourEdit").val(dataJson[0].tides[3].level);
                        }
                        if(dataJson[0].tides[4]==undefined || dataJson[0].tides[4]=="" || dataJson[0].tides[4]==null){
                            $("#tideTimeFiveEdit").val("");
                            $("#tideHeightFiveEdit").val("");
                        }else{
                            $("#tideTimeFiveEdit").val(new Date(dataJson[0].tides[4].time).Format("hh:mm"));
                            $("#tideHeightFiveEdit").val(dataJson[0].tides[4].level);
                        }
                        if(dataJson[0].tides[5]==undefined || dataJson[0].tides[5]=="" || dataJson[0].tides[5]==null){
                            $("#tideTimeSixEdit").val("");
                            $("#tideHeightSixEdit").val("");
                        }else{
                            $("#tideTimeSixEdit").val(new Date(dataJson[0].tides[5].time).Format("hh:mm"));
                            $("#tideHeightSixEdit").val(dataJson[0].tides[5].level);
                        }
                    }
                    if(dataJson[1]==undefined || dataJson[1]=="" || dataJson[1]==null){

                    }else{
                        if(dataJson[1].tides[0]==undefined || dataJson[1].tides[0]=="" || dataJson[1].tides[0]==null){
                            $("#tideTimeSevenEdit").val("");
                            $("#tideHeightSevenEdit").val("");
                        }else{
                            $("#tideTimeSevenEdit").val(new Date(dataJson[1].tides[0].time).Format("hh:mm"));
                            $("#tideHeightSevenEdit").val(dataJson[1].tides[0].level);
                        }
                        if(dataJson[1].tides[1]==undefined || dataJson[1].tides[1]=="" || dataJson[1].tides[1]==null){
                            $("#tideTimeEightEdit").val("");
                            $("#tideHeightEightEdit").val("");
                        }else{
                            $("#tideTimeEightEdit").val(new Date(dataJson[1].tides[1].time).Format("hh:mm"));
                            $("#tideHeightEightEdit").val(dataJson[1].tides[1].level);
                        }
                        if(dataJson[1].tides[2]==undefined || dataJson[1].tides[2]=="" || dataJson[1].tides[2]==null){
                            $("#tideTimeNightEdit").val("");
                            $("#tideHeightNightEdit").val("");
                        }else{
                            $("#tideTimeNightEdit").val(new Date(dataJson[1].tides[2].time).Format("hh:mm"));
                            $("#tideHeightNightEdit").val(dataJson[1].tides[2].level);
                        }
                        if(dataJson[1].tides[3]==undefined || dataJson[1].tides[3]=="" || dataJson[1].tides[3]==null){
                            $("#tideTimeTenEdit").val("");
                            $("#tideHeightTenEdit").val("");
                        }else{
                            $("#tideTimeTenEdit").val(new Date(dataJson[1].tides[3].time).Format("hh:mm"));
                            $("#tideHeightTenEdit").val(dataJson[1].tides[3].level);
                        }
                        if(dataJson[1].tides[4]==undefined || dataJson[1].tides[4]=="" || dataJson[1].tides[4]==null){
                            $("#tideTimeElevenEdit").val("");
                            $("#tideHeightElevenEdit").val("");
                        }else{
                            $("#tideTimeElevenEdit").val(new Date(dataJson[1].tides[4].time).Format("hh:mm"));
                            $("#tideHeightElevenEdit").val(dataJson[1].tides[4].level);
                        }
                        if(dataJson[1].tides[5]==undefined || dataJson[1].tides[5]=="" || dataJson[1].tides[5]==null){
                            $("#tideTimeTwelveEdit").val("");
                            $("#tideHeightTwelveEdit").val("");
                        }else{
                            $("#tideTimeTwelveEdit").val(new Date(dataJson[1].tides[5].time).Format("hh:mm"));
                            $("#tideHeightTwelveEdit").val(dataJson[1].tides[5].level);
                        }
                    }
                    if(dataJson[2]==undefined || dataJson[2]=="" || dataJson[2]==null){

                    }else{
                        if(dataJson[2].tides[0]==undefined || dataJson[2].tides[0]=="" || dataJson[2].tides[0]==null){
                            $("#tideTimethirteenEdit").val("");
                            $("#tideHeightthirteenEdit").val("");
                        }else{
                            $("#tideTimethirteenEdit").val(new Date(dataJson[2].tides[0].time).Format("hh:mm"));
                            $("#tideHeightthirteenEdit").val(dataJson[2].tides[0].level);
                        }
                        if(dataJson[2].tides[1]==undefined || dataJson[2].tides[1]=="" || dataJson[2].tides[1]==null){
                            $("#tideTimeFourteenEdit").val("");
                            $("#tideHeightFourteenEdit").val("");
                        }else{
                            $("#tideTimeFourteenEdit").val(new Date(dataJson[2].tides[1].time).Format("hh:mm"));
                            $("#tideHeightFourteenEdit").val(dataJson[2].tides[1].level);
                        }
                        if(dataJson[2].tides[2]==undefined || dataJson[2].tides[2]=="" || dataJson[2].tides[2]==null){
                            $("#tideTimeFifteenEdit").val("");
                            $("#tideHeightFifteenEdit").val("");
                        }else{
                            $("#tideTimeFifteenEdit").val(new Date(dataJson[2].tides[2].time).Format("hh:mm"));
                            $("#tideHeightFifteenEdit").val(dataJson[2].tides[2].level);
                        }
                        if(dataJson[2].tides[3]==undefined || dataJson[2].tides[3]=="" || dataJson[2].tides[3]==null){
                            $("#tideTimeSixteenEdit").val("");
                            $("#tideHeightSixteenEdit").val("");
                        }else{
                            $("#tideTimeSixteenEdit").val(new Date(dataJson[2].tides[3].time).Format("hh:mm"));
                            $("#tideHeightSixteenEdit").val(dataJson[2].tides[3].level);
                        }
                        if(dataJson[2].tides[4]==undefined || dataJson[2].tides[4]=="" || dataJson[2].tides[4]==null){
                            $("#tideTimeSeventeenEdit").val("");
                            $("#tideHeightSeventeenEdit").val("");
                        }else{
                            $("#tideTimeSeventeenEdit").val(new Date(dataJson[2].tides[4].time).Format("hh:mm"));
                            $("#tideHeightSeventeenEdit").val(dataJson[2].tides[4].level);
                        }
                        if(dataJson[2].tides[5]==undefined || dataJson[2].tides[5]=="" || dataJson[2].tides[5]==null){
                            $("#tideTimeEighteenEdit").val("");
                            $("#tideHeightEighteenEdit").val("");
                        }else{
                            $("#tideTimeEighteenEdit").val(new Date(dataJson[2].tides[5].time).Format("hh:mm"));
                            $("#tideHeightEighteenEdit").val(dataJson[2].tides[5].level);
                        }
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
});
//每日预报修改签发人
function oneEditUpload(ele){
    var files = $(ele)[0].files;
    if(!(/\.(jpg|png|JPG|PNG)$/.test(files[0].name))){
        $(".pop-tips").show().find("span").html("文件格式暂不支持，请上传jpg、png格式图片");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
        return false;
    }
    if(files[0].size > 262144){
        $(".pop-tips").show().find("span").html("上传图片不能大于256KB，请重新上传");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
        return false;
    }
    var formData = new FormData();
    formData.append("file", files[0]);
    $.ajax({
        url: srcPath + "admin/file/signer/upload",
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
                for(var i=0;i<dataJson.length;i++){
                    $("#signatureBoxOneEdit").find("img").attr("src",dataJson[i].suffixUrl);
                    $("#signatureBoxOneEdit").find("img").attr("props",dataJson[i].url);
                }
            }else if(responseStr.code=="-1"){
                $("#fail").show().find("span").text(responseStr.msg);
                setTimeout(function(){
                    $("#fail").hide().find("span").text("操作失败");
                },1000);
            }else{
                $("#fail").show();
                setTimeout(function(){
                    $("#fail").hide();
                },1000);
            }
        },
        error : function (responseStr) {
            
        }
    });
}
//三日预报修改签发人
function threeEditUpload(ele){
    var files = $(ele)[0].files;
    if(!(/\.(jpg|png|JPG|PNG)$/.test(files[0].name))){
        $(".pop-tips").show().find("span").html("文件格式暂不支持，请上传jpg、png格式图片");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
        return false;
    }
    if(files[0].size > 262144){
        $(".pop-tips").show().find("span").html("上传图片不能大于256KB，请重新上传");
            setTimeout(function(){
                $(".pop-tips").hide().find("span").html("");
            },1000);
        return false;
    }
    var formData = new FormData();
    formData.append("file", files[0]);
    $.ajax({
        url: srcPath + "admin/file/signer/upload",
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
                for(var i=0;i<dataJson.length;i++){
                    $("#signatureBoxThreeEdit").find("img").attr("src",dataJson[i].suffixUrl);
                    $("#signatureBoxThreeEdit").find("img").attr("props",dataJson[i].url);
                }
            }else if(responseStr.code=="-1"){
                $("#fail").show().find("span").text(responseStr.msg);
                setTimeout(function(){
                    $("#fail").hide().find("span").text("操作失败");
                },1000);
            }else{
                $("#fail").show();
                setTimeout(function(){
                    $("#fail").hide();
                },1000);
            }
        },
        error : function (responseStr) {
           
        }
    });
}