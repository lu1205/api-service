// 导入校验工具
const joi = require("joi");

// 定义校验规则
const username = joi.string().alphanum().min(1).max(10).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const id = joi.number().integer().min(1).required();
const nickname = joi.string().required();
const email = joi.string().email().required();
const userPic = joi.string().dataUri().required();

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};
exports.reg_regisity_schema = {
  body: {
    username,
    password,
    nickname: joi.string(),
    userPic: joi.string().dataUri(),
    email: joi.string().email(),
  },
};

exports.update_userInfo_schema = {
  body: {
    id,
    nickname,
    email: joi.string().email(),
    userPic: joi.string().dataUri(),
  },
};

exports.update_password_schema = {
  body: {
    oldPwd: password,
    // joi.ref('oldPwd') 表示与旧密码一致
    // joi.not(joi.ref('oldPwd')) 表示与旧密码不一致
    // concat() 用于合并规则
    newPwd: joi.not(joi.ref("oldPwd")).concat(password),
  },
};

exports.update_userPic_schema = {
  body: {
    userPic: userPic,
  },
};

exports.update_delUser_schema = {
  query: {
    id: joi.number().integer().required(),
  },
};
