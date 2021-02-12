const CategoryModel = require('../models/CategoryModel');
/* 
注册分类管理路由
*/
module.exports = function (router) {
  
  // 添加分类
  router.post('/manage/category/add', (req, res) => {
    const {categoryName} = req.body
    CategoryModel.findOne({name: categoryName})
      .then(category => {
        if (category) {
          res.send({status: 1, msg: '此分类已存在'})
        } else {
          CategoryModel.create({name: categoryName})
            .then(category => {
              res.send({status: 0, data: category})
            })
            .catch(error => {
              console.error('添加分类异常', error)
              res.send({status: 1, msg: '添加分类异常, 请重新尝试'})
            })
        }
      })

    
  })

  // 获取分类列表
  router.get('/manage/category/list', (req, res) => {
    CategoryModel.find({})
      .then(categorys => {
        res.send({status: 0, data: categorys})
      })
      .catch(error => {
        console.error('获取分类列表异常', error)
        res.send({status: 1, msg: '获取分类列表异常, 请重新尝试'})
      })
  })

  // 更新分类名称
  router.post('/manage/category/update', (req, res) => {
    const {categoryId, categoryName} = req.body
    CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
      .then(oldCategory => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新分类名称异常', error)
        res.send({status: 1, msg: '更新分类名称异常, 请重新尝试'})
      })
  })

  // 根据分类ID获取分类
  router.get('/manage/category/info', (req, res) => {
    const categoryId = req.query.categoryId
    CategoryModel.findOne({_id: categoryId})
      .then(category => {
        res.send({status: 0, data: category})
      })
      .catch(error => {
        console.error('获取分类信息异常', error)
        res.send({status: 1, msg: '获取分类信息异常, 请重新尝试'})
      })
  })
}