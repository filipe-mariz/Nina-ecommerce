import Database from '@ioc:Adonis/Lucid/Database';
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, table => {
        table.increments('id').primary().index();
        table.string('code').notNullable();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('company_id')
          .references('companies')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
          .notNullable();
        table.date('is_deleted').notNullable().defaultTo(false)
        table.timestamps(true)
      })

      await transaction.commit();
    } catch {
      await transaction.rollback();
    }
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
