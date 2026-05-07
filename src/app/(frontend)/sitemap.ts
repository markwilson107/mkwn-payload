import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

const getSiteUrl = () => {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000'

  return url.startsWith('http') ? url : `https://${url}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const siteUrl = getSiteUrl()

  const [projects, experience] = await Promise.all([
    payload.find({
      collection: 'projects',
      depth: 0,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
    payload.find({
      collection: 'experience',
      depth: 0,
      pagination: false,
      select: {
        slug: true,
        updatedAt: true,
      },
    }),
  ])

  const projectsMap = projects.docs.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }))
  const experienceMap = experience.docs.map((experience) => ({
    url: `${siteUrl}/experience/${experience.slug}`,
    lastModified: new Date(experience.updatedAt),
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...projectsMap,
    ...experienceMap,
  ]
}
