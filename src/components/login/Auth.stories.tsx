import { createMemoryRouter, RouterProvider, Link } from 'react-router-dom'

const Foo = () => (
  <div>
    root
    <Link to='/auth/login'>login</Link>
    <Link to='/auth'>register</Link>
  </div>
)

const Register = () => (
  <div>
    register
    <Link to='/'>home</Link>
    <Link to='/auth/login'>login</Link>
  </div>
)

const Login = () => (
  <div>
    login
    <Link to='/'>home</Link>
    <Link to='/auth'>register</Link>
  </div>
)

const routes = [
  {
    path: '/',
    element: <Foo />,
  },
  {
    path: '/auth',
    element: <Register />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
]
const router = createMemoryRouter(routes, {
  initialEntries: ['/auth/login'],
})
export const AuthRouter = () => <RouterProvider router={router} />
