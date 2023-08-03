// 导入数据库操作模块
const db = require("../db/index");
// 导入 加密 工具
const bcrypt = require("bcryptjs");

exports.getAllUserInfo = (req, res) => {
  const querySql = "select count(1) as totalCount from ev_users";
  db.query(querySql, (err1, data1) => {
    if (err1) return res.cc(err1);
    const totalCount = data1[0].totalCount;
    if (totalCount > 0) {
      const queryAllUserInfoSql =
        "select id,username,nickname,user_pic from ev_users where del = 0 order by id limit ?,?";
      db.query(
        queryAllUserInfoSql,
        [
          parseInt((req.query.pageNum - 1) * req.query.pageSize),
          parseInt(req.query.pageSize),
        ],
        (err, result) => {
          console.log(result);
          if (err) return res.cc(err);
          res.send({
            status: 0,
            message: "查询成功",
            data: result,
            totalCount: totalCount,
          });
        }
      );
    } else {
      res.send({
        status: 0,
        message: "查询成功",
        data: [],
        totalCount: totalCount,
      });
    }
  });
};

exports.getUserInfoById = (req, res) => {
  console.log(req);
  const querySql =
    "select id,username,nickname,user_pic from ev_users where id = ? and del = 0";
  db.query(querySql, req.query.id, (err, data) => {
    if (err) return res.cc(err);
    if (data.length !== 1) return res.cc("获取用户信息失败");
    res.send({ status: 0, message: "获取用户信息成功", data: data[0] });
  });
};

exports.updateUserInfoById = (req, res) => {
  const user = req.body;
  const sql =
    "update ev_users set nickname=?,email=?,user_pic=? where id = ? and del=0";
  db.query(
    sql,
    [user.nickname, user.email, user.userPic, user.id],
    (err, data) => {
      if (err) return res.cc(err);
      if (data.affectedRows !== 1) return res.cc("修改失败");
      res.cc("修改成功", 0);
    }
  );
};

// 重置密码
exports.updatePassword = (req, res) => {
  const user = req.user;
  // 查询用户是否存在
  const queryUser = "select * from ev_users where id = ? and where del = 0";
  db.query(queryUser, [user.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("未查询到用户");

    // 判断旧密码是否一致
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      result[0].password
    );
    if (!compareResult) return res.cc("旧密码不对");

    // 加密
    req.body.newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    const reSetSql = "update ev_users set password = ? where id = ? and del=0";
    db.query(reSetSql, [req.body.newPwd, user.id], (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("密码重置失败");
      res.cc("密码重置成功", 0);
    });
  });
};

// 修改头像
exports.updateUserPic = (req, res) => {
  const img = req.body.userPic;
  const user = req.user;
  const updateSql = "update ev_users set user_pic = ? where id = ? and del = 0";
  db.query(updateSql, [img, user.id], (err, data) => {
    if (err) return res.cc(err);
    if (data.affectedRows !== 1) return res.cc("更新失败");
    res.send({ status: 0, message: "更新成功" });
  });
};

// 退出登录，后续做处理
exports.logout = (req, res) => {
  req.user = null;
  res.send({ status: 0, message: "退出成功" });
};

exports.delUserById = (req, res) => {
  const id = req.query.id;
  const querySql = "select * from ev_users where id=? and del = 0";
  db.query(querySql, [id], (err, data) => {
    if (err) return res.cc(err);
    if (data.length !== 1) return res.cc("此用户不存在");
    const delSql = "update ev_users set del = 1 where id = ?";
    db.query(delSql, [id], (err, data) => {
      if (err) return res.cc(err);
      if (data.affectedRows !== 1) return res.cc("删除失败");
      res.send({ status: 0, message: "删除成功" });
    });
  });
};
