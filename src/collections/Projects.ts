import type { CollectionConfig } from 'payload'
import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateCollection } from './hooks/revalidateCollection'
import { revalidateTag } from 'next/cache'

export const Projects: CollectionConfig = {
  slug: 'projects',
  orderable: true,
  typescript: {
    interface: 'ProjectCollection',
  },
  access: {
    read: () => true,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          fields: [
            {
              name: 'featureImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'subTitle',
              type: 'text',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'experience',
              type: 'relationship',
              relationTo: 'experience',
            },
            {
              name: 'experienceSlug',
              type: 'text',
              virtual: 'experience.slug',
              admin: { hidden: true },
            },
            {
              name: 'technology',
              type: 'array',
              fields: [{ type: 'text', name: 'text', required: true }],
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
