
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION sp_first_use()
        RETURNS boolean AS
        $BODY$
            DECLARE
                    count_users integer;
                    count_schedule integer;
                    count_rooms integer;
            BEGIN
                -- check if there is anything created
                count_users := (SELECT COUNT(id)
                                    FROM users);
                count_schedule := (SELECT COUNT(id)
                                    FROM schedule);
                count_rooms := (SELECT COUNT(id)
                                    FROM rooms);
                IF ( count_users = 0 AND count_schedule = 0 AND count_rooms = 0) THEN
                    INSERT INTO rooms(room_number, description, number_of_beds, type_of_room)
                        VALUES('10', 'Quarto de exemplo, uso não recomendado', 0, 'Amostra');
                    INSERT INTO users(name, username, password, email, admin)
                        VALUES('Admin User', 'admin', '123456', 'email@email.com', true);
                    
                    PERFORM sp_create_schedule( current_date, (current_date + interval '1 month' * 18)::date );
                    
                    UPDATE schedule
                        SET
                            status = 'Indisponível'
                        WHERE room_id = (
                            SELECT id
                                FROM rooms
                                WHERE room_number = '10');
                                
                    RETURN true;     
                ELSE
                    RETURN false;
                END IF;                                        
            END
        $BODY$
        LANGUAGE plpgsql;

        CREATE OR REPLACE FUNCTION trigger_drop_first_use()
        RETURNS trigger AS
        $BODY$
            BEGIN
                DROP FUNCTION IF EXISTS sp_first_use();
                RETURN NULL;
            END
        $BODY$
        LANGUAGE plpgsql;

        CREATE TRIGGER drop_first_use_function_after_used
        AFTER INSERT ON users
        FOR EACH STATEMENT
        EXECUTE PROCEDURE trigger_drop_first_use();
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER drop_first_use_function_after_used ON users;
        DROP FUNCTION trigger_drop_first_use();
        DROP FUNCTION IF EXISTS sp_first_use();
    `)
}
