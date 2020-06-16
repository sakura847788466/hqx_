//获取发布人
var realName=$.cookie("realName");
$(function(){
    //获取当天日期
    var currentTime=(new Date().Format("yyyy-MM-dd"));
    //每日预报单制作弹窗获取上一次基础信息
    $("#forecastDailyTab").click(function(){
        $("#forecastDaily").show();
        $(".overlayForcast",window.parent.document).show();
        //获取发布人信息
        $("#authorOneAdd").val(realName);
        //获取当前发布时间信息
        $("#releaseTimeOneAdd").val(currentTime+" 11:00:00");
        var type=1;
        $.ajax({
            url:srcPath+"admin/work/sheet/last/contact",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "type":type
            }),
            success:function(data){
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                $("#relationOneAdd").val(data.data.contact);
                $("#mobileOneAdd").val(data.data.phone);
                $("#foxOneAdd").val(data.data.fax);
                $("#addressOneAdd").val(data.data.address);
                $("#signatureBoxOneAdd").find("img").attr("src",data.data.signerUrl);
                $("#signatureBoxOneAdd").find("img").attr("props",data.data.signer);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
    //每日预报单制作、三天预报单制作发布时间选择
    layui.use('laydate',function(){
        var laydate = layui.laydate;
        laydate.render({
            elem: '#releaseTimeOneAdd', //指定元素
            type:"datetime",
            format:"yyyy-MM-dd HH:mm:ss",
            max:currentTime+" 23:59:59",
            change: function (value, data) { //监听日期变换
                lay("#releaseTimeOneAdd").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#releaseTimeOneAdd").val(value);
            }
        });
        laydate.render({
            elem: '#releaseTimeThreeAdd', //指定元素
            type:"datetime",
            format:"yyyy-MM-dd HH:mm:ss",
            max:currentTime+" 23:59:59",
            change: function (value, data) { //监听日期变换
                lay("#releaseTimeThreeAdd").val(value);
            },
            done: function (value, date, endDate) { //日期选择完毕之后的函数
                $("#releaseTimeThreeAdd").val(value);
                //获取潮汐、海浪、海面风、水温时间
                $(".threeTableNowAdd").text(new Date($("#releaseTimeThreeAdd").val()).Format("MM-dd"));
                $(".threeTableTomorrowAdd").text(new Date(new Date($("#releaseTimeThreeAdd").val()).getTime() + 1*24*60*60*1000).Format("MM-dd"));
                $(".threeTableAfterTomorrowAdd").text(new Date(new Date($("#releaseTimeThreeAdd").val()).getTime() + 2*24*60*60*1000).Format("MM-dd"));
            }
        });
    });
    //每日预报添加签发人
    var $oneAddUpload =  $("#uploadOneAdd");
    $oneAddUpload.change(function () {
        if($(this).val() != ""){
            oneAddUpload(this);
        }
    });
    //每日预报单添加确定按钮
    $("#forecastSureOneAdd").click(function(){
        var number=$("#numberOneAdd").val();
        var title=$("#titleOneAdd").val();
        var time=$("#releaseTimeOneAdd").val();
        var releaseTime=Date.parse(new Date(time));
        var contact=$("#relationOneAdd").val();
        var phone=$("#mobileOneAdd").val();
        var fax=$("#foxOneAdd").val();
        var signer=$("#signatureBoxOneAdd").find("img").attr("props");
        var address=$("#addressOneAdd").val();
        var content=$("#messageOneAdd").val();
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
            url:srcPath+"admin/work/sheet/daily/record/add",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
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
                    $("#forecastDaily").hide();
                    $(".overlayForcast",window.parent.document).hide();
                    var title=$("#searchName").val();
                    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
                    $("#numberOneAdd").val("");
                    $("#titleOneAdd").val("");
                    $("#messageOneAdd").val("");
                }else if(data.code=="-1"){
                    $("#fail").show();
                    $("#fail").find("span").text("发布时间或者编号不能重复");
                    setTimeout(function(){
                        $("#fail").hide();
                        $("#fail").find("span").text("操作失败");
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
    
    //三日预报单制作获取上一次基础信息
    $("#forecastThreeTab").click(function(){
        $("#forecastThree").show();
        $(".overlayForcast",window.parent.document).show();
        $(".form-tab-title").find(".form-title-item").eq(0).addClass("form-title-click").siblings().removeClass("form-title-click");
        $(".form-tab-body").find(".form-body-item").eq(0).show().siblings().hide();
        //获取发布人信息
        $("#authorThreeAdd").val(realName);
        //获取当前发布时间信息
        $("#releaseTimeThreeAdd").val(currentTime+" 11:00:00");
        //获取潮汐、海浪、海面风、水温时间
        $(".threeTableNowAdd").text(new Date(currentTime).Format("MM-dd"));
        $(".threeTableTomorrowAdd").text(new Date(new Date(currentTime).getTime() + 1*24*60*60*1000).Format("MM-dd"));
        $(".threeTableAfterTomorrowAdd").text(new Date(new Date(currentTime).getTime() + 2*24*60*60*1000).Format("MM-dd"));
        var type=2;
        $.ajax({
            url:srcPath+"admin/work/sheet/last/contact",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
                "type":type
            }),
            success:function(data){
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }
                $("#relationThreeAdd").val(data.data.contact);
                $("#mobileThreeAdd").val(data.data.phone);
                $("#foxThreeAdd").val(data.data.fax);
                $("#addressThreeAdd").val(data.data.address);
                $("#signatureBoxThreeAdd").find("img").attr("src",data.data.signerUrl);
                $("#signatureBoxThreeAdd").find("img").attr("props",data.data.signer);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
    //三天预报添加签发人
    var $ThreeAddUpload =  $("#uploadThreeAdd");
    $ThreeAddUpload.change(function () {
        if($(this).val() != ""){
            ThreeAddUpload(this);
        }
    });
    //三日预报单添加确定按钮
    $("#forecastSureThreeAdd").click(function(){
        var number=$("#numberThreeAdd").val();
        var title=$("#titleThreeAdd").val();
        var time=$("#releaseTimeThreeAdd").val();
        var releaseTime=Date.parse(new Date(time));
        var contact=$("#relationThreeAdd").val();
        var phone=$("#mobileThreeAdd").val();
        var fax=$("#foxThreeAdd").val();
        var signer=$("#signatureBoxThreeAdd").find("img").attr("props");
        var address=$("#addressThreeAdd").val();
        var tides=[],waves=[],winds=[],temps=[];
        //获取海面风、水温
        for(var i=1;i<4;i++){
            var tempsJson={};
            var windsJson={};
            tempsJson.predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".temperature-tableAdd").find("thead tr th").eq(i).text()));
            tempsJson.temp=$(".temperature-tableAdd").find("tbody tr td").eq(i).find("input").val();
            temps.push(tempsJson);
            windsJson.predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wind-tableAdd").find("thead tr th").eq(i).text()));
            windsJson.direction=$(".wind-tableAdd").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            windsJson.power=$(".wind-tableAdd").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            winds.push(windsJson);
        }
        //获取海浪
        for(var i=1;i<7;i++){
            var wavesJson={};
            wavesJson.predictTargetTime=i;
            if($(".wave-tableAdd").find("thead tr").eq(1).find("th").eq(i-1).text()=="白天"){
                wavesJson.day=1;
            }else{
                wavesJson.day=2;
            }
            wavesJson.level=$(".wave-tableAdd").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            wavesJson.grade=$(".wave-tableAdd").find("tbody tr").eq(1).find("td").eq(i).find("input").val();
            waves.push(wavesJson);
        }
        waves[0].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        waves[1].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        waves[2].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        waves[3].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        waves[4].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        waves[5].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".wave-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        //获取潮汐
        for(var i=2;i<20;i++){
            var tidesJson={};
            tidesJson.predictTargetTime=i;
            tidesJson.time=$(".tide-tableAdd").find("tbody tr").eq(0).find("td").eq(i).find("input").val();
            tidesJson.level=$(".tide-tableAdd").find("tbody tr").eq(1).find("td").eq(i-1).find("input").val();
            tides.push(tidesJson);
        }
        tides[0].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[1].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[2].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[3].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[4].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[5].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(1).text()));
        tides[6].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[7].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[8].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[9].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[10].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[11].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(2).text()));
        tides[12].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[13].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[14].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[15].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[16].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
        tides[17].predictTargetTime=Date.parse(new Date((new Date(time)).Format("yyyy-")+$(".tide-tableAdd").find("thead tr").eq(0).find("th").eq(3).text()));
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
        if(signer=="" || signer ==undefined){
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
        if($("#tideTimeOneAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeOneAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTwoAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTwoAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeThreeAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeThreeAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFourAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFourAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFiveAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFiveAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSixAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSixAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSevenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSevenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeEightAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeEightAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeNightAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeNightAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeElevenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeElevenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeTwelveAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeTwelveAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimethirteenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimethirteenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFourteenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFourteenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeFifteenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeFifteenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSixteenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSixteenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeSeventeenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeSeventeenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideTimeEighteenAdd").val()!=""){
            if(!(/^([0-1]{1}\d|2[0-3]):([0-5]\d)$/.test($("#tideTimeEighteenAdd").val()))){
                $(".pop-tips").show().find("span").html("潮汐中潮时格式错误，必须为 小时:分钟(HH:mm)");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#tideHeightOneAdd").val()!=""){
            if($("#tideHeightOneAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightOneAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightOneAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightTwoAdd").val()!=""){
            if($("#tideHeightTwoAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTwoAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTwoAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightThreeAdd").val()!=""){
            if($("#tideHeightThreeAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightThreeAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightThreeAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightFourAdd").val()!=""){
            if($("#tideHeightFourAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFourAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFourAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightFiveAdd").val()!=""){
            if($("#tideHeightFiveAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFiveAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFiveAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightSixAdd").val()!=""){
            if($("#tideHeightSixAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSixAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSixAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightSevenAdd").val()!=""){
            if($("#tideHeightSevenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSevenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSevenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightEightAdd").val()!=""){
            if($("#tideHeightEightAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightEightAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightEightAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightNightAdd").val()!=""){
            if($("#tideHeightNightAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightNightAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightNightAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightTenAdd").val()!=""){
            if($("#tideHeightTenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightElevenAdd").val()!=""){
            if($("#tideHeightElevenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightElevenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightElevenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightTwelveAdd").val()!=""){
            if($("#tideHeightTwelveAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightTwelveAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightTwelveAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightthirteenAdd").val()!=""){
            if($("#tideHeightthirteenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightthirteenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightthirteenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightFourteenAdd").val()!=""){
            if($("#tideHeightFourteenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFourteenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFourteenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightFifteenAdd").val()!=""){
            if($("#tideHeightFifteenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightFifteenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightFifteenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightSixteenAdd").val()!=""){
            if($("#tideHeightSixteenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSixteenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSixteenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightSeventeenAdd").val()!=""){
            if($("#tideHeightSeventeenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightSeventeenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightSeventeenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#tideHeightEighteenAdd").val()!=""){
            if($("#tideHeightEighteenAdd").val().length > 6){
                $(".pop-tips").show().find("span").html("潮汐中潮高必须为小于1000的数字且不能超过6个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }else{
                if(!(/^([1-9]\d*)|(([+-]?)\d*\.\d+)$/.test($("#tideHeightEighteenAdd").val()))){
                    
                }else{
                    if(parseFloat($("#tideHeightEighteenAdd").val()) < parseFloat(1000)){ 
                        
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
        if($("#waveHeightDayOneAdd").val()!=""){
            if(($("#waveHeightDayOneAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightOneAdd").val()!=""){
            if(($("#waveHeightNightOneAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightDayTwoAdd").val()!=""){
            if(($("#waveHeightDayTwoAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightTwoAdd").val()!=""){
            if(($("#waveHeightNightTwoAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightDayThreeAdd").val()!=""){
            if(($("#waveHeightDayThreeAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveHeightNightThreeAdd").val()!=""){
            if(($("#waveHeightNightThreeAdd").val()).length > 15){
                $(".pop-tips").show().find("span").html("海浪中浪高不能超过15个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayOneAdd").val()!=""){
            if(($("#waveLevelDayOneAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightOneAdd").val()!=""){
            if(($("#waveLevelNightOneAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayTwoAdd").val()!=""){
            if(($("#waveLevelDayTwoAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightTwoAdd").val()!=""){
            if(($("#waveLevelNightTwoAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelDayThreeAdd").val()!=""){
            if(($("#waveLevelDayThreeAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waveLevelNightThreeAdd").val()!=""){
            if(($("#waveLevelNightThreeAdd").val()).length > 11){
                $(".pop-tips").show().find("span").html("海浪中浪级不能超过11个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirOneAdd").val()!=""){
            if(($("#windDirOneAdd").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirTwoAdd").val()!=""){
            if(($("#windDirTwoAdd").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windDirThreeAdd").val()!=""){
            if(($("#windDirThreeAdd").val()).length > 5){
                $(".pop-tips").show().find("span").html("海面风中风向不能超过5个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelOneAdd").val()!=""){
            if(($("#windLevelOneAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelTwoAdd").val()!=""){
            if(($("#windLevelTwoAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#windLevelThreeAdd").val()!=""){
            if(($("#windLevelThreeAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("海面风中风力不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempOneAdd").val()!=""){
            if(($("#waterTempOneAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempTwoAdd").val()!=""){
            if(($("#waterTempTwoAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        if($("#waterTempThreeAdd").val()!=""){
            if(($("#waterTempThreeAdd").val()).length > 9){
                $(".pop-tips").show().find("span").html("水温中水温不能超过9个字符");
                setTimeout(function(){
                    $(".pop-tips").hide().find("span").html("");
                },1000);
                return false;
            }
        }
        $.ajax({
            url:srcPath+"admin/work/sheet/threeDay/record/add",
            type:"post",
            dataType:'json',
            contentType:'application/json',
            headers: {
                token:  token
            },
            data: JSON.stringify({
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
                    $("#forecastThree").hide();
                    $(".overlayForcast",window.parent.document).hide();
                    var title=$("#searchName").val();
                    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,1,10);
                    $("#numberThreeAdd").val("");
                    $("#titleThreeAdd").val("");
                    $(".form-table-input").val("");
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
    //三日预报制作从天文潮数据库获取
    $("#astronomicTideAdd").click(function(){
        var predictTargetTime=Date.parse(new Date($("#releaseTimeThreeAdd").val()));
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
                    $(".tide-tableAdd").find("tbody tr td").find("input").val("");
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
                        $("#tideTimeOneAdd").val("");
                        $("#tideHeightOneAdd").val("");
                        $("#tideTimeTwoAdd").val("");
                        $("#tideHeightTwoAdd").val("");
                        $("#tideTimeThreeAdd").val("");
                        $("#tideHeightThreeAdd").val("");
                        $("#tideTimeFourAdd").val("");
                        $("#tideHeightFourAdd").val("");
                        $("#tideTimeFourAdd").val("");
                        $("#tideHeightFourAdd").val("");
                        $("#tideTimeSixAdd").val("");
                        $("#tideHeightSixAdd").val("");
                    }else{
                        if(dataJson[0].tides[0]==undefined || dataJson[0].tides[0]=="" || dataJson[0].tides[0]==null){
                            $("#tideTimeOneAdd").val("");
                            $("#tideHeightOneAdd").val("");
                        }else{
                            $("#tideTimeOneAdd").val(new Date(dataJson[0].tides[0].time).Format("hh:mm"));
                            $("#tideHeightOneAdd").val(dataJson[0].tides[0].level);
                        }
                        if(dataJson[0].tides[1]==undefined || dataJson[0].tides[1]=="" || dataJson[0].tides[1]==null){
                            $("#tideTimeTwoAdd").val("");
                            $("#tideHeightTwoAdd").val("");
                        }else{
                            $("#tideTimeTwoAdd").val(new Date(dataJson[0].tides[1].time).Format("hh:mm"));
                            $("#tideHeightTwoAdd").val(dataJson[0].tides[1].level);
                        }
                        if(dataJson[0].tides[2]==undefined || dataJson[0].tides[2]=="" || dataJson[0].tides[2]==null){
                            $("#tideTimeThreeAdd").val("");
                            $("#tideHeightThreeAdd").val("");
                        }else{
                            $("#tideTimeThreeAdd").val(new Date(dataJson[0].tides[2].time).Format("hh:mm"));
                            $("#tideHeightThreeAdd").val(dataJson[0].tides[2].level);
                        }
                        if(dataJson[0].tides[3]==undefined || dataJson[0].tides[3]=="" || dataJson[0].tides[3]==null){
                            $("#tideTimeFourAdd").val("");
                            $("#tideHeightFourAdd").val("");
                        }else{
                            $("#tideTimeFourAdd").val(new Date(dataJson[0].tides[3].time).Format("hh:mm"));
                            $("#tideHeightFourAdd").val(dataJson[0].tides[3].level);
                        }
                        if(dataJson[0].tides[4]==undefined || dataJson[0].tides[4]=="" || dataJson[0].tides[4]==null){
                            $("#tideTimeFiveAdd").val("");
                            $("#tideHeightFiveAdd").val("");
                        }else{
                            $("#tideTimeFiveAdd").val(new Date(dataJson[0].tides[4].time).Format("hh:mm"));
                            $("#tideHeightFiveAdd").val(dataJson[0].tides[4].level);
                        }
                        if(dataJson[0].tides[5]==undefined || dataJson[0].tides[5]=="" || dataJson[0].tides[5]==null){
                            $("#tideTimeSixAdd").val("");
                            $("#tideHeightSixAdd").val("");
                        }else{
                            $("#tideTimeSixAdd").val(new Date(dataJson[0].tides[5].time).Format("hh:mm"));
                            $("#tideHeightSixAdd").val(dataJson[0].tides[5].level);
                        }
                    }
                    if(dataJson[1]==undefined || dataJson[1]=="" || dataJson[1]==null){
                        $("#tideTimeSevenAdd").val("");
                        $("#tideHeightSevenAdd").val("");
                        $("#tideTimeEightAdd").val("");
                        $("#tideHeightEightAdd").val("");
                        $("#tideTimeNightAdd").val("");
                        $("#tideHeightNightAdd").val("");
                        $("#tideTimeTenAdd").val("");
                        $("#tideHeightTenAdd").val("");
                        $("#tideTimeElevenAdd").val("");
                        $("#tideHeightElevenAdd").val("");
                        $("#tideTimeTwelveAdd").val("");
                        $("#tideHeightTwelveAdd").val("");
                    }else{
                        if(dataJson[1].tides[0]==undefined || dataJson[1].tides[0]=="" || dataJson[1].tides[0]==null){
                            $("#tideTimeSevenAdd").val("");
                            $("#tideHeightSevenAdd").val("");
                        }else{
                            $("#tideTimeSevenAdd").val(new Date(dataJson[1].tides[0].time).Format("hh:mm"));
                            $("#tideHeightSevenAdd").val(dataJson[1].tides[0].level);
                        }
                        if(dataJson[1].tides[1]==undefined || dataJson[1].tides[1]=="" || dataJson[1].tides[1]==null){
                            $("#tideTimeEightAdd").val("");
                            $("#tideHeightEightAdd").val("");
                        }else{
                            $("#tideTimeEightAdd").val(new Date(dataJson[1].tides[1].time).Format("hh:mm"));
                            $("#tideHeightEightAdd").val(dataJson[1].tides[1].level);
                        }
                        if(dataJson[1].tides[2]==undefined || dataJson[1].tides[2]=="" || dataJson[1].tides[2]==null){
                            $("#tideTimeNightAdd").val("");
                            $("#tideHeightNightAdd").val("");
                        }else{
                            $("#tideTimeNightAdd").val(new Date(dataJson[1].tides[2].time).Format("hh:mm"));
                            $("#tideHeightNightAdd").val(dataJson[1].tides[2].level);
                        }
                        if(dataJson[1].tides[3]==undefined || dataJson[1].tides[3]=="" || dataJson[1].tides[3]==null){
                            $("#tideTimeTenAdd").val("");
                            $("#tideHeightTenAdd").val("");
                        }else{
                            $("#tideTimeTenAdd").val(new Date(dataJson[1].tides[3].time).Format("hh:mm"));
                            $("#tideHeightTenAdd").val(dataJson[1].tides[3].level);
                        }
                        if(dataJson[1].tides[4]==undefined || dataJson[1].tides[4]=="" || dataJson[1].tides[4]==null){
                            $("#tideTimeElevenAdd").val("");
                            $("#tideHeightElevenAdd").val("");
                        }else{
                            $("#tideTimeElevenAdd").val(new Date(dataJson[1].tides[4].time).Format("hh:mm"));
                            $("#tideHeightElevenAdd").val(dataJson[1].tides[4].level);
                        }
                        if(dataJson[1].tides[5]==undefined || dataJson[1].tides[5]=="" || dataJson[1].tides[5]==null){
                            $("#tideTimeTwelveAdd").val("");
                            $("#tideHeightTwelveAdd").val("");
                        }else{
                            $("#tideTimeTwelveAdd").val(new Date(dataJson[1].tides[5].time).Format("hh:mm"));
                            $("#tideHeightTwelveAdd").val(dataJson[1].tides[5].level);
                        }
                    }
                    if(dataJson[2]==undefined || dataJson[2]=="" || dataJson[2]==null){
                        $("#tideTimethirteenAdd").val("");
                        $("#tideHeightthirteenAdd").val("");
                        $("#tideTimeFourteenAdd").val("");
                        $("#tideHeightFourteenAdd").val("");
                        $("#tideTimeFifteenAdd").val("");
                        $("#tideHeightFifteenAdd").val("");
                        $("#tideTimeSixteenAdd").val("");
                        $("#tideHeightSixteenAdd").val("");
                        $("#tideTimeSeventeenAdd").val("");
                        $("#tideHeightSeventeenAdd").val("");
                        $("#tideTimeEighteenAdd").val("");
                        $("#tideHeightEighteenAdd").val("");
                    }else{
                        if(dataJson[2].tides[0]==undefined || dataJson[2].tides[0]=="" || dataJson[2].tides[0]==null){
                            $("#tideTimethirteenAdd").val("");
                            $("#tideHeightthirteenAdd").val("");
                        }else{
                            $("#tideTimethirteenAdd").val(new Date(dataJson[2].tides[0].time).Format("hh:mm"));
                            $("#tideHeightthirteenAdd").val(dataJson[2].tides[0].level);
                        }
                        if(dataJson[2].tides[1]==undefined || dataJson[2].tides[1]=="" || dataJson[2].tides[1]==null){
                            $("#tideTimeFourteenAdd").val("");
                            $("#tideHeightFourteenAdd").val("");
                        }else{
                            $("#tideTimeFourteenAdd").val(new Date(dataJson[2].tides[1].time).Format("hh:mm"));
                            $("#tideHeightFourteenAdd").val(dataJson[2].tides[1].level);
                        }
                        if(dataJson[2].tides[2]==undefined || dataJson[2].tides[2]=="" || dataJson[2].tides[2]==null){
                            $("#tideTimeFifteenAdd").val("");
                            $("#tideHeightFifteenAdd").val("");
                        }else{
                            $("#tideTimeFifteenAdd").val(new Date(dataJson[2].tides[2].time).Format("hh:mm"));
                            $("#tideHeightFifteenAdd").val(dataJson[2].tides[2].level);
                        }
                        if(dataJson[2].tides[3]==undefined || dataJson[2].tides[3]=="" || dataJson[2].tides[3]==null){
                            $("#tideTimeSixteenAdd").val("");
                            $("#tideHeightSixteenAdd").val("");
                        }else{
                            $("#tideTimeSixteenAdd").val(new Date(dataJson[2].tides[3].time).Format("hh:mm"));
                            $("#tideHeightSixteenAdd").val(dataJson[2].tides[3].level);
                        }
                        if(dataJson[2].tides[4]==undefined || dataJson[2].tides[4]=="" || dataJson[2].tides[4]==null){
                            $("#tideTimeSeventeenAdd").val("");
                            $("#tideHeightSeventeenAdd").val("");
                        }else{
                            $("#tideTimeSeventeenAdd").val(new Date(dataJson[2].tides[4].time).Format("hh:mm"));
                            $("#tideHeightSeventeenAdd").val(dataJson[2].tides[4].level);
                        }
                        if(dataJson[2].tides[5]==undefined || dataJson[2].tides[5]=="" || dataJson[2].tides[5]==null){
                            $("#tideTimeEighteenAdd").val("");
                            $("#tideHeightEighteenAdd").val("");
                        }else{
                            $("#tideTimeEighteenAdd").val(new Date(dataJson[2].tides[5].time).Format("hh:mm"));
                            $("#tideHeightEighteenAdd").val(dataJson[2].tides[5].level);
                        }
                    }
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){

            }
        });
    });
});
//每日预报新增签发人
function oneAddUpload(ele){
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
                    $("#signatureBoxOneAdd").find("img").attr("src",dataJson[i].suffixUrl);
                    $("#signatureBoxOneAdd").find("img").attr("props",dataJson[i].url);
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
//三天预报新增签发人
function ThreeAddUpload(ele){
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
                    $("#signatureBoxThreeAdd").find("img").attr("src",dataJson[i].suffixUrl);
                    $("#signatureBoxThreeAdd").find("img").attr("props",dataJson[i].url);
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