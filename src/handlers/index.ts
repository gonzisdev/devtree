import User from "../models/User"
import type { Request, Response } from "express"

export const createAccount = async (req: Request, res: Response) => {
    const { email } = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        const error = new Error('El usuario ya está registrado')
        return res.status(409).json({error: error.message})
    }
    const user = new User(req.body)
    await user.save()
    res.status(201).send('Registro creado correctamente')
}