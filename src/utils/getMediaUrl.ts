import { MediaCollection } from "@/payload-types"

export const getMediaUrl = (media: number | MediaCollection):string => {
  return typeof media === 'number' ? media.toString() : media?.url || ""
}
