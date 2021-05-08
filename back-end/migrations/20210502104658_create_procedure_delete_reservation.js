exports.up = function (knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION public.sp_delete_reservation(
        code_reservation varchar(15))
        RETURNS boolean AS
    $BODY$
    DECLARE
        id_reservation integer;
    BEGIN
        id_reservation:= (SELECT id
            FROM reservations
            WHERE codigo = $1);

        DELETE from guests
            WHERE reservation_id = id_reservation;
        
        UPDATE schedule AS s
            SET reservation_id = NULL, status = 'Disponível'
            WHERE reservation_id = id_reservation;

        DELETE FROM reservations
            WHERE id = id_reservation;
        RETURN true;

    END
    $BODY$
    LANGUAGE 'plpgsql';`);
};

exports.down = function (knex) {
  return knex.raw(`
        DROP FUNCTION public.sp_delete_reservation(varchar);
    `);
};
