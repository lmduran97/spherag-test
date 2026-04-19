import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { formatDate } from '@/src/utils/functions'
import { Atlas } from '../types/farms.types'

type AtlasCardProps = {
  atlas: Atlas
  farmId: string
}

export const AtlasCard = ({ atlas, farmId }: AtlasCardProps) => {
  const handleBatteryIcon = () => {
    if (atlas.batteryPercentage === 0) {
      return <FontAwesome name='battery-empty' size={24} color='black' />
    }

    if (atlas.batteryPercentage < 40) {
      return <FontAwesome name='battery-quarter' size={24} color='black' />
    }

    if (atlas.batteryPercentage < 60) {
      return <FontAwesome name='battery-half' size={24} color='black' />
    }

    if (atlas.batteryPercentage < 80) {
      return (
        <FontAwesome name='battery-three-quarters' size={24} color='black' />
      )
    }

    return <FontAwesome name='battery-full' size={24} color='black' />
  }

  const handleSignalIcon = () => {
    if (atlas.signalPercentage === 0) {
      return (
        <MaterialCommunityIcons
          name='signal-cellular-outline'
          size={24}
          color='black'
        />
      )
    }

    if (atlas.signalPercentage < 30) {
      return (
        <MaterialCommunityIcons
          name='signal-cellular-1'
          size={24}
          color='black'
        />
      )
    }

    if (atlas.signalPercentage < 80) {
      return (
        <MaterialCommunityIcons
          name='signal-cellular-2'
          size={24}
          color='black'
        />
      )
    }

    return (
      <MaterialCommunityIcons
        name='signal-cellular-3'
        size={24}
        color='black'
      />
    )
  }

  const handleNavigateToAtlasDetails = () => {
    router.push({
      pathname: '/(app)/farms/[farmId]/atlas/[id]',
      params: {
        farmId: farmId,
        id: atlas.id.toString(),
        imei: atlas.imei
      }
    })
  }

  return (
    <Pressable
      onPress={handleNavigateToAtlasDetails}
      className='rounded-lg border-2 border-primary bg-[#EBEAF1] p-4'
    >
      <Text className='text-xl font-semibold text-black mb-2'>
        {atlas.name}
      </Text>
      <View className='pl-2 gap-2 mb-2'>
        <View className='flex-row items-center gap-4'>
          <MaterialCommunityIcons name='barcode' size={24} color='black' />
          <Text className='text-lg font-semibold text-black'>
            Imei: {atlas.imei}
          </Text>
        </View>
        <View className='flex-row items-center gap-8'>
          <View className='flex-row items-center gap-2'>
            {handleBatteryIcon()}
            <Text className='text-xl font-semibold text-black'>
              {atlas.batteryPercentage}%
            </Text>
          </View>
          <View className='flex-row items-center gap-2'>
            {handleSignalIcon()}
            <Text className='text-xl font-semibold text-black'>
              {atlas.signalPercentage}%
            </Text>
          </View>
        </View>
      </View>
      <View className='pl-1 self-end flex-row items-center gap-2'>
        <MaterialCommunityIcons name='update' size={24} color='black' />
        <Text className='text-base font-light text-black'>
          Expira el {formatDate(atlas.expiredDate)}
        </Text>
      </View>
    </Pressable>
  )
}
