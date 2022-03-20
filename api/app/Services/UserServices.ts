import User from "App/Models/User";
import HandleServices from './BaseServices';


class UserServices extends HandleServices {
    constructor () {
        super()

        this.handleExeption;
    }

    create (data: object) {
        return User.create(data);
    }

    async find (filter: object) {
        const user = await User.query()
            .where(filter)
            .select('id', 'name', 'email', 'rg', 'cpf', 'number')
            .orderBy('name', 'asc');

        if (!user) {
            return this.handleExeption('NO_RESULTS')
        }

        return user
    }

    async update(filter: object, changes: object) {
        const user = await User.query()
            .where(filter)
            .update(changes)

            if (!user) {
                return this.handleExeption('NO_RESULTS')
            }

        return user
    }

    delete(filter: object) {
        return User.query()
            .where(filter)
            .update({ is_deleted: true })
    }
};

export default new UserServices();
