import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Technology: CollectionConfig = {
  slug: 'technology',
  typescript: {
    interface: 'TechnologyCollection',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
    hooks: {
      afterChange: [() => revalidateTag("site-data")],
      afterDelete: [() => revalidateTag("site-data")],
    },
}
