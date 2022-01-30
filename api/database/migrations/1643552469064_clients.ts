import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, table => {
        table.uuid('id').index().primary();
        table.string('name').notNullable();
        table.date('born').notNullable();
        table.string('cpf', 11).notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('phone');
        table.string('password').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.string('company_id').notNullable();
        table.timestamps(true)
      })

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
