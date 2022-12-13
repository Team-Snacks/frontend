import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { authRoutes } from 'routes'

const router = createMemoryRouter(authRoutes, {
  initialEntries: ['/auth/login'],
})

export const AuthRouter = () => <RouterProvider router={router} />
