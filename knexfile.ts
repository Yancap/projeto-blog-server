import path from 'path'

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "database.db")
    },
    pool: {
      afterCreate: (conn: any, cb: any) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") 
    }
  },

  

};
