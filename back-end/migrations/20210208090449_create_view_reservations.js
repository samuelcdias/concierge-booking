
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE VIEW vReservations AS
            SELECT DISTINCT
                re.codigo,
                re.dt_entrada_reserva,
                re.dt_saida_reserva,
                re.hora_entrada,
                re.hora_saida,
                re.tarifa,
                re.obs,
                re.no_show,
                ro.room_number,
                ro.description,
                ro.number_of_beds,
                ro.image_url,
                ro.number_of_extra_beds,
                c.nome,
                c.dt_nascimento
                FROM
                    reservations AS re
                    INNER JOIN  schedule AS s
                        ON s.reservation_id = re.id
                    INNER JOIN rooms AS ro
                        ON ro.id = s.room_id
                    INNER JOIN guests AS g
                        ON g.reservation_id = re.id
                    INNER JOIN customers AS c
                        ON c.id = g.customer_id;
    `
    )
}

exports.down = function(knex) {
    return knex.raw(`
        DROP VIEW vReservations;
    `)
}
