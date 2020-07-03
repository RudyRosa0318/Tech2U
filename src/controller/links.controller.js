const pool = require('../model/database')

const res = {};


res.AddLink = (req, res) => {
    res.render('links/add');
};

res.addtheLink = async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.redirect('/links');
}

res.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    res.render('links/list', { links });
}

res.deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
};

res.renderEditLink = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
};

module.exports = res;