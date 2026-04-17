import { useAuthStore } from '../../auth/store/auth.store'
import { Farm } from './../types/farms.types'

let calls = 0

export const getFarms = async (): Promise<Farm[]> => {
  calls += 1
  console.log('GET /farms called', calls)
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
