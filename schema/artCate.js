const joi = require('joi')

const name = joi.string().required()
const alias = joi.string().required()
const id = joi.number().integer().required()

exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

exports.delete_cate_schema = {
    params: {
        id
    }
}

exports.get_cate_schema = {
    params: {
        id
    }
}

exports.update_cate_schema = {
    body: {
        id,
        name,
        alias
    }
}



