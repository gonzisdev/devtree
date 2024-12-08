import { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <p className='bg-red-50 text-red-600 p-3 uppercase text-sm font-bold'>
      {children}
    </p>
  )
}

export default ErrorMessage
