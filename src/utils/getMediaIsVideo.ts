import { MediaCollection } from "@/payload-types"

export const getMediaIsVideo = (media: string | MediaCollection):boolean => {
  return typeof media === 'string' ? false : media.video || false
}
