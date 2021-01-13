
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION public.sp_update_schedule(
            first_date date,
            last_date date)
        RETURNS void AS
        $BODY$
            INSERT INTO schedule(data_dia, is_alta_temporada, quarto_id)
                SELECT date_insert, false, id
                    FROM rooms
                CROSS JOIN generate_series(first_date, last_date, interval '1 day') AS date_insert
        $BODY$
        LANGUAGE sql VOLATILE;
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION sp_update_schedule;
    `)
}
