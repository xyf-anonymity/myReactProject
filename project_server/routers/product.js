const ProductModel = require('../models/ProductModel');
const {pageFilter} = require('../utils')

/* 
注册商品管理路由
*/
module.exports = function (router) {
  
  // 添加产品
  router.post('/manage/product/add', (req, res) => {
    const product = req.body
    console.log('product', product)
    ProductModel.findOne({name: product.name})
      .then(p => {
        if (p) {
          res.send({
            status: 1,
            msg: '此名称商品已存在'
          })
        } else {
          ProductModel.create(product)
            .then(product => {
              res.send({
                status: 0,
                data: product
              })
            })
            .catch(error => {
              console.error('添加产品异常', error)
              res.send({
                status: 1,
                msg: '添加产品异常, 请重新尝试'
              })
            })
        }
      })
    
  })

  // 获取产品分页列表
  router.get('/manage/product/list', (req, res) => {
    const {pageNum, pageSize} = req.query
    ProductModel.find({})
      .then(products => {
        res.send({status: 0, data: pageFilter(products.reverse(), pageNum, pageSize)})
      })
      .catch(error => {
        console.error('获取商品列表异常', error)
        res.send({status: 1, msg: '获取商品列表异常, 请重新尝试'})
      })
  })

  // 搜索产品列表
  router.get('/manage/product/search', (req, res) => {
    const {pageNum, pageSize, searchName, productName, productDesc} = req.query
    let contition = {}
    if (productName) {
      contition = {name: new RegExp(`^.*${productName}.*$`)}
    } else if (productDesc) {
      contition = {desc: new RegExp(`^.*${productDesc}.*$`)}
    }
    ProductModel.find(contition)
      .then(products => {
        res.send({status: 0, data: pageFilter(products, pageNum, pageSize)})
      })
      .catch(error => {
        console.error('搜索商品列表异常', error)
        res.send({status: 1, msg: '搜索商品列表异常, 请重新尝试'})
      })
  })

  // 根据商品id获取商品对象
  router.get('/manage/product/info', (req, res) => {
    const productId = req.query.productId
    ProductModel.findOne({ _id: productId })
      .then(product => {
        res.send({
          status: 0,
          data: product
        })
      })
      .catch(error => {
        console.error('获取商品异常', error)
        res.send({
          status: 1,
          msg: '获取商品异常'
        })
      })
  })

  // 更新产品
  router.post('/manage/product/update', (req, res) => {
    const product = req.body
    ProductModel.findOneAndUpdate({_id: product._id}, product)
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新商品异常', error)
        res.send({status: 1, msg: '更新商品名称异常, 请重新尝试'})
      })
  })

  // 更新产品状态(上架/下架)
  router.post('/manage/product/updateStatus', (req, res) => {
    const {productId, status} = req.body
    ProductModel.findOneAndUpdate({_id: productId}, {status})
      .then(oldProduct => {
        res.send({status: 0})
      })
      .catch(error => {
        console.error('更新产品状态异常', error)
        res.send({status: 1, msg: '更新产品状态异常, 请重新尝试'})
      })
  })
}