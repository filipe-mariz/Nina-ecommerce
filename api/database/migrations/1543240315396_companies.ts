import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database';

export default class Companies extends BaseSchema {
  protected tableName = 'companies'

  public async up () {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, table => {
        table.uuid('id').primary().index();
        table.string('name').notNullable();
        table.string('cnpj').notNullable().unique();
        table.string('email').unique();
        table.string('number');
        table.boolean('is_deleted').notNullable().defaultTo(false);
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
