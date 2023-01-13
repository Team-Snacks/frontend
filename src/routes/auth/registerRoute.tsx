import { Link } from '@tanstack/react-router'
import { Button, Paper, Stack, Text, Title } from '@mantine/core'
import { Logo } from 'components/common'
import { OAuthRegister, Register } from '../../components/login/Register'
import { authRoute } from './authRoute'
// import { authRoute } from 'routes'

/** /auth */
export const registerRoute = authRoute.createRoute({
  path: '/',
  component: () => (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Title order={2}>회원가입</Title>
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
