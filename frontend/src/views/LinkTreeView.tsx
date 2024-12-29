import { ChangeEvent, useState } from 'react'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'
import type { SocialNetwork, User } from '../types'
import { isValidUrl } from '../utils'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../api/DevTreeAPI'

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
    },
  })

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    )
    setDevTreeLinks(updatedLinks)
  }

  const handleEnabledLink = (socialNetwork: SocialNetwork['name']) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error('URL no válida')
        }
      }
      return link
    })
    setDevTreeLinks(updatedLinks)
    queryClient.setQueryData(['user'], (prevData: User) => {
      return { ...prevData, links: JSON.stringify(updatedLinks) }
    })
  }

  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnabledLink={handleEnabledLink}
          />
        ))}
      </div>
      <button
        className='bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer'
        onClick={() => mutate(user)}
      >
        Guardar cambios
      </button>
    </>
  )
}

export default LinkTreeView
