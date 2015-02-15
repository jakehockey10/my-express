module.exports = function(app) {
  app.get('/list/events', function (req, res) {
    // get the events collection
    var events = app.db.get('events');

    // execute the query to find those matched limiting 20.
    events.find({}, {
      limit: 20
    }, function(err, events) {
      res.render('eventList.jade', {
        events: events
      })
    })
  })
}