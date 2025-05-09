import { Router } from "express";
import { authController } from "../controllers/index.js";
import { validateData  } from "../middlewares/validation.middleware.js"
import {
  userRegisterSchema,
} from "../validation/index.js";


export const authRouter = Router();

authRouter.post('/register', validateData(userRegisterSchema), authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/profile', authController.profile)
authRouter.get('/all', authController.getAll)
authRouter.put('/:id',  authController.update)
authRouter.delete('/:id', authController.delete)


