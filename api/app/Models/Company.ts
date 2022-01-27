import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

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
  public posts: HasMany<typeof User>

  @beforeCreate()
  public static assignUuid(company: Company) {
    company.id = uuid()
  }
}
