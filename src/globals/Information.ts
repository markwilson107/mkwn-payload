import { GlobalConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { revalidateGlobal } from './hooks/revalidateGlobal'

export const Information: GlobalConfig = {
  slug: 'information',
  typescript: { interface: 'InformationGlobal' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'slogan',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'footer',
      type: 'richText',
      required: true,
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'socials',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'github',
          type: 'text',
          defaultValue: '',
          required: true,
        },
        {
          name: 'linkedin',
          type: 'text',
          defaultValue: '',
          required: true,
        },
        {
          name: 'calandly',
          type: 'text',
          defaultValue: '',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: '',
          required: true,
        },
      ],
    },
    ...slugField(),
  ],
    hooks: {
      afterChange: [revalidateGlobal("information")],
    },
}
