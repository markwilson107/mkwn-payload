import { MediaCollection } from "@/payload-types"

export const getMediaAlt = (media: number | string | MediaCollection, fallback: string):string => {
  return typeof media === 'number' || typeof media === "string" ? fallback : media.alt || fallback
}
