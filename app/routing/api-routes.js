var fs = require('fs');

module.exports = {
  get: function(app) {

    var self = this;

    app.get('/api/friends', function(req, res) {
        res.json(self.getList());
    });
  },
post: function(app) {

  var self = this;

  app.post('/api/friends', function(req, res) {

    var person = req.body;
    var list = self.getList();
    var closest = {
      index: 0,
      score: 50
    };

    for(var i=0; i < list.length; i++) {

      var tally = 0;

      for(var j=0; j < list[i].scores.length; j++) {

        if(parseInt(person.scores[j]) !== 0) {
          tally += Math.abs(parseInt(list[i].scores[j]) - parseInt(person.scores[j]));
        }

      }

      if(tally < closest.score) {
        closest.index = i;
        closest.score = tally;
      }
    }

    console.log(list[closest.index], closest.index);

    res.json(list[closest.index]);

    list.push(person);

    fs.writeFile('./app/data/friends.json', JSON.stringify(list, null, 2), function(err) {
      if (err) throw err;
      console.log('Updated JSON file!');
    });

  });
},
  getList: function() {
    return JSON.parse(fs.readFileSync('./app/data/friends.json', 'utf8'));
  }
};
