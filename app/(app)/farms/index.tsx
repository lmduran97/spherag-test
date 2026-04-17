import { Screen } from '@/src/components/common/Screen'
import { FarmCard } from '@/src/features/farms/components/FarmCard'
import { useGetFarms } from '@/src/features/farms/hooks/useGetFarms'
import { Farm } from '@/src/features/farms/types/farms.types'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function FarmsScreen() {
  const { data, isPending, isError, error } = useGetFarms()

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
      <View>
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

  return (
    <Screen>
      <Text className='text-xl font-bold text-black mb-8'>
        Listado de fincas
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparatorComponent}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  )
}
