
exports.up = function(knex) {
    return knex.raw(`
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON reservas
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON reservas
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

    `)
};

exports.down = function(knex) {
    return knex.raw(`
        DROP FUNCTION set_updated_timestamp;
        DROP FUNCTION set_created_timestamp;
    `)
};
