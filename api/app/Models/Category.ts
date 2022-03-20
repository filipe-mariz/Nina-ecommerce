import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Category extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public companyId: string;

  @column()
  public is_deleted: boolean;

  @hasMany(() => Product)
  public Product: HasMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
