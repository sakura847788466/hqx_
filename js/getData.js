var hqxurl = 'http://gjhy.gdhqx.cn:8763/'
function typhoonSearchList (parmas, fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/search/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(parmas),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){

        }
    });
}

function typhoonActiveInfo (fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/activity",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify({}),
        success:function(data){
            if(fn) fn(data)
        },
        error:function(){

        }
    });
}
function typhoonHeadInfo (fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/head/info",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify({}),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {

            }
        },
        error:function(){
        }
    });
}
function typhoonPointList (number, fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/point/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify({
        	number: number
        }),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function typhoonYearList (fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/year/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify({}),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function getTyphoonData (number, fn) {
    var listData = {
        number: number
    }
    var timeNow = viewer.clockViewModel.currentTime
    timeNow = UtcTimeGBTime(timeNow)
    listData.currentTime = timeNow
    listData.interval = 1000
    // listData.multiplier = multiplier
	$.ajax({
        url:hqxurl+"api/typhoon/path/by/number",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(listData),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function typhoonPointInfo (params, fn) {
	$.ajax({
        url:hqxurl+"api/typhoon/point/info",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
//天气

function getForecastData(url,fn){
   $.ajax({
        url:url,
        type:"get",
        dataType:"json",
        success:function(data){
        	if(fn) fn(data)     
        },
        error:function(){
        }
        
    }); 		
}
// 承灾体
function disasterBodyList (params, fn) {
	$.ajax({
        url:hqxurl+"api/disaster/body/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function disasterBodyGetInfoById (params, fn) {
	$.ajax({
        url:hqxurl+"api/disaster/body/getInfoById",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function disasterBodyGetInfoByName (params, fn) {
	$.ajax({
        url:hqxurl+"api/disaster/body/getInfoByName",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
//风险区划
function zonationWeekLevelList (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/week/level/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationWeekLevelBar (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/week/level/bar",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationCommunityAssessmentList (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/community/assessment/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationCommunityAssessmentBar (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/community/assessment/bar",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationDisasterAvoidancePointList (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/disaster/avoidance/point/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationDisasterAvoidancePointBar (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/disaster/avoidance/point/bar",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationTyphoonLevels (fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/typhoon/levels",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify({}),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function zonationCommunityInfo (params, fn) {
    $.ajax({
        url:hqxurl+"api/rike/zonation/community/info",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
// 风险等级
function zonationShpList (params, fn) {
	$.ajax({
        url:hqxurl+"api/rike/zonation/shp/list",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
// 应急疏散方法
function zonationShpEvacuationPlan (params, fn) {
	$.ajax({
        url:hqxurl+"/api/rike/zonation/shp/evacuation/plan",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
// 近岸预报
function latestDailyDetail (params, fn) {
	$.ajax({
        url:hqxurl+"/api/work/sheet/latest/daily/detail",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
function latestThreeDayDetail (params, fn) {
	$.ajax({
        url:hqxurl+"/api/work/sheet/latest/threeDay/detail",
        type:"post",
        contentType:'application/json',
        dataType:'json',
        data: JSON.stringify(params),
        success:function(data){
            if(data.code==200){
                if(fn) fn(data)
            }else {
            }
        },
        error:function(){
        }
    });
}
