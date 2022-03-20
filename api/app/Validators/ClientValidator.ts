import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ClientValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
	  name: schema.string({}, [ rules.alpha(), rules.maxLength(255), rules.required()]),
	  born: schema.date({}, [rules.required()]),
	  cpf: schema.string({ trim: true }, [rules.alpha(), rules.maxLength(11), rules.required()]),
	  phone: schema.string({}, [ rules.alpha(), rules.maxLength(15), rules.required()]),
	  password: schema.string({}, [ rules.required()]),
	  company_id: schema.string({}, [ rules.required()]),
  })


  public messages = {}
}
