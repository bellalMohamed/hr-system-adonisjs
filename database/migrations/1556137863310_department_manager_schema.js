'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentManagerSchema extends Schema {
  up () {
    this.create('department_managers', (table) => {
      table.increments()
      table.integer('department_id').unsigned().references('id').inTable('departments')
      table.integer('manager_id').unsigned().references('id').inTable('managers')
    })
  }

  down () {
    this.drop('department_managers')
  }
}

module.exports = DepartmentManagerSchema
