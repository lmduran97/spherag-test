import '../global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '@/src/lib/query/queryClient'

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='login' />
          <Stack.Screen name='farms/index' />
          <Stack.Screen name='farms/[farmId]/index' />
          <Stack.Screen name='farms/[farmId]/atlas/[id]' />
        </Stack>
        <StatusBar style='auto' />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
