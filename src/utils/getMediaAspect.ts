import { MediaCollection } from '@/payload-types'

export const getMediaAspect = (media: string | MediaCollection): string => {
  return typeof media === 'string' ? '' : `${media.width}/${media.height}`
}
