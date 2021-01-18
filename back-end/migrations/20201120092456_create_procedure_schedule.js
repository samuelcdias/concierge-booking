
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION sp_create_schedule(
            first_date date,
            last_date date)
        RETURNS boolean AS
        $$
        BEGIN
            IF (
                (SELECT COUNT(id)
                    FROM rooms) = 0
                ) THEN

                RETURN false;        
            ELSE        
                INSERT INTO schedule(date_day, is_high_season, room_id, status)
                    SELECT date_insert, false, id, 'Disponível'
                        FROM rooms
                    CROSS JOIN generate_series(first_date, last_date, interval '1 day') AS date_insert;
            END IF;        
            
            RETURN true;
        END
        $$
        LANGUAGE plpgsql;
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION sp_create_schedule;
    `)
}
