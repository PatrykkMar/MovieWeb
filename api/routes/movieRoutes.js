'use strict';
module.exports = function(app) {
    var movie = require('../controllers/movieController');

    app.route('/v1/movies')
        .get(movie.list_movies)
        .post(movie.create_new_movie);

    /**
     * @section movies
     * @type get put delete
     * @url /v1/movies/:movieId
     */
    app.route('/v1/movies/:movieId')
        .get(movie.get_movie)
        .put(movie.update_movie)
        .delete(movie.delete_movie)

    app.route('/v1/:movieId')
        .post(movie.add_comment)

    /**
    * get results from a search engine
    *    RequiredRoles: None; Administrator can view "deleted" items
    * 
    * @section items
    * @type get
	* @url /v1/items/search
    * @param {string} movieName
    * @param {string} category
    * @param {string} keyword //in sku, name, or description
    */
    app.route('/v1/movies/search')
        .get(movie.search_movies)
}
