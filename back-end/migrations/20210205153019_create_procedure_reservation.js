
exports.up = function(knex) {
    return knex.raw(`
        CREATE TYPE reservation_type AS
        (
            codigo character varying(255),
            dt_entrada_reserva date,
            dt_saida_reserva date,
            forma_pagamento character varying(255),
            tarifa real,
            no_show boolean,
            obs character varying(255),
            motivo_viagem motivos_viagem,
            meio_transporte meios_transporte
        );
        CREATE TYPE customer_type AS
        (
            nome character varying(255),
            cpf character varying(255),
            dt_nascimento character varying(255)
        );

        CREATE OR REPLACE FUNCTION public.sp_make_reservation(
            reservation json,
            room_type text,
            client_list json)
            RETURNS boolean AS
        $BODY$
        DECLARE
            id_reservation integer;
            date_in date;
            date_out date;
			id_room int;
        BEGIN
        -- Return false for invalid code
            IF ((SELECT codigo
                    FROM json_populate_record(null::reservation_type, $1::json))
                IN (SELECT codigo FROM reservations)) THEN
                RETURN false;
            END IF;

        -- Save reservation
        INSERT INTO reservations(
				codigo,
				dt_entrada_reserva,
				dt_saida_reserva,
				forma_pagamento,
				tarifa,
				no_show,
				obs,
				motivo_viagem,
				meio_transporte)
			SELECT
				codigo,
				dt_entrada_reserva,
				dt_saida_reserva,
				forma_pagamento,
				tarifa,
				no_show,
				obs,
				motivo_viagem,
				meio_transporte
			FROM
				json_populate_record(null::reservation_type, $1::json);
            
        id_reservation := (SELECT currval(pg_get_serial_sequence('reservations','id')));
        date_in := (SELECT dt_entrada_reserva 
                    FROM json_populate_record(null::reservation_type, $1::json));
        date_out := (SELECT dt_saida_reserva 
                    FROM json_populate_record(null::reservation_type, $1::json));
		id_room :=  (SELECT r.id
                            FROM rooms AS r
                            WHERE id IN (
                                (SELECT room_id
                                    FROM schedule AS s
                                    WHERE s.date_day BETWEEN date_in  AND date_out
                                        AND reservation_id IS NULL
                                        AND status = 'Disponível')
                                )
                            AND
                                id NOT IN (
                                    (SELECT room_id
                                        FROM schedule AS s
                                        WHERE s.date_day BETWEEN date_in  AND date_out
                                            AND reservation_id IS NOT NULL)
                                    )
                            AND type_of_room = $2
                            LIMIT 1);
        -- Return false for not valid room
            IF (id_room IS null) THEN
				DELETE FROM reservations where id = id_reservation;
                RETURN false;
            END IF;            
        -- Update schedule with reservation data and select an available room
        UPDATE schedule AS s
            SET reservation_id = id_reservation, status = 'OCUPADO'
            WHERE id IN (
                SELECT s.id
                    FROM schedule AS s
                    WHERE room_id = id_room)
            AND s.date_day BETWEEN date_in AND date_out;
            
            -- Insert new customers
            INSERT INTO customers(nome, cpf, dt_nascimento)
                SELECT nome, cpf, dt_nascimento
                    FROM json_populate_recordset(null::customer_type, $3::json)
                    WHERE cpf NOT IN (SELECT cpf FROM customers);

            -- Vinculate customers with reservation
            INSERT INTO guests(customer_id, reservation_id)
                SELECT id, id_reservation
                        FROM customers
                        WHERE cpf IN (
                            SELECT cpf
                                FROM json_populate_recordset(null::customer_type, $3::json)
                        );
            RETURN TRUE;	
        END
        $BODY$
        LANGUAGE 'plpgsql';`
    )
  
}

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION sp_make_reservation(json, text, json);
        DROP TYPE reservation_type;
        DROP TYPE customer_type;
    `)
}
