
// 开发/生产环境的标识
const isDev = process.env.NODE_ENV === 'development';

// 服务器与数据库相关配置
let SERVER_CONFIG, DB_CONFIG;

// 由于目前没有上线服务器，所以地址一致
if (isDev) {
  // 服务器配置
  SERVER_CONFIG = {
    port: 4000,
  };

  // 数据库配置
  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'admin_db'
  };

} else {

  // 服务器配置
  SERVER_CONFIG = {
    port: 4000,
  };

  // 数据库配置
  DB_CONFIG = {
    port: 27017,
    host: 'localhost',
    name: 'admin_db'
  };

}

/* 
配置token检查白名单
不需要进行检查token的所有路径的数组
*/
const UN_CHECK_PATHS = ['/test', '/login', '/manage/img/upload'];

// token签名加密的私钥
const PRIVATE_KEY = 'xyf_product_system_token';

module.exports = {
  SERVER_CONFIG,
  DB_CONFIG,
  PRIVATE_KEY,
  UN_CHECK_PATHS
};