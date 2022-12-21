import { Credential, TokenResponse, Widgets } from 'common'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { pos } from 'vec2'

export const storeVisibleAtom = atom(false)
export const cursorInWidgetAtom = atom({
  pos: pos(0, 0),
  name: '',
})
export const widgetsAtom = atom<Widgets>([])

export const credentialAtom = atom<Credential>({ email: '', password: '' })

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
