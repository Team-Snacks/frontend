import { Button, Paper, Stack, Text } from '@mantine/core'
import { LinkButton, Logo } from 'components/common'
import { CredentialInput } from './CredentialInput'
import { paths } from 'routes'

export const Credential = CredentialInput

export const Login = () => (
  <>
    <CredentialInput />
    <Button variant='default'>로그인</Button>
  </>
)

export const OAuthLogin = () => (
  <>
    <Text>또는</Text>
    <Button variant='default'>구글 이메일로 로그인</Button>
  </>
)

export const TryRegister = () => (
  <>
    <Text>아직 계정이 없으신가요?</Text>
    <LinkButton to={paths.register}>회원가입</LinkButton>
  </>
)

export const LoginPanel = () => {
  return (
    <Paper>
      <Stack align='center'>
        <Logo />
        <Login />
        <TryRegister />
        <OAuthLogin />
      </Stack>
    </Paper>
  )
}
