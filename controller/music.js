/**
 * 
 */
var formidable=require("formidable");
var path=require("path");
var fs=require("fs");
var qstring=require("querystring");
var storage=[{id:1,title:'小毛驴',singer:'王晓霞',music:'xiaomaolu.mp3',poster:'wang.jpg'},
	{id:2,title:'卖报歌',singer:'儿童群',music:'maibao.mp3',poster:'a5.jpg'},
	{id:3,title:'吉祥三宝',singer:'一家三口',music:'jixiang.mp3',poster:'a6.jpg'},
	{id:4,title:'两只老虎',singer:'苏子健',music:'tiger.mp3',poster:'a7.jpg'},
	{id:5,title:'小邋遢',singer:'赵薇',music:'xiaolata.mp3',poster:'a8.jpg'},
	{id:6,title:'虫儿飞',singer:'赵丽颖',music:'chong.mp3',poster:'a9.jpg'}];
exports.showIndex=function(req,res){
	res.render("index",{
		title:'首页',
			musicList:storage,
	});
};

exports.showAdd=function(req,res){
	
	res.render('add',{title:'添加音乐'});
};

exports.showEdit=function(req,res){
	var id=req.query.id;
	var music={};
	storage.forEach(function(item){
		if (item.id==id){
			music=item;
		}
	});
	res.render('edit',{title:'编辑音乐',music:music});
};

exports.doAdd=function(req,res){
	var form=new formidable.IncomingForm();
	form.uploadDir="./uploads";
	form.keepExtensions=true;
	form.parse(req,function(err,fields,files){
		if (err) {
			res.end(err.message);
			return;
		}
		var title=fields.title;
		var singer=fields.singer;
		
		var music=path.basename(files.music.name);
		var poster=path.basename(files.poster.name);
		var id=0;
		
		storage.forEach(function(item){
			if (item.id>id){
				id=item.id;
			}
		});
		storage.push({
			id:id+1,
		    title:title,
		    singer:singer,
		    music:music,
		   poster:poster,
		});
		fs.renameSync(files.music.path,path.join("./uploads",music));
		fs.renameSync(files.poster.path,path.join("./uploads",poster));
		res.writeHead(302,{'Location':'http://127.0.0.1:8000/'});
		res.end();
	});
};

exports.doEdit=function(req,res){
	var id=req.query.id;
	var data='';
	req.on('data',function(chunk){
		data=data+chunk;
		console.log(chunk);
	});
	req.on('end',function(){
		
		var postBody=qstring.parse(data.toString());
		console.log(postBody);
		var music_index=0;
		storage.forEach(function(item,index){
			if (item.id==id){
				music_index=index;
			}
		});
		storage[music_index].title=postBody.title;
		storage[music_index].singer=postBody.singer;
		res.writeHead(302,{'Location':'http://127.0.0.1:8000/'});
		res.end();
	});
};

exports.doRemove=function(req,res){
	var id=req.query.id;
	var music_index=0;
	storage.forEach(function(item,index){
		if (item.id==id){
			music_index=index;
		}
	});
	storage.splice(music_index,1);
	res.writeHead(302,{'Location':'http://127.0.0.1:8000/'});
	res.end();
	
};