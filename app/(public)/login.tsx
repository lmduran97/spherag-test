import { Feather } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { useMemo, useState } from 'react'
import { Image, Pressable, Text, TextInput, View } from 'react-native'

import Logo from '@/assets/images/logo.png'
import { Screen } from '@/src/components/Screen'
import { useLogin } from '@/src/features/auth/hooks/useLogin'
import { useAuthStore } from '@/src/features/auth/store/auth.store'

export default function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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

  const isButtonDisabled = useMemo(() => {
    if (username.trim() === '' || password.trim() === '') {
      return true
    }

    return false
  }, [username, password])

  return (
    <Screen>
      <Image
        source={Logo}
        className='self-center mt-20 mb-32 rounded-3xl border h-40 w-40'
        height={160}
        width={160}
      />

      <View className='mb-12 px-4'>
        <Text className='text-lg font-semibold text-primary mb-2'>Usuario</Text>
        <TextInput
          testID='username-input'
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
          className='border border-primary rounded-lg px-4 py-3 text-base'
          placeholder='Usuario'
          keyboardType='email-address'
        />
      </View>

      <View className='mb-20 px-4'>
        <Text className='text-lg font-semibold text-primary mb-2'>
          Contraseña
        </Text>
        <View className='relative'>
          <TextInput
            testID='password-input'
            value={password}
            onChangeText={setPassword}
            autoCapitalize='none'
            className='border border-primary rounded-lg px-4 py-3 text-base mb-4'
            placeholder='Contraseña'
            secureTextEntry={!showPassword}
            returnKeyType='send'
            onSubmitEditing={handleLogin}
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            className='absolute right-4 top-3'
            hitSlop={10}
          >
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color='gray'
            />
          </Pressable>
        </View>
        <View>
          <View className='flex-row items-center gap-2 mb-1'>
            <AntDesign name='info-circle' size={16} color='#283370' />
            <Text className='text-sm text-black'>Recuerda:</Text>
          </View>
          <View className='pl-4'>
            <Text className='text-sm text-black'>
              · Debe incluir letras y numeros
            </Text>
            <Text className='text-sm text-black'>
              · Debe combinar letras mayusculas y minusculas
            </Text>
            <Text className='text-sm text-black'>
              · Debe incluir caracteres especiales (#, $, +, =, !)
            </Text>
          </View>
        </View>
      </View>

      {error && (
        <View className='pl-4'>
          <Text className='text-red-500 text-base mb-4'>{error.message}</Text>
        </View>
      )}
      <View className='px-4'>
        <Pressable
          testID='login-button'
          onPress={handleLogin}
          disabled={isPending || isButtonDisabled}
          className='rounded-lg py-3 items-center justify-center'
          style={{
            opacity: isPending ? 0.7 : 1,
            backgroundColor:
              isPending || isButtonDisabled ? '#9b9b9b' : '#283370'
          }}
        >
          <Text className='text-text_primary text-base font-semibold'>
            {isPending ? 'Cargando...' : 'Acceder'}
          </Text>
        </Pressable>
      </View>
    </Screen>
  )
}
