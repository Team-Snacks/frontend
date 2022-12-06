import { LoginPanel, RegisterPanel } from 'components'
import { rootRoute } from './root'

const auth = rootRoute.createRoute({ path: 'auth' })

const register = auth.createRoute({ path: '/', component: RegisterPanel })
const login = auth.createRoute({ path: 'login', component: LoginPanel })

export const authRouteConfig = auth.addChildren([register, login])
