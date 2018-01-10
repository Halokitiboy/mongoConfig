var http = require("http");

http.createServer(function(request,response){
	
	response.end("haddwdhasadd");//表示请求结束，将结果返回给浏览器
	
}).listen(3000);