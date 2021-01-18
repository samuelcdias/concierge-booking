
exports.up = function(knex) {
    return knex.raw(`
    CREATE OR REPLACE FUNCTION trigger_sp_delete_room()
    RETURNS trigger AS
    $BODY$
        BEGIN

        RETURN NULL;
        END
      $BODY$
    LANGUAGE plpgsql;

    CREATE TRIGGER set_delete_room
      AFTER INSERT ON rooms
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_sp_delete_room(();
  `)
};

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER set_delete_room ON rooms;
        DROP FUNCTION trigger_sp_delete_room();
    `)
};
