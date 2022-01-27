import uuid from 'uuid/v4'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public cnh: string

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
