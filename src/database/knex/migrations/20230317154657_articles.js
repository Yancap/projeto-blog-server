exports.up = knex => knex.schema.createTable("articles", table =>{
    table.increments('id')
    table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
    table.integer('tag_id').references('id').inTable('tags')
    table.text("title")
    table.text("subtitle")
    table.text("text")
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})


exports.down = knex => knex.schema.dropTable("articles")
