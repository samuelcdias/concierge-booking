
exports.up = function(knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION trigger_sp_update_schedule()
    RETURNS trigger AS
    $BODY$
        BEGIN
          -- Update year of holidays 
          UPDATE high_season
              SET 
            first_day = first_day + interval '1 year' *(
              EXTRACT(year from current_date) - EXTRACT(year from first_day)
              )
              WHERE is_fixed = true AND last_day IS NULL;
          -- Update year of events
            UPDATE high_season
              SET 
                first_day = first_day + interval '1 year' *(
                  EXTRACT(year from current_date) - EXTRACT(year from first_day)
                  ),
                last_day = last_day + interval '1 year' *(
                  EXTRACT(year from current_date) - EXTRACT(year from last_day)
                  )
              WHERE is_fixed = true AND last_day IS NOT NULL;
          -- Set high season of events
          UPDATE schedule
              SET is_high_season = true
              WHERE date_day > current_date AND
                  date_day IN (
                      SELECT generate_series(
              first_day,
              last_day,
              interval '1 day')
              FROM (SELECT first_day, last_day 
                FROM high_season 
                WHERE is_holiday=false) as period
            );
          -- Set high season of holidays	   
          UPDATE schedule
              SET is_high_season = true
              WHERE date_day > current_date AND
                  date_day IN (
                  SELECT first_day
              FROM high_season
              WHERE is_holiday=true AND
                  EXTRACT(dow from first_day) = 3
                );
                
          UPDATE schedule
              SET is_high_season = true
              WHERE date_day > current_date AND
            date_day IN (
              SELECT generate_series(
                  one,
                  two,
                  interval '1 day')
              FROM (
                  SELECT 
                first_day - interval '1 day' *(EXTRACT(dow from first_day) + 1) AS one,
                first_day AS two 
                FROM high_season 
                WHERE is_holiday = true AND 
                  EXTRACT(dow from first_day) < 3) AS period
                );

          UPDATE schedule
              SET is_high_season = true
              WHERE date_day > current_date AND
            date_day IN (
                  SELECT generate_series(
              one,
              two,
              interval '1 day')
              FROM (
                  SELECT
                      first_day as one, 
                      first_day + interval '1 day' *(7 - EXTRACT(dow from first_day)) AS two 
                FROM high_season 
                WHERE is_holiday=true AND 
                  EXTRACT(dow from first_day) > 3) as period
                );	      
          RETURN NULL;
        END
      $BODY$
    LANGUAGE plpgsql; 
  `)
}

exports.down = function(knex) {
  return knex.raw(`
    DROP FUNCTION trigger_sp_update_schedule();
  `)
}
