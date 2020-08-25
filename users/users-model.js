const db = require("../database/dbConfig.js");
const OPERATOR = 1;
const DINER = 2;

module.exports = {
  add,
  find,
  findBy,
  findById,
  findDiners,
  findDinersById,
  findOperators,
  findOperatorsById,
  addFavoriteTruck,
  removeFavoriteTruck
};

function find() {
  return db("users").select("id", "username", "email", "role").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").select("id", "username", "email", "role").where({ id }).first();
}

function findDiners() {
  return db('users as u')
  .leftJoin('dinerfavouritetrucks as f', 'u.id', 'f.userid')
  .select(['u.*', db.raw('group_concat(f.truckid) as favoritetrucks')])
  .where({ 'u.role': DINER })
  .groupBy('u.id');
}

function findDinersById(id) {
  return db('users as u')
  .leftJoin('dinerfavouritetrucks as f', 'u.id', 'f.userid')
  .select(['u.*', db.raw('group_concat(f.truckid) as favoritetrucks')])
  .where({ 'u.id': id })
  .groupBy('u.id');
}

function findOperators() {
  return db('users as u')
  .leftJoin('trucks as t', 'u.username', 't.username')
  .select(['u.*', db.raw('group_concat(t.id) as trucksowned')])
  .where({ 'u.role': OPERATOR })
  .groupBy('u.id');
}

function findOperatorsById(id) {
  return db('users as u')
  .leftJoin('trucks as t', 'u.username', 't.username')
  .select(['u.*', db.raw('group_concat(t.truckid) as trucksoperated')])
  .where({ 'u.id': id })
  .groupBy('u.id');
}

function addFavoriteTruck(favoriteTruckData) {
  return db('dinerfavouritetrucks').insert(favoriteTruckData);
}

function removeFavoriteTruck(favoriteTruckData) {
  return db('dinerfavouritetrucks')
  .where({'userid':favoriteTruckData.userid, 'truckid':favoriteTruckData.truckid} )
  .del();
}

