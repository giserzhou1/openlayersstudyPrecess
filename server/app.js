var express = require('express');
var app = express();
const bodyParser = require('body-parser')
var userRouter = require('./routes/user');
var path = require('path');
var cookieParser = require('cookie-parser');
//用来解析post请求体
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser());
var logger = require('morgan');
app.use(logger('dev'));
app.use('/user', userRouter);

// app.all('*',function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//   if (req.method == 'OPTIONS') {
//       res.send(200); /让options请求快速返回/
//   }
//   else {
//       next();
//   }
// });


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

