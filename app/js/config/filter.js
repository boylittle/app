/**
chrome.tabs.query({active:true}, function(tab) {
        console.log(tab.id+"====>");
    });
**/





	
	
	
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





    function(details) { 

			var url = details.url;
			var arrUrl = url.split("//");
			var protocol=arrUrl[0];
			var start = arrUrl[1].indexOf("/");//alert(arrUrl[0]);
			var domain = arrUrl[1].substring(0,start);

			  var arr=[
				  "utag.js",
				  ".cloudfront.net/",
				  "lenovo.tt.omtrdc.net/",
				  ".twitter.com/",
				  ".facebook.com/",
				  ".facebook.net/",
				  ".rubiconproject.com/",
				  "/t.co/",
				  "/medias/",
				  "/js.bizographics.com/",
				  "analyticsmediator.js",
				  "satelliteLib-cd0127785d50cbe3d3047e8ff57496baf66459fb.js",
				  "images/stripes-background.png",
				  "ui-bg_highlight-soft_75_cccccc_1x100.png",
				  "jquery.min.js",
				  "http://origin-pre-c-hybris.lenovo.com/_ui/desktop/common/js/ProductTabView.js"
				  
				  //,
				 // "combined.css"
			  ];//****/["combined.js"];
			  var includes=[];
			  var equals=[];
			  var patterns=[];
			  var task_list=[];
				injectsBefore=[];
				injectsReady=[];
			 var ignores=[];
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
            ["blocking"] 
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