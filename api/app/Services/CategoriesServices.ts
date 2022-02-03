import HandleServices from "./BaseServices";
import Category from "App/Models/Category";

class CategoriesService extends HandleServices {
    create (data: object) {
        return Category.create(data);
    }

    async find (filter: object) {
        const category = await Category.query()
            .select('id', 'name', 'description')
            .where(filter)
            .orderBy('name', 'asc')

        if (!category) throw this.handleExeption('NO_RESULTS');

        return category;
    }

    async update(filter: object, changes: object) {
        const category = await Category.query()
            .where(filter)
            .update(changes)

        if (!category) throw this.handleExeption('NO_RESULTS');

        return category;
    }

    delete(filter: object) {
        return Category.query()
            .where(filter)
            .delete()
    }
}

export default new CategoriesService();