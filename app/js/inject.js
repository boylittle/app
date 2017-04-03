
var url=location.href;

chrome.extension.sendRequest({greeting: url,status:"before"}, function(response) {
		 var s = document.createElement("script");
		s.src = chrome.extension.getURL("app/js/pageInject.js");
		s.onload = function() {
			this.remove();
		};
(document.head || document.documentElement).appendChild(s);
   if( (typeof response)=="undefined"||response==null||response=={}||(typeof response.farewell)=="undefined"){
	   return ; 
   }
   eval(response.farewell); 
  
  
});
/**/
$(document).ready(function(){
	
	chrome.extension.sendRequest({greeting: url,status:"ready"}, function(response) {
 
   if( (typeof response)=="undefined"||response==null||response=={}||(typeof response.farewell)=="undefined"){
	   return ; 
   } 
   eval(response.farewell); 
});

	
	
});
  


  
  
/**(function(){
	console.log("contentscript injected!");

	var resOK= {
		farewell:"contentscript send response back..."
	};
	var resErr= {
		farewell:"contentscript has error!"
	};

	chrome.runtime.onMessage.addListener(function(request,sender,senderResponse){
		console.log("receiving request comes from extension...");

		if(request.greeting === "do something in contentscript!"){
			senderResponse(resOK);
		}else{
			senderResponse(resErr);
		}
	})
})();**/
/**
.mousedown(function(e){ 
alert(e.which) // 1 = 鼠标左键 left; 2 = 鼠标中键; 3 = 鼠标右键 
return false;//阻止链接跳转 
}) 
}) **/
/***test auto**/
/****
$(document).ready(function(){
 var listen=2;

$("span").mouseenter(function(){
	$(this).css("border","1px purple solid")}).
	mouseout(function(){  
 $(this).css("border","0px blue solid")}).
 mousedown(function(e){
	console.log("当前位置X:"+$(this).offset().left+"Y:"+$(this).offset().top+$(this).get(0).tagName+":"+$(this).attr("class")+"  width:"+$(this).width()+"  height:"+$(this).height()+"  relHeigh:"+($(this).offset().top-$(document).scrollTop()));
	$(this).css("border","1px purple solid") ;
	if(listen == e.which){alert($(this).html());
	} return false;  });
 
 //---div
 
$("div").mouseenter(function(){
$(this).css("border","1px red solid")}).
mouseout(function(){  
 $(this).css("border","0px blue solid")}).
 mousedown(function(e){ console.log("当前位置X:"+$(this).offset().left+"Y:"+$(this).offset().top+$(this).get(0).tagName+":"+$(this).attr("class")+"  width:"+$(this).width()+"  height:"+$(this).height()+"  relHeigh:"+($(this).offset().top-$(document).scrollTop()));
 $(this).css("border","1px red solid");
 if(listen == e.which){alert($(this).html());
} return false; });

// ---li

 $("li").mouseenter(function(){
 $(this).css("border","1px blue solid")}).
 mouseout(function(){  
 $(this).css("border","0px blue solid")}).
 mousedown(function(e){ console.log("当前位置X:"+$(this).offset().left+"Y:"+$(this).offset().top+$(this).get(0).tagName+":"+$(this).attr("class")+"  width:"+$(this).width()+"  height:"+$(this).height()+"  relHeigh:"+($(this).offset().top-$(document).scrollTop()));
 $(this).css("border","1px blue solid");
 if(listen == e.which){alert($(this).html());
 } return false; });
 

  
  $(window).resize(runTest);
  runTest();
function runTest(){
var min=-1000;

var max=-1000;

var hangshu=0;

var one=0;

var one_h=0;

var once=true;

var size_e=0;

$(".seriesListings-itemContainer").click(function(){$(this).css("border","1px black solid");console.log("当前位置X:"+$(this).offset().left+"Y:"+$(this).offset().top);});

$('.seriesListings-itemContainer').each(function (index,domEle){

size_e++;

var x=$(domEle).offset().left;

var y=$(domEle).offset().top;
console.log("第"+size_e+"个元素位置"+"x:"+x+"  y:"+y+"  relHeigh:"+($(domEle).offset().top-$(document).scrollTop()));
if(once){

one=$(domEle).width();

one_h=$(domEle).height();

min=x;

once=false;

}

 

if(max<x){

hangshu++;

max=x;

}

}
);

var cw=$(window);

var cw_w=cw.width();

var cw_h=cw.height();

 var row=parseInt(size_e/hangshu)+(size_e%hangshu>0?1:0);

 

console.log("窗口宽："+cw_w+"窗口高:"+cw_h+"最大列:"+hangshu+"左间距:"+min+"右间距："+(cw_w-max-one)+"行数："+row+"总数:"+size_e);

min=-1;

max=-1;

hangshu=0;

 

//console.log("X:"+$(domEle).offset().left+"Y:"+$(domEle).offset().top);});

}
  
  
  
  
});
****/
