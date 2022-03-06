import BasesController from "./BasesController";
import CategoriesServices from "App/Services/CategoriesServices";

export default class CategoriesController extends BasesController {
    constructor() {
        super();

        this.handleResponse;
        this.handleError
    }

    async register({ request }) {
        try {
            const data = request.all();

            const resp = await CategoriesServices.create(data);

            return this.handleResponse(resp)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async index ({ request, params }) {
        try {
            const filter = {
                id: params.category_id,
                company_id: request.header('company_id')
            }

            const resp = await CategoriesServices.find(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update ({ request, params }) {
        try {
            const changes = request.all();
            const filter = {
                id: params.category_id,
                company_id: request.header('company_id')
            }

            const resp = await CategoriesServices.update(filter, changes);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete ({ request, params }) {
        try {
            const filter = {
                id: params.category_id,
                company_id: request.header('company_id')
            }

            const resp = await CategoriesServices.delete(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
