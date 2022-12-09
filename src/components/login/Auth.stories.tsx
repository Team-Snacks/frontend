// import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import {
  RouterProvider,
  Link,
  createReactRouter,
  createRouteConfig,
  createMemoryHistory,
} from '@tanstack/react-router'
import { Button, Paper, Stack, Text } from '@mantine/core'
import { Logo } from 'components/common'
import { Login, OAuthLogin } from './Login'
import { OAuthRegister, Register } from './Register'

const rootRoute = createRouteConfig()
const authRoute = rootRoute.createRoute({ path: '/auth' })

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

const indexRoute = authRoute.createRoute({
  path: '/',
  component: () => (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Register />
        <>
          <Text>이미 계정이 있으신가요?</Text>
          <Link to='/auth/login'>
            <Button variant='default'>로그인</Button>
          </Link>
        </>
        <OAuthRegister />
      </Stack>
    </Paper>
  ),
})

const aboutRoute = authRoute.createRoute({
  path: '/login',
  component: () => (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Login />
        <>
          <Text>아직 계정이 없으신가요?</Text>
          <Link to='/auth'>
            <Button variant='default'>회원가입</Button>
          </Link>
        </>
        <OAuthLogin />
      </Stack>
    </Paper>
  ),
})

const history = createMemoryHistory({ initialEntries: ['/auth'] })

const routeConfig = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createReactRouter({ routeConfig, history })

export const TestRouter = () => <RouterProvider router={router} />
