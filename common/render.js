/**
 * 
 */
var fs=require("fs");
var path=require("path");
var _=require("underscore");
module.exports=function(res){
	res.render=function(viewName,obj){
		fs.readFile('./view/'+viewName+'.html','utf8',function(err,data){
			if (err){
				return res.end(err.message);
			}
			var compiled=_.template(data);
			var htmlStr=compiled(obj||{});
			res.end(htmlStr);
		});
	};
};