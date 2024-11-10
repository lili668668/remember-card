import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const payload = await registerValidator.validate(request.all())
    await User.create({
      fullName: payload.name,
      email: payload.email,
      password: payload.password,
    })
    return response.noContent()
  }

  async login({ request }: HttpContext) {
    const payload = await loginValidator.validate(request.all())
    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ auth }: HttpContext) {
    const user = await auth.authenticate()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }
}
