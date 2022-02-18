const env = require('dotenv')

env.config()
module.exports={
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.LOCAL_HOST,
    "dialect": "postgres",
    "port": 5432
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
