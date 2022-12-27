import { Popover, Image, Button } from '@mantine/core'
import { Logo } from 'components/common'
import { accessTokenAtom, refreshTokenAtom, storeVisibleAtom } from 'atoms'
import { useAtom, useSetAtom } from 'jotai'
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
  const setAccess = useSetAtom(accessTokenAtom)
  const setRefresh = useSetAtom(refreshTokenAtom)

  const logout = () => {
    setAccess('')
    setRefresh('')
  }

  return (
    <nav style={navStyle}>
      <Logo />
      <Image
        src={shop}
        style={iconStyle}
        onClick={() => setStoreVisible(!storeVisible)}
      >
        스토어
      </Image>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Image
            src={user}
            style={{ ...iconStyle, marginLeft: 'auto' }}
            onClick={() => setOpened(!opened)}
          >
            유저
          </Image>
        </Popover.Target>
        <Popover.Dropdown>
          <Button variant='default' onClick={logout}>
            로그아웃
          </Button>
        </Popover.Dropdown>
      </Popover>
    </nav>
  )
}
