import Company from "App/Models/Company";

export default class CompaniesController {
    async register({ request }) {
        Company.connection = request.tenantConnection;
        
        try {
            const requiredFields = [ 'name', 'cnpj']
            const data = request.all();
            
            requiredFields.forEach(field => {        
                if (!data[field]) {
                    return 'FIELD_REQUIRED';
                }
            });

            return await Company.create(data);
        } catch (error) {
            return error
        }
    }

    async index({ request, params }) {
        Company.connection = request.tenantConnection;

        try {
            const filter = {
                id: params.company_id,
                deleted_at: false
            }

            params.company_id ? filter : delete filter.id;

            return await Company.query()
                .where(filter)
                .select('id', 'name', 'cnpj', 'email', 'number')
                .orderBy('name', 'asc')
        } catch (error) {
            return error;
        }
    }

    async update({ request, params }) {
        try {
            Company.connection = request.tenantConnection;

            return Company.query()
                .where({
                    id: params.company_id,
                    deleted_at: false,
                })
                .update(request.all())
        } catch (error) {
            return error;
        }
    }

    async destroy({ request, params }) {
        try {
            Company.connection = request.tenantConnection;

            return Company.query()
                .where({
                    id: params.company_id,
                    deleted_at: false,
                })
                .update({ deleted_at: true })
        } catch (error) {
            return error
        }
    }
}
