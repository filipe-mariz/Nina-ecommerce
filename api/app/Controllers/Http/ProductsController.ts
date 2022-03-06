import BasesController from "./BasesController";
import ProductService from 'App/Services/productServices';
import WHITE_LIST from 'App/Services/productServices';

export default class ProductsController extends BasesController {
    constructor() {
        super();

        this.handleResponse;
        this.handleError;
    }

    async resgiter ({ request }) {
        try {
            const data = request.only(WHITE_LIST);

            const resp = await ProductService.create(data)

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async index ({ request, params }) {
        try {
            const filter = {
                id: params.product_id,
                company_id: request.header('company_id'),
                deleted_at: null
            };

            params.product_id ? filter : delete filter.id;

            const resp = await ProductService.find(filter, 10);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update ({ request, params }) {
        try {
            const changes = request.only(WHITE_LIST);
            const filter = {
                id: params.product_id,
                company_id: request.header('company_id'),
                deleted_at: null
            };

            const resp = await ProductService.update(filter, changes);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete ({ request, params }) {
        try {
            const filter = {
                id: params.product_id,
                company_id: request.header('company_id'),
                deleted_at: null
            };

            const resp = await ProductService.delete(filter);

            return this.handleResponse(resp)
        } catch (error) {
            return this.handleError(error);
        }
    }
}
