// 角色权限判断
var mongoose = require("mongoose");
var roleModel = mongoose.model("Role");
var hasAuth = function(req,res,next){
	//首先去判断被访问的url所指向的API是否是被默认访问的。若不是那么就将通过role去获取auth来和url比较是否可以被访问
	var role = req.session.role;
	var defaultAuth = ["/user/list","/signIn","/signIn/out","/signUp","/article/addArticle","/article/updateArticle","/article/deleteArticle","/article/list"];
	var url = req.url;
	
	if(!inArray(defaultAuth,url)){
		if(role){
			var flag = false;
			role.forEach(function(e){
				console.log("/" + e);
				if("/" + e == url) flag = true;
			})
			if(flag){
				next();
			}else{
				res.status(200).json({flag:true,content:"没有权限"});
			}
			
		}else{
			//当没有登录的时候  就去默认的列表查找
			res.status(200).json({flag:true,content:"登陆之后才可以访问"});
		}
	}else{
		next();
	}


	function inArray(array,arr){
		for(var i = 0;i<array.length;i++){
			if(array[i] == arr) return true;
		}
		return false;
	}
}

module.exports = hasAuth;