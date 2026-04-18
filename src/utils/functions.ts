import { Linking } from 'react-native'

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('es-Es', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date))
}

export const handleOnPressMap = async (lat: string, long: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
  await Linking.openURL(url)
}
