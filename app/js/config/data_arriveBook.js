﻿{"Tasks:index":"18","task:18":"{\"uid\":\"18\",\"title\":\"火车票\",\"fromUrl\":\"https://kyfw.12306.cn\",\"toUrl\":\"var myUserName=\\\"\\\";// your usename\\nvar myPassword=\\\"\\\";// your password\\nvar myTime=[\\\"\\\"];//---what tacket you want't (eg:k180)\\nvar myFrom=\\\"北京\\\";//---from\\nvar myTo=\\\"郑州\\\"; //-- to\\nvar wantDate=\\\"2017-04-25\\\";// start arrive date\\nvar users=[\\\"\\\"];//your select id cart name\\nvar xibie=[\\\"硬座\\\",\\\"软卧\\\",\\\"硬卧\\\"];\\nvar yj=false;\\nvar yjT=2;\\nvar yjS=1;\\nvar thisTime=new Date();;\\nvar myOnceGet=true;\\nvar currentUrl=location.href;\\nvar autoTime=500;\\nvar timeList;\\n\\nif(currentUrl==\\\"https://kyfw.12306.cn/otn/login/init\\\"){//---login\\n$(\\\"#username\\\").val(myUserName);\\n$(\\\"#password\\\").val(myPassword);\\n}else if(currentUrl==\\\"https://kyfw.12306.cn/otn/\\\" ||currentUrl==\\\"https://kyfw.12306.cn/otn/index/init\\\" ){//--- set arrive\\n$(\\\"#fromStationText\\\").val(myFrom);\\n$(\\\"#toStationText\\\").val(myTo);\\n$(\\\"#train_date\\\").val(wantDate);\\ndocument.getElementById(\\\"a_search_ticket\\\").click();\\n\\n}else if (currentUrl.indexOf(\\\"https://kyfw.12306.cn/otn/leftTicket/init\\\")>-1){//---book tackits\\n\\t \\nvar once=0;\\nvar myCheck=0;\\n\\nvar reload=0;\\n\\ttimeList= setInterval(function () {\\n\\t\\treload++;\\n\\t\\tvar xxxx=document.getElementById(\\\"query_ticket\\\");\\n\\t\\t\\n\\t\\t\\n\\t\\t\\t\\n\\t\\tif(reload>20){\\n\\t\\t\\tif(xxxx){\\n\\t\\t\\txxxx.click(); \\n\\t\\t} \\n\\t\\t\\treload=0;\\n\\t\\t}\\n\\t\\t\\n\\t\\tvar arr=document.getElementsByClassName(\\\"dhtmlx_window_active\\\");\\n\\t \\n\\t//---登录验证\\nif(arr.length>0&&once==0){\\n\\t//----自动提票 \\n\\t//clearInterval(time);\\n\\tdocument.getElementById(\\\"username\\\").value=myUserName;\\n\\tdocument.getElementById(\\\"password\\\").value=myPassword;\\n\\tonce++;\\n}else{\\n\\t\\n\\n\\t\\t\\n\\t\\tvar cRun=true;\\n\\t\\t for(var i=0;i<myTime.length;i++){\\n\\t\\t\\t \\n\\t\\tvar want=$(\\\"tr[datatran$='\\\"+myTime[i]+\\\"']\\\").prev();\\n\\t\\t\\n\\t\\tif(want&&want.length>0){ \\n\\t\\t\\tvar allLet=new Array();\\n\\t\\t\\t var xIndex=new Array();\\n\\t\\t\\t var fond=false;\\n\\t\\t\\t$(\\\"#float\\\").find(\\\"th\\\").each(function(index){\\n\\t\\t\\t\\tif(index<=3&&index>0){\\n\\t\\t\\t\\t\\treturn true;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tvar indexss=index-3;\\n\\t\\t\\t\\tvar xb=$(this).text();\\n\\t\\t\\t\\t \\n\\t\\t\\t\\tfor(var x=0;x<xibie.length;x++){\\n\\t\\t\\t\\t\\tif(xb==xibie[x]){\\n\\t\\t\\t\\t\\t\\txIndex.push(indexss); \\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t} \\n\\t\\t\\t\\tallLet.push(xb); \\n \\t\\t\\t});\\n\\t\\t\\t\\n\\t\\t\\t$(want).find(\\\"td\\\").each(function(index){\\n\\t\\t\\t\\t//if(index<3){\\n\\t\\t\\t\\t//\\treturn true;\\n\\t\\t\\t\\t//}\\n\\t\\t\\t\\t//var absIndex=index+3;\\n\\t\\t\\t var values=$(this).text();\\n\\t\\t\\t\\n\\t\\t\\t if(values==\\\"--\\\"||values==\\\"无\\\"){ \\n\\t\\t\\t\\t \\n\\t\\t\\t }else{\\n\\t\\t\\t\\t   //----get fond tackit\\n\\t\\t\\t\\t for(var x=0;x<xIndex.length;x++){\\n\\t\\t\\t\\t\\tif(xIndex[x]==index){\\n\\t                                \\n\\t\\t\\t\\t\\t\\tfond=true;\\n\\t\\t\\t\\t\\t\\treturn false;\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\t \\n\\t\\t\\t\\t \\n\\t\\t\\t }\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\n\\t\\t\\t});\\n\\t\\t\\t\\n\\t\\t\\t if(yj&&fond){\\n\\t\\t\\t\\t var currentTime=new Date();\\n\\t\\t\\t\\t var dif=(currentTime.getTime()-thisTime.getTime())/1000;\\n\\t\\t\\t\\t if(dif>=30||(myOnceGet)){//yjS>yjT&&\\n\\t\\t\\t\\t\\tthisTime=currentTime;\\n\\t\\t\\t\\t\\t myOnceGet=false;\\n\\t\\t\\t\\t\\t $.ajax({url:\\\"https://kyfw.12306.cn/otn/confirmPassenger/initDc\\\",async:true});\\n\\t\\t\\t\\t }else{\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t \\n\\t\\t\\t\\t\\t \\n\\t\\t\\t\\t }\\n\\t\\t\\t\\t\\n\\t\\t\\t }\\n\\t\\t\\tif(!yj){\\n\\t\\t\\t//---是否包含预定按钮,并且包含预定条件\\n\\t\\t\\t$(want).find(\\\"a\\\").each(function(){\\n\\t\\t\\t\\tvar text=$(this).text();\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t if(text.indexOf(\\\"预订\\\")>-1&&fond&&myCheck==0){\\n\\t\\t\\t\\t\\t myCheck++;\\n\\t\\t\\t\\t\\tthis.click(); \\n\\t\\t\\t\\t\\tcRun=false;\\n\\t\\t\\t\\t\\treturn false;\\n\\t\\t\\t\\t }\\n\\t\\t\\t\\t \\n\\t\\t\\t});  \\n\\t\\t\\t\\t\\n\\t\\t\\n\\t\\t}\\n\\t\\tif(!cRun){\\n\\t\\t\\tbreak;\\n\\t\\t}\\n\\t\\t\\t \\n\\t\\t } \\n\\t\\t\\n\\t}\\n\\t \\n\\t\\n} \\nif(once>5){\\n\\tonce=0;\\n}\\n\\n}, autoTime);\\n\\t\\n\\n}else if(currentUrl.indexOf(\\\"https://kyfw.12306.cn/otn/confirmPassenger/initDc\\\")>-1){\\nvar aa=0;\\nvar mans=0;\\n\\t//var xx=document.getElementById(\\\"normalPassenger_9\\\");\\n\\tvar time=setInterval(function () {\\n\\t\\t \\n\\t\\t var userIDs=[];\\n\\t\\t \\n\\t\\t $(\\\"#normal_passenger_id\\\").find(\\\"label\\\").each(function(){\\n\\t\\t\\tvar userName=$(this).text();\\n\\t\\t\\tfor(var i=0;i<users.length;i++){\\n\\t\\t\\t\\tif(userName==users[i]){\\n\\t\\t\\t\\t\\tvar userId=$(this).attr(\\\"for\\\");\\n\\t\\t\\t\\t\\tuserIDs.push(userId);\\n\\t\\t\\t\\t} \\n\\t\\t\\t\\t\\n\\t\\t\\t} \\n\\t\\t\\t \\n\\t\\t });\\n\\t\\t \\n\\t\\t//----设置用户点击\\n　　　　if(aa==0&&userIDs.length>0){\\n\\tfor(var i=0;i<userIDs.length;i++){\\n\\t\\tdocument.getElementById(userIDs[i]).click(); \\n\\n\\n\\n\\t\\t\\t////////////////////////////////////////\\n\\t\\t\\tvar findXb=false;\\n\\t\\t\\t//席别抉择\\n\\t\\t\\tfor(var p=0;p<xibie.length;p++){\\n\\n\\t\\t\\t \\n\\t\\t\\t$(\\\"#seatType_\\\"+(i+1)+\\\" option\\\").each(function(){\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\tif($(this).text().indexOf(xibie[p])>-1){\\n\\n\\t\\t\\t\\t\\t\\t\\t\\t $(this).attr('selected', true);\\n\\t\\t\\tfindXb=true;\\n\\t\\t\\t\\t\\t\\t\\t\\treturn false;\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t});\\n\\n\\n\\t\\t\\tif(findXb){\\n\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\n\\t\\t\\t}\\n\\n\\n\\t\\t\\t/////////////////////////////////////////////\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\t}\\n\\n\\n\\n\\n\\n\\n\\n\\taa++; \\n\\t\\t\\t\\n\\t\\t}\\n\\t\\t\\n\\t\\t//----勾选完毕后提交\\n\\t\\tif(aa==1){\\n\\t\\t\\t\\n\\t\\t\\tdocument.getElementById(\\\"submitOrder_id\\\").click();\\n\\t\\t\\taa++;\\t\\t\\t\\n\\t\\t}\\n\\t\\t//----确认按钮，最好自己决定\\n\\t\\tvar b = document.getElementById(\\\"button_id\\\");\\n\\t\\tif(aa==2){\\n\\t\\t\\tif(b){\\n\\t\\t\\t\\tb.disabled=false;\\n\\t\\t\\t\\tb.click();\\n\\t\\t\\t\\taa++;\\t\\n\\t\\t\\t\\tclearInterval(time);\\n\\t\\t\\t}\\n\\t\\t\\t\\n\\t\\t\\t\\t\\t\\n\\t\\t}\\n　　　　}, 200);\\n\\t \\n}\\n\\n\\n\",\"active\":true,\"pattern\":false,\"include\":true,\"equal\":false,\"inject\":true,\"ignore\":false,\"readyBefore\":false}"}