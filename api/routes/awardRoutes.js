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
        .get(award.get_award)
        .put(award.update_award)
        .delete(award.delete_award);
}