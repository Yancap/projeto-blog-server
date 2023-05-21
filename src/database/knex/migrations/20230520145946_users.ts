import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", table =>{
        table.increments('id')
        table.text("name")
        table.text("email")
        table.text("password")
        table.text("avatar")
        table.text("hierarchy")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users")
}

