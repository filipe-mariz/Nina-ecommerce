import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
	constructor (protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string({}, [ rules.alpha(), rules.maxLength(255), rules.required()]),
		email: schema.string({ trim: true }, [ rules.email(), rules.maxLength(255), rules.required()]),
		password: schema.string({ trim: true }, [rules.alpha(),rules.maxLength(255), rules.required()]),
		passwordConfirmation: schema.string({}, [rules.equalTo('password')]),
		rg: schema.string({ trim: true }, [rules.maxLength(8), rules.required()]),
		cpf: schema.string({ trim: true }, [rules.alpha(), rules.maxLength(11), rules.required()]),
		instagram: schema.string({ trim: true}, [rules.exists({ table: 'users', column: 'instagram' })]),
		company_id: schema.string({ trim: true }, [rules.required()])
	})

	public messages = {}
}
