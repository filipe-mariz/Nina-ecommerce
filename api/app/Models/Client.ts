import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Client extends BaseModel {
  public static connection = 'pg'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public born: Date;

  @column()
  public cpf: string

  @column()
  public email: string;

  @column()
  public phone: string;

  @column()
  public password: string;

  @column()
  public is_deleted: boolean;

  @column()
  public company_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
