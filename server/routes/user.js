var express = require('express');
var router = express.Router();
const config = require('../config')
const Jwt = require('jsonwebtoken')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/usersDb', {useNewUrlParser: true});

function tokenSign ({ id, email }) {
  try {
    return Jwt.sign({ id, email }, config.token.secretOrPrivateKey, config.token.options)
  } catch (error) {
    throw (error)
  }
}

function tokenVerify (token) {
  try {
    Jwt.verify(token, config.token.secretOrPrivateKey)
    return true
  } catch (error) {
    return false
  }
}

function registSuccess(req,res,user){
  User.create(
    {
       email: req.body.email,
       password:req.body.password
     })
  res.status(201).send({
    code:201,
    user,
    token: tokenSign(user)
  })
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
mongoose.set('useCreateIndex', true)
const User = mongoose.model("User", userSchema)

router.post('/regist', function(req, res) {
  console.log(req.body)
  let user = {email:req.body.email}
    try{
      User.where({ 'email': req.body.email }).count(function(err,count){
        if (count>0){
               res.status(400).send({
               code: 400,
               error: '该邮箱已经注册'
           })
           return
        }
        registSuccess(req,res,user)
        if(err){
          console.log(err)
        }
      })
      } catch (error) {
        console.log('错误',error)
      }
    }
  )

  router.post('/login',(req,res)=>{
    let user = {'email':req.body.email}
    try {
      User.where({ 'email': req.body.email }).count(function(err,count){
        console.log('wode',count)
        if (count == 0){
          res.status(200).send({
              code: 200,
              error: '账号不存在，请注册新用户'
              })
           }else{
            User.where({ 'email': req.body.email,'password':req.body.password}).count(function(err,count){
              if (count == 0){
                res.status(403).send({
                    code: 403,
                    error: '用户名或密码错误'
                    })
                  return
                 }
                 res.status(201).send({
                  code:201,
                  user,
                  token: tokenSign(user)
                })
                 if(err){
                   console.log(err)
                 }
            })
           }
        })
    } catch (error) {
      res.status(403).send({
        code: 403
      })}
  })

module.exports = router;