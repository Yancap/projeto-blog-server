const config = require("../../../knexfile");
import knex from "knex";

const dbConnection = knex(config.development);
export default dbConnection;