import { useAuthStore } from '../../auth/store/auth.store'
import { FarmDetailsRequest, FarmDetailsResponse } from './../types/farms.types'

export const getFarmDetails = async ({
  farmId,
  init = 1,
  limit = 10
}: FarmDetailsRequest): Promise<FarmDetailsResponse> => {
  const token = useAuthStore.getState().token

  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_APP}/systems/${farmId}/Atlas/?Init=${init}&Limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al obtener el detalle de la finca')
  }

  return {
    atlas: data?.items ?? [],
    hasNextPage: data?.hasNextPage ?? false,
    hasPreviousPage: data?.hasPreviousPage ?? false,
    pageNumber: data?.pageNumber ?? 1,
    totalCount: data?.totalCount ?? 1,
    totalPages: data?.totalPages ?? 1
  }
}
