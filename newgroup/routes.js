module.exports = function(app){
	
	app.use("/user",require("./api/user"));//会自动请求到index.js   这里user API

	app.use("/comment",require("./api/comment")); //评论的API

	app.use("/article",require("./api/article"));	//文章的API

	app.use("/message",require("./api/message"));

	app.use("/category",require("./api/category"));

	app.use("/question",require("./api/question"));

	app.use("/auth",require("./api/auth"));
	
	app.use("/role",require("./api/role"));

	app.use("/signIn",require("./api/signIn"));

	app.use("/signUp",require("./api/signUp"));

	app.use("/signIn/out",require("./api/signIn"));


	app.use("/*",function(req,res,next){
		res.end("啥也没有");
	})
}