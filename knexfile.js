// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'tuffi.db.elephantsql.com',
      database: 'glzjwivk',
      user: 'glzjwivk',
      password: 'qCPergROz1n-o2yUaMCDAUVPh8jWZQWV'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    models: {
      directory: `${__dirname}/src/database/models`
    }
  }
};
