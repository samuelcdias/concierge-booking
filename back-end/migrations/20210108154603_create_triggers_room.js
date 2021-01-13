exports.up = function(knex) {
  return knex.raw(`
      CREATE TRIGGER set_created_schedule
      AFTER INSERT ON rooms
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_sp_update_room();
  `)
}

exports.down = function(knex) {
  return knex.raw(`
      DROP TRIGGER set_created_schedule ON rooms;
  `)
}
