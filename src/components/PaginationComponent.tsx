import { Pressable, Text, View } from 'react-native'

type PaginationComponentProps = {
  hasPreviousPage: boolean
  onPressPreviousPage: () => void
  page: number
  totalPages: number
  hasNextPage: boolean
  onPressNextPage: () => void
}

export const PaginationComponent = ({
  hasNextPage,
  hasPreviousPage,
  onPressNextPage,
  onPressPreviousPage,
  page,
  totalPages
}: PaginationComponentProps) => {
  return (
    <View className='flex-row items-center self-center gap-8'>
      <View className='w-1/3 items-center'>
        {hasPreviousPage && (
          <Pressable
            onPress={onPressPreviousPage}
            className='rounded-lg bg-primary py-3 px-8'
          >
            <Text className='font-normal text-base text-white'>Anterior</Text>
          </Pressable>
        )}
      </View>
      <View>
        <Text className='font-medium text-base text-black'>
          Pág. {page} de {totalPages}
        </Text>
      </View>
      <View className='w-1/3 items-center'>
        {hasNextPage && (
          <Pressable
            onPress={onPressNextPage}
            className='rounded-lg bg-primary py-3 px-8'
          >
            <Text className='font-normal text-base text-white'>Siguiente</Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}
