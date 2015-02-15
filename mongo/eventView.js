module.exports = function(app) {
  app.get('/event/view/:id', function (req, res) {
    var events = app.db.get('events');
    console.log(events);
    var q = { 'id': req.params.id }
    var item = events.findOne(q, function (err, item){
      res.render('eventView.jade', {
        item: item
      });
    });
  });
}