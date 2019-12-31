const TagDto = require('./tags');
const CategoryDto = require('./categories');

exports.buildHome = (tags, categories) => {
    return {
        tags: tags.map(tag => TagDto.buildDto(tag, true)),
        categories: categories.map(tag => CategoryDto.buildDto(tag, true)),
    };
};