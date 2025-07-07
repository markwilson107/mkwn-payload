import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  typescript: {
    interface: 'MediaCollection',
  },
  access: {
    read: () => true,
  },
  
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'video',
      type: 'checkbox',
      required: true,
    },
  ],
  upload: true,
}
