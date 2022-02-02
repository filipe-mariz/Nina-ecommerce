import Database from '@ioc:Adonis/Lucid/Database';
import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ClientAdresses extends BaseSchema {
  protected tableName = 'client_adresses'

  public async up () {
    const transaction = await Database.transaction();

    try {
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').index().primary();
        table.string('country').notNullable().defaultTo('Brasil');
        table.string('state').notNullable().defaultTo('Pernambuco');
        table.string('city').notNullable().defaultTo('Recife');
        table.string('CEP').notNullable();
        table.string('district').notNullable();
        table.string('street').notNullable();
        table.string('number').notNullable();
        table.string('complement');
        table.string('user_id').notNullable();;
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
