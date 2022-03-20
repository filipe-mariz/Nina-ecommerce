import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database';

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, table => {
        table.uuid('id').primary().index();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('rg').notNullable().unique();
        table.string('cpf').notNullable().unique();
        table.string('number').notNullable().unique();
        table.string('instagram').unique();
        table.boolean('is_admin').defaultTo(false);
        table.boolean('is_deleted').notNullable().defaultTo(false);
        table.string('company_id')
          .references('companies')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
        table.timestamps(true)
      })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
