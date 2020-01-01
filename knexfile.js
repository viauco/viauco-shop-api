require('dotenv').config();
// Update with your config settings.

module.exports = {

    development: {
        client: process.env.DATABASE_CONNECTION || 'postgresql',
        connection: {
            host : process.env.DATABASE_HOST || '127.0.0.1',
            port : process.env.DATABASE_PORT || 5432,
            database: process.env.DATABASE_NAME || 'shop',
            user: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || '123456',
            charset: 'utf8'
        },
        pool: {
            min: process.env.DATABASE_POOL_MIN || 2,
            max: process.env.DATABASE_POOL_MAX || 10
        },
        migrations: {
            tableName: process.env.DATABASE_MIGRATIONS_TABLE || 'migrations'
        }
    },
    staging: {
        client: process.env.DATABASE_CONNECTION || 'postgresql',
        connection: {
            host : process.env.DATABASE_HOST || '127.0.0.1',
            port : process.env.DATABASE_PORT || 5432,
            database: process.env.DATABASE_NAME || 'shop',
            user: process.env.DATABASE_USERNAME || 'username',
            password: process.env.DATABASE_PASSWORD || 'password',
            charset: 'utf8'
        },
        pool: {
            min: process.env.DATABASE_POOL_MIN || 2,
            max: process.env.DATABASE_POOL_MAX || 10
        },
        migrations: {
            tableName: process.env.DATABASE_MIGRATIONS_TABLE || 'migrations'
        }
    },

    production: {
        client: process.env.DATABASE_CONNECTION || 'postgresql',
        connection: {
            host : process.env.DATABASE_HOST || '127.0.0.1',
            port : process.env.DATABASE_PORT || 5432,
            database: process.env.DATABASE_NAME || 'shop',
            user: process.env.DATABASE_USERNAME || 'username',
            password: process.env.DATABASE_PASSWORD || 'password',
            charset: 'utf8'
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
