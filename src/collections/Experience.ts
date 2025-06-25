import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateCollection } from './hooks/revalidateCollection'

export const Experience: CollectionConfig = {
  slug: 'experience',
  typescript: {
    interface: 'ExperienceCollection',
  },
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
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
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateCollection("/experience")],
    afterDelete: [revalidateDelete("/experience")],
  },
}
