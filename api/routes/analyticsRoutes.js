'use strict';
module.exports = function(app) {
   var analytics = require('../controllers/analyticsController');

    app.route('/v1/analytics/highest_box_office/:count')
        .get(analytics.highest_box_office);

}