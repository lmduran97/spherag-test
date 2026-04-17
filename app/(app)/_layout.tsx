import { useAuthStore } from '@/src/features/auth/store/auth.store'
import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function AppLayout() {
  const { hasHydrated, token } = useAuthStore()

  if (!hasHydrated) {
    return (
      <View className='flex-1 items-center justify-center bg-white'>
        <ActivityIndicator />
      </View>
    )
  }

  if (!token) {
    return <Redirect href={'/login'} />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
