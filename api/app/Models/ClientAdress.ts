import uuid from 'uuid/v4'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientAdress extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string;

  @column()
  public country: string;

  @column()
  public state: string;

  @column()
  public city: string;

  @column()
  public CEP: string;

  @column()
  public district: string;

  @column()
  public street: string;

  @column()
  public number: string;

  @column()
  public complement: string;

  @column()
  public user_id: string;

  @column()
  public is_deleted: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(clientAdress: ClientAdress) {
    clientAdress.id = uuid()
  }
}
