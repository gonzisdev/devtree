import { Router } from "express"
import { body } from "express-validator"
import { createAccount } from "./handlers"

const router = Router()

// Autenticación y registro
router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacío'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail()
        .withMessage('El email no es válido'),
    body('password')
        .isLength({min: 8})
        .withMessage('La contraseña debe contener mínimo 8 caracteres'),
    createAccount)

export default router
