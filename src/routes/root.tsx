import { FrontPage, Users } from 'components'
import { createRouteConfig, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Button } from '@mantine/core'
import { LoginPanel, RegisterPanel } from 'components'


export const rootRoute = createRouteConfig({
  component: () => (
    <>
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
    </>
  ),
})

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: FrontPage,
})

const usersRoute = rootRoute.createRoute({
  path: 'users',
  component: Users,
})

const auth = rootRoute.createRoute({ path: 'auth' })

const register = auth.createRoute({ path: '/', component: RegisterPanel })
const login = auth.createRoute({ path: 'login', component: LoginPanel })

const authRouteConfig = auth.addChildren([register, login])

export const routeConfig = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  authRouteConfig,
])
