const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: process.env.DATABASE_DEVELOPMENT_HOST,
      user: process.env.DATABASE_DEVELOPMENT_USER,
      password: process.env.DATABASE_DEVELOPMENT_PASSWORD
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  },

  test: {
    client: "mysql2",
    connection: {
      database: process.env.DATABASE_TESTS_HOST,
      user: process.env.DATABASE_TESTS_USER,
      password: process.env.DATABASE_TESTS_PASSWORD
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  },

  production: {
    client: "mysql2",
    connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: !process.env.DATABASE_PASSWORD ? '' : process.env.DATABASE_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }
}
