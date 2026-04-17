import { useAuthStore } from '../../auth/store/auth.store'
import { Farm } from './../types/farms.types'

export const getFarms = async (): Promise<Farm[]> => {
  const token = useAuthStore.getState().token

  const response = await fetch('https://apicore.spherag.com/System/List', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error('Error al obtener el listado de fincas')
  }

  return data
}
