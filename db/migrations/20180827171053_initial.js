
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('states', function(table) {
      table.increments('id').primary();
      table.string('state_name');
      table.integer('population');
      table.string('capital');

      table.timestamps(true, true);
      
    }),

    knex.schema.createTable('senators', function(table) {
      table.increments('id').primary();
      table.string('senator_name');
      table.string('party');
      table.integer('state_id').unsigned()
      table.foreign('state_id').references('states.id');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('senators'),
    knex.schema.dropTable('states')
  ]);
};
