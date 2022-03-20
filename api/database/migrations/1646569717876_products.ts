import Database from '@ioc:Adonis/Lucid/Database';
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, table => {
        table.uuid('id').index().primary();
        table.string('product_code', 5).notNullable();
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('image_link').notNullable();
        table.string('description')
        table.date('is_deleted').defaultTo(false);
        table.string('company_id').notNullable();
        table.string('category_id')
          .references('categories')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
          .notNullable();
        table.timestamps(true)
      })

      await transaction.commit();
    } catch {
      await transaction.rollback();
    }
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
