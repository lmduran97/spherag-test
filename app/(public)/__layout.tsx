import { Redirect, Stack } from 'expo-router'
import { ActivityIndicator } from 'react-native'

import { Screen } from '@/src/components/Screen'
import { useAuthStore } from '@/src/features/auth/store/auth.store'

export default function PublicLayout() {
  const { hasHydrated, token } = useAuthStore()

  if (!hasHydrated) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  if (token) {
    return <Redirect href={'/farms'} />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
