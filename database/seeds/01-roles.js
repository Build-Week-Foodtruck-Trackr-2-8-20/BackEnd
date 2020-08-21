exports.seed = function(knex, Promise) {
  return knex('roles').insert([
    {
      name: 'Operator',
    },
    {
      name: 'Diner',
    },
  ]);
};
