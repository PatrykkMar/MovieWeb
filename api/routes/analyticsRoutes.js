'use strict';
module.exports = function(app) {
   var analytics = require('../controllers/analyticsController');

    app.route('/v1/analytics/highest_box_office/:count')
        .get(analytics.highest_box_office);

    app.route('/v1/analytics/highest_rated_actors/:count')
        .get(analytics.highest_rated_actors);

}