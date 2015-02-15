module.exports = function(app) {
  app.get('/list/repos', function(req, res) {
    // get the repos collection
    var repos = app.db.get('repos');
    console.log(repos);

    // execute the query to find those matched limiting 20.
    repos.find({}, {
      limit: 20
    }, function(err, repos) {
      res.render('repoList.jade', {
        repos: repos
      })
    })
  })
}