import { MediaCollection } from "@/payload-types"

export const getMediaAlt = (media: number | MediaCollection, fallback: string):string => {
  return typeof media === 'number' ? fallback : media.alt || fallback
}
