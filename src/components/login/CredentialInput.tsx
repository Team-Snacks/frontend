import { TextInput } from '@mantine/core'
import { useAtom, useAtomValue } from 'jotai'
import { credentialAtom, credentialStateAtom } from 'atoms'

/**
 * 전역 credentialAtom 입력창
 */
export const CredentialInput = () => {
  const [cred, setCred] = useAtom(credentialAtom)
  const valid = useAtomValue(credentialStateAtom)
  return (
    <>
      <TextInput
        withAsterisk
        placeholder='아이디 혹은 이메일'
        value={cred.email}
        error={valid.email}
        onChange={event =>
          setCred({ ...cred, email: event.currentTarget.value })
        }
      />
      <TextInput
        withAsterisk
        placeholder='비밀번호'
        value={cred.password}
        error={valid.password}
        onChange={event =>
          setCred({ ...cred, password: event.currentTarget.value })
        }
      />
    </>
  )
}
