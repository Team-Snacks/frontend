import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
} from '@tanstack/react-router'
import { Button } from '@mantine/core'
import { routeConfig } from './routes'

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

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
