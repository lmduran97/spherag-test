import { Entypo } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Switch, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'

import { Screen } from '@/src/components/Screen'
import { useGetAtlasDetails } from '@/src/features/farms/hooks/useGetAtlasDetails'
import { formatDate } from '@/src/utils/functions'

export default function AtlasDetailsScreen() {
  const { farmId, imei } = useLocalSearchParams<{
    id: string
    farmId: string
    imei: string
  }>()

  const { data, isPending, isError, error } = useGetAtlasDetails({
    farmId,
    imei
  })

  const [satelliteView, setSatelliteview] = useState(false)

  if (isPending) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  if (isError) {
    return (
      <Screen>
        <Entypo
          name='chevron-left'
          size={32}
          color='black'
          className='-ml-3 mb-6'
          onPress={() => router.back()}
        />
        <Text className='text-center text-red-500'>{error.message}</Text>
      </Screen>
    )
  }

  const formatAtlasProductTypeName = () => {
    return data.productTypeName.split('_')[0]
  }

  return (
    <Screen>
      <Entypo
        name='chevron-left'
        size={32}
        color='black'
        className='-ml-3 mb-6'
        onPress={() => router.back()}
      />
      <Text className='text-xl font-bold text-black mb-6'>
        Detalles del Atlas
      </Text>
      <View className='mb-6 border border-primary rounded-md p-3'>
        <Text className='text-xl font-bold text-black mb-2'>{data.name}</Text>
        <View className='pl-2'>
          <Text className='text-lg text-black'>Imei: {data.imei}</Text>
          <Text className='text-lg text-black'>
            Dispositivo: {formatAtlasProductTypeName()}
          </Text>
          <Text className='text-lg text-black'>
            Batería: {data.batteryPercentage}%
          </Text>
          <Text className='text-lg text-black'>
            Señal: {data.signalPercentage}%
          </Text>
          <Text className='text-lg text-black'>
            Expira el {formatDate(data.expiredDate)}
          </Text>
        </View>
      </View>

      <Text className='text-xl font-bold mb-1'>Localización</Text>
      <View className='flex-row items-center gap-2 pl-2'>
        <Text className='text-lg'>Satélite</Text>
        <Switch
          value={satelliteView}
          trackColor={{
            false: 'gray',
            true: '#283370'
          }}
          onValueChange={() => setSatelliteview((prev) => !prev)}
        />
      </View>
      <View className='flex-1 mb-28 rounded-md overflow-hidden'>
        <MapView
          style={{ flex: 1 }}
          className='rounded-lg'
          mapType={satelliteView ? 'satellite' : 'standard'}
          provider={PROVIDER_DEFAULT}
          initialRegion={{
            latitude: Number(data.latitude) ?? 0,
            longitude: Number(data.longitude) ?? 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.006
          }}
        >
          <Marker
            key={data.imei}
            coordinate={{
              latitude: Number(data.latitude) ?? 0,
              longitude: Number(data.longitude) ?? 0
            }}
            title={data.name}
          />
        </MapView>
      </View>
    </Screen>
  )
}
