import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import { cache } from 'react'
import configPromise from '@/payload.config'

const fetchFn = async () => {
  const payload = await getPayload({ config: configPromise })

  const [information, projects, experience] = await Promise.all([
    payload.findGlobal({
      slug: 'information',
      depth: 1,
      select: {
        name: true,
        role: true,
        slogan: true,
        description: true,
        footer: true,
        resume: true,
        socials: true,
      },
    }),
    payload.find({
      collection: 'projects',
      depth: 1,
      pagination: false,
      select: {
        title: true,
        subTitle: true,
        slug: true,
        description: true,
        featureImage: true,
        technology: true,
      },
    }),
    payload.find({
      collection: 'experience',
      depth: 0,
      pagination: false,
      select: {
        title: true,
        slug: true,
        role: true,
        description: true,
        timeFrame: true,
      },
    }),
  ])

  return { information, projects, experience }
}

export const queryBySiteData = cache(async () => {
  if (process.env.NODE_ENV === 'development') {
    return await fetchFn()
  }

  return await unstable_cache(async () => fetchFn(), ['site-data'], {
    tags: [`site-data`],
  })()
})
