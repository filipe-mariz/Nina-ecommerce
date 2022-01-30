import uuid from 'uuid/v4'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeCreate,
  beforeSave,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rg: string

  @column()
  public cpf: string

  @column()
  public number: string

  @column()
  public instagram: string;

  @column()
  public is_admin: boolean

  @column()
  public company_id: string

  @column()
  public deleted_at: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.hash(user.password)
    }
  }
}
