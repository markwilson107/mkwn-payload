import { MediaCollection } from '@/payload-types'

export const getMediaAspect = (media: number | string | MediaCollection): string => {
  return typeof media === 'number' || typeof media === "string" ? "" : `${media.width}/${media.height}`
}
