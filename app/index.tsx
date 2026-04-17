import { Screen } from '@/src/components/common/Screen'
import { useAuthStore } from '@/src/features/auth/store/auth.store'
import { Redirect } from 'expo-router'
import { ActivityIndicator } from 'react-native'

export default function IndexScreen() {
  const { hasHydrated, token } = useAuthStore()
  const nextScreen = token ? '/farms' : '/login'

  if (!hasHydrated) {
    return (
      <Screen>
        <ActivityIndicator />
      </Screen>
    )
  }

  return <Redirect href={nextScreen} />
}
