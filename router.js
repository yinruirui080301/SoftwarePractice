/**
 * 
 */
var fs=require("fs");
var path=require("path");
var _=require("underscore");
var controller=require("./controller/music");
var url=require("url");
module.exports=function(req,res){
	  var urlObj=url.parse(req.url,true);
	  req.query=urlObj.query;
	  var pathname=urlObj.pathname;
	  var method=req.method;
	  console.log("req.url=",req.url);
	  console.log("req.query=",req.query);
	  console.log("method=",method);
	  console.log("pathname=",pathname);
	  if (method==='GET'&&pathname==='/'){
		  controller.showIndex(req,res);
	  }else if (method==='GET'&& pathname==='/index.html'){
		  controller.showIndex(req,res);
	  }else if(method==='GET'&& pathname.startsWith('/node_modules/')) {
		  var staticPath=path.join(__dirname,pathname);
		  fs.readFile(staticPath,'utf8',function(err,data){
			  if (err){
				  return res.end(err.message);
			  }
			  res.end(data);
		  });
	  }if (method==='GET'&& pathname.startsWith('/uploads/')){
		  var staticPath=path.join(__dirname,pathname);
		  fs.readFile(staticPath,'binary',function(err,data){
			  if (err){
				  return res.end(err.message);
			  }
			  res.write(data,"binary");
			  res.end();
		  });
	  }
	  else  if (method==='GET' && pathname==='/add'){
		  controller.showAdd(req,res);
	  }else if (method==='GET' && pathname==='/edit'){
		  controller.showEdit(req,res);
	  }else if (method==='POST'&&pathname==='/add'){
		  controller.doAdd(req,res);
	  }else if (method==='GET' && pathname==='/remove'){
		  controller.doRemove(req,res);
	  }else if (method==='POST'&&pathname==='/edit'){
		  controller.doEdit(req,res);
	  }
};