
exports.up = function(knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION sp_filter_room(
            day_in date,
            day_out date)
            BEGIN
                IF (
                    (SELECT reserva_id
                      FROM schedule
                      WHERE room_id = OLD.id AND
                        reserva_id IS NOT NULL) IS NULL
                ) THEN
                  DELETE rooms WHERE room_id = OLD.id
                ELSE IF (
                  (SELECT id
                    FROM schedule
                    WHERE date_day IN  AND
                    reserva_id IS NULL) 
      
          RETURN NULL;
          END
        $BODY$
      LANGUAGE plpgsql;

      CREATE TRIGGER set_delete_room
        INSTEAD OF DELETE ON rooms
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_sp_delete_room();
    `)
};

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER set_delete_room ON rooms;
        DROP FUNCTION trigger_sp_delete_room();
    `)
};
