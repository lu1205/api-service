// 导入校验工具
const joi = require("joi");

// 定义校验规则

const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();
const id = joi.number().integer().allow(null, "");
const parentId = joi.number().integer().allow(null, "");
const path = joi.string().required();
const name = joi.string().allow(null, "");
const redirect = joi.string().allow(null, "");
const component = joi.string().allow(null, "");
const title = joi.string().required();
const icon = joi.string().allow(null, "");
const keepAlive = joi.number();

exports.add_schema = {
  body: {
    parentId,
    path,
    name,
    redirect,
    component,
    title,
    icon,
    keepAlive,
  },
};

exports.update_schema = {
  body: {
    id: id.required(),
    parentId,
    path,
    name,
    redirect,
    component,
    title,
    icon,
    keepAlive,
  },
};

exports.queryById_schema = {
  query: {
    id: id.required(),
  },
};
