'use strict';
module.exports = function(app) {
    var award = require('../controllers/awardController');

    app.route('/v1/award')
        .get(award.list_awards)
        .post(award.create_new_award);

    /**
     * @section movies
     * @type get put delete
     * @url /v1/movies/:movieId
     */
    app.route('/v1/award/:awarddId')
        .get(award.get_movie)
        //.put(award.update_movie)
        .delete(award.delete_movie);
}