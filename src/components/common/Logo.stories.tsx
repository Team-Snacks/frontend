import { Text, Image, UnstyledButton } from '@mantine/core'
import icon from 'assets/icon.png'

export const Logo = () => (
  <UnstyledButton style={{ display: 'flex' }}>
    <Image src={icon} width='30px' height='30px' />
    <Text fz='lg' sx={{ fontFamily: 'Courier' }} style={{ color: '#ffffff' }}>
      Snacks
    </Text>
  </UnstyledButton>
)
