const db = {};
const mode = process.env.MODE || 'development';
db.knex = require('knex')(require('../knexfile')[mode]);

db.bookshelf = require('bookshelf')(db.knex);

db.bookshelf.plugin('pagination');
db.bookshelf.plugin(require('bookshelf-scopes'));

//db.bookshelf.plugin('bookshelf-virtuals-plugin');
db.bookshelf.plugin('virtuals');
db.bookshelf.plugin(require('../plugins/eloquent'));
db.ModelBase = db.bookshelf.Model;
//require('bookshelf-modelbase')(db.bookshelf);

db.User = require('../models/user')(db);
db.Role = require('../models/role')(db);
db.UserRole = require('../models/userRole')(db);

db.Product = require('../models/product')(db);

db.Tag = require('../models/tag')(db);
db.ProductTag = require('../models/productTag')(db);

db.Category = require('../models/category')(db);
db.ProductCategory = require('../models/productCategory')(db);
db.Comment = require('../models/comment')(db);

db.Order = require('../models/order')(db);
db.OrderItem = require('../models/orderDetail')(db);

db.Address = require('../models/address')(db);

db.FileUpload = require('../models/upload')(db);
db.ProductImage = require('../models/productImage')(db);
db.CategoryImage = require('../models/categoryImage')(db);
db.TagImage = require('../models/tagImage')(db);

module.exports = db;


