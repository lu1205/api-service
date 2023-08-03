// 导入数据库操作模块
const db = require("../db/index");
// 导入 加密 工具
const bcrypt = require("bcryptjs");
// 导入jwt
const jwt = require("jsonwebtoken");
// 导入 加密盐
const { secretKey, expiresIn } = require("../config");

// 添加
exports.add = (req, res) => {
  let router = req.body;
  const addSql = "insert into ev_routers set ?";
  db.query(
    addSql,
    {
      parent_id: router?.parentId,
      path: router.path,
      name: router.name,
      redirect: router?.redirect,
      component: router?.component,
      title: router.title,
      icon: router?.icon,
      keep_alive: router?.keepAlive,
    },
    (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("添加失败");
      res.send({
        status: 0,
        message: "添加成功",
      });
    }
  );
};

// 修改
exports.update = (req, res) => {
  let router = req.body;
  const querySql = "select * from ev_routers where id = ? and del = 0";
  db.query(querySql, [router.id], (err, result) => {
    if (err) return res.cc(err);
    const updateSql =
      "update ev_routers set parent_id=?,path=?,name=?,redirect=?,component=?,title=?,icon=?,keep_alive=? where id = ?";
    db.query(
      updateSql,
      [
        router?.parentId,
        router.path,
        router.name,
        router?.redirect,
        router?.component,
        router.title,
        router?.icon,
        router?.keepAlive,
        router.id,
      ],
      (err, result) => {
        if (err) return res.cc(err);
        if (result.affectedRows !== 1) return res.cc("修改失败");
        res.send({
          status: 0,
          message: "修改成功",
        });
      }
    );
  });
};

// 获取一级菜单
exports.getParentRouter = (req, res) => {
  const querySql =
    "select * from ev_routers where parent_id is null and del = 0";
  db.query(querySql, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "查询成功",
      data: result,
    });
  });
};

// 查询菜单
exports.getRouterById = (req, res) => {
  const querySql = "select * from ev_routers where id = ? and del = 0";
  db.query(querySql, [req.query.id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "查询成功",
      data: result[0],
    });
  });
};

// 获取所有菜单
exports.getRouterList = (req, res) => {
  const querySql = "select * from ev_routers where del = 0";
  db.query(querySql, (err, data) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "查询成功",
      data,
      totalCount: data.length,
    });
  });
};

// 删除菜单
exports.delRouterById = (req, res) => {
  const querySql = "select * from ev_routers where id = ? an del = 0";
  db.query(querySql, [req.query.id], (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("此菜单已删除");
    const delSql = "update ev_routers set del = 1 where id = ?";
    db.query(delSql, [req.query.id], (err, data) => {
      if (err) return res.cc(err);
      if (data.affectedRows !== 1) return res.cc("删除失败");

      res.send({
        status: 0,
        message: "删除成功",
      });
    });
  });
};

// 根据用户查询路由表
exports.getRouterListByUser = (req, res) => {
  console.log("req", req);
  const querySql = "select * from ev_routers where del = 0";
  db.query(querySql, (err, data) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "查询成功",
      data,
      totalCount: data.length,
    });
  });
};
