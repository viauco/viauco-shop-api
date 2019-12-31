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
        client: process.env.DATABASE_CONNECTION || 'postgresql',
        connection: {
            database: process.env.DATABASE_NAME || 'shop',
            user: process.env.DATABASE_USERNAME || 'username',
            password: process.env.DATABASE_PASSWORD || 'password'
        },
        pool: {
            min: process.env.DATABASE_POOL_MIN || 2,
            max: process.env.DATABASE_POOL_MAX || 10
        },
        migrations: {
            tableName: process.env.DATABASE_MIGRATIONS_TABLE || 'migrations'
        }
    }
};
