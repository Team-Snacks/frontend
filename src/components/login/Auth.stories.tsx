import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { LoginPanel } from './Login'
import { RegisterPanel } from './Register'

const routes = [
  {
    path: '/auth',
    element: <RegisterPanel />,
  },
  {
    path: '/auth/login',
    element: <LoginPanel />,
  },
]
const router = createMemoryRouter(routes, {
  initialEntries: ['/auth/login'],
})
export const AuthRouter = () => <RouterProvider router={router} />
