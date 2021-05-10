'use strict';
module.exports = function(app) {
    var cast = require('../controllers/castController');

    app.route('/v1/cast')
        .get(cast.list_cast)
        .post(cast.create_cast_member);
}
