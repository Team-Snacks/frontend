import { Image, Navbar, ScrollArea } from '@mantine/core'
import { storeVisibleAtom } from 'Atoms'
import { storeDummy } from 'dummy'
import { useAtom } from 'jotai'
import arrow from 'assets/arrow.png'
import { StoreWidget } from './StoreWidget'

export const Store = () => {
  const [storeVisible, setStoreVisible] = useAtom(storeVisibleAtom)
  const tmpStyle: React.CSSProperties = {
    background: '#494949',
    width: '250px',
    height: 'auto',
    position: 'absolute',
    top: '47px',
    zIndex: '2',
  }
  return (
    <div>
      {storeVisible === true ? (
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
            {storeDummy.map((ele, index) => (
              <StoreWidget widgetData={ele} key={index} />
            ))}
          </ScrollArea>
        </Navbar>
      ) : (
        <></>
      )}
    </div>
  )
}
