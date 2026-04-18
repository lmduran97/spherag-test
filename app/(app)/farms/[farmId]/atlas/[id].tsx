import { Screen } from '@/src/components/common/Screen'
import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function AtlasDetailsScreen() {
  const { id, farmId } = useLocalSearchParams<{
    farmId: string
    id: string
  }>()

  return (
    <Screen>
      <Text className='text-xl font-bold text-black'>Atlas details</Text>
      <Text className='text-xl font-bold text-black'>{farmId}</Text>
      <Text className='text-xl font-bold text-black'>{id}</Text>
    </Screen>
  )
}
