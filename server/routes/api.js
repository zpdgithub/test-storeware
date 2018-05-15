var express = require('express');
var router = express.Router();
var _ = require('lodash');

var themes = [{
    id: 1,
    css: 'http://127.0.0.1:3000/css/1.css',
    js: 'http://127.0.0.1:3000/js/1.js'
}, {
    id: 2,
    css: 'http://127.0.0.1:3000/css/2.css',
    js: 'http://127.0.0.1:3000/js/2.js'
}, {
    id: 3,
    css: 'http://127.0.0.1:3000/css/3.css',
    js: 'http://127.0.0.1:3000/js/3.js'
}];
router.get('/themes', function(req, res) {
    res.send(themes);
});
router.get('/theme/:id', function(req, res) {
    res.send(_.find(themes, { id: parseInt(req.params.id) }));
});

module.exports = router;