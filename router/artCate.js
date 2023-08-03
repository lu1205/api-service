const express = require('express');
const expressJoi = require('@escook/express-joi')

const router = express.Router()
const artCateHandle = require('../router_handle/artCate')
const { add_cate_schema, update_cate_schema, delete_cate_schema, get_cate_schema } = require('../schema/artCate')

router.get('/cates', artCateHandle.getAllCates)

router.post('/addCate', expressJoi(add_cate_schema), artCateHandle.addCate)
router.get('/deleteCate/:id', expressJoi(delete_cate_schema), artCateHandle.deleteCateById)
router.get('/getCateById/:id', expressJoi(get_cate_schema), artCateHandle.getCateById)
router.post('/updateCate', expressJoi(update_cate_schema), artCateHandle.updateCateById)

module.exports = router
