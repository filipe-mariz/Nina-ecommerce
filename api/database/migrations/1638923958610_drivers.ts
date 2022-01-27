import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Drivers extends BaseSchema {
  protected tableName = 'drivers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().index();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('cnh').notNullable().unique();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
