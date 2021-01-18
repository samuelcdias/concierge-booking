
exports.up = function (knex, Promise) {
  return knex.schema.createTable('high_season', table => {
    table.increments('id').primary()
    table.date('first_day').notNull()
    table.date('last_day')
    table.boolean('is_holiday').notNull()
    table.boolean('is_fixed').notNull().default(false)
    table.timestamps()
    knex.raw(`
      CREATE TRIGGER set_updated_timestamp
      BEFORE UPDATE ON high_season
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_updated_timestamp();

      CREATE TRIGGER set_created_timestamp
      BEFORE INSERT ON high_season
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_created_timestamp();
    `)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw(`
      DROP TRIGGER set_updated_timestamp ON high_season;
      DROP TRIGGER set_created_timestamp ON high_season;
    `)
    .dropTable('high_season')
}
