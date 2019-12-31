'use strict';

module.exports = db =>
    db.ModelBase.extend({
        tableName: 'uploads',

        tag() {
            return this.belongsTo(db.Tag, 'tag_id');
        },

        scopes: {
            default: function (qb) {
                qb.whereNot('category_id', null);
            }
        }
    });
