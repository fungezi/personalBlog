
// middleWare 加载中间件 对http 以及cookie session 进行处理

var express = require('express');
var compression = require('compression'); 	//压缩
var bodyParser = require('body-parser');	//解析请求体
var cors = require('cors');					//跨域
var methodOverride = require('method-override');	//重写请求方法
var cookieParser = require('cookie-parser');		//解析cookie
var path = require('path');					//path中间件
// var passport = require('passport');			
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function(app){
	app.enable('trust proxy');
  	var options = {
   	 	origin: true,
   	 	credentials: true
  	};
    app.use(compression());
  	// app.use(bodyParser());
  	app.use(bodyParser.urlencoded({ extended: false }));
  	app.use(bodyParser.json());
  	app.use(methodOverride());
  	app.use(cors(options));
  	app.use(cookieParser());
  	app.use(session({		//session的存储
	    secret: "newthread secret",
	    resave: true,
	    saveUninitialized: false,
	    store: new RedisStore({
	      host:"127.0.0.1",
	      port:6379, 	//默认端口6379
	      db:10 //注意这里是数字  而不是字符串
	    }),
	    cookie: {maxAge: 60000*5}	//设置cookie的过期时间
  }));
}