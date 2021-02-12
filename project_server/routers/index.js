/*
用来定义路由的路由器模块
 */
const express = require('express')
const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')

const {PRIVATE_KEY} = require('../config')
const UserModel = require('../models/UserModel')
const RoleModel = require('../models/RoleModel')


// 得到路由器对象
const router = express.Router()

// 登陆
router.post('/login', (req, res) => {
  const {username, password} = req.body
  // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
  UserModel.findOne({username, password: md5(password)}, {password: 0, __v: 0})
    .then(user => {
      if (user) { // 登陆成功
        //签发token 指定过期时间 7 天
        const token = jwt.sign({id: user._id}, PRIVATE_KEY, { expiresIn: '7 days' });
        //const token = jwt.sign({id: user._id}, PRIVATE_KEY, { expiresIn: '15 s' });

        if (user.role_id) {
          RoleModel.findOne({_id: user.role_id})
            .then(role => {
              user._doc.role = role
              // 返回登陆成功信息(包含user和token)
              res.send({
                status: 0, 
                data: {
                  user,
                  token
                }
              })
            })
        } else {
          user._doc.role = {menus: []}
          // 返回登陆成功信息(包含user和token)
          res.send({
            status: 0, 
            data: {
              user,
              token
            }
          })
        }

      } else {// 登陆失败
        res.send({status: 1, msg: '用户名或密码不正确!'})
      }
    })
    .catch(error => {
      console.error('登陆异常', error)
      res.send({status: 1, msg: '登陆异常, 请重新尝试'})
    })
})

router.post('/check_token',(req,res)=>{
   res.status(200).json({
      status: 0,
      msg: 'token有效'
    })
})



require('./category')(router)
require('./product')(router)
require('./role')(router)
require('./user')(router)
require('./file-upload')(router)

module.exports = router