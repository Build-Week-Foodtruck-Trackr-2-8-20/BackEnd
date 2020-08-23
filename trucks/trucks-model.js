const db = require("../database/dbConfig.js");

function find() {
    return db('trucks');
}

function findById(id) {
    return db('trucks as t').where({ id });
    // return db('trucks as t')
    // .leftJoin('truckratings as r', 't.id', 'r.truckid')
    // .select('t.*', 'r.rating');
    // .where({ 't.id': id });
}


// SELECT t.*, r.rating
//   FROM trucks AS t
//   left join truckratings as r
//   on t.id = r.truckid;

// function findPosts(id) {
//     return db('posts as p')
//         .join('users as u', 'u.id', 'p.user_id')
//         .select('p.id', 'u.username', 'p.contents')
//         .where({ user_id: id });
// }

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