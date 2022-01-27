import * as yup from 'yup';

export default () => {
  const schema = {
    create: {
      body: yup.object().shape({
        name: yup.string().required().label('Nome'),
        email: yup.string().required().email().label('E-mail'),
        password: yup.string().required().label('Senha'),
        cpf: yup.string().required().label('CPF'),
        phone: yup.string().required().label('Telefone')
      }).noUnknown()
    }
  }

    const defaultSchema = {
      create: schema.create
    }

    return defaultSchema;
};