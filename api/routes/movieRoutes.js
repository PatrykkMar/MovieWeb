'use strict';
module.exports = function(app) {
    var cast = require('../controllers/movieController');

    app.route('/v1/movies')
        .get(cast.list_movies)
        .post(cast.create_new_movie);
}
