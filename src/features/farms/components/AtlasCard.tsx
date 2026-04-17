import { Text, View } from 'react-native'

import { formatDate } from '@/src/utils/functions'
import React from 'react'
import { Atlas } from '../types/farms.types'

type AtlasCardProps = {
  atlas: Atlas
}

export const AtlasCard = ({ atlas }: AtlasCardProps) => {
  return (
    <View className='rounded-lg border-2 border-primary bg-white p-4'>
      <View className='flex-row items-center justify-between mb-2'>
        <Text className='text-xl font-semibold text-black'>{atlas.name}</Text>
      </View>
      <View className='pl-1'>
        <Text className='text-base font-light text-black'>
          Expira el {formatDate(atlas.expiredDate)}
        </Text>
      </View>
    </View>
  )
}
