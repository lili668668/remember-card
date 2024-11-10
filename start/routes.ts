/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
const CardController = () => import('#controllers/cards_controller')

router.post('auth/register', [AuthController, 'register'])
router.post('auth/login', [AuthController, 'login'])

router
  .group(() => {
    router.post('auth/logout', [AuthController, 'logout'])

    router.get('cards/random', [CardController, 'random'])
    router.get('cards', [CardController, 'list'])
    router.get('cards/:id', [CardController, 'show'])
    router.post('cards', [CardController, 'create'])
    router.put('cards/:id', [CardController, 'update'])
    router.delete('cards/:id', [CardController, 'delete'])
  })
  .use(middleware.auth())
