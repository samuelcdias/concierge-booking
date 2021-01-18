exports.up = function(knex) {
  return knex.raw(`
      CREATE TRIGGER set_created_high_season
      AFTER INSERT ON schedule
      FOR EACH STATEMENT
      EXECUTE PROCEDURE trigger_sp_update_schedule();

      CREATE TRIGGER set_created_high_season
      AFTER INSERT ON high_season
      FOR EACH STATEMENT
      EXECUTE PROCEDURE trigger_sp_update_schedule();
  `)
}

exports.down = function(knex) {
  return knex.raw(`
    DROP TRIGGER set_created_high_season ON schedule;
    DROP TRIGGER set_created_high_season ON high_season;
  `)
}
