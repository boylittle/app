﻿window.addEventListener("load",function() {
	if(typeof(jQuery)!="undefined"){
	if($("input[value*='CMSPageInfo']").length>0){console.log("=============当前网页 PK==================>>"+$("input[value*='CMSPageInfo']").get(0).value.replace("CMSPageInfo : PK=",""));}
	}
	if (document.addEventListener){
		document.addEventListener("keyup",fnKeyup,true);
	}
	else{
		document.attachEvent("onkeyup",fnKeyup);
	}
	
	//saveElement("z");
	var chrome_listen_forms=document.forms;
	for(var i=0;i<chrome_listen_forms.length;i++){
		/***
		//var data = $("#form1").serializeArray(); //???form?????json  
        //alert(JSON.stringify(data));  
        var jsonuserinfo = $('#form1').serializeObject();  
        alert(JSON.stringify(jsonuserinfo));  
		
		***/
		chrome_listen_forms[i].addEventListener('submit', function (event){
			var form=event.target;
			var url=form.action;
			//var data=form.serializeObject();
			
			//console.log(url+"###################>>>>");
			return false;},false);
		
	} 
	
	
},true);

function fnKeyup(event)
{
//var b = document.getElementById("myButton");
Hotkey(event, document.body, false, true, false);
//Hotkey(event, document.body, false, true, false, 67);
//Hotkey(event, document.body, false, true, false, 86);
}

// <font style='color:blue; background-color:yellow;'>???</font>?? 
// targetObj: ????,????<font style='color:blue; background-color:yellow;'>???</font>??,???????click??
// ctrlKey: ?????Ctrl???
// shiftKey: ?????Shift???
// altKey: ?????Alt???
// keycode: ???????
function Hotkey(event, targetObj, ctrlKey, shiftKey, altKey)
{
	
if (
   targetObj
   && event.ctrlKey == ctrlKey
   && event.shiftKey == shiftKey
   && event.altKey == altKey 
   && event.keyCode
   ){
	  if(event.keyCode=='C'.charCodeAt()){
		    wsave();
	  }else if(event.keyCode=='V'.charCodeAt()){
		  wout();
	  }else if(event.keyCode=='X'.charCodeAt()){
		  wsaveUrl();
	  }
	 
	   
   }
}

function saveIdElement(key){
	
var arr=[];
inputIdSave(key,arr);
selectIdSave(key,arr);
textareaIdSave(key,arr);
for(var i=0;i<arr.length;i++){
	var el=arr[i];
	var type=el.type;
	var name=el.key;
	var value=el.value;
	console.log("#"+el.key+":"+el.value);
}
//??arr
localStorage.setItem(key, JSON.stringify(arr));
}	

function inputIdSave(key,arr){
	var els=document.getElementsByTagName("input");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.id!=null&&el.value!=""&&el.id!=""&&el.type!="hidden"){
		
		var type=el.type;
		if(type==null||type==""){
			type="text";
		}
		var item={"key":el.id,"value":el.value,"type":type,"tag":"input","id":el.id};
		
		if(type=="checkbox"||type=="radio"){
			item.checked=el.checked; 
		}
		
		arr.push(item);
		//console.log(el.name+":"+el.value);
	}
	
}
	
}
 function selectIdSave(key,arr){
	var els=document.getElementsByTagName("select");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.id!=null&&el.value!=""&&el.id!=""&&el.type!="hidden"){
				
		arr.push({"key":el.id,"value":el.value,"tag":"select","id":el.id});
		//console.log(el.name+":"+el.value);
	}
	
}
	
}

function textareaIdSave(key,arr){
	var els=document.getElementsByTagName("textarea");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.id!=null&&el.value!=""&&el.id!=""&&el.type!="hidden"){
		 
		arr.push({"key":el.id,"value":el.value,"tag":"textarea","id":el.id});
		//console.log(el.name+":"+el.value);
	}
	
}
	
}
function saveElement(key){
	
var arr=[];
inputSave(key,arr);
selectSave(key,arr);
textareaSave(key,arr);
for(var i=0;i<arr.length;i++){
	var el=arr[i];
	var type=el.type;
	var name=el.key;
	var value=el.value;
	console.log(name+":"+el.value);
}
	console.log(typeof(arr));
//??arr
localStorage.setItem(key, JSON.stringify(arr));
}	
function rollback(key){
	var str=localStorage.getItem(key);
	if(str){
		//?? arr
		var arr=JSON.parse(str);
		if(typeof(arr)=="string"){
			arr=JSON.parse(arr);
		}
	 
		for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			if(tag=="input"||tag=="select"||tag=="textarea"){
				var dos=document.getElementsByName(name);
				if(dos.length>0){
					dos[0].value=value;
				}
				
			}
			
		}
	}
	
}
function printE(key){
	var str=localStorage.getItem(key);
	if(str){
		var arr=JSON.parse(str);
		if(typeof(arr)=="string"){
			arr=JSON.parse(arr);
		}
		
		if(arr){
			for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			var id=el.id;
				if(tag=="input"||tag=="select"||tag=="textarea"){
					var log="";
					if(id){
					log="#"+id+":"+value;
					}else{
						log=name+":"+value;
					}
					console.log(log);
					 
				}
			 
			}
		}
	}
		
}
function printA(){
	var str=localStorage;
	console.log(str);
}
function rollbackId(key){
	var str=localStorage.getItem(key);
	if(str){
		//?? arr
		var arr=JSON.parse(str);
		if(typeof(arr)=="string"){
			arr=JSON.parse(arr);
		}
	
		for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			if(tag=="input"||tag=="select"||tag=="textarea"){
				var dos=document.getElementById(name);
				if(dos!=null){
					dos.value=value;
				}
				console.log(name+"="+value);
			}
			
		}
	}
}	 
	
	
	var key=location.href;
	var str=localStorage.getItem(key);
	if(str){
		//?? arr
		var arr=JSON.parse(str);
		if(typeof(arr)=="string"){
			arr=JSON.parse(arr);
		}
	
		for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			var id=el.id;
			if(tag=="input"||tag=="select"||tag=="textarea"){
				var dos=document.getElementById(name);
				if(dos!=null){
					dos.value=value;
				}
				//console.log(name+"="+value);
				
				//var log="";
				var dos=null;
					if(id){
					log="#"+id+":"+value;
					dos=document.getElementById(id);
						if(dos!=null){
							dos.value=value;
							if(tag=="input"&&(type=="checkbox"||type=="radio")){
								dos.checked=(el.checked?true:false); 
							}
						}
					}else{
						log=name+":"+value;
						dos=document.getElementsByName(name);
						if(dos.length>0){
							dos[0].value=value;
							if(tag=="input"&&(type=="checkbox"||type=="radio")){
								dos[0].checked=(el.checked?true:false); 
							}
						}
					}
					
					console.log(log);
				
				
			}
			
		}
	}
	
	
	 
function wout(){
	var key=location.href;
	var str=localStorage.getItem(key); 
	if(str==null){
		key="weiyj_cache";
		str=localStorage.getItem(key);
	}
	if(str){
		//?? arr
		var arr=JSON.parse(str);
		if(typeof(arr)=="string"){
			arr=JSON.parse(arr);
		}
	
		for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			var id=el.id;
			if(tag=="input"||tag=="select"||tag=="textarea"){
				var dos=document.getElementById(name);
				if(dos!=null){
					dos.value=value;
				}
				//console.log(name+"="+value);
				
				//var log="";
				var dos=null;
					if(id){
					log="#"+id+":"+value;
					dos=document.getElementById(id);
						if(dos!=null){
							dos.value=value;
							if(tag=="input"&&(type=="checkbox"||type=="radio")){
								dos.checked=(el.checked?true:false); 
							}
						}
					}else{
						log=name+":"+value;
						dos=document.getElementsByName(name);
						if(dos.length>0){
							dos[0].value=value;
							if(tag=="input"&&(type=="checkbox"||type=="radio")){
								dos[0].checked=(el.checked?true:false); 
							}
						}
					}
					
					console.log(log);
				
				
			}
			
		}
	}
	
}
function wsaveUrl(){
	var arr=[];
	var key=location.href;
inputSave(key,arr);
selectSave(key,arr);
textareaSave(key,arr);


inputIdSave(key,arr);
selectIdSave(key,arr);
textareaIdSave(key,arr);
arr.url=location.href;

 localStorage.setItem(key, JSON.stringify(arr));
	 
}

function wsave(){
	var arr=[];
	var key="weiyj_cache";
inputSave(key,arr);
selectSave(key,arr);
textareaSave(key,arr);


inputIdSave(key,arr);
selectIdSave(key,arr);
textareaIdSave(key,arr);
 localStorage.setItem(key, JSON.stringify(arr));
	 
}

function wshow(){
	var arr=[];
	var key="weiyj_cache";
inputSave(key,arr);
selectSave(key,arr);
textareaSave(key,arr);


inputIdSave(key,arr);
selectIdSave(key,arr);
textareaIdSave(key,arr);
 
	if(arr){
			for(var i=0;i<arr.length;i++){
			var el=arr[i];
			var type=el.type;
			var name=el.key;
			var value=el.value;
			var tag=el.tag;
			var id=el.id;
				if(tag=="input"||tag=="select"||tag=="textarea"){
					var log="";
					if(id){
					log="#"+id+":"+value;
					}else{
						log=name+":"+value;
					}
					//console.log(log);
					 
				}
			 
			}
		}
}
function inputSave(key,arr){
	var els=document.getElementsByTagName("input");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.name!=null&&el.value!=""&&el.name!=""&&el.type!="hidden"){
		
		var type=el.type;
		if(type==null||type==""){
			type="text";
		}
		var item={"key":el.name,"value":el.value,"type":type,"tag":"input"};
		
		if(type=="checkbox"||type=="radio"){
			item.checked=el.checked; 
		}
		
		arr.push(item);
		
		//arr.push(item);
		//console.log(el.name+":"+el.value);
	}
	
}
	
}
 function selectSave(key,arr){
	var els=document.getElementsByTagName("select");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.name!=null&&el.value!=""&&el.name!=""&&el.type!="hidden"){
				
		arr.push({"key":el.name,"value":el.value,"tag":"select"});
		//console.log(el.name+":"+el.value);
	}
	
}
	
}

function textareaSave(key,arr){
	var els=document.getElementsByTagName("textarea");
for(var i=0;i<els.length;i++){
	var el=els[i];
	
	if(el.value!=null&&el.name!=null&&el.value!=""&&el.name!=""&&el.type!="hidden"){
		 
		arr.push({"key":el.name,"value":el.value,"tag":"textarea"});
		//console.log(el.name+":"+el.value);
	}
	
}
	
}
function modifyResponse(response) {

    var original_response, modified_response;

    if (this.readyState === 4) {
        // ????? openBypass ????????????????????????
	
		if(response!=null&&response.target!=null&&response.target.responseText!=null){
			if(this.responseText!=null&&this.responseText.indexOf("Intel Core i5-7300U Processor (3MB Cache, up to 3.50 GHz)")>=0){
				
				alert(crome_listen_url+"============"+this.responseText);
			}
			
		}
        if (this.requestUrl  && this.requestMethod ) {
            original_response = response.target.responseText;
			
            Object.defineProperty(this, "responseText", {writable: true});
            modified_response = JSON.parse(original_response);
            // ???? sendBypass ????????????????????
            this.responseText = JSON.stringify(modified_response);
			
        }
    }
}
var crome_listen_url="";
function openBypass(original_function) {

    return function(method, url, async) {
        // ??????????????
        this.requestMethod = method;
		
        this.requestURL = url;
		crome_listen_url=this.requestURL;

        this.addEventListener("readystatechange", function(response) {

				var original_response, modified_response;

				if (this.readyState === 4) {
					// ????? openBypass ????????????????????????
				
					if(response!=null&&response.target!=null&&response.target.responseText!=null){
						if(this.responseText!=null&&this.responseText.indexOf("sfProactiveChat")>=0){
							alert(url+"======@@@@@@@@@@@@@@@@@@@====================");
							console.log(url+"======@@@@@@@@@@@@@@@@@@@====================");
						}
						
					}
					if (this.requestUrl  && this.requestMethod ) {
						original_response = response.target.responseText;
						
						Object.defineProperty(this, "responseText", {writable: true});
						modified_response = JSON.parse(original_response);
						// ???? sendBypass ????????????????????
						this.responseText = JSON.stringify(modified_response);
						
					}
				}
});
        return original_function.apply(this, arguments);
    };

}

function sendBypass(original_function) {
    return function(data) {
        // ??????????????
        this.requestData = data;
		if(crome_listen_url.indexOf("dynaTraceMonitor")<0){ 
			//console.log(crome_listen_url+"=======>>>"+data);
			console.log(crome_listen_url+"=======>>>");
		}
		
        return original_function.apply(this, arguments);
    };
}
XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
XMLHttpRequest.prototype.send = sendBypass(XMLHttpRequest.prototype.send);