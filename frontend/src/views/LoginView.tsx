import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import type { LoginForm } from '../types'
import api from '../config/axios'
import { isAxiosError } from 'axios'

const LoginView = () => {
  const initialValues: LoginForm = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post('/auth/login', formData)
      localStorage.setItem('AUTH_TOKEN', data)
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data)
      }
    }
  }

  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Iniciar sesión</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10'
        noValidate
      >
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='email' className='text-2xl text-slate-500'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email no válido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='password' className='text-2xl text-slate-500'>
            Password
          </label>
          <input
            id='password'
            type='password'
            placeholder='Contraseña'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type='submit'
          className='bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer'
          value='Iniciar sesión'
        />
      </form>
      <nav className='mt-10'>
        <Link
          className='text-center text-white text-lg block'
          to='/auth/register'
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default LoginView
