/**
 * 
 */
var http=require('http');
var render=require('./common/render');
var router=require('./router');
var url=require('url');
var controller=require('./controller/music');
var server=http.createServer();
server.on('request',function(req,res){
	  render(res);
	  router(req,res);
});
server.listen(8000,'127.0.0.1');