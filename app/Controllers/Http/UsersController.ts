import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { name, email, password } = request.original()

    const alreadyHasUser = await User.findBy('email', email)

    if (alreadyHasUser) {
      return response
        .status(400)
        .json({ errors: [{ message: 'Usuário já cadastrado.' }] })
    }

    const user = await User.create({ name, email, password })

    return user
  }
}
