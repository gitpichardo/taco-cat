import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// Get /tacos
router.get('/', tacosCtrl.index)

//Get /tacos/:id
router.get('/:id', tacosCtrl.show)
// if we wanted multiple show routers  for more specific pages > router.get('/:id/ingredients', tacosCtrl.show.showIngredients)

//Post /tacos
router.post('/', isLoggedIn, tacosCtrl.create)

//Patch /tacos/:id/flip-tasty
//who do we want to have access
router.patch('/:id/flip-tasty', isLoggedIn, tacosCtrl.flipTasty)

export {
  router
}