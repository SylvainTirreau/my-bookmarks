export interface newLinkFormData {
  url: string,
  title: string,
  description: string
}

export interface linkJsonData {
  url: string,
  title: string,
  description: string | undefined
  thumbnailPath: string
  timestamp: string
}

export interface resultPromiseForFront {
  success: boolean,
  message: string
}