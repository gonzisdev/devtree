import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, login } from './handlers'
import { handleInputErrors } from './middleware/validation'

const router = Router()

// Autenticación y registro
router.post(
  '/auth/register',
  body('handle').notEmpty().withMessage('El handle no puede ir vacío'),
  body('name').notEmpty().withMessage('El nombre no puede ir vacío'),
  body('email').isEmail().withMessage('El email no es válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe contener mínimo 8 caracteres'),
  handleInputErrors,
  createAccount
)

router.post(
  '/auth/login',
  body('email').isEmail().withMessage('El email no es válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  handleInputErrors,
  login
)

export default router
