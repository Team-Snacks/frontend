import { Button, Text } from '@mantine/core'
import { CredentialInput } from './CredentialInput'

export const Register = () => {
  return (
    <>
      <CredentialInput />
      <Button variant='default'>회원가입</Button>
    </>
  )
}

export const OAuthRegister = () => (
  <>
    <Text>또는</Text>
    <Button variant='default'>구글 이메일로 회원가입</Button>
  </>
)
