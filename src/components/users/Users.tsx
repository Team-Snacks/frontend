import { io } from 'socket.io-client'
import { Grid } from './Grid'
import { Navigation } from './Navigation'
import { Store } from './Store'

export const socket = io(import.meta.env.VITE_SERVER_IP)

export const Users = () => {
  return (
    <div>
      <Navigation />
      <Store />
      <Grid />
    </div>
  )
}
