import BasesController from "./BasesController";
import CompanyService from "App/Services/CompanyService";

export default class CompaniesController extends BasesController {
    constructor () {
        super()

        this.handleResponse;
        this.handleError;
    };

    async register({ request }) {
        
        try {
            const requiredFields = [ 'name', 'cnpj']
            const data = request.all();
            
            requiredFields.forEach(field => {        
                if (!data[field]) {
                    return 'FIELD_REQUIRED';
                }
            });

            return await CompanyService.create(data);
        } catch (error) {
            return error
        }
    }

    async index({ params }) {
        try {
            const filter = {
                id: params.company_id,
                deleted_at: false
            }

            params.company_id ? filter : delete filter.id;

            const resp = await CompanyService.find(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update({ request, params }) {
        try {
            const changes = request.all();
            const filter = {
                id: params.company_id,
                deleted_at: false,
            };
            
            const resp = await CompanyService.update(filter, changes);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async destroy({ params }) {
        try {
            const filter = {
                id: params.company_id,
                deleted_at: false,
            }
            
            const resp = await CompanyService.delete(filter);

            return this.handleResponse(resp);
        } catch (error) {
            return this.handleError(error);
        }
    }
}
