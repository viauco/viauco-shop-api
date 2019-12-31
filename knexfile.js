require('dotenv').config();
// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'shop',
            user: 'postgres',
            password: '123456'
        },
        pool: {
            min: process.env.DB_MIN_POOL || 2,
            max: process.env.DB_MAX_POOL || 10
        },
        migrations: {
            tableName: process.env.DB_MIRATIONS_TABLE_NAME || 'migrations'
        }
    },
    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    }

};
