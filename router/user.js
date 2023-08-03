const express = require("express");

// 创建路由实例
const router = express.Router();

// 导入用户路由处理函数
const userHandle = require("../router_handle/user");

// 导入验证表单的中间件
const expressJoi = require("@escook/express-joi");

// 导入验证规则
const { reg_login_schema, reg_regisity_schema } = require("../schema/user");

// 注册
router.post("/reguser", expressJoi(reg_regisity_schema), userHandle.regUser);
// 登录
router.post("/login", expressJoi(reg_login_schema), userHandle.login);

module.exports = router;
