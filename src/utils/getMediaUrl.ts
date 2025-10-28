import { MediaCollection } from "@/payload-types"

export const getMediaUrl = (media: number | string | MediaCollection):string => {
  return typeof media === 'number' || typeof media === "string" ? media.toString() : media?.url || ""
}
