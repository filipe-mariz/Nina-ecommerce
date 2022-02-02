import ClientAdress from "App/Models/ClientAdress";
import HandleServices from "./BaseServices";

class ClientAdressesServices extends HandleServices {
    constructor () {
        super();

        this.handleExeption;
    };

    async create (data: object) {
        return ClientAdress.create(data)
    }

    async index (filter: object) {
        const client_adress = await ClientAdress.query()
            .select('id', 'user_id', 'city', 'district', 'street', 'number', 'complement', 'CEP')
            .where(filter)
            .orderBy('created_at', 'asc');

        if (!client_adress) {
            return this.handleExeption('NO_RESULTS')
        }

        return client_adress;
    }

    async update (filter: object, changes: object) {
        const clientAdress = await ClientAdress.query()
            .where(filter)
            .update(changes)

        if(!clientAdress) {
            throw this.handleExeption('NO_RESULTS');
        }

        return clientAdress
    }

    delete (filter: object) {
        return ClientAdress.query()
            .where(filter)
            .update({ is_deleted: true })
    }
}

export default new ClientAdressesServices()