
exports.up = function(knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION trigger_set_created_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.created_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE OR REPLACE FUNCTION trigger_set_updated_timestamp()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `)
};

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION trigger_set_updated_timestamp();
        DROP FUNCTION trigger_set_created_timestamp();
    `)
}
