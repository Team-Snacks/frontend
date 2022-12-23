import { accessTokenAtom } from 'atoms'
import { useAtomValue } from 'jotai'
import { Navigate } from 'react-router-dom'
import { Grid } from './Grid'
import { Navigation } from './Navigation'
import { Store } from './Store'

export const Users = () => {
  const access = useAtomValue(accessTokenAtom)

  return (
    <div>
      <Navigation />
      <Store />
      <Grid />
      {!access ? <Navigate to='/about' /> : <></>}
    </div>
  )
}
