import { LoginPanel, RegisterPanel } from 'components'
import { FrontPage } from 'components/front/FrontPage.stories'
import { Users } from 'components/users'

export const authRoutes = [
  {
    path: '/auth/login',
    element: <LoginPanel />,
  },
  {
    path: '/auth',
    element: <RegisterPanel />,
  },
]
export const routes = [
  {
    path: '/',
    element: <Users />,
  },
  {
    path: '/about',
    element: <FrontPage />,
  },
  ...authRoutes,
]
