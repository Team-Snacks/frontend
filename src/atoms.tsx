import { Credential } from 'common'
import { atom } from 'jotai'
import { pos } from 'vec2'

export const storeVisibleAtom = atom(false)
export const cursorInWidgetAtom = atom({
  pos: pos(0, 0),
  name: '',
})

export const credentialAtom = atom<Credential>({ id: '', password: '' })
