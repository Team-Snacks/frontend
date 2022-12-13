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
