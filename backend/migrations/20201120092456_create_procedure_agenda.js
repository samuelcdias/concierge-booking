
exports.up = function(knex) {
    return knex.raw(`
        CREATE OR REPLACE FUNCTION public.sp_atualizaagenda(
            datainicio date,
            datafim date)
        RETURNS void AS
        $BODY$
            INSERT INTO agendas("dataDia", is_alta_temporada, "quartoId")
                SELECT dataInsert, false, id
                    FROM quartos
                CROSS JOIN generate_series(datainicio, datafim, interval '1 day') AS dataInsert
        $BODY$
        LANGUAGE sql VOLATILE;
        ALTER FUNCTION public.sp_atualizaagenda(date, date)    
    `)
};

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION sp_atualizaagenda;
    `)
};
