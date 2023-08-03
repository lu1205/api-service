const joi = require('joi')

const title = joi.string().required()
const content = joi.string().required()
const cover_img = joi.string().required()
const pub_date = joi.string().required()
const state = joi.number().integer().required()
const cate_id = joi.number().integer().required()
const author_id = joi.number().integer().required()

exports.add_article_schema = {
    body: {
        title,
        content,
        coverImg: cover_img,
        pubDate: pub_date,
        state,
        cateId: cate_id,
        authorId: author_id,
    }
}

