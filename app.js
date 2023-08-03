// 导入 express
const express = require("express");

// 创建服务器实例对象
const app = express();

const joi = require("joi");

// 导入 cors 中间件，解决跨域问题
const cors = require("cors");
app.use(cors());

// 配置解析 表单中 JSON 格式数据
// app.use(express.json());

// 配置解析表单中间件，只能解析 application/x-www-form-url-urlencoded 格式的表单数据
// app.use(express.urlencoded({ extended: false }));

// 响应数据的中间件 - 在路由之前
app.use((req, res, next) => {
  // status 默认值为1，表示失败
  // err 可能为错误对象，可能为错误的字符串描述
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 配置解析 token 的中间件  -- 在路由之前
const expressJWT = require("express-jwt");
const { secretKey } = require("./config");
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api/] }));

// 导入用户路由
const userRouter = require("./router/user");
// 挂载用户路由
app.use("/api", express.urlencoded({ extended: false }), userRouter);

const articleCateRouter = require("./router/artCate");
app.use(
  "/my/article",
  express.urlencoded({ extended: false }),
  articleCateRouter
);

const articleRouter = require("./router/article");
app.use("/my/article", express.urlencoded({ extended: false }), articleRouter);

const userInfo = require("./router/userInfo");
app.use("/my", express.urlencoded({ extended: false }), userInfo);

const routerInfo = require("./router/router");
app.use("/router", express.json(), routerInfo);

// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 身份认证失败
  if (err.name === "UnauthorizedError")
    return res.send({ status: 2, message: "身份认证失败" });
  // 未知的错误
  res.cc(err);
  // next()
});

// 启动服务器
app.listen(3007, () => {
  console.log("server running at http://127.0.0.1:3007");
});
