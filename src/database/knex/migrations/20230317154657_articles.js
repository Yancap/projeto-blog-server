exports.up = knex => knex.schema.createTable("articles", table =>{
    table.increments('id')
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.text('tags_name')
    table.integer("access")
    table.text("author")
    table.text("title")
    table.text("image")
    table.text("subtitle")
    table.text("text")
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("articles")
