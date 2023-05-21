import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("articles", table =>{
        table.increments('id')
        table.integer('user_id').references('id').inTable('users').onDelete("CASCADE")
        table.text("author")
        table.text("title")
        table.text("image")
        table.text("subtitle")
        table.text("text")
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("articles")
}

