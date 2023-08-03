const db = require('../db/index')

exports.addArticle = (req, res) => {
    const data = req.body
    console.log(data);
    const sql = 'insert into ev_articles set ?'
    db.query(sql, { title: data.title, content: data.content, cover_img: data.coverImg, pub_date: data.pubDate, state: data.state, cate_id: data.cateId, author_id: data.authorId }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加失败')

        res.send({ status: 0, message: '添加文章成功' })
    })
}
