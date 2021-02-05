
exports.up = function(knex) {
    return knex.raw(`
        -- users
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON users
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();
        
        --hotels
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON hotels
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON hotels
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        --customers
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON customers
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON customers
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        -- guests
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON guests
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON guests
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        -- reservations
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON reservations
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON reservations
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        -- rooms
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON rooms
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON rooms
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        -- schedule
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON schedule
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON schedule
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();

        -- configs
        CREATE TRIGGER set_updated_timestamp
        BEFORE UPDATE ON configs
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_updated_timestamp();

        CREATE TRIGGER set_created_timestamp
        BEFORE INSERT ON configs
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_created_timestamp();
    `)
}

exports.down = function(knex) {
    return knex.raw(`
        DROP TRIGGER set_updated_timestamp ON users;
        DROP TRIGGER set_created_timestamp ON users;
        DROP TRIGGER set_updated_timestamp ON hotels;
        DROP TRIGGER set_created_timestamp ON hotels;
        DROP TRIGGER set_updated_timestamp ON customers;
        DROP TRIGGER set_created_timestamp ON customers;
        DROP TRIGGER set_updated_timestamp ON guests;
        DROP TRIGGER set_created_timestamp ON guests;
        DROP TRIGGER set_updated_timestamp ON reservations;
        DROP TRIGGER set_created_timestamp ON reservations;
        DROP TRIGGER set_updated_timestamp ON rooms;
        DROP TRIGGER set_created_timestamp ON rooms;
        DROP TRIGGER set_updated_timestamp ON schedule;
        DROP TRIGGER set_created_timestamp ON schedule;
        DROP TRIGGER set_updated_timestamp ON configs;
        DROP TRIGGER set_created_timestamp ON configs;
    `)
}
