import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Client from './Client'
import Category from './Category'
import Product from './Product'
export default class Company extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public cnpj: string

  @column()
  public email: string

  @column()
  public number: string

  @column()
  public deleted_at: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User)
  public user: HasMany<typeof User>

  @hasMany(() => Client)
  public clients: HasMany<typeof Client>

  @hasMany(() => Category)
  public Category: HasMany<typeof Category>

  @hasMany(() => Product)
  public Product: HasMany<typeof Product>

  @beforeCreate()
  public static assignUuid(company: Company) {
    company.id = uuid()
  }
}
