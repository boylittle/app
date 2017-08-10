window.addEventListener("load",function() {
	weiyj_commentLoad();
},true);

function weiyj_commentLoad(){
	if(typeof(jQuery)!="undefined"){
	if($("input[value*='CMSPageInfo']").length>0){console.log("=============当前网页 PK==================>>"+$("input[value*='CMSPageInfo']").get(0).value.replace("CMSPageInfo : PK=",""));}
	}
	
}