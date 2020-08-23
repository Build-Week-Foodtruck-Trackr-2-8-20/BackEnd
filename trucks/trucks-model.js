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
    .where({ 't.id': id });
}

function findTruckRatings(id) {
    return db('truckratings')
        .where({ truckid: id });
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
    findTruckRatings,
    add,
    addTruckRating,
    update,
    remove,
    removeTruckRating
};