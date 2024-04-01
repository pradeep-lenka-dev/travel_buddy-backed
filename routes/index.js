var express = require('express');
const genericController = require('../controller/generic-controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/openApiRes',genericController.fetchData)
module.exports = router;
