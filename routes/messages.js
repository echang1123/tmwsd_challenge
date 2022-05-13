var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var itemlist = []
var GlobalId = 1

router.use( express.json() )
router.use(bodyParser.urlencoded( { extended: false } ));
router.use( bodyParser.json() );

router.get('/', function (req, res) {
  res.render('messages/index', { list: itemlist })
});

router.get('/:id', (req, res) => {
  for(let i = 0; i < itemlist.length; i++) {
    var elem = itemlist[i]
    if(elem.id == req.params.id) {
      itemlist.splice(i, 1);
      res.render('messages/message', { title: elem.title, msg: elem.msg, id: elem.id })    
    }
  }
});

router.post('/', (req, res) => {
  var title = req.body.title;
  var msg = req.body.message;
  itemlist.push({title: title, msg: msg, id: GlobalId})
  GlobalId++;
  res.render('messages/index', { list: itemlist })

});

module.exports = router
