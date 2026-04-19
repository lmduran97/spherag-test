import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native'

import { PaginationComponent } from '@/src/components/PaginationComponent'
import { Screen } from '@/src/components/Screen'
import { AtlasCard } from '@/src/features/farms/components/AtlasCard'
import { useGetFarmDetails } from '@/src/features/farms/hooks/useGetFarmDetails'
import { Atlas, Farm } from '@/src/features/farms/types/farms.types'
import { queryClient } from '@/src/lib/query/queryClient'
import { formatDate, handleOnPressMap } from '@/src/utils/functions'

const PAGESIZE = 10

export default function FarmDetailsScreen() {
  const { farmId } = useLocalSearchParams<{ farmId: string }>()

  const selectedFarm = queryClient
    .getQueryData<Farm[]>(['farms'])
    ?.find((farm) => farm.id.toString() === farmId)

  const [page, setPage] = useState(1)
  const { data, isPending, isError, error, refetch } = useGetFarmDetails({
    farmId,
    init: page,
    limit: PAGESIZE
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const listRef = useRef<FlatList<Atlas>>(null)

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
  }, [page])

  if (isPending) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  if (!selectedFarm) {
    return (
      <Screen>
        <Entypo
          name='chevron-left'
          size={32}
          color='black'
          className='-ml-3 mb-6'
          onPress={() => router.back()}
        />
        <Text className='text-center text-red-500 pt-40'>
          Error al cargar los datos de la finca
        </Text>
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

  const renderEmptyList = () => {
    return (
      <View className='items-center mt-20'>
        <Text className='text-lg font-semibold text-black'>
          No tienes ningún atlas registrado
        </Text>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Atlas }) => (
    <AtlasCard atlas={item} key={item.id} farmId={selectedFarm.id.toString()} />
  )

  const itemSeparatorComponent = () => <View className='h-6' />

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => setIsRefreshing(false))
  }

  const handleOnPressPreviousPage = () => {
    setPage((prev) => prev - 1)
  }

  const handleOnPressNextPage = () => {
    setPage((prev) => prev + 1)
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
        Detalles de la finca
      </Text>
      <View className='mb-6 border border-primary rounded-md p-3'>
        <View className='flex-row items-center justify-between mb-2'>
          <Text className='text-xl font-semibold text-black'>
            {selectedFarm.name}
          </Text>
          {selectedFarm.favourite ? (
            <FontAwesome name='heart' size={24} color='red' />
          ) : (
            <FontAwesome name='heart-o' size={24} color='black' />
          )}
        </View>
        {selectedFarm.description && (
          <Text className='text-lg text-black mb-2'>
            {selectedFarm.description}
          </Text>
        )}
        {selectedFarm.latitude && selectedFarm.longitude && (
          <View className='flex-row items-center gap-2 mb-2'>
            <Entypo name='pin' size={16} color='black' />
            <Pressable
              onPress={() =>
                handleOnPressMap(selectedFarm.latitude, selectedFarm.longitude)
              }
              className='rounded-md bg-primary p-2'
            >
              <Text className='text-base text-white'>
                Lat: {selectedFarm.latitude}, Long: {selectedFarm.longitude}
              </Text>
            </Pressable>
          </View>
        )}
        {selectedFarm.createdDate && (
          <Text className='text-base font-light text-black'>
            Creado el {formatDate(selectedFarm.createdDate)}
          </Text>
        )}
      </View>

      <View className='h-[1px] w-full bg-primary mb-4' />

      <View className='flex-1 max-h-[62%] mb-4'>
        <Text className='text-xl font-semibold text-black mb-4'>
          Listado de Atlas
        </Text>
        <FlatList
          ref={listRef}
          data={data.atlas}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleOnRefresh}
          refreshing={isRefreshing}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {data.atlas.length > 0 && (
        <PaginationComponent
          hasNextPage={data.hasNextPage}
          hasPreviousPage={data.hasPreviousPage}
          onPressNextPage={handleOnPressNextPage}
          onPressPreviousPage={handleOnPressPreviousPage}
          page={page}
          totalPages={data.totalPages}
        />
      )}
    </Screen>
  )
}
