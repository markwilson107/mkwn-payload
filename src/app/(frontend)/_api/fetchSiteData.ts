import { unstable_cache } from 'next/cache'
import { getPayload, Where } from 'payload'
import { cache } from 'react'
import configPromise from '@/payload.config'

const fetchFn = async () => {
  const payload = await getPayload({ config: configPromise })

    const [information, projects, experience] = await Promise.all([
    payload.findGlobal({ slug: 'information' }),
    payload.find({ collection: 'projects' }),
    payload.find({ collection: 'experience' }),
  ])

  return { information, projects, experience }
}

export const queryBySiteData = cache(async () => {
  if (process.env.NODE_ENV === 'development') {
    return await fetchFn()
  }

  return await unstable_cache(async () => fetchFn(), [`site-data`], {
    tags: [`site-data`],
  })()
})
