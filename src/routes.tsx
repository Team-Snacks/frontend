import { FrontPage, LoginPanel, RegisterPanel, Users } from 'components'
import { createRouteConfig } from '@tanstack/react-router'

const rootRoute = createRouteConfig()

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: FrontPage,
})

const usersRoute = rootRoute.createRoute({
  path: 'users',
  component: Users,
})

const authRoute = rootRoute.createRoute({ path: 'auth' })
const authIndexRoute = authRoute.createRoute({
  path: '/',
  component: RegisterPanel,
})
const loginRoute = authRoute.createRoute({
  path: 'login',
  component: LoginPanel,
})
const authRouteConfig = authRoute.addChildren([authIndexRoute, loginRoute])

export const routeConfig = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  authRouteConfig,
])
