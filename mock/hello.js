/**
 * Created by jiangjunhuan@yy.com on 17/2/7.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/api/hello',
  response: function (req, res) {
    res.send({
      result:1,
      data:'hello world'
    });
  }
}
