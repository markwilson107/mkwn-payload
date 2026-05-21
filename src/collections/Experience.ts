import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { revalidateTag } from 'next/cache'

export const Experience: CollectionConfig = {
  slug: 'experience',
  orderable: true,
  typescript: {
    interface: 'ExperienceCollection',
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            {
              name: 'timeFrame',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [() => revalidateTag('site-data')],
    afterDelete: [() => revalidateTag('site-data')],
  },
}
