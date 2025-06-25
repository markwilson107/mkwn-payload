import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { ProjectCollection, ExperienceCollection } from '../../payload-types'

type Collections = ProjectCollection | ExperienceCollection

export const revalidateCollection =
  (basePath: string): CollectionAfterChangeHook<Collections> =>
  ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      const path = `${basePath}/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('projects-sitemap')
    }

    return doc
  }

export const revalidateDelete =
  (basePath: string): CollectionAfterDeleteHook<Collections> =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) {
      const path = `${basePath}/${doc?.slug}`

      revalidatePath(path)
      revalidateTag('projects-sitemap')
    }

    return doc
  }
