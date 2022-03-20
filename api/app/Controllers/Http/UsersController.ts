import BasesController from './BasesController';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import UserServices from 'App/Services/UserServices';


export default class UsersController extends BasesController {
  constructor() {
    super();

    this.handleResponse;
    this.handleError;
  };

  async register({ request }) {
    try {
      await request.validate(CreateUserValidator)

      const data = request.except(['passwordConfirmation'])
      const resp = await UserServices.create(data)

      return this.handleResponse(resp)
    } catch (error) {
      return this.handleError;
    }
  };

  async index({ params, request }) {
    try {
      const filter = {
        id: params.user_id,
        deleted_at: false,
        company_id: request.header('company_id')
      };

      params.user_id ? filter : delete filter.id;

      const resp = await UserServices.find(filter);

      return this.handleResponse(resp)
    } catch (error) {
      return this.handleError;
    }
  };

  async update({ request, params }) {
    try {
      const changes = request.all();
      const filter = {
          id: params.company_id,
          deleted_at: false,
          company_id: request.header('company_id')
      }

      const resp = await UserServices.update(filter, changes);

      return this.handleResponse(resp);
    } catch (error) {
      return this.handleError(error);
    }
  };

  async delete({ params, request }) {
    try {
      const filter = {
        id: params.company_id,
        deleted_at: false,
        company_id: request.header('company_id')
      }

      const resp = await UserServices.delete(filter);

      return this.handleResponse(resp)
    } catch (error) {
      return this.handleError(error);
    }
  };
};
