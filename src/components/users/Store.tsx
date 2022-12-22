import { Image, Navbar, ScrollArea } from '@mantine/core'
import { headerConfigAtom, storeVisibleAtom } from 'atoms'
import { storeDummy } from 'dummy'
import { useAtom, useAtomValue } from 'jotai'
import arrow from 'assets/arrow.png'
import { StoreWidget } from './StoreWidget'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Store = () => {
  const [storeVisible, setStoreVisible] = useAtom(storeVisibleAtom)
  const [storeWidgets, setStoreWidgets] = useState(storeDummy)
  const tmpStyle: React.CSSProperties = {
    background: '#494949',
    width: '250px',
    height: 'auto',
    position: 'absolute',
    top: '47px',
    zIndex: '2',
  }
  // const config = useAtomValue(headerConfigAtom)

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_SERVER_IP}/widgets`, config)
  //     .then(res => {
  //       setStoreWidgets(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  return (
    <div>
      {storeVisible ? (
        <Navbar style={tmpStyle}>
          <Image
            src={arrow}
            onClick={() => setStoreVisible(false)}
            width='30px'
            style={{
              filter: 'invert(100%)',
              alignSelf: 'end',
            }}
          />
          <ScrollArea type='never'>
            {storeWidgets.map((ele, index) => (
              <StoreWidget widgetData={ele} key={index} />
            ))}
          </ScrollArea>
        </Navbar>
      ) : null}
    </div>
  )
}
