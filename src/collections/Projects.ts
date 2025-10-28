import type { CollectionConfig } from 'payload'
import { colorPickerField } from '@innovixx/payload-color-picker-field'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateCollection } from './hooks/revalidateCollection'

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
      name: 'projectId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
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
      name: 'url',
      type: 'text',
    },
    {
      name: 'challenge',
      type: 'richText',
    },
    {
      name: 'goal',
      type: 'richText',
    },
    {
      name: 'conclusion',
      type: 'richText',
    },
    {
      name: 'reference',
      type: 'richText',
    },
    // {
    //   name: 'theme',
    //   type: 'group',
    //   fields: [
    //     {
    //       name: 'useCustomColors',
    //       type: 'checkbox',
    //       defaultValue: false,
    //     },
    //     colorPickerField({
    //       name: 'textColor',
    //       label: 'Text Color',
    //     }),
    //     colorPickerField({
    //       name: 'backgroundColor',
    //       label: 'Background Color',
    //     }),
    //   ],
    // },
    {
      name: 'banner',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'bannerImage',
          type: 'upload',
          relationTo: 'media',
        },
        colorPickerField({
          name: 'textColor',
          label: 'Text Color',
        }),
        colorPickerField({
          name: 'backgroundColor',
          label: 'Background Color',
        }),
      ],
    },
    {
      name: 'iconImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'technology',
      type: 'array',
      fields: [
        {
          name: 'technology_item',
          type: 'relationship',
          relationTo: 'technology',
          required: true,
        },
      ],
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateCollection("/projects")],
    afterDelete: [revalidateDelete("/projects")],
  },
}
