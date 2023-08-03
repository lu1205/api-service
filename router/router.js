const express = require("express");

// 创建路由实例
const router = express.Router();

// 导入用户路由处理函数
const routerHandle = require("../router_handle/router");

// 导入验证表单的中间件
const expressJoi = require("@escook/express-joi");

// 导入验证规则
const {
  add_schema,
  update_schema,
  queryById_schema,
} = require("../schema/router");

// 添加
router.post("/add", expressJoi(add_schema), routerHandle.add);
// 修改
router.post("/update", expressJoi(update_schema), routerHandle.update);
// 查询一级菜单
router.get("/getParentRouter", routerHandle.getParentRouter);
// 查询菜单详情
router.get(
  "/getRouterById",
  expressJoi(queryById_schema),
  routerHandle.getRouterById
);
// 查询菜单列表
router.get("/getRouterList", routerHandle.getRouterList);
// 删除列表
router.get("/delRouterById", routerHandle.delRouterById);

// 根据用户查询路由表
router.get("/getRouterListByUser", routerHandle.getRouterListByUser);
module.exports = router;
