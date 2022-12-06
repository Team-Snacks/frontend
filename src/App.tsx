import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
} from '@tanstack/react-router'
import { Button } from '@mantine/core'
import { routeConfig } from 'routes'

const router = createReactRouter({ routeConfig })

export const App = () => (
  <>
    <RouterProvider router={router}>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
      <Link to='/users'>
        <Button>Users</Button>
      </Link>
      <Link to='/auth'>
        <Button>Register</Button>
      </Link>
      <Link to='/auth/login'>
        <Button>Login</Button>
      </Link>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} position='bottom-right' />
    </RouterProvider>
  </>
)
