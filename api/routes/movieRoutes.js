'use strict';
module.exports = function(app) {
    var cast = require('../controllers/movieController');

    app.route('/v1/movies')
        .get(cast.list_movies)
        .post(cast.create_new_movie);

    /**
     * @section movies
     * @type get put delete
     * @url /v1/movies/:movieId
     */
    app.route('/v1/movies/:movieId')
        .get(movie.get_movie)
        .put(movie.update_movie)
        .delete(movie.delete_movie)

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
        .get(items.search_movies)
}
