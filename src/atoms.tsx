import { Credential, TokenResponse, Widgets } from 'common'
import { layoutDummy } from 'dummy'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { pos } from 'vec2'

export const storeVisibleAtom = atom(false)
export const cursorInWidgetAtom = atom({
  pos: pos(0, 0),
  name: '',
})
export const widgetsAtom = atom<Widgets>(layoutDummy)

export const credentialAtom = atom<Credential>({ email: '', password: '' })
export const credentialStateAtom = atom(get => {
  const { email, password } = get(credentialAtom)
  return {
    email: /^\S+@\S+$/.test(email)
      ? undefined
      : '올바른 이메일 형식이 아닙니다.',
    password:
      password.length >= 8 ? undefined : '비밀번호는 8자 이상이어야 합니다.',
  }
})
export const IsValidCredentialAtom = atom(get => {
  const { email, password } = get(credentialStateAtom)
  return email === undefined && password === undefined
})

export const refreshTokenAtom = atomWithStorage<TokenResponse['refresh_token']>(
  'refreshToken',
  ''
)
export const accessTokenAtom = atomWithStorage<TokenResponse['access_token']>(
  'accessToken',
  ''
)

export const headerConfigAtom = atom(get => ({
  headers: { Authorization: `Bearer ${get(accessTokenAtom)}` },
}))
