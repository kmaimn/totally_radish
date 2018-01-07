var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = '';

//If we are running on Heroku, use the remote database (with SSL)
if (process.env.DATABASE_URL != undefined) {
  connectionString = process.env.DATABASE_URL + '?ssl=true';
} else {
  // running locally, use our local database instead
  connectionString = 'postgres://localhost:5432/TotallyRadish';
}

//GET current ingredients;
router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT...', function (err, result) {
      done();

      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

module.exports = router;