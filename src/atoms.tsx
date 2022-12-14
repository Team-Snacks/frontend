import { Credential, TokenResponse } from 'common'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { pos } from 'vec2'

export const storeVisibleAtom = atom(false)
export const cursorInWidgetAtom = atom({
  pos: pos(0, 0),
  name: '',
})

export const credentialAtom = atom<Credential>({ email: '', password: '' })

export const refreshTokenAtom = atomWithStorage<TokenResponse['refreshToken']>(
  'refreshToken',
  undefined
)
export const accessTokenAtom = atomWithStorage<TokenResponse['accessToken']>(
  'accessToken',
  undefined
)
