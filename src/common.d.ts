import { Pos, Size } from 'vec2'

export type Email = string
export type Identifier = string | Email

export interface Credential {
  email: Identifier
  password: string
}

export interface Widget {
  uuid: string
  name: string
  pos: Pos
  size: Size
  data: JSON
}
export type Widgets = Widget[]
export type WidgetDimension = Pick<Widget, 'pos' | 'size'>

export type StoreWidgetType = {
  name: string
  discription: string
  image: string
}
export type StoreWidgets = StoreWidgetType[]

export type Token = {
  accessToken?: string
  refreshToken?: string
}

export type ValueOf<T> = T[keyof T]
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  ValueOf<U>
