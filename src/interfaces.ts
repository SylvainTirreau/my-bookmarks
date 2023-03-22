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

export interface linksData {
  url: string
  title: string
  description: string | undefined
  thumbnailPath: string
  timestamp: string
  relatedLabels: string[]
}

export interface labelData {
  name: string
  slug: string
  description: string | undefined
}

export interface labelsData {
  title: string
  slug: string
  description: string
  relatedLinks: string[]
}

export type dataContent = linkData | labelData | linksData | labelsData

export interface resultPromiseForFront {
  success: boolean
  message: string
}

export const labelsDataType = 'labels'
export const linksDataType = 'links'

export type dataType = typeof labelsDataType | typeof linksDataType
