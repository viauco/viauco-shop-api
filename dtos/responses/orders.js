const UserDto = require('./users');
const ProductResponseDto = require('./products');
const AddressDto = require('./address');
const PageMetaDto = require('./page_meta');


function buildPagedList(orders, page, pageSize, totalOrdersCount, basePath, includeUser = false, includeAddress = false, includeProduct = false) {
    return {
        success: true,
        meta: PageMetaDto.build(orders.length, page, pageSize, totalOrdersCount, basePath),
        ...buildDtos(orders, includeUser, includeAddress, includeProduct),
    }
}

function buildDtos(orders, includeUser = false, includeAddress = false, includeProduct = false) {
    return {
        orders: orders.map(order => buildDto(order, includeUser, includeAddress, includeProduct))
    };
}

function buildDto(order, includeUser = false, includeAddress = false, includeOrderItem = false, includeAddressUser = false) {
    const data = {
        id: order.id,
        tracking_number: order.tracking_number,
        order_status: order.order_status_str,
        order_items_count: order.order_items_count
    };

    if (includeOrderItem && order.orderItems) {
        data.sucess = true;
        data.order_items_count = undefined;
        data.order_items = order.orderItems.map(orderItem => {
            return {
                ...ProductResponseDto.buildIdSlugNameAndPrice(orderItem),
                quantity: orderItem.quantity
            };
        });
    }
    if (includeUser) {
        data.user = UserDto.buildOnlyForIdAndUsername(order.user);
    }

    if (includeAddress) {
        data.address = AddressDto.buildDto(order.address, includeAddressUser);
    }

    return data;
}

function buildDetails(order) {
    return {
        success: true,
        ...buildDto(order),
        created_at: order.createdAt,
        updated_at: order.updatedAt
    }
}


module.exports = {
    buildDtos, buildDto, buildDetails, buildPagedList
};
