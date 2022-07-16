import ProductsController from '../controller/ProductController';

import { Router } from 'express';
import { checkJwt } from '../middlewares/jwt';

const router = Router();

// Tabla Codes
//router.get('/', ProductsController.productos)

// New Product
router.post('/', ProductsController.newDescription);

// New Eoq User
router.post('/newEoq', ProductsController.newEOQ);

// Update Saldo
router.patch('/updateSaldo', [checkJwt], ProductsController.newSaldo);

// Inventario de usuario
//router.get('/inventarioUsuario', ProductsController.inventario);

// Detele code
//router.delete('/:codProducto', ProductsController.deleteProduct);

// Found Product
//router.get('/:codProducto', ProductsController.obtenerProduct);

// Edit Product
//router.patch('/:codProducto', ProductsController.editProduct);

export default router;