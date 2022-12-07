import { RouterProvider, createReactRouter } from '@tanstack/react-router'
import { routeConfig } from 'routes'

const router = createReactRouter({ routeConfig })

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
)
