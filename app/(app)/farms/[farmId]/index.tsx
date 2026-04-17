import Entypo from '@expo/vector-icons/Entypo'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native'

import { Screen } from '@/src/components/common/Screen'
import { AtlasCard } from '@/src/features/farms/components/AtlasCard'
import { useGetFarmDetails } from '@/src/features/farms/hooks/useGetFarmDetails'
import { Atlas } from '@/src/features/farms/types/farms.types'

const LIMIT = 10

export default function FarmDetailsScreen() {
  const { farmId } = useLocalSearchParams<{ farmId: string }>()
  const [page, setPage] = useState(1)

  const init = (page - 1) * LIMIT + 1
  const { data, isPending, isError, error, refetch } = useGetFarmDetails({
    farmId,
    init,
    limit: LIMIT
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

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
        <Text className='text-center text-red-500'>{error.message}</Text>
      </Screen>
    )
  }

  const renderEmptyList = () => {
    return (
      <View className='items-center mt-20'>
        <Text className='text-lg font-semibold text-black'>
          No tienes ningun atlas registrado
        </Text>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Atlas }) => (
    <AtlasCard atlas={item} key={item.id} />
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

      <FlatList
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

      <View className='flex-row items-center'>
        {data.hasPreviousPage && (
          <Pressable onPress={handleOnPressPreviousPage}>
            <Text className='font-normal text-base text-black'>Anterior</Text>
          </Pressable>
        )}

        <Text className='font-medium text-base text-black'>{page}</Text>

        {data.hasNextPage && (
          <Pressable onPress={handleOnPressNextPage}>
            <Text className='font-normal text-base text-black'>Siguiente</Text>
          </Pressable>
        )}
      </View>
      <View className='self-end'>
        <Text className='font-light text-sm text-black'>
          Pagina {page} de {data.totalPages}
        </Text>
      </View>
    </Screen>
  )
}
