exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments('id')
    table.text("text")
})


exports.down = knex => knex.schema.dropTable("tags")