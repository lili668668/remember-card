import vine from '@vinejs/vine'

export const validator = vine.compile(
  vine.object({
    content: vine.string(),
  })
)
