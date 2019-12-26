module.exports = function modelBase (bookshelf, params) {
  if (!bookshelf) {
    throw new Error('Must pass an initialized bookshelf instance')
  }

  var bookshelfModel = bookshelf.Model

  var model = bookshelf.Model.extend({
    constructor: function () {
      bookshelfModel.apply(this, arguments)
    },
  });
  return model
}