'use strict';
module.exports = function(app) {
  var users = require('../controllers/userController');

  app.route('/v1/users')
  .get(users.list_all_users)
  .post(users.create_an_user);
}
