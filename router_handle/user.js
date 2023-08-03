// 导入数据库操作模块
const db = require("../db/index");
// 导入 加密 工具
const bcrypt = require("bcryptjs");
// 导入jwt
const jwt = require("jsonwebtoken");
// 导入 加密盐
const { secretKey, expiresIn } = require("../config");

// 注册处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交的表单数据
  const user = req.body;

  // 校验
  /*     if (!user.username || !user.password) {
            // return res.send({ status: 1, message: '用户名或密码为空' })
            return res.cc(err)
        } */
  // 检测用户名是否重复
  // 定义查询用户名是否存在 SQL
  const sqlStr = "select * from ev_users where username = ?";
  db.query(sqlStr, [user.username], (err, result) => {
    // if (err) return res.send({ status: 1, message: err.message })
    // if (result.length > 0) return res.cc({ status: 1, message: '用户名已被占用，请更换其他用户名' })
    if (err) return res.cc(err);
    if (result.length > 0) return res.cc("用户名已被占用，请更换其他用户名");
    console.log(user);

    // 对密码进行加密
    // 使用 bcrypt.hashSync() 方法进行加密，
    // 参数一：要加密的数据
    // 参数二：数字，表示随机盐的长度
    user.password = bcrypt.hashSync(user.password, 10);
    console.log(user);

    // 保存用户
    const saveSql = "insert into ev_users set ?";
    db.query(
      saveSql,
      {
        username: user.username,
        password: user.password,
        nickname: user.nickname,
        user_pic: user.userPic,
      },
      (err, result) => {
        // if (err) return res.send({ status: 1, message: err.message })
        // if (result.affectedRows !== 1) return res.send({ status: 1, message: '注册失败' })
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc("注册失败");

        // res.send({ status: 0, message: '注册成功' })
        res.cc("注册成功", 0);
      }
    );
  });
};

// 登录处理函数
exports.login = (req, res) => {
  const user = req.body;
  // 查询用户是否存在
  const queryUser = "select * from ev_users where username = ?";
  db.query(queryUser, [user.username], (err, result) => {
    if (err) return res.send({ status: 1, message: err.message });
    if (result.length !== 1)
      return res.send({ status: 1, message: "未查询到用户" });
    const compareResult = bcrypt.compareSync(user.password, result[0].password);
    if (!compareResult) return res.cc("密码错误");
    // 登录成功，生成 token
    const userInfo = { ...result[0], password: "", user_pic: "" };
    const token = "Bearer " + jwt.sign(userInfo, secretKey, { expiresIn });

    res.send({
      status: 0,
      message: "登录成功",
      data: { token, userInfo: { userPic: result[0].user_pic, ...userInfo } },
    });
  });
};
