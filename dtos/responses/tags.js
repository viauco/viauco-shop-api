const PageMetaDto = require('./page_meta');

function buildPagedList(tags, page, pageSize, totalItemCount, basePath) {
    return {
        success: true,
        meta: PageMetaDto.build(tags.length, page, pageSize, totalItemCount, basePath),
        ...buildDtos(tags),
    }
}

function buildDtos(tags) {
    if (!tags)
        return {tags: []};
    return {
        tags: tags.map(tag => buildDto(tag, true))
    }
}

function buildDto(tag, includeUrls = false) {
    const summary = {
        id: tag.id,
        name: tag.name,
    };

    if (includeUrls && tag.images) {
        summary.image_urls = tag.images.map(image => image.file_path);
    }
    return summary;
}

module.exports = {
    buildDtos, buildPagedList, buildDto
};
