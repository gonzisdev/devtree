import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import type { RegisterForm } from '../types'
import { isAxiosError } from 'axios'
import api from '../config/axios'
import { toast } from 'sonner'

const RegisterView = () => {
  const initialValues: RegisterForm = {
    name: '',
    email: '',
    handle: '',
    password: '',
    password_confirmation: '',
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const password = watch('password', '')

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post('/auth/register', formData)
      toast.success(data)
      reset()
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        console.log(error.response.data)
      }
    }
  }
  return (
    <>
      <h1 className='text-4xl text-white font-bold'>Crear cuenta</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className='bg-white px-5 py-20 rounded-lg space-y-10 mt-10'
        noValidate
      >
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='name' className='text-2xl text-slate-500'>
            Nombre
          </label>
          <input
            id='name'
            type='text'
            placeholder='Tu nombre'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('name', {
              required: 'El nombre es obligatorio',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='email' className='text-2xl text-slate-500'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Tu email'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'El email no es válido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='handle' className='text-2xl text-slate-500'>
            Handle
          </label>
          <input
            id='handle'
            type='text'
            placeholder='Nombre de usuario: sin espacios'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('handle', {
              required: 'El handle es obligatorio',
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label htmlFor='password' className='text-2xl text-slate-500'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            placeholder='Tu contraseña'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres',
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className='grid grid-cols-1 space-y-3'>
          <label
            htmlFor='password_confirmation'
            className='text-2xl text-slate-500'
          >
            Repetir contraseña
          </label>
          <input
            id='password_confirmation'
            type='password'
            placeholder='Repite tu contraseña'
            className='bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400'
            {...register('password_confirmation', {
              required: 'Repetir la contraseña es obligatorio',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type='submit'
          className='bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer'
          value='Crear Cuenta'
        />
      </form>
      <nav className='mt-10'>
        <Link className='text-center text-white text-lg block' to='/auth/login'>
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </nav>
    </>
  )
}

export default RegisterView
