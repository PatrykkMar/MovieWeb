'use strict';
module.exports = function(app) {
    var cast = require('../controllers/castController');

    app.route('/v1/cast')
        .get(cast.list_cast)
        .post(cast.create_cast_member);

    app.route('/v1/cast/:castId')
        .get(cast.read_cast_member)
        .put(cast.update_cast_member)
        .delete(cast.delete_cast_member);
}
