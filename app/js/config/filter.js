//  https://stackoverflow.com/questions/33106709/chrome-webrequest-doesnt-see-post-data-in-requestbody
/**
chrome.tabs.query({active:true}, function(tab) {
        console.log(tab.id+"====>");
    });
**/
 
	var typeMap = {
    "txt"   : "text/plain",
    "html"  : "text/html",
    "css"   : "text/css",
    "js"    : "text/javascript",
    "json"  : "text/json",
    "xml"   : "text/xml",
    "jpg"   : "image/jpeg",
    "gif"   : "image/gif",
    "png"   : "image/png",
    "webp"  : "image/webp"
}


function getImageURL(file){
	var img=new image();
	img.src=file;
	
	return getBase64Image(img);
}

function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        var dataURL = canvas.toDataURL("image/"+ext);
        return dataURL;
}
function utf8Content(content,type){
	var content = encodeURIComponent(
        type === 'js' ?
        content.replace(/[\u0080-\uffff]/g, function($0) {
            var str = $0.charCodeAt(0).toString(16);
            return "\\u" + '00000'.substr(0, 4 - str.length) + str;
        }) : content
    );
	return content;
}
function getLocalFileUrl(url,append,unshift,replace) {
	if(append==null||typeof(append)=="undefined"){
		append="";
	}
	if(unshift==null||typeof(unshift)=="undefined"){
		unshift="";
	}
	if(replace==null||typeof(replace)=="undefined"){
		replace="";
	}
    var arr = url.split('.');
    var type = arr[arr.length-1];
	type=type.toLowerCase();
	if(type=="jpg"||type=="png"||type=="gif"){
		var base64Str= getBase64Image(url);
		alert(base64Str);
	}
	var content="";
	if(replace==""){
	var xhr = new XMLHttpRequest();
    xhr.open('get', url, false);
    xhr.send(null);
    content = xhr.responseText || xhr.responseXML;
		//if (!content) {
		//	return false;
		//}
		
	}else{
		content=replace;
	}
   
    content = encodeURIComponent(
        type === 'js' ?
        content.replace(/[\u0080-\uffff]/g, function($0) {
            var str = $0.charCodeAt(0).toString(16);
            return "\\u" + '00000'.substr(0, 4 - str.length) + str;
        }) : content
    );
    return ("data:" + (typeMap[type] || typeMap.txt) + ";charset=utf-8," +unshift+content+append);
}
	
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}
/**
function webApp(){
	
	if ("WebSocket" in window) {
  var ws = new WebSocket("ws://172.0.0.1/js/js.js");
  ws.onopen = function() {
    // Web Socket is connected. You can send data by send() method.
    ws.send("message to send");// ....
  };
  ws.onmessage = function (evt) { var received_msg = evt.data; alert(received_msg);};
  ws.onclose = function() { 
  // websocket is closed.
  };
} else {
  // the browser doesn't support WebSocket.
}
	
	
}**/
/***
var wR=chrome.webRequest||chrome.experimental.webRequest;
if(wR){
    wR.onBeforeSendHeaders.addListener(
        function(details) {
            if (details.type === 'xmlhttprequest') {
                var exists = false;
                for (var i = 0; i < details.requestHeaders.length; ++i) {
                    if (details.requestHeaders[i].name === 'Referer') {
                        exists = true;
                        
                        break;
                    }
                }
                if (!exists) {//不存在 Referer 就添加
                    details.requestHeaders.push({ name: 'Referer', value: 'http://www.yourname.com'});
                }
                return { requestHeaders: details.requestHeaders };
            }
},
        {urls: ["https://*.google.com/*","http://*.google.com/*"]},//匹配访问的目标url
        ["blocking", "requestHeaders"]
    );
}
***/

var injectsBefore=[];
var injectsReady=[];
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	  
		var url=request.greeting;
		var status=request.status;
		var item=null;
		if(status=="before"){
			if(item=lookUpBack(injectsBefore,url,isEqualsItems)){}else if(item=lookUpBack(injectsBefore,url,isIncludeItems)){}else if(item=lookUpBack(injectsBefore,url,isPatternItems)){}  
		}else if(status=="ready"){
		 if(item=lookUpBack(injectsReady,url,isEqualsItems)){}else if(item=lookUpBack(injectsReady,url,isIncludeItems)){}else if(item=lookUpBack(injectsReady,url,isPatternItems)){}   
		}
		 
		if(item){
			sendResponse({farewell: item.toUrl});
		}
		else{
			sendResponse({farewell: "{}"});
		} 
    
  });
 /****/
chrome.webRequest.onBeforeRequest.addListener (


//chrome.exe --args --disable-web-security --user-data-dir


    function(details) { 
	 
			// var content=getLocalFileUrl("file:///D:/test.txt"); 
			
			

			var url = details.url;
			if(url.indexOf("chrome-extension://")>=0){
				return {redirectUrl: url};
			}
			
		 
			/**if(url.indexOf("pre-c-hybris.lenovo.com/le/_ui/desktop/common/js/jquery/jquery-1.11.2.min.js".toLowerCase())>=0){

				if(details.requestBody!=null&&details.requestBody["formData"]!=null){
						
					//	console.log(details.requestBody["formData"].suggest[0]+"===="+new Date());
				}
			//var xxx=details.requestBody.formData;
			// alert(xxx);
				//var content="{}";
				//alert("x");//return {redirectUrl:("data:text/html;charset=utf-8," + content)};
				//return {redirectUrl:getLocalFileUrl(url,"xx")};
				
			}**/
			if(url.indexOf("//localhost:9001/addToCart")>0){
			details.method="POST";
			}
			var arrUrl = url.split("//");
			var protocol=arrUrl[0];
			var start = arrUrl[1].indexOf("/");
			var domain = arrUrl[1].substring(0,start);

			  var arr=[];
			  var includes=[];
			  var equals=[];
			  var patterns=[];
			  var task_list=[];
				injectsBefore=[];
				injectsReady=[];
			 var ignores=[];
			 var contentOs=[];
			  if(window.localStorage.length>=1){
				
				var key;
				for(var i=0,len=window.localStorage.length;i<len;i++){
					key=window.localStorage.key(i);
					if(/task:\d+/.test(key)){
						var obj=JSON.parse(window.localStorage.getItem(key));
					var active=obj.active;
					if(active){
						if(obj.inject){
							if(obj.readyBefore){
								injectsBefore.push(obj); 
							}else{
								injectsReady.push(obj); 
							} 
						}
						else if(obj.include){
							includes.push(obj);
						}else if(obj.equal){
							equals.push(obj); 
						}else if(obj.pattern){
							patterns.push(obj); 
						}else if(obj.ignore){
							ignores.push(obj); 
						}else if(obj.isReplace||obj.isAppend||obj.isUnshift){
							contentOs.push(obj);
						}else{
							task_list.push(obj);
						}
						
					}
					
						
					}
				}
				
				  arr=task_list;
			}
			 //忽略
			if(lookUpBack(ignores,url,isInclude)){
				return {redirectUrl: url};
			}
			
            //完全匹配
			var redEqualsUrl=redirectUrlGet(equals,protocol,url,domain,isEquals,allBack);
			if(redEqualsUrl){
				return redEqualsUrl;
			}  
			
			//通过匹配测试一个请求
			var redUrl=	redirectUrlGet(includes,protocol,url,domain,isInclude,allBack);
			if(redUrl){
				return redUrl;
			} 
			
			//正则匹配
			var redPatternUrl=	redirectUrlGet(patterns,protocol,url,domain,isPattern,allBack);
			if(redPatternUrl){
				return redPatternUrl;
			} 
			 
			 // 默认匹配
			 var redOtherUrl=	redirectUrlGet(arr,protocol,url,domain,isInclude,allBack);
			if(redOtherUrl){
				return redOtherUrl;
			}  
			
			
	}
		   ,
          {urls:["<all_urls>"]},  //监听所有的url,你也可以通过*来匹配。
            ["blocking", "requestBody"] 
);


function isInclude(url,spUrl,item){
	if(url.indexOf(spUrl)>-1){
		return true;
	}
	return false;
}
function isEquals(url,spUrl,item){
	if(url==spUrl){
		return true;
	}
	return false;
}
function isIncludeItems(url,spUrl,item){
	if(item.include&&url.indexOf(spUrl)>-1){
		return true;
	}
	return false;
}
function isEqualsItems(url,spUrl,item){
	if(item.equal&&url==spUrl){
		return true;
	}
	return false;
}
function isPatternItems(url,spUrl,item){  
	var reg=new RegExp(spUrl);
					try
					{
						if(item.pattern&&reg.test(url)){
							return true;
						}
					
					}catch(err){
						  console.log("error patter"+inc); 
					}
	
	return false;
	 
}
function isPattern(url,spUrl,item){  
	var reg=new RegExp(spUrl);
					try
					{
						if(reg.test(url)){
							return true;
						}
					
					}catch(err){
						  console.log("error patter"+inc); 
					}
	
	return false;
	 
}
function allBack(item,protocol,url,domain){
	var locale=item.toUrl;
	if(item.isdisk){
		return {redirectUrl:getLocalFileUrl(locale)};
	}else if(item.isReplace){
		return {redirectUrl:getLocalFileUrl(url,null,null,item.toUrl)};
	}else if(item.isAppend){
		return {redirectUrl:getLocalFileUrl(url,item.toUrl)};
	}else if(item.isUnshift){
		return {redirectUrl:getLocalFileUrl(url,null,item.toUrl)};
	}
	var localUrl=jumpUrl(locale,protocol,url,domain);
	
	return {redirectUrl: localUrl}; 
}
function redirectUrlGet(items,protocol,url,domain,fallback,returnBack){
	var item=lookUpBack(items,url,fallback);
	if(item){ 
	return allBack(item,protocol,url,domain);
	}else{
		return null;
	}
}


function lookUpBack(items,url,fallback){
	for(var i=0;i<items.length;i++){
				var filter=items[i].fromUrl.split("\n");
				for(var j=0;j<filter.length;j++){
					var inc=filter[j];
					if(inc==""){
						continue;
					}
					
					
					var isGet=fallback(url,inc,items[i]);
					
					if(isGet){
						return items[i];
					}
					
					
				}
				
				
				
			}
	return null;
	
}
	function jumpUrl(locale,protocol,url,domain){
		 var localUrl=url.
		replace("/cssminc/","/css/page/").
		replace("/jsminc/","/js/page/").
		replace("/cssmin/","/css/").
		replace("/jsmin/","/js/").
		replace(domain,locale);
		
		 
		 
		 if(locale.indexOf("https://")==0||locale.indexOf("http://")==0){
				 localUrl=locale;
			 }else{
			if(locale=='null_img'){
				 localUrl=protocol+"//localhost/null/null.jpg";
			 }
			else if(locale=='null_js'){
				 localUrl=protocol+"//localhost/null/null.js";
			 }
			 else if(locale=='null_html'){
				 localUrl=protocol+"//localhost/null/null.html";
			 }
			else if(locale=='null_txt'){
				 localUrl=protocol+"//localhost/null/null.txt";
			 }  
				 
			 }  
		
		return localUrl;
		
	}
	
	

	 
/**
 function(details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders.splice(i, 1);
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  }
  http://www.cnblogs.com/devcjq/articles/4232029.html
  **/