
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION sp_filter_room(
            day_in date,
            day_out date)
        RETURNS TABLE (type_of_room varchar(255),
            description  varchar(255),
            image_url  varchar(255)) AS
        $$
        BEGIN
            RETURN QUERY
            SELECT DISTINCT r.type_of_room, r.description, r.image_url
                FROM rooms AS r
                WHERE id IN ((SELECT room_id
                    FROM schedule AS s
                    WHERE s.date_day BETWEEN $1 AND $2
                        AND reservation_id IS NULL
                        AND status = 'Disponível'))
                    AND
                    id NOT IN ((SELECT room_id
                        FROM schedule AS s
                        WHERE s.date_day BETWEEN $1 AND $2
                            AND reservation_id IS NOT NULL))
                ORDER BY type_of_room;
        END
        $$
        LANGUAGE plpgsql;
    `)
  
}

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION sp_filter_room(date, date);
    `)
}
