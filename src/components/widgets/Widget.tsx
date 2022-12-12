import { useSortable } from '@dnd-kit/sortable'
import { Widget } from 'common'
import { Weather } from './Weather'
import { Image } from '@mantine/core'
import remove from 'assets/remove.png'
import { useAtomValue } from 'jotai'
import { storeVisibleAtom } from 'Atoms'
import axios from 'axios'

type Props = {
  widget: Widget
}
export const BaseWidget = ({ widget }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.uuid })
  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
    transition,
    gridColumn: `${widget.pos.x + 1}/${widget.pos.x + widget.size.w + 1}`,
    gridRow: `${widget.pos.y + 1}/${widget.pos.y + widget.size.h + 1}`,
    border: 'solid 1px black',
    borderRadius: '10px',
    position: 'relative',
  }
  const removeButtonStyle: React.CSSProperties = {
    width: '15px',
    height: '15px',
    top: '0px',
    right: '0px',
    position: 'absolute',
    zIndex: '1',
    alignSelf: 'end',
  }
  const storeVisible = useAtomValue(storeVisibleAtom)

  const selectWidget = () => {
    switch (widget.name) {
      case 'weather':
        return <Weather widgetData={widget} />
      default:
        return <div>{widget.name}</div> //추후 위젯 추가
    }
  }
  const deleteWidget = () => {
    axios
      .post(import.meta.env.VITE_SERVER_IP + 'ws::delete-widget', widget)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} style={{ height: '100%' }}>
        {selectWidget()}
      </div>
      {storeVisible ? (
        <Image src={remove} style={removeButtonStyle} onClick={deleteWidget} />
      ) : null}
    </div>
  )
}
