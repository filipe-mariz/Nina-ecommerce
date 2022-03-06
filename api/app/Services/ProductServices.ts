import HandleServices from "./BaseServices";
import Product from "App/Models/Product";
import moment from "moment";

export const WHITE_LIST = ['product_code', 'name', 'price', 'image_link', 'description', 'category_id', 'company_id'];

class ProductService extends HandleServices {
    create (data: object) {
        return Product.create(data);
    }

    async find (filter: object, page: number) {
        const products = await Product.query()
            .select('id', 'name', 'price', 'image_link', 'description')
            .where(filter)
            .orderBy('name', 'asc')
            .paginate(page, 10);

        if (!products) throw this.handleExeption('NO_RESULTS');

        return products;
    }

    async update (filter: object, changes: object) {
        const products = await Product.query()
            .update(changes)
            .where(filter);

        if (!products) throw this.handleExeption('NO_RESULTS');

        return products;
    }

    delete (filter: object) {
        return Product.query()
            .update({ deleted_at: moment() })
            .where(filter);
    }
}

export default new ProductService();
