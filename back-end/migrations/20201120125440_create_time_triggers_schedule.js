
exports.up = function(knex) {
    return knex.raw(`
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON schedule
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON schedule
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER set_updated_timestamp ON schedule;
        DROP TRIGGER set_created_timestamp ON schedule;
    `)
}
