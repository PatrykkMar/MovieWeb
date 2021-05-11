'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');

  app.route('/v1/users')
  .get(users.list_all_users)
  .post(users.create_an_user);

  app.route('/v1/users/:userId/add_to_favourites/:movieId')
    .post(users.add_favourite_movie);

  app.route('/v1/users/:userId/add_to_must_see/:movieId')
    .post(users.add_must_see_movie);
}
