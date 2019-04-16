	var isInIframe=false;
	var isOpenWebsocket=false;
	var gloalCacheBub={};
	var currentUrl=location.href;
	if (self != top) {
		isInIframe=true;
		//console.log("iframejump to :"+currentUrl);
	}else{
		//console.log("jump to :"+currentUrl);
	}
	/************websocke start************/
var AppForWebsocket={
  socketUrl:"ws://localhost:8080/ssa/call",
  currentUrl:location.href,
  currentDriverId:"",
  websocket:null,
  init:function(){
		var that=this;
		var websocke=null;
		 //window.addEventListener("load",function() {
			//判断当前浏览器是否支持WebSocket
		      if('WebSocket' in window){
		          websocket = new WebSocket(that.socketUrl);
		          that.websocket=websocket;
		          //连接发生错误的回调方法
		          websocket.onerror = function(){
		             // setMessageInnerHTML("error");
		          };
		           
		          //连接成功建立的回调方法
		          websocket.onopen = function(event){
		             /** if($("#login_user").text().indexOf("登录")>=0){
		            	  sendMsg("{name:'"+our_qq_Name+"',type:'login',msg:'N'}");
		              }else{
		            	  sendMsg("{name:'"+our_qq_Name+"',type:'login',msg:'Y'}");
		              }
		            **/
					console.log("##now you can start record##");
					initListen();
					
					AppForWebsocket.sendOpt({
					  type:"goto",
					  url:location.href,
					  wait:2000        	  
					 });
					
					
		          }
		           
		          //接收到消息的回调方法
		          websocket.onmessage = function(event){
		        	  try {
			        		 var json=JSON.parse(event.data);
			        		if(json.type=="js"){
			        			  var script = document.createElement('script');
			        			  script.type = 'text/javascript';
			        			  script.innerHTML = json.msg;
			        			  document.body.appendChild(script);
			        		 }else{
			        			 // setMessageInnerHTML(json.msg);
			        		 }
				    		} catch (e) {
				    		//	 setMessageInnerHTML(event.data);
				    		}
		
		          }
		           
		          //连接关闭的回调方法
		          websocket.onclose = function(){
		              //setMessageInnerHTML("close");
		          }
		           
		          //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		          window.onbeforeunload = function(){
		              websocket.close();
		          }
		          
		          
		      }
		      else{
		          alert('Not support websocket')
		      }

		  
		//},true);
  
  
  
  
  },sleep:function(delay) {
	  var start = (new Date()).getTime();
	  while ((new Date()).getTime() - start < delay) {
		continue;
	  }
	},
      closeWebSocket:function(){
          this.websocket.close();
      },
       sendMsg:function(message){
          this.websocket.send(message);
      }
      ,sendOpt:function(msgObj){
    	  var msgStr= JSON.stringify(msgObj);
		  if(isOpenWebsocket){
			this.websocket.send(msgStr);
		   this.sleep(200);
		  }else{
			  var json=JSON.stringify({type:"io",os:"w+",path:"d:/aaa.txt",content:msgStr}); 
			  messageNotificationCenter(json,function(data){ console.log(data); });
			   this.sleep(200);
		  }
         
	  }
  
  };


/************websocke end************/
	if(isOpenWebsocket){
		  AppForWebsocket.init();
	}else{
		
		console.log("##now you can start record##");
		initListen();
		AppForWebsocket.sendOpt({
		  type:"goto",
		  url:location.href,
		  wait:2000        	  
		 });
		
	}
      
	function initListen(){
		document.addEventListener('blur', eventFunctionInput,true);
		document.addEventListener('click', eventFunction,true);
		document.addEventListener('change', eventFunctionChange,true);
		document.addEventListener("keydown",eventFunctionEnter,true);
	}


	var inputTypes=["text","hidden","password","number",""];
	var clickTypes=["button","submit","file","checkbox","image","reset","radio"];
	var targetList=["BUTTON","A","INPUT","SELECT","DIV","SPAN","LABEL","LI","IMG","UL"];
	function getTarget(target,tagName){
				if(target.parentNode!=null){
				var parentTagName=target.parentNode.nodeName.toUpperCase();
				if(parentTagName==tagName){	
					target=target.parentNode;					
				}else{
					if(target.parentNode.parentNode!=null){
						parentTagName=target.parentNode.parentNode.nodeName.toUpperCase()
						if(parentTagName==tagName){	
							target=target.parentNode.parentNode;
						}
					}
				}
			}
		return target;
	}
	function eventFunction(event){
		var target=event.target;
		
		if(event.pageX){
			//手动触发
		}else{
			//js 触发
			return;
		}
		
		
		target=getTarget(target,"A");
		target=getTarget(target,"BUTTON");
		var nodeName=target.nodeName;
		//var clickEvent=$._data(that, 'events');
		var targetTagName=(target.tagName||"").toUpperCase();
		var xxxx=realsQuery(target);
		
		if(isInIframe){
			console.log("from iframe:"+currentUrl);
		}
		var queryEl="document.querySelector('"+xxxx+"').click();";
		console.log("document.querySelector('"+xxxx+"').click();");
		
		if(targetTagName=="A"){
			var href=(target.getAttribute("href")||"");
			var realHref=(target.href||"");
			if(href.indexOf("#")==0){
			
			}if(href.toLowerCase().indexOf("javascript:")==0){
				
			}else if(realHref.indexOf("https://")==0||realHref.indexOf("http://")==0){
				console.log("//==["+target.innerText+"]");
				console.log("location.href='"+target.href+"';");
				
			}else{
				console.log("//==["+target.innerText+"]");
				console.log("location.href='"+target.href+"';");
			
			}
          AppForWebsocket.sendOpt({
   			type:"click",
			selector:xxxx,
			desc:target.innerText,
			wait:2000,
			href:href
  			});

			
		}else if(targetTagName=="BUTTON"){
			 AppForWebsocket.sendOpt({
   			type:"click",
			selector:xxxx,
			desc:target.innerText,
			wait:2000
  			});

				console.log("//==["+target.innerText+"]");
		}else if(targetTagName=="SELECT"||targetTagName=="LI"){
			
		}else if(targetTagName=="INPUT"){
			
			var type=(target.type||"").toLowerCase();
			if(clickTypes.indexOf(type)>=0){
				if(type=="submit"||type=="button"){
					console.log("//==点击了按钮 ["+target.value+"]");
					 AppForWebsocket.sendOpt({
						type:"click",
						selector:xxxx,
						desc:target.value,
						wait:2000
					});
					
				}else if(type=="radio"){
					console.log("document.querySelector('"+xxxx+"').value='"+target.value+"';");
				}else if(type=="checkbox"){
					console.log("document.querySelector('"+xxxx+"').checked='"+document.querySelector(xxxx).checked+"';");
					 AppForWebsocket.sendOpt({
						type:"click",
						selector:xxxx,
						wait:2000
					});
					
				}
				
			}
		
		}else{
			
		}
		
	}
	function eventFunctionInput(event){
		var target=event.target;
		var type=(target.type||"").toLowerCase();
		var nodeName=target.nodeName;
		nodeName=(nodeName||"").toUpperCase();
	  if(nodeName=="TEXTAREA"){
			
		}else if(nodeName=="INPUT"){
			if(type=="button"||type=="submit"){
				return;
			}
		}else{
			return;
		}
		var xxxx=realsQuery(target);
		var valueOld=target.value;
		AppForWebsocket.sendOpt({
			  type:"input",
			  selector:xxxx,
			  value:valueOld,
			  wait:20       	  
		  });
		if(isInIframe){
			console.log("from iframe:"+currentUrl);
		}
		window.setTimeout(function(){
			if(valueOld!=target.value){
				AppForWebsocket.sendOpt({
					  type:"input",
					  selector:xxxx,
					  value:target.value,
					  wait:20       	  
				  });
				console.log("document.querySelector('"+xxxx+"').value='"+target.value+"';");
			}
		},500);
		console.log("document.querySelector('"+xxxx+"').value='"+valueOld+"';");
	}
	function eventFunctionChange(event){
		var that=event.target;
		var target = event.target;
		var currentTarget=event.currentTarget;
		var nodeName=that.nodeName;
		nodeName=(nodeName||"").toUpperCase();
		if(nodeName=="SELECT"){
			var xxxx=realsQuery(target);
	
			if(isInIframe){
				console.log("from iframe:"+currentUrl);
			}
			AppForWebsocket.sendOpt({
			  type:"input",
			  selector:xxxx,
			  value:target.value,
			   wait:20       	  
		  });
			console.log("document.querySelector('"+xxxx+"').value='"+target.value+"'");
		}
	
	

	}
	function eventFunctionEnter(event){
		var target = event.target;
		var currentTarget=event.currentTarget;
	
		if (event.keyCode == "13") {
			var xxxx=realsQuery(target);
			if(isInIframe){
				console.log("from iframe:"+currentUrl);
			}
			AppForWebsocket.sendOpt({
        	  type:"keydown",
        	  selector:xxxx,
			  sendKey:event.keyCode,
			  wait:20      	  
          });
					
		}

	}

var isOpenTrimClass=false;
function realsQuery(element) {
	if(!element){
		return "";
	}
	var currentQuery="";
	
    if (element.id !== "") {
      // currentQuery='#' + element.id;
	   var iiid=element.id;
	   	var isStartNum=iiid.substring(0,1);
				if(isNaN(isStartNum)&&iiid.indexOf(".")<0){
					currentQuery="#"+iiid;
				}else{
					currentQuery=element.tagName.toLowerCase()+"[id=\""+iiid+"\"]";
				}
				var isMoreElement=false;
			   if(element.parentNode!=null){
				   isMoreElement=(document.querySelectorAll(currentQuery).length>1);
			   }
			   
			   if(isMoreElement){
				   currentQuery= getSimpleQuery(element,currentQuery);
			   }
	   
	   
    }else{
		currentQuery= getSimpleQuery(element,currentQuery);
		//console.log("simpleQuery:"+currentQuery);
		/**currentQuery="";
		currentQuery= getDetailsQuery(element,currentQuery);
		console.log("detailsQuery:"+currentQuery);
		currentQuery="";
		currentQuery= getTypeQuery(element,currentQuery);
		console.log("TypeQuery:"+currentQuery);**/
	}
    return currentQuery;

	
};


function getSimpleQuery(element,currentQuery){
	var siblings = element.parentNode.childNodes;
	currentQuery=getThisQuery(element,siblings);
	currentQuery=getParentQuery(element,currentQuery);
	return currentQuery;
}
function getDetailsQuery(element,currentQuery){
	var siblings = element.parentNode.childNodes;
	currentQuery=getThisQueryD(element,siblings);
	currentQuery=getParentQueryD(element,currentQuery);
	return currentQuery;
}

function getTypeQuery(element,currentQuery){
	var siblings = element.parentNode.childNodes;
	currentQuery=getThisQueryT(element,siblings);
	currentQuery=getParentQueryT(element,currentQuery);
	return currentQuery;
}


function getParentQuery(element,queryName){
	var that=element.parentNode;
	if(that!=null){
		if(that.tagName.toLowerCase()=="body"){
			queryName="body > "+queryName;
		}else{
			var iiid=(that.id||"").replace(/(^\s*)|(\s*$)/g, "");
			
			if(iiid){
				var isStartNum=iiid.substring(0,1);
				if(isNaN(isStartNum)){
					queryName="#"+iiid+" > "+queryName;
				}else{
					queryName=that.tagName.toLowerCase()+"[id=\""+iiid+"\"] > "+queryName;
				}
				
			}else{
				var siblings=null
				if(that.parentNode){
					siblings=that.parentNode.childNodes;
				}else{
					siblings=[that];
				}
				var currentName=getThisQuery(that,siblings);				
				queryName=currentName+" > "+queryName;
				if(that!=null){
					queryName=getParentQuery(that,queryName);
				}
			}
			
		}
		
		
	}
	return queryName;
	
}
function getThisQuery(element,siblings){
	var newsiblings=[];
	var index=0;
  for(var i=0;i<siblings.length;i++){
	 if(siblings[i].tagName&&siblings[i].tagName.toLowerCase()==element.tagName.toLowerCase()){
		 newsiblings[index++]=siblings[i];
	 }
	  
  }
	
	var currentQuery="";
	if(newsiblings.length==1){
		var classStr=element.getAttribute("class");
		classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		/**if(classStr){
			  currentQuery=element.tagName.toLowerCase();
			var strs=classStr.split(" ");
			for(var i=0;i<strs.length;i++){
				  currentQuery+="."+strs[i];
			}
			
		}else{
			currentQuery=element.tagName.toLowerCase();
		}**/
		currentQuery=element.tagName.toLowerCase();
		
		if(element.id){
			var iiid=element.id.replace(/(^\s*)|(\s*$)/g, "");
				 var isStartNum=iiid.substring(0,1);
				if(isNaN(isStartNum)){
					currentQuery+="#"+iiid;
				}else{
					currentQuery+="[id=\""+iiid+"\"]";
				}
		}
		
	}
	else{
		
		
		var arrayList=[];
		var classStr=element.getAttribute("class");
		classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		//public class
		var currentClass=[];
		if(classStr){
			currentQuery=element.tagName.toLowerCase();
			var once=true;
			for(var i=0;i<newsiblings.length;i++){
				if(newsiblings[i].tagName&&newsiblings[i].tagName.toLowerCase()!=element.tagName.toLowerCase()){
					continue;
				}
				if(!newsiblings[i].tagName){
					continue;
				}
				var hehehe=newsiblings[i].getAttribute("class")||"";
					hehehe=hehehe.replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
					var strs=hehehe.split(" ");
					if(once){
						currentClass=strs;
						once=false;
					}else{
						currentClass=currentClass.filter(v => strs.includes(v))
					}
			}
			
			var strs=classStr.split(" ");
			var appendSonClss="";
			var isTrimClass=false;


			for(var i=0;i<strs.length;i++){
				if(currentClass.indexOf(strs[i])>=0){
					isTrimClass=true;
					continue;
				}
			appendSonClss+="."+strs[i];
			}
			var isMoreElement=false;
			if(appendSonClss&&element.parentNode!=null){
				isMoreElement=(element.parentNode.querySelectorAll(currentQuery+""+appendSonClss).length>1);
			}
			
			if(!isMoreElement&&appendSonClss&&((isOpenTrimClass)||(!isOpenTrimClass&&!isTrimClass))){
				currentQuery+=appendSonClss;
			}else{
				
				var ix = 0;
				for(var i=0;i<siblings.length;i++){
					var sibling = siblings[i];
					
					if (sibling == element) {
					
						ix++;
						currentQuery=element.tagName.toLowerCase() + ':nth-child(' + ix+ ')';
						
					} else if (sibling.nodeType == 1) {
						ix++;
					}
				}
			}
				
		}else{
			var ix = 0;
			for(var i=0;i<siblings.length;i++){
				var sibling = siblings[i];
				
				if (sibling == element) {
				
					ix++;
					currentQuery=element.tagName.toLowerCase() + ':nth-child(' + ix+ ')';
					
				} else if (sibling.nodeType == 1) {
					ix++;
				}
			}
			
		}
		
		
		
	}
	return currentQuery;
	
}


function getParentQueryT(element,queryName){
	var that=element.parentNode;
	if(that!=null){
		if(that.tagName.toLowerCase()=="body"){
			queryName="body > "+queryName;
		}else{
			var iiid=(that.id||"").replace(/(^\s*)|(\s*$)/g, "");
			if(iiid){
				var isStartNum=iiid.substring(0,1);
				if(isNaN(isStartNum)){
					queryName="#"+iiid+" > "+queryName;
				}else{
					queryName=that.tagName.toLowerCase()+"[id=\""+iiid+"\"] > "+queryName;
				}
			}else{
				var siblings=null
				if(that.parentNode){
					siblings=that.parentNode.childNodes;
				}else{
					siblings=[that];
				}
				var currentName=getThisQueryT(that,siblings);				
				queryName=currentName+" > "+queryName;
				if(that!=null){
					queryName=getParentQueryT(that,queryName);
				}
			}
			
		}
		
		
	}
	return queryName;
	
}
function getThisQueryT(element,siblings){
	var newsiblings=[];
	var index=0;
  for(var i=0;i<siblings.length;i++){
	 if(siblings[i].tagName&&siblings[i].tagName.toLowerCase()==element.tagName.toLowerCase()){
		 newsiblings[index++]=siblings[i];
	 }
	  
  }
	siblings=newsiblings;
	var currentQuery="";
	if(newsiblings.length==1){
		var classStr=element.getAttribute("class");
		classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		
		/**if(classStr){
			  currentQuery=element.tagName.toLowerCase();
			var strs=classStr.split(" ");
			for(var i=0;i<strs.length;i++){
				  currentQuery+="."+strs[i];
			}
			
		}else{
			currentQuery=element.tagName.toLowerCase();
		}**/
		currentQuery=element.tagName.toLowerCase();
		
	}
	else{
		
		
		var arrayList=[];
		var classStr=element.getAttribute("class");
		classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		var currentClass=[];
		if(classStr){
			currentQuery=element.tagName.toLowerCase();
			var once=true;
			for(var i=0;i<newsiblings.length;i++){
				if(newsiblings[i].tagName&&newsiblings[i].tagName.toLowerCase()!=element.tagName.toLowerCase()){
					continue;
				}
				if(!newsiblings[i].tagName){
					continue;
				}
				var hehehe=newsiblings[i].getAttribute("class")||"";
					hehehe=hehehe.replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
					var strs=hehehe.split(" ");
					if(once){
						currentClass=strs;
						once=false;
					}else{
						currentClass=currentClass.filter(v => strs.includes(v))
					}
			}
			
			var strs=classStr.split(" ");
			var appendSonClss="";
			var isTrimClass=false;


			for(var i=0;i<strs.length;i++){
				if(currentClass.indexOf(strs[i])>=0){
					isTrimClass=true;
					continue;
				}
			appendSonClss+="."+strs[i];
			}
			var isMoreElement=false;
			if(appendSonClss&&element.parentNode!=null){
				isMoreElement=(element.parentNode.querySelectorAll(currentQuery+""+appendSonClss).length>1);
			}
			
			if(!isMoreElement&&appendSonClss&&((isOpenTrimClass)||(!isOpenTrimClass&&!isTrimClass))){
				currentQuery+=appendSonClss;
			}else{
				
				var ix = 0;
				for(var i=0;i<siblings.length;i++){
					var sibling = siblings[i];
					
					if (sibling == element) {
					
						ix++;
						currentQuery=element.tagName.toLowerCase() + ':nth-of-type(' + ix+ ')';
						
					} else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
						ix++;
					}
				}
			}
				
		}else{
			var ix = 0;
			for(var i=0;i<siblings.length;i++){
				var sibling = siblings[i];
				
				if (sibling == element) {
				
					ix++;
					currentQuery=element.tagName.toLowerCase() + ':nth-of-type(' + ix+ ')';
					
				} else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
					ix++;
				}
			}
			
		}
		
		
		
	}
	return currentQuery;
	
}


function getParentQueryD(element,queryName){
	var that=element.parentNode;
	if(that!=null){
		if(that.tagName.toLowerCase()=="body"){
			queryName="body > "+queryName;
		}else{
			var iiid=(that.id||"").replace(/(^\s*)|(\s*$)/g, "");
			
			
			if(iiid){
				var isStartNum=iiid.substring(0,1);
				if(isNaN(isStartNum)){
					queryName="#"+iiid+" > "+queryName;
				}else{
					queryName=that.tagName.toLowerCase()+"[id=\""+iiid+"\"] > "+queryName;
				}
			}else{
				var siblings=null
				if(that.parentNode){
					siblings=that.parentNode.childNodes;
				}else{
					siblings=[that];
				}
				var currentName=getThisQueryD(that,siblings);				
				queryName=currentName+" > "+queryName;
				if(that!=null){
					queryName=getParentQueryD(that,queryName);
				}
			}
			
		}
		
		
	}
	return queryName;
	
}
function getThisQueryD(element,siblings){
	var newsiblings=[];
	var index=0;
  for(var i=0;i<siblings.length;i++){
	 if(siblings[i].tagName&&siblings[i].tagName.toLowerCase()==element.tagName.toLowerCase()){
		 newsiblings[index++]=siblings[i];
	 }
	  
  }
	siblings=newsiblings;
	var currentQuery="";
	if(newsiblings.length==1){
		var classStr=element.getAttribute("class");
			classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		
		if(classStr){
			  currentQuery=element.tagName.toLowerCase();
			var strs=classStr.split(" ");
			for(var i=0;i<strs.length;i++){
				  currentQuery+="."+strs[i];
			}
			
		}else{
			currentQuery=element.tagName.toLowerCase();
		}/****/
		//currentQuery=element.tagName.toLowerCase();
		
	}
	else{
		
		
		var arrayList=[];
		var classStr=element.getAttribute("class");
		classStr=(classStr||"").replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
		var currentClass=[];
		if(classStr){
			currentQuery=element.tagName.toLowerCase();
			var once=true;
			for(var i=0;i<newsiblings.length;i++){
				if(newsiblings[i].tagName&&newsiblings[i].tagName.toLowerCase()!=element.tagName.toLowerCase()){
					continue;
				}
				if(!newsiblings[i].tagName){
					continue;
				}
				var hehehe=newsiblings[i].getAttribute("class")||"";
					hehehe=hehehe.replace(/(^\s*)|(\s*$)/g, "").replace(/\s{2,}/g," ");
					var strs=hehehe.split(" ");
					if(once){
						currentClass=strs;
						once=false;
					}else{
						currentClass=currentClass.filter(v => strs.includes(v))
					}
			}
			
			var strs=classStr.split(" ");
			var appendSonClss="";
			var isTrimClass=false;


			for(var i=0;i<strs.length;i++){
				if(currentClass.indexOf(strs[i])>=0){
					isTrimClass=true;
					continue;
				}
			appendSonClss+="."+strs[i];
			}
			var isMoreElement=false;
			if(appendSonClss&&element.parentNode!=null){
				isMoreElement=(element.parentNode.querySelectorAll(currentQuery+""+appendSonClss).length>1);
			}
			
			if(!isMoreElement&&appendSonClss&&((isOpenTrimClass)||(!isOpenTrimClass&&!isTrimClass))){
				currentQuery+=appendSonClss;
			}else{
				
				var ix = 0;
				for(var i=0;i<siblings.length;i++){
					var sibling = siblings[i];
					if (sibling == element) {
						ix++;
						currentQuery=element.tagName.toLowerCase() + ':nth-of-type(' + ix+ ')';
					} else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
						ix++;
					}
				}
			}
				
		}else{
			var ix = 0;
			for(var i=0;i<siblings.length;i++){
				var sibling = siblings[i];
				if (sibling == element) {
					ix++;
					currentQuery=element.tagName.toLowerCase() + ':nth-of-type(' + ix+ ')';
				} else if (sibling.nodeType == 1 && sibling.tagName == element.tagName) {
					ix++;
				}
			}
			
		}
		
		
		
	}
	return currentQuery;
	
}





