window.addEventListener("load",function() {
	weiyj_commentLoad();
},true);

function weiyj_commentLoad(){
	if(typeof(jQuery)!="undefined"){
	if($("input[value*='CMSPageInfo']")!=null && $("input[value*='CMSPageInfo']").length>0){console.log("=============当前网页 PK==================>>"+$("input[value*='CMSPageInfo']").get(0).value.replace("CMSPageInfo : PK=",""));}
	/**jQuery.post("//weiyjChromeGetter.com/xxxx22",{suggest:document.title},function(result){
  //  $("span").html(result);
  //alert("xxxxxxxxxxxxxxxx"+result);
  
  }); 
	**/
	}
	
	
	
	
	
	
	
	
	
}
/****
    function getCallableName(callee){
        var regex = /function\s*(\w*)/i;
        return regex.exec(callee)[1];        
    }
     
    function show(callee){
        //1直接获取
        alert(callee.name);
        //2.正则表达式
        alert(getCallableName(callee));
    }
     
    function main(){
        show(arguments.callee);
    }
     
    window.onload = function(){
        main();
    };
	***/