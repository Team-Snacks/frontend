import { useSortable } from '@dnd-kit/sortable'
import { Widget } from 'common'
import { Weather } from './Weather'
import { Card, Image } from '@mantine/core'
import remove from 'assets/remove.png'
import { useAtomValue } from 'jotai'
import { storeVisibleAtom } from 'atoms'
import { plus, pos } from 'vec2'
import { pipe } from '@mobily/ts-belt'

const removeButtonStyle: React.CSSProperties = {
  width: '15px',
  height: '15px',
  top: '0px',
  right: '0px',
  position: 'absolute',
  zIndex: '1',
  alignSelf: 'end',
}

type Props = {
  widget: Widget
}
export const BaseWidget = ({ widget }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.uuid })

  const at = pipe(widget.pos, plus(pos(1, 1)))
  const all = pipe(at, plus(widget.size))

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
    transition,
    gridColumn: `${at.x}/${all.x}`,
    gridRow: `${at.y}/${all.y}`,
    position: 'relative',
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
    // socket.emit('ws::delete-widget', widget)
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
