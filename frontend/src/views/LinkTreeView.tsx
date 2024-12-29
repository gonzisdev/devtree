import { useState } from 'react'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map((item) => (
          <DevTreeInput key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}

export default LinkTreeView
