import { Link } from '@tanstack/react-router'
import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import { Logo } from 'components/common'
import { Login, OAuthLogin } from '../../components/login/Login'
import { authRoute } from './authRoute'

/** /auth/login */
export const loginRoute = authRoute.createRoute({
  path: '/login',
  component: () => (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Title order={2}>로그인</Title>
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
