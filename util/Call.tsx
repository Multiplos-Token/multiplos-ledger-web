export interface CallRequestBody {
  method: string
  route: string
  body?: any
}

export interface CallResponseData {
  status: number
  data?: any
}
