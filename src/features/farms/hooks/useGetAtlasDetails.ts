import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getAtlasDetails } from '../api/getAtlasDetails'
import { AtlasDetailsRequest, AtlasDetailsResponse } from '../types/farms.types'

export const useGetAtlasDetails = ({ farmId, imei }: AtlasDetailsRequest) => {
  return useQuery<AtlasDetailsResponse, Error>({
    queryKey: ['atlas-details', farmId, imei],
    queryFn: () => getAtlasDetails({ farmId, imei }),
    enabled: !!farmId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
