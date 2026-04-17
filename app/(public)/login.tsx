import { Screen } from '@/src/components/common/Screen'
import { useLogin } from '@/src/features/auth/hooks/useLogin'
import { useAuthStore } from '@/src/features/auth/store/auth.store'
import { router } from 'expo-router'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate, isPending, error } = useLogin()
  const { setToken } = useAuthStore()

  const handleLogin = () => {
    mutate(
      {
        username: username.trim(),
        password: password.trim()
      },
      {
        onSuccess: (data) => {
          setToken(data.accessToken.token)
          router.replace('/(app)/farms')
        }
      }
    )
  }

  return (
    <Screen>
      <Text className='text-xl font-bold text-black mb-20'>Login</Text>

      <View className='mb-6'>
        <Text className='text-lg font-semibold text-primary mb-2'>Usuario</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
          className='border border-primary rounded-lg px-4 py-3 text-base'
          placeholder='Usuario'
          keyboardType='email-address'
        />
      </View>

      <View className='mb-6'>
        <Text className='text-lg font-semibold text-primary mb-2'>
          Contraseña
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          className='border border-primary rounded-lg px-4 py-3 text-base'
          placeholder='Contraseña'
          secureTextEntry
          returnKeyType='send'
          onSubmitEditing={handleLogin}
        />
      </View>

      {error && (
        <Text className='text-red-500 text-sm mb-4'>{error.message}</Text>
      )}

      <Pressable
        onPress={handleLogin}
        disabled={isPending}
        className='bg-primary rounded-lg px-4 py-3 w-full items-center justify-center'
        style={{ opacity: isPending ? 0.7 : 1 }}
      >
        <Text className='text-text_primary text-base font-semibold'>
          {isPending ? 'Cargando...' : 'Acceder'}
        </Text>
      </Pressable>
    </Screen>
  )
}
