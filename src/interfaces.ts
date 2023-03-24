export interface allData {
  page_id: string
  title: string
  version: string
  links_menu_active: boolean
  labels_menu_active: boolean
  hide_labels_wrapper: boolean
  label_container_title: string
  label_to_modify: Record<string, object> | null
  main_data: Map<any, any>
}

export interface newLinkFormData {
  url: string
  title: string
  description: string
}

export interface linksData {
  url: string
  title: string
  description: string | undefined
  thumbnailPath: string
  timestamp: string
  relatedLabels: string[]
}

export interface labelsData {
  name: string
  slug: string
  description: string
  relatedLinks: string[]
}

export type dataContent = linksData | labelsData

export interface resultPromiseForFront {
  success: boolean
  message: string
}

export const labelsDataType = 'labels'
export const linksDataType = 'links'

export type dataType = typeof labelsDataType | typeof linksDataType
