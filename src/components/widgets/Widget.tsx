import { useSortable } from '@dnd-kit/sortable'
import { Widgets, Widget } from 'common'
import { Weather } from './Weather'
import { Image } from '@mantine/core'
import remove from 'assets/remove.png'
import { useAtomValue } from 'jotai'
import { storeVisibleAtom } from 'Atoms'

type Props = {
  layout: Widgets
  widget: Widget
}
export const BaseWidget = ({ layout, widget }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.uuid })
  const style: React.CSSProperties = {
    // transform: CSS.Transform.toString(transform), //이동 모션과 관련된 부분
    // transition, //전환 동작과 관련된 부분 https://docs.dndkit.com/presets/sortable/usesortable#transition-1
    gridColumn: `${widget.pos.x + 1}/${widget.pos.x + widget.size.w + 1}`,
    gridRow: `${widget.pos.y + 1}/${widget.pos.y + widget.size.h + 1}`,
    border: 'solid 1px black',
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
    console.log(widget)
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
