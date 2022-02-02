import Client from "App/Models/Client";
import HandleServices from "./BaseServices";

class ClientServices extends HandleServices {
    constructor() {
        super();

        this.handleExeption;
    }

    create (data: object) {
        return Client.create(data);
    }

    async find (filter: object, page: number) {
        const client = await Client.query()
            .select('name', 'born', 'email', 'phone', 'cpf')
            .where(filter)
            .orderBy('name', 'asc')
            .paginate(page, 10)

        if (!client) {
            return this.handleExeption('NO_RESULTS')
        }

        return client
    }

    async update (filter: object, changes: object) {
        const client = await Client.query()
            .where(filter)
            .update(changes)

        if (!client) {
            return this.handleExeption('NO_RESULTS')
        }

        return client;
    }

    delete (filter: object) {
        return Client.query()
            .where(filter)
            .update({ is_deleted: true });
    }
}

export default new ClientServices();