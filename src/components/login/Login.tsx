import { Button, Text } from '@mantine/core'
import { CredentialInput } from './CredentialInput'

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


