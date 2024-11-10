import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const count = await db.from('users').select('id').where('email', value).count('id', 'count')
        return count[0].count === 0
      }),
    password: vine.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,30}$/),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
