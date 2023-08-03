const db = require('../db/index')

exports.getAllCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) res.cc(err)
        res.send({ status: 0, message: '查询成功', data: results })
    })
}

exports.addCate = (req, res) => {
    const cate = req.body
    const querySql = 'select * from ev_article_cate where name = ? or alias = ?'
    db.query(querySql, [cate.name, cate.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 1 && results[0].name === cate.name && results[0].alias === cate.alias) return res.cc('此分类名称和别名都被占用，请重新设置名称')
        if (results.length === 1 && results[0].name === cate.name) return res.cc('此分类名称已被占用，请重新设置名称')
        if (results.length === 1 && results[0].alias === cate.alias) return res.cc('此分类别名已被占用，请重新设置别名')
        const sql = 'insert into ev_article_cate set name = ? ,alias = ?'
        db.query(sql, [cate.name, cate.alias], (err, results) => {
            if (err) res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增分类失败')
            res.send({ status: 0, message: '新增分类成功' })
        })
    })
}

exports.deleteCateById = (req, res) => {
    const id = req.params.id
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    db.query(sql, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败')

        res.send({ status: 0, message: '删除成功' })
    })
}

exports.getCateById = (req, res) => {
    const id = req.params.id
    const sql = 'select * from ev_article_cate where is_delete = 0 and id = ?'
    db.query(sql, id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('未查询到数据')

        res.send({ status: 0, message: '查询成功', data: results[0] })
    })
}

exports.updateCateById = (req, res) => {
    const cate = req.body
    const querySql = 'select * from ev_article_cate where id != ? and (name = ? or alias = ?)'
    db.query(querySql, [cate.id, cate.name, cate.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('名称个别名都被占用，请更换后重试')
        if (results.length === 1 && results[0].name === cate.name) return res.cc('名称被占用，请更换后重试')
        if (results.length === 1 && results[0].alias === cate.alias) return res.cc('别名被占用，请更换后重试')

        const sql = 'update ev_article_cate set name = ?,alias = ? where id = ?'
        db.query(sql, [cate.name, cate.alias, cate.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新分类失败')
            res.send({ status: 0, message: '更新成功' })
        })
    })


}

