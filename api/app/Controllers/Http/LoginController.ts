// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ApiToken from 'App/Models/ApiToken'
import User from 'App/Models/User'
import argon2 from 'phc-argon2'

export default class LoginController {
  public async user({ request, response }) {
    const requiredFields = ['Authorization']

    const data = request.only(requiredFields)

    for (const field of requiredFields) {
      if (!data[field]) {
        return response.status(400).json({
          MissingParamError: `MISSING PROPERTY ${field} ON BODY`,
          Solution: 'Adding this field to the body may solve the problem',
        })
      }
    }

    User.connection = request.tenantConnection
    ApiToken.connection = request.tenantConnection

    const { Authorization } = data

    const decodedData = Buffer.from(Authorization, 'base64')

    const { user, pass } = JSON.parse(decodedData.toString())

    const userModel = await User.findBy('systemWalletNumber', user)

    if (userModel) {
      const isPasswordValid = await argon2.verify(userModel.password, pass)

      if (!isPasswordValid) {
        return response.status(400).json({
          InvalidParamError: `INVALID PROPERTY password ON BODY`,
          Solution:
            'You provided a wrong password, be sure to check if you are using the correct one',
        })
      }

      const token = await argon2.hash(`${user}-${pass}`)

      const creationBody = { token, reference_id: userModel.id }

      const apiToken = await ApiToken.create(creationBody)

      return apiToken
    }

    return response.status(404).json({
      Error: `INVALID CREDENTIALS ON BODY, USER NOT FOUND`,
      Solution:
        'You provided a wrong user-password combination, be sure to check if you are using the correct one',
    })
  }
}
