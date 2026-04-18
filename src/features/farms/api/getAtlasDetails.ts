import { useAuthStore } from '../../auth/store/auth.store'
import {
  AtlasDetailsRequest,
  AtlasDetailsResponse
} from './../types/farms.types'

export const getAtlasDetails = async ({
  farmId,
  imei
}: AtlasDetailsRequest): Promise<AtlasDetailsResponse> => {
  const token = useAuthStore.getState().token

  const response = await fetch(
    `https://apicore.spherag.com/systems/${farmId}/Atlas/${imei}`,
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
    imei: data?.imei ?? '',
    name: data?.name ?? '',
    type: data?.type ?? 1,
    productTypeName: data?.productTypeName ?? '',
    systemId: data?.systemId ?? 1,
    latitude: data?.latitude ?? '',
    longitude: data?.longitude ?? '',
    batteryPercentage: data?.batteryPercentage ?? 0,
    signalPercentage: data?.signalPercentage ?? 0,
    expiredDate: data?.expiredDate ?? '',
    atlasStatus: data?.atlasStatus ?? 1,
    energyMode: data?.energyMode ?? 1,
    connectors: data?.connectors ?? {}
  }
}
