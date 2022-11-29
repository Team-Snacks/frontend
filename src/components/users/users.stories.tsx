import { StoreWidgetType, Widgets } from 'common'
import { Grid } from './Grid'
import { Navigation as nav } from './Navigation'
import type { Story } from '@ladle/react'
import { layoutDummy, storeDummy } from 'dummy'
import { StoreWidget } from './StoreWidget'
import { Store as store } from './Store'

export const Navigation = nav

export const grid: Story<{ widgets: Widgets }> = ({ widgets }) => (
  <Grid widgets={widgets} />
)
grid.args = { widgets: layoutDummy }

export const Store = store

export const storeWidget: Story<{
  widgetData: StoreWidgetType
}> = ({ widgetData }) => <StoreWidget widgetData={widgetData} />
storeWidget.args = { widgetData: storeDummy[0] }
