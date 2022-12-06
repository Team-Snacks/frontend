import { LoginPanel, RegisterPanel } from 'components'
import { createRouteConfig } from '@tanstack/react-router'

const rootRoute = createRouteConfig()
const indexRoute = rootRoute.createRoute({
  path: '/',
  component: () => <div>Index</div>, // FrontPage,
})
const usersRoute = rootRoute.createRoute({
  path: '/users',
  component: () => <div>Users</div>, // Users,
})
const authRoute = rootRoute.createRoute({
  path: '/auth',
  component: RegisterPanel,
})
const loginRoute = authRoute.createRoute({
  path: '/login',
  component: LoginPanel,
})
const authRouteConfig = authRoute.addChildren([loginRoute])
export const routeConfig = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  authRouteConfig,
])
