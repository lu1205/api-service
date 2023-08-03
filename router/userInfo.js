const express = require("express");

const expressJoi = require("@escook/express-joi");
const {
  update_userInfo_schema,
  update_password_schema,
  update_userPic_schema,
  update_delUser_schema,
} = require("../schema/user");

const router = express.Router();
const userInfoHandle = require("../router_handle/userInfo");

router.get(
  "/delUserById",
  expressJoi(update_delUser_schema),
  userInfoHandle.delUserById
);
router.get("/getAllUserInfo", userInfoHandle.getAllUserInfo);
router.get("/getUserInfoById", userInfoHandle.getUserInfoById);
router.post(
  "/updateUserInfoById",
  expressJoi(update_userInfo_schema),
  userInfoHandle.updateUserInfoById
);
// 重置密码
router.post(
  "/updatepwd",
  expressJoi(update_password_schema),
  userInfoHandle.updatePassword
);
router.post(
  "/updateUserPic",
  expressJoi(update_userPic_schema),
  userInfoHandle.updateUserPic
);
router.get("/logout", userInfoHandle.logout);
module.exports = router;
