import { MediaCollection } from "@/payload-types"

export const getMediaUrl = (media: number | string | MediaCollection, size?: "thumbnail" | "medium" | "large"):string => {
  return typeof media === 'object' ? (size ? media?.sizes?.[size]?.url || media.url || "" : media.url || "") : ""
}
