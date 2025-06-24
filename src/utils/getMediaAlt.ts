import { MediaCollection } from "@/payload-types"

export const getMediaAlt = (media: string | MediaCollection, fallback: string):string => {
  return typeof media === 'string' ? fallback : media.alt || fallback
}
