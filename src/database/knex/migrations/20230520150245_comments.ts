import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("comments", table =>{
        table.increments('id')
        table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
        table.integer('article_id').references('id').inTable('articles').onDelete("CASCADE")
        
        table.text("name")
        table.text("title")
        table.text("text")
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("comments")
}

