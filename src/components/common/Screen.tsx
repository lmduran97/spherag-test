import React, { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ScreenProps = {
  children: ReactNode
  scrollable?: boolean
}

export function Screen({ children, scrollable = false }: ScreenProps) {
  if (scrollable) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#EBEAF1', paddingTop: 20 }}
      >
        <ScrollView
          className='flex-1'
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 20
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className='flex-1 bg-background'>{children}</View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EBEAF1' }}>
      <View className='flex-1 bg-background px-4 pt-5'>{children}</View>
    </SafeAreaView>
  )
}
