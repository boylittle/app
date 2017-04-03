
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
			
			console.log(url+"###################>>>>");return false;},false);
		
	} 
	
	
},true);




 
function modifyResponse(response) {

    var original_response, modified_response;

    if (this.readyState === 4) {
        // ????? openBypass ?§Ò???????????§Ø??????????
        if (this.requestUrl  && this.requestMethod ) {
            original_response = response.target.responseText;
            Object.defineProperty(this, "responseText", {writable: true});
            modified_response = JSON.parse(original_response);
            // ???? sendBypass ?§Ò??????????????????
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

        this.addEventListener("readystatechange", modifyResponse);
        return original_function.apply(this, arguments);
    };

}

function sendBypass(original_function) {
    return function(data) {
        // ??????????????
        this.requestData = data;
		//console.log(crome_listen_url+"=======>>>"+data);
        return original_function.apply(this, arguments);
    };
}
XMLHttpRequest.prototype.open = openBypass(XMLHttpRequest.prototype.open);
XMLHttpRequest.prototype.send = sendBypass(XMLHttpRequest.prototype.send);