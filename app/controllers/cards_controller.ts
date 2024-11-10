import type { HttpContext } from '@adonisjs/core/http'
import { validator } from '#validators/card'
import Card from '#models/card'

export default class CardsController {
  async list() {
    return await Card.all()
  }

  async show({ request }: HttpContext) {
    return await Card.findOrFail(request.params().id)
  }

  async create({ request }: HttpContext) {
    const payload = await validator.validate(request.all())
    await Card.create(payload)
  }

  async update({ request }: HttpContext) {
    const card = await Card.findOrFail(request.params().id)
    const payload = await validator.validate(request.all())
    card.content = payload.content
    await card.save()
  }

  async delete({ request }: HttpContext) {
    const card = await Card.findOrFail(request.params().id)
    await card.delete()
  }

  async random() {
    return await Card.query().orderByRaw('RAND()').limit(1).first()
  }
}
