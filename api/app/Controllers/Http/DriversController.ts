import Driver from "App/Models/Driver";

export default class DriversController {
    public async register ({ request, response }) {
        Driver.connection = request.tenantConection;

        const requiredFields = [
            'name',
            'email',
            'password',
            'passwordConfirmation',
            'cnh'
        ];

        const data = request.only(requiredFields);
        for (const field of requiredFields) {
            if (!data[field]) {
                return response.status(401).json({
                    missingParams: `O campo ${data} é obrigatório`,
                    resolution: 'defina o campo'
                })
            }
        }

        if (data.password !== data.passwordConfirmation) {
            return response.status(401).json({
                messageError: 'A senha e a confirmacao da senha nao sao iguais!'
            })
        }

        return await Driver.create(data);
    }

    public async index({ request, params }) {
        Driver.connection = request.tenantConection;

        if (params.id) {
            return await Driver.findOrFail(params.id)
        } else {
            return await Driver.all()
        }
    }

    public async update({ request, params }) {
        Driver.connection = request.tenantConection;

        const changes = request.all();

        const driver = await Driver.findOrFail(params.id);

        await driver.merge(changes).save();
    }

    public async delete ({ request, params, response }) {
        Driver.connection = request.tenantConection;

        await (await Driver.findOrFail(params.id)).delete();

        return response.status(200).json({
            message: 'Usuário deletado com sucesso!'
        })
    }
}
