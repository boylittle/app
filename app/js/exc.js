
$(document).ready(function(){
 
try{
 requiredApp("https://raw.githubusercontent.com/boylittle/app/master/app/js/config/config.js");
}catch(e){
createFileJs("app/js/config/js.js"); 
createFileJs("app/js/config/filter.js");
}
}); 
function requiredApp(link){
$.ajax({url:link,async:false,error:function(){
	throw new error("error!");
}});
}

function createFileJs(url){ 
var head= document.getElementsByTagName('head')[0]; 
var script= document.createElement('script'); 
script.type= 'text/javascript'; 
script.src= url; 
head.appendChild(script);
}
