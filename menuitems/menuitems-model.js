const db = require("../database/dbConfig.js");

function find() {
    return db('menuitems as m')
    .leftJoin('menuitemratings as r', 'm.id', 'r.menuitemid')
    .leftJoin('menuitemphotos as p', 'm.id', 'p.menuitemid')
    .select(['m.*', db.raw('group_concat(r.rating) as menuItemRatingsArray'), db.raw('group_concat(p.photoURL) as menuItemPhotosArray')])
    .groupBy('m.id')
}

function findById(id) {
    return db('menuitems as m')
    .leftJoin('menuitemratings as r', 'm.id', 'r.menuitemid')
    .leftJoin('menuitemphotos as p', 'm.id', 'p.menuitemid')
    .select(['m.*', db.raw('group_concat(r.rating) as menuItemRatingsArray'), db.raw('group_concat(p.photoURL) as menuItemPhotosArray')])
    .where({ 'm.id': id })
    .groupBy('m.id');
}

function findMenuItemRatings(id) {
    return db('menuitemratings')
        .where({ 'menuitemid': id });
}

function findMenuItemRatingsArray(id) {
    return db('menuitemratings')
        .select([db.raw('group_concat(rating) as ratings')])
        .where({ 'menuitemid': id });
}

function findMenuItemPhotos(id) {
    return db('menuitemphotos')
        .where({ 'menuitemid': id });
}

function findMenuItemPhotosArray(id) {
    return db('menuitemphotos')
        .select([db.raw('group_concat(photoURL) as photoURLs')])
        .where({ 'menuitemid': id });
}

function findMenuItemID(id) {
    return db('menuitemratings')
        .select('menuitemid')
        .where({ id });
}

function add(menuItemsData) {
    return db('menuitems').insert(menuItemsData);
}

function addMenuItemRating(menuItemRating) {
    return db('menuitemratings').insert(menuItemRating);
}

function addMenuItemPhoto(menuItemPhoto) {
    return db('menuitemphotos').insert(menuItemPhoto);
}

function update(changes, id) {
    return db('menuitems').where({ id }).update(changes);
}

function remove(id) {
    return db('menuitems').where({ id }).del();
}

function removeMenuItemRating(id) {
    return db('menuitemratings').where({ id }).del();
}

function removeMenuItemPhoto(id) {
    return db('menuitemphotos').where({ id }).del();
}
module.exports = {
    find,
    findById,
    findMenuItemRatings,
    findMenuItemRatingsArray,
    findMenuItemPhotos,
    findMenuItemPhotosArray,
    findMenuItemID,
    add,
    addMenuItemRating,
    addMenuItemPhoto,
    update,
    remove,
    removeMenuItemRating,
    removeMenuItemPhoto
};