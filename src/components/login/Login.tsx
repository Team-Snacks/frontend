import { Button, Paper, Stack, Text } from '@mantine/core'
import { LinkButton, Logo } from 'components/common'
import { CredentialInput } from './CredentialInput'
import { paths } from 'routes'
import axios from 'axios'
import { useAtomValue, useSetAtom } from 'jotai'
import { accessTokenAtom, credentialAtom, refreshTokenAtom } from 'atoms'
import { TokenResponse } from 'common'

export const Credential = CredentialInput

export const Login = () => {
  const credential = useAtomValue(credentialAtom)
  const setAccess = useSetAtom(accessTokenAtom)
  const setRefresh = useSetAtom(refreshTokenAtom)

  return (
    <>
      <CredentialInput />
      <Button
        onClick={() =>
          axios
            .post<TokenResponse>(
              `${import.meta.env.VITE_SERVER_IP}/auth/login`,
              credential
            )
            .then(res => {
              const { access_token, refresh_token } = res.data
              console.log(
                `response: ${JSON.stringify(res.data)}(${res.status})`
              )
              setAccess(access_token)
              setRefresh(refresh_token)
            })
            .catch(console.log)
        }
      >
        로그인
      </Button>
    </>
  )
}

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
