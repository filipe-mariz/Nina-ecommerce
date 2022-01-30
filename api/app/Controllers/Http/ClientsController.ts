import BasesController from "./BasesController";
import ClientServices from "App/Services/ClientServices";

export default class ClientsController extends BasesController {
    constructor () {
        super();

        this.handleResponse;
        this.handleError;
    }

    async register ({ request }) { 
        try {
            const data = request.except([ 'passwordConfirmation '])

            const resp = await ClientServices.create(data);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async index ({ request, params }) {
        try {
            const page = request.header('page_number')
            const filter = {
                id: params.client_id,
                is_deleted: false,
                company_id: request.header('company_id')
            };

            params.client_id ? filter : delete filter.id;

            const resp = await ClientServices.find(filter, page);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update ({ request, params }) {
        try {
            const changes = request.all();
            const filter = {
                id: params.client_id,
                is_deleted: false,
                company_id: request.header('company_id')
            }

            const resp = await ClientServices.update(filter, changes);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }
    
    async delete({ request, params }) {
        try {
            const filter = {
                id: params.client_id,
                is_deleted: false,
                company_id: request.header('company_id')
            }

            const resp = await ClientServices.delete(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        };
    };
};
