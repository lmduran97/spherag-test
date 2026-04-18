import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native'

import { Screen } from '@/src/components/common/Screen'
import { useAuthStore } from '@/src/features/auth/store/auth.store'
import { FarmCard } from '@/src/features/farms/components/FarmCard'
import { useGetFarms } from '@/src/features/farms/hooks/useGetFarms'
import { Farm } from '@/src/features/farms/types/farms.types'

export default function FarmsScreen() {
  const { data, isPending, isError, error, refetch } = useGetFarms()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { resetToken } = useAuthStore()

  const logOut = () => {
    resetToken()
    router.replace('/(public)/login')
  }

  if (isPending || isRefreshing) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  if (isError) {
    return (
      <Screen>
        <View className='items-center justify-center h-full gap-20'>
          <Text className='text-center text-red-500'>{error.message}</Text>
          <Pressable
            onPress={logOut}
            className='border border-primary rounded-md p-4 items-center justify-center'
          >
            <Text className='text-lg text-primary font-semibold'>
              Cerrar sesion
            </Text>
          </Pressable>
        </View>
      </Screen>
    )
  }

  const renderEmptyList = () => {
    return (
      <View className='items-center mt-10'>
        <Text className='text-lg font-semibold text-black'>
          No tienes ninguna finca registrada
        </Text>
      </View>
    )
  }

  const renderItem = ({ item }: { item: Farm }) => (
    <FarmCard farm={item} key={item.id} />
  )

  const itemSeparatorComponent = () => <View className='h-6' />

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => setIsRefreshing(false))
  }

  return (
    <Screen>
      <Text className='text-xl font-bold text-black mb-6'>
        Listado de fincas
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={handleOnRefresh}
        refreshing={isRefreshing}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}
