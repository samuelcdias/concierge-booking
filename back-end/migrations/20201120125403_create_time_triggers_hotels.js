
exports.up = function(knex) {
    return knex.raw(`
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON hotels
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON hotels
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER set_updated_timestamp ON hotels;
        DROP TRIGGER set_created_timestamp ON hotels;
    `)
}
