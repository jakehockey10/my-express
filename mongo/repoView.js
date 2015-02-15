module.exports = function(app) {
  app.get('/repo/view/:id', function (req, res) {
    var repos = app.db.get('repos');
    var q = { 'id': parseInt(req.params.id) }
    var repo = repos.findOne(q, function (err, repo){
      res.render('repoView.jade', {
        repo: repo
      });
    });
  });
}