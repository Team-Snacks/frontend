import { FrontPage, Users } from 'components'
import { createRouteConfig } from '@tanstack/react-router'
import { authRouteConfig } from './auth'

export const rootRoute = createRouteConfig()

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: FrontPage,
})

const usersRoute = rootRoute.createRoute({
  path: 'users',
  component: Users,
})

export const routeConfig = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  authRouteConfig,
])
