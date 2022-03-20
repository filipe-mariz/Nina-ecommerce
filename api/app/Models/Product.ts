import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public product_code: string;

  @column()
  public name: string;

  @column()
  public price: string;

  @column()
  public image_link: string;

  @column()
  public description: string;

  @column()
  public category_id: string;

  @column()
  public company_id: string;

  @column()
  public is_deleted: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuid()
  }
}
