const express = require('express');
const expressJoi = require('@escook/express-joi')

const router = express.Router()
const articleHandle = require('../router_handle/article')
const { add_article_schema } = require('../schema/article')

router.post('/addArticle', expressJoi(add_article_schema), articleHandle.addArticle)

module.exports = router
