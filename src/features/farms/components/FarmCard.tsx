import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { formatDate, handleOnPressMap } from '@/src/utils/functions'
import { Farm } from '../types/farms.types'

type FarmCardProps = {
  farm: Farm
}

export const FarmCard = ({ farm }: FarmCardProps) => {
  const handleNavigateToFarmDetails = () => {
    router.push({
      pathname: '/(app)/farms/[farmId]',
      params: {
        farmId: farm.id
      }
    })
  }

  return (
    <Pressable
      onPress={handleNavigateToFarmDetails}
      className='rounded-lg border-2 border-primary bg-[#EBEAF1] p-4'
    >
      <View className='flex-row items-center justify-between mb-2'>
        <Text className='text-xl font-semibold text-black'>{farm.name}</Text>
        {farm.favourite ? (
          <FontAwesome name='heart' size={24} color='red' />
        ) : (
          <FontAwesome name='heart-o' size={24} color='black' />
        )}
      </View>
      <View className='pl-1'>
        {farm.latitude && farm.longitude && (
          <Pressable
            onPress={() => handleOnPressMap(farm.latitude, farm.longitude)}
            className='flex-row items-center mb-4 self-start'
          >
            <FontAwesome5 name='map-marked-alt' size={24} color='black' />
            <Text className='text-base font-medium text-black ml-2 pt-1'>
              Ver en mapa
            </Text>
          </Pressable>
        )}
        <Text className='text-base font-light text-black'>
          Creado el {formatDate(farm.createdDate)}
        </Text>
      </View>
    </Pressable>
  )
}
