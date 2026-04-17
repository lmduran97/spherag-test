import { Screen } from '@/src/components/common/Screen'
import { useAuthStore } from '@/src/features/auth/store/auth.store'
import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator } from 'react-native'

export default function AppLayout() {
  const { hasHydrated, token } = useAuthStore()

  if (!hasHydrated) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  if (!token) {
    return <Redirect href={'/login'} />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
