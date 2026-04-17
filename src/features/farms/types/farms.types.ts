export type Farm = {
  id: string
  measuringSystemTypeId: number
  timeZone: string
  latitude: string
  longitude: string
  name: string
  timeZoneStandard: string
  description: string
  image: string
  country: string
  favourite: boolean
  currencyTypeId: number
  currencySymbol: string
  createdDate: string
  type: number
  userId: number
}

export type Atlas = {
  id: number
  imei: string
  name: string
  isAtlasTwo: string
  status: number
  batteryPercentage: number
  signalPercentage: number
  expiredDate: string
  mainProductType: number
}

export type FarmDetailsRequest = {
  farmId: string
  init?: number
  limit?: number
}

export type FarmDetailsResponse = {
  atlas: Atlas[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
