const db = require("../database/dbConfig.js");

function find() {
    // return db('trucks');
    return db('trucks as t')
    .leftJoin('truckratings as r', 't.id', 'r.truckid')
    .select(['t.*', db.raw('group_concat(r.rating) as dinerRatingsArray')])
    .groupBy('t.id')
}

function findById(id) {
    return db('trucks as t')
    .leftJoin('truckratings as r', 't.id', 'r.truckid')
    .select(['t.*', db.raw('group_concat(r.rating) as dinerRatingsArray')])
    .where({ 't.id': id })
    .groupBy('t.id');
}

function findTruckMenuItems(id) {
    return db('menuitems as m')
    .leftJoin('menuitemratings as r', 'm.id', 'r.menuitemid')
    .leftJoin('menuitemphotos as p', 'm.id', 'p.menuitemid')
    .select(['m.*', db.raw('group_concat(r.rating) as menuItemRatingsArray'), db.raw('group_concat(p.photoURL) as menuItemPhotosArray')])
    .where({ 'm.truckid': id })
    .groupBy('m.truckid');
}

function findTruckRatings(id) {
    return db('truckratings')
        .where({ 'truckid': id });
}

function findTruckRatingsArray(id) {
    return db('truckratings')
        .select([db.raw('group_concat(rating) as ratings')])
        .where({ 'truckid': id });
}

function findTruckIdByRatingId(id) {
    return db('truckratings as r')
    .leftJoin('trucks as t', 't.id', 'r.truckid')
    .select('t.id')
    .where({ 'r.id': id });
}

function add(truckData) {
    return db('trucks').insert(truckData);
}

function addTruckRating(truckRating) {
    return db('truckratings').insert(truckRating);
}

function update(changes, id) {
    return db('trucks').where({ id }).update(changes);
}

function remove(id) {
    return db('trucks').where({ id }).del();
}

function removeTruckRating(id) {
    return db('truckratings').where({ id }).del();
}
module.exports = {
    find,
    findById,
    findTruckMenuItems,
    findTruckRatings,
    findTruckRatingsArray,
    add,
    addTruckRating,
    update,
    remove,
    removeTruckRating,
    findTruckIdByRatingId
};