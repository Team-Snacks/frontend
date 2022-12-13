import { Title } from '@mantine/core'
import { LinkButton } from 'components/common'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { paths } from 'routes'
import { FrontPage as FrontPageComp } from './FrontPage'

const router = createMemoryRouter(
  [
    {
      path: paths.about,
      element: <FrontPageComp />,
    },
    {
      path: paths.register,
      element: (
        <>
          <Title>회원가입</Title>
          <LinkButton to={paths.about}>돌아가기</LinkButton>
        </>
      ),
    },
  ],
  {
    initialEntries: [paths.about],
  }
)

export const FrontPage = () => <RouterProvider router={router} />
