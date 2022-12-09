import {
  RouterProvider,
  createReactRouter,
  createMemoryHistory,
} from '@tanstack/react-router'
import { rootRoute, loginRoute, registerRoute } from 'routes'

const history = createMemoryHistory({ initialEntries: ['/auth'] })
const routeConfig = rootRoute.addChildren([registerRoute, loginRoute])
declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}
const router = createReactRouter({ routeConfig, history })

export const TestRouter = () => <RouterProvider router={router} />
