$(function(){
    //列表上传确定按钮
    $("#uploadSure").click(function(){
        $.ajax({
            url:srcPath+"admin/work/sheet/upload",
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
                $("#upload-pop").hide();
                if(data.code=="-2"){
                    window.parent.location.href="../login.html";
                }else if(data.code=="200"){
                    $("#success").show();
                    setTimeout(function(){
                        $("#success").hide();
                    },1000);
                    var title=$("#searchName").val();
                    var page=$("#info-currentPage").text();
                    forecastList(title,releaseTimeStart,releaseTimeEnd,type,uploadStatus,page,10);
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