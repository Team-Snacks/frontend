import { Button, Popover, Image } from '@mantine/core'
import { Logo } from 'components/common'
import { storeVisibleAtom } from 'Atoms'
import { useAtom } from 'jotai'
import { useState } from 'react'
import shop from 'assets/shop.png'
import user from 'assets/user.png'

export const Navigation = () => {
  const [storeVisible, setStoreVisible] = useAtom(storeVisibleAtom)
  const [opened, setOpened] = useState(false)

  const navStyle: React.CSSProperties = {
    background: '#252525',
    display: 'flex',
  }
  const iconStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    filter: 'invert(100%)',
  }

  return (
    <nav style={navStyle}>
      <Logo />
      <Image
        src={shop}
        style={iconStyle}
        onClick={() => setStoreVisible(storeVisible ? false : true)}
      >
        스토어
      </Image>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Image
            src={user}
            style={{ ...iconStyle, marginLeft: 'auto' }}
            onClick={() => setOpened(opened ? false : true)}
          >
            유저
          </Image>
        </Popover.Target>
        <Popover.Dropdown>
          <Button>로그아웃</Button>
        </Popover.Dropdown>
      </Popover>
    </nav>
  )
}
