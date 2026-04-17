import { formatDate } from '@/src/utils/functions'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable, Text } from 'react-native'
import { Farm } from '../types/farms.types'

type FarmCardProps = {
  farm: Farm
}

export const FarmCard = ({ farm }: FarmCardProps) => {
  return (
    <Pressable
      onPress={() => {}}
      className='rounded-lg border border-primary bg-white p-4'
    >
      <Text className='text-lg font-semibold text-black'>{farm.name}</Text>
      {farm.favourite ? (
        <FontAwesome name='heart' size={24} color='red' />
      ) : (
        <FontAwesome name='heart-o' size={24} color='black' />
      )}
      <Text className='text-lg font-semibold text-black'>
        {formatDate(farm.createdDate)}
      </Text>
    </Pressable>
  )
}
