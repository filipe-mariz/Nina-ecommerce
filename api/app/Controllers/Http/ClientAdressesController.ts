import BasesController from "./BasesController";
import ClientAdressServices from "App/Services/ClientAdressServices";

export default class ClientAdressesController extends BasesController {
    constructor () {
        super();

        this.handleResponse;
        this.handleError;
    }

     async register ({ request }) {
        try {
            const data = request.all();

            const resp = await ClientAdressServices.create(data);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async index ({ request, params }) {
        try {
            const filter = {
                id: params.client_adress_id,
                company_id: request.header('company_id'),
                user_id: request.header('user_id'),
                is_deleted: false
            }

            params.client_adress_id ? filter : delete filter.id;
            request.header('all_adress') ? filter : delete filter.id && filter.user_id //NOTE validar se realiza a requisicao de forma correta

            const resp = await ClientAdressServices.index(filter);

            return this.handleResponse(resp);
        } catch (error) {
            this.handleError(error);
        }
    }

    async update ({ request, params }) {
        try {
            const changes = request.all();
            const filter = {
                id: params.client_adress_id,
                company_id: request.header('company_id'),
                user_id: request.header('user_id')
            };

            const resp = await ClientAdressServices.update(filter, changes);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete ({ request, params }) {
        try {
            const filter = {
                id: params.client_adress_id,
                company_id: request.header('company_id'),
                user_id: request.header('user_id')
            };

            const resp = await ClientAdressServices.delete(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
