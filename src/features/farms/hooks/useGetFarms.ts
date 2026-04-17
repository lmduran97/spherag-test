import { useQuery } from '@tanstack/react-query'

import { getFarms } from '../api/getFarms'
import { Farm } from '../types/farms.types'

export const useGetFarms = () => {
  return useQuery<Farm[], Error>({
    queryKey: ['farms'],
    queryFn: getFarms,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
