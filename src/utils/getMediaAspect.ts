import { MediaCollection } from '@/payload-types'

export const getMediaAspect = (media: number | MediaCollection): string => {
  return typeof media === 'number' ? '' : `${media.width}/${media.height}`
}
