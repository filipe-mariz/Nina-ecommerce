import User from 'App/Models/User'

export default class UsersController {
  async register({ request }) {
    User.connection = request.tenantConnection;

    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
        'rg',
        'cpf',
        'number',
      ]
  
      const modelCreationData = request.except(['passwordConfirmation'])
      const data = request.only(requiredFields)

      requiredFields.forEach(field => {        
        if (!data[field]) {
          return 'FIELD_REQUIRED';
        }
      });
  
      if (data.password !== data.passwordConfirmation) {
        return 'INVALID_PASSWORD_CONFIRMATION';
      }
  
      return await User.create(modelCreationData);

    } catch (error) {
      console.log(error);
      
      return error
    }
  }

  async index({ params, request }) {
    User.connection = request.tenantConnection

    try {
      const filter = {
        id: params.user_id,
        deleted_at: false,
        company_id: request.header('company_id')
      };      

      params.user_id ? filter : delete filter.id;

      return await User.query()
        .where(filter)
        .select('id', 'name', 'email', 'rg', 'cpf', 'number')
        .orderBy('name', 'asc')
      
    } catch (error) {
      return error;
    }
  }

  async update({ request, params }) {
    User.connection = request.tenantConnection

    try {
      return await User.query()
        .where({
          id: params.company_id,
          deleted_at: false,
          company_id: request.header('company_id')
        })
        .update(request.all());
    } catch (error) {
      return error
    }
  }

  async updatePassword({ request, response }) {
    User.connection = request.tenantConnection

    const requiredFields = ['password', 'passwordConfirmation', 'email']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    if (data.password !== data.passwordConfirmation) {
      return response.status(400).json({
        InvalidParamError: `INVALID PROPERTY passwordConfirmation ON BODY`,
        Solution:
          'The password and passwordConfirmation did not match, are you sure that they are the same?',
      })
    }

    const user = await User.findByOrFail('email', data.email)

    user.password = data.password

    await user.save()

    return user
  }

  async delete({ params, request }) {
    User.connection = request.tenantConnection
    
    try {      
      return await User.query()
        .where('user_id', params.user_id)
        .whereNull('deleted_at')
        .update({ deleted_at: true })
    } catch (error) {
      return error
    }
  }

}
