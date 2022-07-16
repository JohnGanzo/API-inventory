import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";
import { checkRole } from '../middlewares/role'

const router = Router();

// Get all users
router.get('/',  UserController.getAll); //[checkJwt, checkRole(['admin'])],

// Get one user id
router.get('/:id', [checkJwt, checkRole(['admin'])], UserController.getById);

// Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

// Edit user 
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);

// Delete user
router.delete('/:id', [checkJwt, checkRole(['admin'])], UserController.deleteUser);


export default router;