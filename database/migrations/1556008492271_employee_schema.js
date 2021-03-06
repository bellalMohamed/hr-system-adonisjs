'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EmployeeSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments();
      table.string('name', 80).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('city', 80).notNullable();
      table.integer('department_id').unsigned().references('id').inTable('departments')
      table.timestamps();
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeeSchema
