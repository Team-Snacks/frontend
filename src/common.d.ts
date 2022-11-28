import { Pos, Size } from 'vec2'

export type Email = string
export type Identifier = string | Email

export interface Credential {
  id: Identifier
  password: string
}

export interface WidgetType {
  uuid: string
  name: string
  pos: Pos
  size: Size
  data: JSON
}
export type Widgets = WidgetType[]
export type WidgetDimension = Pick<WidgetType, 'pos' | 'size'>
export type StoreWidgetType = {
  name: string
  discription: string
  image: string
}

export type StoreWidgets = StoreWidgetType[]
