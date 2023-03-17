exports.up = knex => knex.schema.createTable("comments", table =>{
    table.increments('id')
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.integer('article_id').references('id').inTable('articles').onDelete("CASCADE")
    table.text("title")
    table.text("text")
    table.timestamp('created_at').default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("comments")