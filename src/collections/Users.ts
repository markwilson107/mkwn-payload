import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
    typescript: {
    interface: 'UserCollection',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
