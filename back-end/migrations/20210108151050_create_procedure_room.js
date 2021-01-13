
exports.up = function(knex) {
  return knex.raw(`
      CREATE OR REPLACE FUNCTION trigger_sp_update_room()
      RETURNS TRIGGER AS $$
      DECLARE
        first_date date;
        last_date date;
      BEGIN
        first_date := current_date + integer '1';
        last_date  := (SELECT MAX(data_dia)
                        FROM schedule);

        INSERT INTO schedule(data_dia, is_alta_temporada, quarto_id)
          SELECT date_insert, false, NEW.id
              FROM generate_series(first_date, last_date, interval '1 day') AS date_insert;
              
        RETURN NULL;
      END
      $$ LANGUAGE plpgsql;
  `)
}

exports.down = function(knex) {
  return knex.raw(`
      DROP FUNCTION trigger_sp_update_room();
  `)
}
