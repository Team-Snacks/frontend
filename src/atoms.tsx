import { Credential } from 'common'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { pos } from 'vec2'

export const storeVisibleAtom = atom(false)
export const cursorInWidgetAtom = atom({
  pos: pos(0, 0),
  name: '',
})

export const credentialAtom = atom<Credential>({ email: '', password: '' })

// TODO: store in COOKIE
export const refreshToken = atomWithStorage('refreshToken', undefined)

export const accessToken = atomWithStorage('accessToken', undefined)
