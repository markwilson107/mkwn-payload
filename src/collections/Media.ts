import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  typescript: {
    interface: 'MediaCollection',
  },
  access: {
    read: () => true,
  },
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        withoutEnlargement: false
      },
      {
        name: 'medium',
        width: 900,
        withoutEnlargement: false
      },
      {
        name: 'large',
        width: 1920,
        withoutEnlargement: false
      },
    ],
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
}
