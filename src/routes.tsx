import { LoginPanel, RegisterPanel } from 'components'
import { FrontPage } from 'components/front'
import { Users } from 'components/users'

export const paths = {
  root: '/',
  about: '/about',
  register: '/auth',
  login: '/auth/login',
} as const

export const authRoutes = [
  {
    path: paths.register,
    element: <LoginPanel />,
  },
  {
    path: paths.login,
    element: <RegisterPanel />,
  },
]
export const routes = [
  {
    path: paths.root,
    element: <Users />,
  },
  {
    path: paths.about,
    element: <FrontPage />,
  },
  ...authRoutes,
]
