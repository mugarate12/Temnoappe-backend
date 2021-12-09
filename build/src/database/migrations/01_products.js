"use strict";
const { PRODUCTS_TABLE_NAME } = require('./../types');
exports.up = function (knex) {
    return knex.schema.createTable(PRODUCTS_TABLE_NAME, (table) => {
        table.increments('id').notNullable();
        table.string('name').notNullable();
        table.string('photo').notNullable();
        table.string('description').notNullable();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable(PRODUCTS_TABLE_NAME);
};
