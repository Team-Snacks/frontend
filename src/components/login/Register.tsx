import { Paper, Stack } from '@mantine/core'
import { LinkButton, Logo } from 'components/common'
import { Button, Text } from '@mantine/core'
import { CredentialInput } from './CredentialInput'
import { paths } from 'routes'
import axios from 'axios'
import { useAtomValue } from 'jotai'
import { credentialAtom } from 'atoms'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const credential = useAtomValue(credentialAtom)
  const navigate = useNavigate()

  return (
    <>
      <CredentialInput />
      <Button
        onClick={() => {
          axios
            .post(`${import.meta.env.VITE_SERVER_IP}/auth/`, credential)
            .then(() => navigate(paths.login))
            .catch(console.log)
        }}
      >
        회원가입
      </Button>
    </>
  )
}

export const TryLogin = () => (
  <>
    <Text>이미 계정이 있으신가요?</Text>
    <LinkButton to={paths.login}>로그인</LinkButton>
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
