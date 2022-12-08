import { Paper, Stack } from '@mantine/core'
import { Logo } from 'components/common'
import { Button, Text } from '@mantine/core'
import { CredentialInput } from './CredentialInput'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <>
      <CredentialInput />
      <Button variant='default'>회원가입</Button>
    </>
  )
}

export const TryLogin = () => (
  <>
    <Text>이미 계정이 있으신가요?</Text>
    <Button component={Link} to='/auth/login' variant='default'>
      로그인
    </Button>
  </>
)


export const OAuthRegister = () => (
  <>
    <Text>또는</Text>
    <Button variant='default'>구글 이메일로 회원가입</Button>
  </>
)

export const RegisterPanel = () => {
  return (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Register />
        <TryLogin />
        <OAuthRegister />
      </Stack>
    </Paper>
  )
}
