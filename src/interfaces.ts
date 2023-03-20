export interface newLinkFormData {
  url: string
  title: string
  description: string
}

export interface linkData {
  url: string
  title: string
  description: string | undefined
  thumbnailPath: string
  timestamp: string
}

export interface labelData {
  name: string
  slug: string
  description: string | undefined
}

export interface resultPromiseForFront {
  success: boolean
  message: string
}

export const labelsDataType = 'labels'
export const linksDataType = 'links'
export const linkDataType = 'link'

export type dataType = typeof labelsDataType | typeof linksDataType | typeof linkDataType
