import { MediaCollection } from "@/payload-types"

export const getMediaUrl = (media: string | MediaCollection):string => {
  return typeof media === 'string' ? media : media?.url || ""
}
