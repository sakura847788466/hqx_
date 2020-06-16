$(function(){
    //预览弹窗公共模块
    $(".previewClose").click(function(){
        $(this).parent().parent().parent().hide();
        $(".overlayPreview",window.parent.document).hide();
    });
    //每日预报单、三天预报单添加预览
    $("#forecastPreviewOneAdd").click(function(){
        $("#previewPopOne").show();
        $(".overlayPreview",window.parent.document).show();
        var number=$("#numberOneAdd").val();
        var time=$("#releaseTimeOneAdd").val();
        var contact=$("#relationOneAdd").val();
        var phone=$("#mobileOneAdd").val();
        var fax=$("#foxOneAdd").val();
        var signer=$("#signatureBoxOneAdd").find("img").attr("src");
        var address=$("#addressOneAdd").val();
        var content=$("#messageOneAdd").val();
        previewOne(number,time,contact,phone,fax,signer,address,content);
    });
    $("#forecastPreviewThreeAdd").click(function(){
        $("#previewPopThree").show();
        $(".overlayPreview",window.parent.document).show();
        var number=$("#numberThreeAdd").val();
        var time=$("#releaseTimeThreeAdd").val();
        var contact=$("#relationThreeAdd").val();
        var phone=$("#mobileThreeAdd").val();
        var fax=$("#foxThreeAdd").val();
        var signer=$("#signatureBoxThreeAdd").find("img").attr("src");
        var address=$("#addressThreeAdd").val();
        var now=$(".tide-tableAdd").find(".threeTableNowAdd").text();
        var tomorrow=$(".tide-tableAdd").find(".threeTableTomorrowAdd").text();
        var afterTomorrow=$(".tide-tableAdd").find(".threeTableAfterTomorrowAdd").text();
        var tideTimeOne=$("#tideTimeOneAdd").val();
        var tideTimeTwo=$("#tideTimeTwoAdd").val();
        var tideTimeThree=$("#tideTimeThreeAdd").val();
        var tideTimeFour=$("#tideTimeFourAdd").val();
        var tideTimeFive=$("#tideTimeFiveAdd").val();
        var tideTimeSix=$("#tideTimeSixAdd").val();
        var tideTimeSeven=$("#tideTimeSevenAdd").val();
        var tideTimeEight=$("#tideTimeEightAdd").val();
        var tideTimeNine=$("#tideTimeNightAdd").val();
        var tideTimeTen=$("#tideTimeTenAdd").val();
        var tideTimeEleven=$("#tideTimeElevenAdd").val();
        var tideTimeTwelve=$("#tideTimeTwelveAdd").val();
        var tideTimeThirteen=$("#tideTimethirteenAdd").val();
        var tideTimeFourteen=$("#tideTimeFourteenAdd").val();
        var tideTimeFifteen=$("#tideTimeFifteenAdd").val();
        var tideTimeSixteen=$("#tideTimeSixteenAdd").val();
        var tideTimeSeventeen=$("#tideTimeSeventeenAdd").val();
        var tideTimeEighteen=$("#tideTimeEighteenAdd").val();
        var tideHeightOne=$("#tideHeightOneAdd").val();
        var tideHeightTwo=$("#tideHeightTwoAdd").val();
        var tideHeightThree=$("#tideHeightThreeAdd").val();
        var tideHeightFour=$("#tideHeightFourAdd").val();
        var tideHeightFive=$("#tideHeightFiveAdd").val();
        var tideHeightSix=$("#tideHeightSixAdd").val();
        var tideHeightSeven=$("#tideHeightSevenAdd").val();
        var tideHeightEight=$("#tideHeightEightAdd").val();
        var tideHeightNine=$("#tideHeightNightAdd").val();
        var tideHeightTen=$("#tideHeightTenAdd").val();
        var tideHeightEleven=$("#tideHeightElevenAdd").val();
        var tideHeightTwelve=$("#tideHeightTwelveAdd").val();
        var tideHeightThirteen=$("#tideHeightthirteenAdd").val();
        var tideHeightFourteen=$("#tideHeightFourteenAdd").val();
        var tideHeightFifteen=$("#tideHeightFifteenAdd").val();
        var tideHeightSixteen=$("#tideHeightSixteenAdd").val();
        var tideHeightSeventeen=$("#tideHeightSeventeenAdd").val();
        var tideHeightEighteen=$("#tideHeightEighteenAdd").val();
        var waveHieghtDayOne=$("#waveHeightDayOneAdd").val();
        var waveHeightNightOne=$("#waveHeightNightOneAdd").val();
        var waveHieghtDayTwo=$("#waveHeightDayTwoAdd").val();
        var waveHeightNightTwo=$("#waveHeightNightTwoAdd").val();
        var waveHieghtDayThree=$("#waveHeightDayThreeAdd").val();
        var waveHeightNightThree=$("#waveHeightNightThreeAdd").val();
        var waveLevelDayOne=$("#waveLevelDayOneAdd").val();
        var waveLevelNightOne=$("#waveLevelNightOneAdd").val();
        var waveLevelDayTwo=$("#waveLevelDayTwoAdd").val();
        var waveLevelNightTwo=$("#waveLevelNightTwoAdd").val();
        var waveLevelDayThree=$("#waveLevelDayThreeAdd").val();
        var waveLevelNightThree=$("#waveLevelNightThreeAdd").val();
        var windDirOne=$("#windDirOneAdd").val();
        var windDirTwo=$("#windDirTwoAdd").val();
        var windDirThree=$("#windDirThreeAdd").val();
        var windLevelOne=$("#windLevelOneAdd").val();
        var windLevelTwo=$("#windLevelTwoAdd").val();
        var windLevelThree=$("#windLevelThreeAdd").val();
        var tempOne=$("#waterTempOneAdd").val();
        var tempTwo=$("#waterTempTwoAdd").val();
        var tempThree=$("#waterTempThreeAdd").val();
        previewThree(number,time,contact,phone,fax,signer,address);
        previewTime(now,tomorrow,afterTomorrow);
        previewTideTime(tideTimeOne,tideTimeTwo,tideTimeThree,tideTimeFour,tideTimeFive,tideTimeSix,tideTimeSeven,tideTimeEight,tideTimeNine,tideTimeTen,tideTimeEleven,tideTimeTwelve,tideTimeThirteen,tideTimeFourteen,tideTimeFifteen,tideTimeSixteen,tideTimeSeventeen,tideTimeEighteen);
        previewTideHeight(tideHeightOne,tideHeightTwo,tideHeightThree,tideHeightFour,tideHeightFive,tideHeightSix,tideHeightSeven,tideHeightEight,tideHeightNine,tideHeightTen,tideHeightEleven,tideHeightTwelve,tideHeightThirteen,tideHeightFourteen,tideHeightFifteen,tideHeightSixteen,tideHeightSeventeen,tideHeightEighteen);
        previewWave(waveHieghtDayOne,waveHieghtDayTwo,waveHieghtDayThree,waveHeightNightOne,waveHeightNightTwo,waveHeightNightThree,waveLevelDayOne,waveLevelDayTwo,waveLevelDayThree,waveLevelNightOne,waveLevelNightTwo,waveLevelNightThree);
        previewWind(windDirOne,windDirTwo,windDirThree,windLevelOne,windLevelTwo,windLevelThree);
        previewTemp(tempOne,tempTwo,tempThree);
    });
    //每日预报单、三天预报单修改预览
    $("#forecastPreviewOneEdit").click(function(){
        $("#previewPopOne").show();
        $(".overlayPreview",window.parent.document).show();
        var number=$("#numberOneEdit").val();
        var time=$("#releaseTimeOneEdit").val();
        var contact=$("#relationOneEdit").val();
        var phone=$("#mobileOneEdit").val();
        var fax=$("#foxOneEdit").val();
        var signer=$("#signatureBoxOneEdit").find("img").attr("src");
        var address=$("#addressOneEdit").val();
        var content=$("#messageOneEdit").val();
        previewOne(number,time,contact,phone,fax,signer,address,content);
    });
    $("#forecastPreviewThreeEdit").click(function(){
        $("#previewPopThree").show();
        $(".overlayPreview",window.parent.document).show();
        var number=$("#numberThreeEdit").val();
        var time=$("#releaseTimeThreeEdit").val();
        var contact=$("#relationThreeEdit").val();
        var phone=$("#mobileThreeEdit").val();
        var fax=$("#foxThreeEdit").val();
        var signer=$("#signatureBoxThreeEdit").find("img").attr("src");
        var address=$("#addressThreeEdit").val();
        var now=$(".tide-tableEdit").find(".threeTableNowEdit").text();
        var tomorrow=$(".tide-tableEdit").find(".threeTableTomorrowEdit").text();
        var afterTomorrow=$(".tide-tableEdit").find(".threeTableAfterTomorrowEdit").text();
        var tideTimeOne=$("#tideTimeOneEdit").val();
        var tideTimeTwo=$("#tideTimeTwoEdit").val();
        var tideTimeThree=$("#tideTimeThreeEdit").val();
        var tideTimeFour=$("#tideTimeFourEdit").val();
        var tideTimeFive=$("#tideTimeFiveEdit").val();
        var tideTimeSix=$("#tideTimeSixEdit").val();
        var tideTimeSeven=$("#tideTimeSevenEdit").val();
        var tideTimeEight=$("#tideTimeEightEdit").val();
        var tideTimeNine=$("#tideTimeNightEdit").val();
        var tideTimeTen=$("#tideTimeTenEdit").val();
        var tideTimeEleven=$("#tideTimeElevenEdit").val();
        var tideTimeTwelve=$("#tideTimeTwelveEdit").val();
        var tideTimeThirteen=$("#tideTimethirteenEdit").val();
        var tideTimeFourteen=$("#tideTimeFourteenEdit").val();
        var tideTimeFifteen=$("#tideTimeFifteenEdit").val();
        var tideTimeSixteen=$("#tideTimeSixteenEdit").val();
        var tideTimeSeventeen=$("#tideTimeSeventeenEdit").val();
        var tideTimeEighteen=$("#tideTimeEighteenEdit").val();
        var tideHeightOne=$("#tideHeightOneEdit").val();
        var tideHeightTwo=$("#tideHeightTwoEdit").val();
        var tideHeightThree=$("#tideHeightThreeEdit").val();
        var tideHeightFour=$("#tideHeightFourEdit").val();
        var tideHeightFive=$("#tideHeightFiveEdit").val();
        var tideHeightSix=$("#tideHeightSixEdit").val();
        var tideHeightSeven=$("#tideHeightSevenEdit").val();
        var tideHeightEight=$("#tideHeightEightEdit").val();
        var tideHeightNine=$("#tideHeightNightEdit").val();
        var tideHeightTen=$("#tideHeightTenEdit").val();
        var tideHeightEleven=$("#tideHeightElevenEdit").val();
        var tideHeightTwelve=$("#tideHeightTwelveEdit").val();
        var tideHeightThirteen=$("#tideHeightthirteenEdit").val();
        var tideHeightFourteen=$("#tideHeightFourteenEdit").val();
        var tideHeightFifteen=$("#tideHeightFifteenEdit").val();
        var tideHeightSixteen=$("#tideHeightSixteenEdit").val();
        var tideHeightSeventeen=$("#tideHeightSeventeenEdit").val();
        var tideHeightEighteen=$("#tideHeightEighteenEdit").val();
        var waveHieghtDayOne=$("#waveHeightDayOneEdit").val();
        var waveHeightNightOne=$("#waveHeightNightOneEdit").val();
        var waveHieghtDayTwo=$("#waveHeightDayTwoEdit").val();
        var waveHeightNightTwo=$("#waveHeightNightTwoEdit").val();
        var waveHieghtDayThree=$("#waveHeightDayThreeEdit").val();
        var waveHeightNightThree=$("#waveHeightNightThreeEdit").val();
        var waveLevelDayOne=$("#waveLevelDayOneEdit").val();
        var waveLevelNightOne=$("#waveLevelNightOneEdit").val();
        var waveLevelDayTwo=$("#waveLevelDayTwoEdit").val();
        var waveLevelNightTwo=$("#waveLevelNightTwoEdit").val();
        var waveLevelDayThree=$("#waveLevelDayThreeEdit").val();
        var waveLevelNightThree=$("#waveLevelNightThreeEdit").val();
        var windDirOne=$("#windDirOneEdit").val();
        var windDirTwo=$("#windDirTwoEdit").val();
        var windDirThree=$("#windDirThreeEdit").val();
        var windLevelOne=$("#windLevelOneEdit").val();
        var windLevelTwo=$("#windLevelTwoEdit").val();
        var windLevelThree=$("#windLevelThreeEdit").val();
        var tempOne=$("#waterTempOneEdit").val();
        var tempTwo=$("#waterTempTwoEdit").val();
        var tempThree=$("#waterTempThreeEdit").val();
        previewThree(number,time,contact,phone,fax,signer,address);
        previewTime(now,tomorrow,afterTomorrow);
        previewTideTime(tideTimeOne,tideTimeTwo,tideTimeThree,tideTimeFour,tideTimeFive,tideTimeSix,tideTimeSeven,tideTimeEight,tideTimeNine,tideTimeTen,tideTimeEleven,tideTimeTwelve,tideTimeThirteen,tideTimeFourteen,tideTimeFifteen,tideTimeSixteen,tideTimeSeventeen,tideTimeEighteen);
        previewTideHeight(tideHeightOne,tideHeightTwo,tideHeightThree,tideHeightFour,tideHeightFive,tideHeightSix,tideHeightSeven,tideHeightEight,tideHeightNine,tideHeightTen,tideHeightEleven,tideHeightTwelve,tideHeightThirteen,tideHeightFourteen,tideHeightFifteen,tideHeightSixteen,tideHeightSeventeen,tideHeightEighteen);
        previewWave(waveHieghtDayOne,waveHieghtDayTwo,waveHieghtDayThree,waveHeightNightOne,waveHeightNightTwo,waveHeightNightThree,waveLevelDayOne,waveLevelDayTwo,waveLevelDayThree,waveLevelNightOne,waveLevelNightTwo,waveLevelNightThree);
        previewWind(windDirOne,windDirTwo,windDirThree,windLevelOne,windLevelTwo,windLevelThree);
        previewTemp(tempOne,tempTwo,tempThree);
    });
    //每日预报单、三天预报单详情预览
    $("#forecastPreviewOneInfoPreviewBtn").click(function(){
        $("#previewPopOne").show();
        $(".overlayPreview",window.parent.document).show();
        var time=$("#releaseTimeOneInfo").val();
        var number=$("#numberOneInfo").val();
        var content=$("#messageOneInfo").val();
        var contact=$("#relationOneInfo").val();
        var phone=$("#mobileOneInfo").val();
        var fax=$("#foxOneInfo").val();
        var address=$("#addressOneInfo").val();
        var signer=$("#signatureBoxOneInfo").find("img").attr("src");
        previewOne(number,time,contact,phone,fax,signer,address,content);
    });
    $("#forecastPreviewThreeInfoPreviewBtn").click(function(){
        $("#previewPopThree").show();
        $(".overlayPreview",window.parent.document).show();
        var time=$("#releaseTimeThreeInfo").val();
        var number=$("#numberThreeInfo").val();
        var contact=$("#relationThreeInfo").val();
        var phone=$("#mobileThreeInfo").val();
        var fax=$("#foxThreeInfo").val();
        var address=$("#addressThreeInfo").val();
        var signer=$("#signatureBoxThreeInfo").find("img").attr("src");
        var now=$(".tide-tableInfo").find(".threeTableNowInfo").text();
        var tomorrow=$(".tide-tableInfo").find(".threeTableTomorrowInfo").text();
        var afterTomorrow=$(".tide-tableInfo").find(".threeTableAfterTomorrowInfo").text();
        var tideTimeOne=$("#tideTimeOneInfo").val();
        var tideTimeTwo=$("#tideTimeTwoInfo").val();
        var tideTimeThree=$("#tideTimeThreeInfo").val();
        var tideTimeFour=$("#tideTimeFourInfo").val();
        var tideTimeFive=$("#tideTimeFiveInfo").val();
        var tideTimeSix=$("#tideTimeSixInfo").val();
        var tideTimeSeven=$("#tideTimeSevenInfo").val();
        var tideTimeEight=$("#tideTimeEightInfo").val();
        var tideTimeNine=$("#tideTimeNightInfo").val();
        var tideTimeTen=$("#tideTimeTenInfo").val();
        var tideTimeEleven=$("#tideTimeElevenInfo").val();
        var tideTimeTwelve=$("#tideTimeTwelveInfo").val();
        var tideTimeThirteen=$("#tideTimethirteenInfo").val();
        var tideTimeFourteen=$("#tideTimeFourteenInfo").val();
        var tideTimeFifteen=$("#tideTimeFifteenInfo").val();
        var tideTimeSixteen=$("#tideTimeSixteenInfo").val();
        var tideTimeSeventeen=$("#tideTimeSeventeenInfo").val();
        var tideTimeEighteen=$("#tideTimeEighteenInfo").val();
        var tideHeightOne=$("#tideHeightOneInfo").val();
        var tideHeightTwo=$("#tideHeightTwoInfo").val();
        var tideHeightThree=$("#tideHeightThreeInfo").val();
        var tideHeightFour=$("#tideHeightFourInfo").val();
        var tideHeightFive=$("#tideHeightFiveInfo").val();
        var tideHeightSix=$("#tideHeightSixInfo").val();
        var tideHeightSeven=$("#tideHeightSevenInfo").val();
        var tideHeightEight=$("#tideHeightEightInfo").val();
        var tideHeightNine=$("#tideHeightNightInfo").val();
        var tideHeightTen=$("#tideHeightTenInfo").val();
        var tideHeightEleven=$("#tideHeightElevenInfo").val();
        var tideHeightTwelve=$("#tideHeightTwelveInfo").val();
        var tideHeightThirteen=$("#tideHeightthirteenInfo").val();
        var tideHeightFourteen=$("#tideHeightFourteenInfo").val();
        var tideHeightFifteen=$("#tideHeightFifteenInfo").val();
        var tideHeightSixteen=$("#tideHeightSixteenInfo").val();
        var tideHeightSeventeen=$("#tideHeightSeventeenInfo").val();
        var tideHeightEighteen=$("#tideHeightEighteenInfo").val();
        var waveHieghtDayOne=$("#waveHeightDayOneInfo").val();
        var waveHeightNightOne=$("#waveHeightNightOneInfo").val();
        var waveHieghtDayTwo=$("#waveHeightDayTwoInfo").val();
        var waveHeightNightTwo=$("#waveHeightNightTwoInfo").val();
        var waveHieghtDayThree=$("#waveHeightDayThreeInfo").val();
        var waveHeightNightThree=$("#waveHeightNightThreeInfo").val();
        var waveLevelDayOne=$("#waveLevelDayOneInfo").val();
        var waveLevelNightOne=$("#waveLevelNightOneInfo").val();
        var waveLevelDayTwo=$("#waveLevelDayTwoInfo").val();
        var waveLevelNightTwo=$("#waveLevelNightTwoInfo").val();
        var waveLevelDayThree=$("#waveLevelDayThreeInfo").val();
        var waveLevelNightThree=$("#waveLevelNightThreeInfo").val();
        var windDirOne=$("#windDirOneInfo").val();
        var windDirTwo=$("#windDirTwoInfo").val();
        var windDirThree=$("#windDirThreeInfo").val();
        var windLevelOne=$("#windLevelOneInfo").val();
        var windLevelTwo=$("#windLevelTwoInfo").val();
        var windLevelThree=$("#windLevelThreeInfo").val();
        var tempOne=$("#waterTempOneInfo").val();
        var tempTwo=$("#waterTempTwoInfo").val();
        var tempThree=$("#waterTempThreeInfo").val();
        previewThree(number,time,contact,phone,fax,signer,address);
        previewTime(now,tomorrow,afterTomorrow);
        previewTideTime(tideTimeOne,tideTimeTwo,tideTimeThree,tideTimeFour,tideTimeFive,tideTimeSix,tideTimeSeven,tideTimeEight,tideTimeNine,tideTimeTen,tideTimeEleven,tideTimeTwelve,tideTimeThirteen,tideTimeFourteen,tideTimeFifteen,tideTimeSixteen,tideTimeSeventeen,tideTimeEighteen);
        previewTideHeight(tideHeightOne,tideHeightTwo,tideHeightThree,tideHeightFour,tideHeightFive,tideHeightSix,tideHeightSeven,tideHeightEight,tideHeightNine,tideHeightTen,tideHeightEleven,tideHeightTwelve,tideHeightThirteen,tideHeightFourteen,tideHeightFifteen,tideHeightSixteen,tideHeightSeventeen,tideHeightEighteen);
        previewWave(waveHieghtDayOne,waveHieghtDayTwo,waveHieghtDayThree,waveHeightNightOne,waveHeightNightTwo,waveHeightNightThree,waveLevelDayOne,waveLevelDayTwo,waveLevelDayThree,waveLevelNightOne,waveLevelNightTwo,waveLevelNightThree);
        previewWind(windDirOne,windDirTwo,windDirThree,windLevelOne,windLevelTwo,windLevelThree);
        previewTemp(tempOne,tempTwo,tempThree);
    });
});
//每日预报预览
function previewOne(number,time,contact,phone,fax,signer,address,content){
    if(number=="" || number==undefined || number==null){
        $("#previewOneNum").html("");
    }else{
        $("#previewOneNum").html(number);
    }
    if(time=="" || time==undefined || time==null){
        $("#previewOneTime").html("");
    }else{
        $("#previewOneTime").html(new Date(time).Format("yyyy年MM月dd日 hh时"));
    }
    if(contact=="" || contact==undefined || contact==null){
        $("#previewOneContact").html("");
    }else{
        $("#previewOneContact").html(contact);
    }
    if(phone=="" || phone==undefined || phone==null){
        $("#previewOnePhone").html("");
    }else{
        $("#previewOnePhone").html(phone);
    }
    if(fax=="" || fax==undefined || fax==null){
        $("#previewOneFax").html("");
    }else{
        $("#previewOneFax").html(fax);
    }
    if(signer=="" || signer==undefined || signer==null){
        $("#previewOneSigner").hide();
    }else{
        $("#previewOneSigner").show().attr("src",signer);
    }
    if(address=="" || address==undefined || address==null){
        $("#previewOneAddress").html("");
    }else{
        $("#previewOneAddress").html(address);
    }
    if(content=="" || content==undefined || content==null){
        $("#previewOneMessage").html("");
    }else{
        $("#previewOneMessage").html(content);
    }
}
//三日预报预览
function previewThree(number,time,contact,phone,fax,signer,address){
    if(number=="" || number==undefined || number==null){
        $("#previewThreeNum").html("");
    }else{
        $("#previewThreeNum").html(number);
    }
    if(time=="" || time==undefined || time==null){
        $("#previewThreeTime").html("");
    }else{
        $("#previewThreeTime").html(new Date(time).Format("yyyy年MM月dd日 hh时"));
    }
    if(contact=="" || contact==undefined || contact==null){
        $("#previewThreeContact").html("");
    }else{
        $("#previewThreeContact").html(contact);
    }
    if(phone=="" || phone==undefined || phone==null){
        $("#previewThreePhone").html("");
    }else{
        $("#previewThreePhone").html(phone);
    }
    if(fax=="" || fax==undefined || fax==null){
        $("#previewThreeFax").html("");
    }else{
        $("#previewThreeFax").html(fax);
    }
    if(signer=="" || signer==undefined || signer==null){
        $("#previewThreeSigner").hide();
    }else{
        $("#previewThreeSigner").show().attr("src",signer);
    }
    if(address=="" || address==undefined || address==null){
        $("#previewThreeAddress").html("");
    }else{
        $("#previewThreeAddress").html(address);
    }
}
function previewTime(now,tomorrow,afterTomorrow){
    if(now=="" || now==undefined || now==null){
        $("#previewThreeNow").html("");
    }else{
        $("#previewThreeNow").html(new Date(now).Format("MM月dd日"));
    }
    if(tomorrow=="" || tomorrow==undefined || tomorrow==null){
        $("#previewThreeTomorrow").html("");
    }else{
        $("#previewThreeTomorrow").html(new Date(tomorrow).Format("MM月dd日"));
    }
    if(afterTomorrow=="" || afterTomorrow==undefined || afterTomorrow==null){
        $("#previewThreeAfterTomorrow").html("");
    }else{
        $("#previewThreeAfterTomorrow").html(new Date(afterTomorrow).Format("MM月dd日"));
    }
}
function previewTideTime(tideTimeOne,tideTimeTwo,tideTimeThree,tideTimeFour,tideTimeFive,tideTimeSix,tideTimeSeven,tideTimeEight,tideTimeNine,tideTimeTen,tideTimeEleven,tideTimeTwelve,tideTimeThirteen,tideTimeFourteen,tideTimeFifteen,tideTimeSixteen,tideTimeSeventeen,tideTimeEighteen){
    if(tideTimeOne=="" || tideTimeOne==undefined || tideTimeOne==null){
        $("#previewThreeTideTimeOne").html("");
    }else{
        $("#previewThreeTideTimeOne").html(tideTimeOne);
    }
    if(tideTimeTwo=="" || tideTimeTwo==undefined || tideTimeTwo==null){
        $("#previewThreeTideTimeTwo").html("");
    }else{
        $("#previewThreeTideTimeTwo").html(tideTimeTwo);
    }
    if(tideTimeThree=="" || tideTimeThree==undefined || tideTimeThree==null){
        $("#previewThreeTideTimeThree").html("");
    }else{
        $("#previewThreeTideTimeThree").html(tideTimeThree);
    }
    if(tideTimeFour=="" || tideTimeFour==undefined || tideTimeFour==null){
        $("#previewThreeTideTimeFour").html("");
    }else{
        $("#previewThreeTideTimeFour").html(tideTimeFour);
    }
    if(tideTimeFive=="" || tideTimeFive==undefined || tideTimeFive==null){
        $("#previewThreeTideTimeFive").html("");
    }else{
        $("#previewThreeTideTimeFive").html(tideTimeFive);
    }
    if(tideTimeSix=="" || tideTimeSix==undefined || tideTimeSix==null){
        $("#previewThreeTideTimeSix").html("");
    }else{
        $("#previewThreeTideTimeSix").html(tideTimeSix);
    }
    if(tideTimeSeven=="" || tideTimeSeven==undefined || tideTimeSeven==null){
        $("#previewThreeTideTimeSeven").html("");
    }else{
        $("#previewThreeTideTimeSeven").html(tideTimeSeven);
    }
    if(tideTimeEight=="" || tideTimeEight==undefined || tideTimeEight==null){
        $("#previewThreeTideTimeEight").html("");
    }else{
        $("#previewThreeTideTimeEight").html(tideTimeEight);
    }
    if(tideTimeNine=="" || tideTimeNine==undefined || tideTimeNine==null){
        $("#previewThreeTideTimeNine").html("");
    }else{
        $("#previewThreeTideTimeNine").html(tideTimeNine);
    }
    if(tideTimeTen=="" || tideTimeTen==undefined || tideTimeTen==null){
        $("#previewThreeTideTimeTen").html("");
    }else{
        $("#previewThreeTideTimeTen").html(tideTimeTen);
    }
    if(tideTimeEleven=="" || tideTimeEleven==undefined || tideTimeEleven==null){
        $("#previewThreeTideTimeEleven").html("");
    }else{
        $("#previewThreeTideTimeEleven").html(tideTimeEleven);
    }
    if(tideTimeTwelve=="" || tideTimeTwelve==undefined || tideTimeTwelve==null){
        $("#previewThreeTideTimeTwelve").html("");
    }else{
        $("#previewThreeTideTimeTwelve").html(tideTimeTwelve);
    }
    if(tideTimeThirteen=="" || tideTimeThirteen==undefined || tideTimeThirteen==null){
        $("#previewThreeTideTimeThirteen").html("");
    }else{
        $("#previewThreeTideTimeThirteen").html(tideTimeThirteen);
    }
    if(tideTimeFourteen=="" || tideTimeFourteen==undefined || tideTimeFourteen==null){
        $("#previewThreeTideTimeFourteen").html("");
    }else{
        $("#previewThreeTideTimeFourteen").html(tideTimeFourteen);
    }
    if(tideTimeFifteen=="" || tideTimeFifteen==undefined || tideTimeFifteen==null){
        $("#previewThreeTideTimeFifteen").html("");
    }else{
        $("#previewThreeTideTimeFifteen").html(tideTimeFifteen);
    }
    if(tideTimeSixteen=="" || tideTimeSixteen==undefined || tideTimeSixteen==null){
        $("#previewThreeTideTimeSixteen").html("");
    }else{
        $("#previewThreeTideTimeSixteen").html(tideTimeSixteen);
    }
    if(tideTimeSeventeen=="" || tideTimeSeventeen==undefined || tideTimeSeventeen==null){
        $("#previewThreeTideTimeSeventeen").html("");
    }else{
        $("#previewThreeTideTimeSeventeen").html(tideTimeSeventeen);
    }
    if(tideTimeEighteen=="" || tideTimeEighteen==undefined || tideTimeEighteen==null){
        $("#previewThreeTideTimeEighteen").html("");
    }else{
        $("#previewThreeTideTimeEighteen").html(tideTimeEighteen);
    }
}
function previewTideHeight(tideHeightOne,tideHeightTwo,tideHeightThree,tideHeightFour,tideHeightFive,tideHeightSix,tideHeightSeven,tideHeightEight,tideHeightNine,tideHeightTen,tideHeightEleven,tideHeightTwelve,tideHeightThirteen,tideHeightFourteen,tideHeightFifteen,tideHeightSixteen,tideHeightSeventeen,tideHeightEighteen){
    if(tideHeightOne=="" || tideHeightOne==undefined || tideHeightOne==null){
        $("#previewThreeTideHeightOne").html("");
    }else{
        $("#previewThreeTideHeightOne").html(tideHeightOne);
    }
    if(tideHeightTwo=="" || tideHeightTwo==undefined || tideHeightTwo==null){
        $("#previewThreeTideHeightTwo").html("");
    }else{
        $("#previewThreeTideHeightTwo").html(tideHeightTwo);
    }
    if(tideHeightThree=="" || tideHeightThree==undefined || tideHeightThree==null){
        $("#previewThreeTideHeightThree").html("");
    }else{
        $("#previewThreeTideHeightThree").html(tideHeightThree);
    }
    if(tideHeightFour=="" || tideHeightFour==undefined || tideHeightFour==null){
        $("#previewThreeTideHeightFour").html("");
    }else{
        $("#previewThreeTideHeightFour").html(tideHeightFour);
    }
    if(tideHeightFive=="" || tideHeightFive==undefined || tideHeightFive==null){
        $("#previewThreeTideHeightFive").html("");
    }else{
        $("#previewThreeTideHeightFive").html(tideHeightFive);
    }
    if(tideHeightSix=="" || tideHeightSix==undefined || tideHeightSix==null){
        $("#previewThreeTideHeightSix").html("");
    }else{
        $("#previewThreeTideHeightSix").html(tideHeightSix);
    }
    if(tideHeightSeven=="" || tideHeightSeven==undefined || tideHeightSeven==null){
        $("#previewThreeTideHeightSeven").html("");
    }else{
        $("#previewThreeTideHeightSeven").html(tideHeightSeven);
    }
    if(tideHeightEight=="" || tideHeightEight==undefined || tideHeightEight==null){
        $("#previewThreeTideHeightEight").html("");
    }else{
        $("#previewThreeTideHeightEight").html(tideHeightEight);
    }
    if(tideHeightNine=="" || tideHeightNine==undefined || tideHeightNine==null){
        $("#previewThreeTideHeightNine").html("");
    }else{
        $("#previewThreeTideHeightNine").html(tideHeightNine);
    }
    if(tideHeightTen=="" || tideHeightTen==undefined || tideHeightTen==null){
        $("#previewThreeTideHeightTen").html("");
    }else{
        $("#previewThreeTideHeightTen").html(tideHeightTen);
    }
    if(tideHeightEleven=="" || tideHeightEleven==undefined || tideHeightEleven==null){
        $("#previewThreeTideHeightEleven").html("");
    }else{
        $("#previewThreeTideHeightEleven").html(tideHeightEleven);
    }
    if(tideHeightTwelve=="" || tideHeightTwelve==undefined || tideHeightTwelve==null){
        $("#previewThreeTideHeightTwelve").html("");
    }else{
        $("#previewThreeTideHeightTwelve").html(tideHeightTwelve);
    }
    if(tideHeightThirteen=="" || tideHeightThirteen==undefined || tideHeightThirteen==null){
        $("#previewThreeTideHeightThirteen").html("");
    }else{
        $("#previewThreeTideHeightThirteen").html(tideHeightThirteen);
    }
    if(tideHeightFourteen=="" || tideHeightFourteen==undefined || tideHeightFourteen==null){
        $("#previewThreeTideHeightFourteen").html("");
    }else{
        $("#previewThreeTideHeightFourteen").html(tideHeightFourteen);
    }
    if(tideHeightFifteen=="" || tideHeightFifteen==undefined || tideHeightFifteen==null){
        $("#previewThreeTideHeightFifteen").html("");
    }else{
        $("#previewThreeTideHeightFifteen").html(tideHeightFifteen);
    }
    if(tideHeightSixteen=="" || tideHeightSixteen==undefined || tideHeightSixteen==null){
        $("#previewThreeTideHeightSixteen").html("");
    }else{
        $("#previewThreeTideHeightSixteen").html(tideHeightSixteen);
    }
    if(tideHeightSeventeen=="" || tideHeightSeventeen==undefined || tideHeightSeventeen==null){
        $("#previewThreeTideHeightSeventeen").html("");
    }else{
        $("#previewThreeTideHeightSeventeen").html(tideHeightSeventeen);
    }
    if(tideHeightEighteen=="" || tideHeightEighteen==undefined || tideHeightEighteen==null){
        $("#previewThreeTideHeightEighteen").html("");
    }else{
        $("#previewThreeTideHeightEighteen").html(tideHeightEighteen);
    }
}
function previewWind(windDirOne,windDirTwo,windDirThree,windLevelOne,windLevelTwo,windLevelThree){
    if(windDirOne=="" || windDirOne==undefined || windDirOne==null){
        $("#previewThreeWindDirOne").html("");
    }else{
        $("#previewThreeWindDirOne").html(windDirOne);
    }
    if(windDirTwo=="" || windDirTwo==undefined || windDirTwo==null){
        $("#previewThreeWindDirTwo").html("");
    }else{
        $("#previewThreeWindDirTwo").html(windDirTwo);
    }
    if(windDirThree=="" || windDirThree==undefined || windDirThree==null){
        $("#previewThreeWindDirThree").html("");
    }else{
        $("#previewThreeWindDirThree").html(windDirThree);
    }
    if(windLevelOne=="" || windLevelOne==undefined || windLevelOne==null){
        $("#previewThreeWindLevelOne").html("");
    }else{
        $("#previewThreeWindLevelOne").html(windLevelOne);
    }
    if(windLevelTwo=="" || windLevelTwo==undefined || windLevelTwo==null){
        $("#previewThreeWindLevelTwo").html("");
    }else{
        $("#previewThreeWindLevelTwo").html(windLevelTwo);
    }
    if(windLevelThree=="" || windLevelThree==undefined || windLevelThree==null){
        $("#previewThreeWindLevelThree").html("");
    }else{
        $("#previewThreeWindLevelThree").html(windLevelThree);
    }
}
function previewWave(waveHieghtDayOne,waveHieghtDayTwo,waveHieghtDayThree,waveHeightNightOne,waveHeightNightTwo,waveHeightNightThree,waveLevelDayOne,waveLevelDayTwo,waveLevelDayThree,waveLevelNightOne,waveLevelNightTwo,waveLevelNightThree){
    if(waveHieghtDayOne=="" || waveHieghtDayOne==undefined || waveHieghtDayOne==null){
        $("#previewThreeWaveHeightDayOne").html("");
    }else{
        $("#previewThreeWaveHeightDayOne").html(waveHieghtDayOne);
    }
    if(waveHieghtDayTwo=="" || waveHieghtDayTwo==undefined || waveHieghtDayTwo==null){
        $("#previewThreeWaveHeightDayTwo").html("");
    }else{
        $("#previewThreeWaveHeightDayTwo").html(waveHieghtDayTwo);
    }
    if(waveHieghtDayThree=="" || waveHieghtDayThree==undefined || waveHieghtDayThree==null){
        $("#previewThreeWaveHeightDayThree").html("");
    }else{
        $("#previewThreeWaveHeightDayThree").html(waveHieghtDayThree);
    }
    if(waveHeightNightOne=="" || waveHeightNightOne==undefined || waveHeightNightOne==null){
        $("#previewThreeWaveHeightNightOne").html("");
    }else{
        $("#previewThreeWaveHeightNightOne").html(waveHeightNightOne);
    }
    if(waveHeightNightTwo=="" || waveHeightNightTwo==undefined || waveHeightNightTwo==null){
        $("#previewThreeWaveHeightNightTwo").html("");
    }else{
        $("#previewThreeWaveHeightNightTwo").html(waveHeightNightTwo);
    }
    if(waveHeightNightThree=="" || waveHeightNightThree==undefined || waveHeightNightThree==null){
        $("#previewThreeWaveHeightNightThree").html("");
    }else{
        $("#previewThreeWaveHeightNightThree").html(waveHeightNightThree);
    }
    if(waveLevelDayOne=="" || waveLevelDayOne==undefined || waveLevelDayOne==null){
        $("#previewThreeWaveLevelDayOne").html("");
    }else{
        $("#previewThreeWaveLevelDayOne").html(waveLevelDayOne);
    }
    if(waveLevelDayTwo=="" || waveLevelDayTwo==undefined || waveLevelDayTwo==null){
        $("#previewThreeWaveLevelDayTwo").html("");
    }else{
        $("#previewThreeWaveLevelDayTwo").html(waveLevelDayTwo);
    }
    if(waveLevelDayThree=="" || waveLevelDayThree==undefined || waveLevelDayThree==null){
        $("#previewThreeWaveLevelDayThree").html("");
    }else{
        $("#previewThreeWaveLevelDayThree").html(waveLevelDayThree);
    }
    if(waveLevelNightOne=="" || waveLevelNightOne==undefined || waveLevelNightOne==null){
        $("#previewThreeWaveLevelNightOne").html("");
    }else{
        $("#previewThreeWaveLevelNightOne").html(waveLevelNightOne);
    }
    if(waveLevelNightTwo=="" || waveLevelNightTwo==undefined || waveLevelNightTwo==null){
        $("#previewThreeWaveLevelNightTwo").html("");
    }else{
        $("#previewThreeWaveLevelNightTwo").html(waveLevelNightTwo);
    }
    if(waveLevelNightThree=="" || waveLevelNightThree==undefined || waveLevelNightThree==null){
        $("#previewThreeWaveLevelNightThree").html("");
    }else{
        $("#previewThreeWaveLevelNightThree").html(waveLevelNightThree);
    }
}
function previewTemp(tempOne,tempTwo,tempThree){
    if(tempOne=="" || tempOne==undefined || tempOne==null){
        $("#previewThreeTempOne").html("");
    }else{
        $("#previewThreeTempOne").html(tempOne);
    }
    if(tempTwo=="" || tempTwo==undefined || tempTwo==null){
        $("#previewThreeTempTwo").html("");
    }else{
        $("#previewThreeTempTwo").html(tempTwo);
    }
    if(tempThree=="" || tempThree==undefined || tempThree==null){
        $("#previewThreeTempThree").html("");
    }else{
        $("#previewThreeTempThree").html(tempThree);
    }
}