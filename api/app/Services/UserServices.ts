import User from "App/Models/User";

class UserServices {
    create (data: object) {
        return User.create(data);
    }

    find (filter: object) {
        return User.query()
            .where(filter)
            .select('id', 'name', 'email', 'rg', 'cpf', 'number')
            .orderBy('name', 'asc');
    }

    update(filter: object, changes: object) {
        return User.query()
            .where(filter)
            .update(changes)
    }

    delete(filter: object) {
        return User.query()
            .where(filter)
            .update({ deleted_at: true })
    }
};

export default new UserServices()
