import { Button } from '@mantine/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type LinkButtonProps = {
  to: string
  children: ReactNode
}
export const LinkButton = ({ to, children }: LinkButtonProps) => (
  <Button component={Link} to={to} variant='default'>
    {children}
  </Button>
)
