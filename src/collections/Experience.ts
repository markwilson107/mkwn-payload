import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  typescript: {
    interface: 'ExperienceCollection',
  },
  access: {
    read: () => true,
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
  ],
}
