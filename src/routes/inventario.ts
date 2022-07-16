import InventController from '../controller/InventController'

import { Router } from 'express'
import { checkJwt } from '../middlewares/jwt'

const router = Router();

//getInventario
router.get('/', [checkJwt], InventController.getInv)

export default router