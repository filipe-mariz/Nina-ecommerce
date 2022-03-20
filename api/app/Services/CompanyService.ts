import Company from "App/Models/Company";
import HandleServices from './BaseServices';
import moment from 'moment';

class CompanyServices extends HandleServices {
    constructor () {
        super()

        this.handleExeption;
    };

    create (data: object) {
        return Company.create(data);
    };

    async find (filter: object) {
        const company = await Company.query()
            .where(filter)
            .select('id', 'name', 'email', 'number')
            .orderBy('name', 'asc')

        if (!company) {
            return this.handleExeption('NO_RESULTS');
        }

        return company
    }

    async update (filter: object, changes: object) {
        const company = await Company.query()
            .where(filter)
            .update(changes)

        if (!company) {
            return this.handleExeption('NO_RESULTS')
        }

        return company
    }

    delete (filter: object) {
        return Company.query()
            .where(filter)
            .update({ is_deleted: true });
    }
};

export default new CompanyServices();