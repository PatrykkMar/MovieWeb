'use strict';
module.exports = function(app) {
   var analytics = require('../controllers/analyticsController');

    app.route('/v1/analytics/highest_box_office/:count')
        .get(analytics.highest_box_office);

    app.route('/v1/analytics/highest_rated_actors/:count')
        .get(analytics.highest_rated_actors);

    app.route('/v1/analytics/highest_rated_movies_by_category/:category/:type/:count')
        .get(analytics.highest_rated_movies_by_category);

    app.route('/v1/analytics/highest_rated_movies_by_gender/:gender/:type')
        .get(analytics.highest_rated_movies_by_gender);

	app.route('/v1/analytics/highest_rating_low_boxoffice')
        .get(analytics.highest_rating_low_boxoffice);

    app.route('/v1/analytics/lowest_rating_high_boxoffice')
        .get(analytics.lowest_rating_high_boxoffice);
}