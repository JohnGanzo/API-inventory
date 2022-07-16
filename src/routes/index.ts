import { Router } from "express";

import auth from './auth';
import user from './user';
import product from './products';
import inventario from './inventario'

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);
routes.use('/products', product);
routes.use('/invent', inventario);

export default routes;