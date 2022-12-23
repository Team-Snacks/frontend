import { useSortable } from '@dnd-kit/sortable'
import { WidgetProps } from 'common'
import { Weather } from './Weather'
import { Card, Image } from '@mantine/core'
import remove from 'assets/remove.png'
import { useAtom, useAtomValue } from 'jotai'
import { headerConfigAtom, storeVisibleAtom, widgetsAtom } from 'atoms'
import axios from 'axios'
import { plus, pos } from 'vec2'
import { pipe } from '@mobily/ts-belt'
import { Ascii } from './Ascii/Ascii'
import { Memo } from './Memo'

const removeButtonStyle: React.CSSProperties = {
  width: '15px',
  height: '15px',
  top: '0px',
  right: '0px',
  position: 'absolute',
  zIndex: '1',
  alignSelf: 'end',
}

export const BaseWidget = ({ widget }: WidgetProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.duuid })
  const at = pipe(widget.pos, plus(pos(1, 1)))
  const all = pipe(at, plus(widget.size))
  const [widgets, setWidgets] = useAtom(widgetsAtom)
  const config = useAtomValue(headerConfigAtom)
  const storeVisible = useAtomValue(storeVisibleAtom)

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
    transition,
    gridColumn: `${at.x}/${all.x}`,
    gridRow: `${at.y}/${all.y}`,
    position: 'relative',
  }

  const selectWidget = () => {
    switch (widget.name) {
      case 'weather':
        return <Weather widget={widget} />
      case 'ascii':
        return <Ascii />
      case 'memo':
        return <Memo widget={widget} />
      default:
        return <div>{widget.name}</div> //추후 위젯 추가
    }
  }
  const deleteWidget = () => {
    const deletedWidgets = widgets.filter(ele => ele.duuid !== widget.duuid)
    setWidgets(deletedWidgets)
    axios
      .delete(
        `${import.meta.env.VITE_SERVER_IP}/users/widgets/${widget.duuid}`,
        config
      )
      .then(console.log)
      .catch(console.log)
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card
        {...listeners}
        shadow='md'
        radius='lg'
        withBorder
        sx={{ height: '100%' }}
      >
        {selectWidget()}
      </Card>
      {storeVisible ? (
        <Image src={remove} style={removeButtonStyle} onClick={deleteWidget} />
      ) : null}
    </div>
  )
}
