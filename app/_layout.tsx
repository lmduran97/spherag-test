import '../global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '@/src/lib/query/queryClient'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
