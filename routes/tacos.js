import { Router } from 'express'
import * as tacosCtrl from '../controllers/tacos.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// Get /tacos
router.get('/', tacosCtrl.index)

//Get /tacos/:id
router.get('/:id', tacosCtrl.show)

//Post /tacos
router.post('/', isLoggedIn, tacosCtrl.create)


export {
  router
}