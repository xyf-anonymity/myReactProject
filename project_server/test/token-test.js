/* 
测试token的生成和校验处理
*/
const jwt = require('jsonwebtoken')

// 生成token
function makeToken(userId) { // atguigu_token用于解码的私钥
  const token = jwt.sign({id: userId}, 'atguigu_token', { expiresIn: '5 s' })
  return token
}

// 检验token
function verifyToken(token) {
  jwt.verify(token, 'atguigu_token', (error, data) => {
    if (error) {
      console.log('校验失败', error.message)
    } else {
      console.log('校验成功', data.id)
    }
  })
}

function test() {
  const token = makeToken(12)
  console.log('生成token', token)
  // 在有效期内进行校验
  setTimeout(() => {
    verifyToken(token)
  }, 4000);

  // 过了有效期才进行校验
  setTimeout(() => {
    verifyToken(token)
  }, 5000);
}

test()