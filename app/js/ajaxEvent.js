window.addEventListener("load",function() {

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
 
						if(this.responseText!=null&&this.responseText.indexOf("Our standard warranty covers out-of-box, technica")>=0){
							alert(url+"======@@@@@@@@@@@@@@@@@@@====================");
							console.log(url+"======<<<<<====================start");
							
							 
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
		/***
		arguments.callee.caller.caller.caller.caller
		
		var c_array=[];

							 
							console.log(arguments.callee.caller);
							
							weiyjGetParent(arguments.caller,c_array);
							for(var i=0;i<c_array.length;i++){
								console.log("=========================111=="+c_array[i]);
							}
							//console.log(url+"======<<<<<====================end");
						***/	
        return original_function.apply(this, arguments);
    };
}
XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
XMLHttpRequest.prototype.send = sendBypass(XMLHttpRequest.prototype.send);
function weiyjGetParent(fuc,arry){

 while(typeof(fuc)=="function"){
 arry.push(fuc.name);
 fuc=fuc.caller;
 console.log("###################################################################");
 
 } 
}

 /**
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
}**/