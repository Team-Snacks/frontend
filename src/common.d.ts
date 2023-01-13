import { widgetNames } from 'common.keys'
import { Pos, Size } from 'vec2'

export type Email = string
export type Identifier = string | Email

export type Credential = {
  email: Identifier
  password: string
}

export type WidgetName = typeof widgetNames[number]

export type Widget = {
  duuid: string
  name: WidgetName
  pos: Pos
  size: Size
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}
export type Widgets = Widget[]
export type WidgetDimension = Pick<Widget, 'pos' | 'size'>

export type StoreWidgetType = {
  name: string
  description: string
  image: string
}
export type StoreWidgets = StoreWidgetType[]

export type TokenResponse = {
  access_token: string
  refresh_token: string
}

export type WidgetProps = {
  widget: Widget
}

export type ValueOf<T> = T[keyof T]
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  ValueOf<U>
