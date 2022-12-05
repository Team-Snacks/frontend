import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { LoginPanel, RegisterPanel } from 'components'
import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
  createRouteConfig,
} from '@tanstack/react-router'
import { Button } from '@mantine/core'

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

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

const routeConfig = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  authRouteConfig,
])

const router = createReactRouter({ routeConfig })

export const App = () => (
  <>
    <RouterProvider router={router}>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <Button>
        <Link to='/'>Home</Link>
      </Button>
      <Button>
        <Link to='/users'>Users</Link>
      </Button>
      <Button>
        <Link to='/auth'>Register</Link>
      </Button>
      <Button>
        <Link to='/auth/login'>Login</Link>
      </Button>
      <Outlet />
      <TanStackRouterDevtools />
    </RouterProvider>
  </>
)
