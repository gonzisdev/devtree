import { ChangeEvent, useState } from 'react'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'
import type { SocialNetwork } from '../types'

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    )
    setDevTreeLinks(updatedLinks)
  }

  const handleEnabledLink = (socialNetwork: SocialNetwork['name']) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link
    )
    setDevTreeLinks(updatedLinks)
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
    </>
  )
}

export default LinkTreeView
