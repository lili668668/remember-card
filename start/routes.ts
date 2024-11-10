/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')

router.post('register', [AuthController, 'register'])
router.post('login', [AuthController, 'login'])
router.post('logout', [AuthController, 'logout'])
