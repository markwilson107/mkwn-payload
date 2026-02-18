import { MetadataRoute } from 'next'
import { queryBySiteData } from './_api/fetchSiteData'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headerList = await headers()
  const host = headerList.get('host') || ''
  
  const { projects, experience } = await queryBySiteData()

  const projectsMap = projects.docs.map((project) => ({
    url: `https://${host}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }))
  const experienceMap = experience.docs.map((experience) => ({
    url: `https://${host}/projects/${experience.slug}`,
    lastModified: new Date(experience.updatedAt),
  }))

  return [...projectsMap, ...experienceMap]
}
