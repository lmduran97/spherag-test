import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getFarmDetails } from '../api/getFarmDetails'
import { FarmDetailsRequest, FarmDetailsResponse } from '../types/farms.types'

export const useGetFarmDetails = ({
  farmId,
  init,
  limit
}: FarmDetailsRequest) => {
  return useQuery<FarmDetailsResponse, Error>({
    queryKey: ['farm-details', farmId, init, limit],
    queryFn: () => getFarmDetails({ farmId, init, limit }),
    enabled: !!farmId,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
