'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');

  app.route('/v1/login')
      .post(users.authenticate_user);

  app.route('/v1/users')
    .get(users.list_all_users)
    .post(users.create_an_user);

  app.route('/v1/users/:userId')
    .get(users.read_an_user)
	  .put(users.update_an_user)
    .delete(users.delete_an_user)

  app.route('/v1/users/:userId/favourite_movies/:movieId')
    .post(users.add_favourite_movie)
    .delete(users.delete_movie_from_favourites);

  app.route('/v1/users/:userId/must_see_movies/:movieId')
    .post(users.add_must_see_movie)
    .delete(users.delete_movie_from_must_see);

  app.route('/v1/users/:followerId/followed_users/:followedId')
    .post(users.follow_user)
    .delete(users.delete_user_from_followed_users)

}
