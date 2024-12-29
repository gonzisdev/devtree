import { Request, Response } from 'express'
import slug from 'slug'
import User from '../models/User'
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'
import formidable from 'formidable'
import cloudinary from '../config/cloudinary'
import { v4 as uuid } from 'uuid'

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Un usuario con ese mail ya esta registrado')
    res.status(409).json({ error: error.message })
    return
  }

  const handle = slug(req.body.handle, '')
  const handleExists = await User.findOne({ handle })
  if (handleExists) {
    const error = new Error('Nombre de usuario no disponible')
    res.status(409).json({ error: error.message })
    return
  }

  const user = new User(req.body)
  user.password = await hashPassword(password)
  user.handle = handle

  await user.save()
  res.status(201).send('Registro creado correctamente')
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    res.status(404).json({ error: error.message })
    return
  }

  const isPasswordCorrect = await checkPassword(password, user.password)
  if (!isPasswordCorrect) {
    const error = new Error('La contraseña no es correcta')
    res.status(401).json({ error: error.message })
    return
  }

  const token = generateJWT({ id: user._id })
  res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
  res.json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists && handleExists.email !== req.user.email) {
      const error = new Error('Nombre de usuario no disponible')
      res.status(409).json({ error: error.message })
      return
    }
    req.user.handle = handle
    req.user.description = description
    req.user.links = links
    await req.user.save()
    res.send('Perfil actualizado correctamente')
  } catch (e) {
    const error = new Error('Error al actualizar el perfil')
    res.status(500).json({ error: error.message })
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false })
  try {
    form.parse(req, async (err, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error('Error al subir la imangen')
            res.status(500).json({ error: error.message })
            return
          }
          if (result) {
            req.user.image = result.secure_url
            await req.user.save()
            res.json({ image: result.secure_url })
            return
          }
        }
      )
    })
  } catch (e) {
    const error = new Error('Error al actualizar el perfil')
    res.status(500).json({ error: error.message })
  }
}
