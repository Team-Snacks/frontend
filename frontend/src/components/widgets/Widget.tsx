import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Widgets, WidgetType } from 'common'
import { Weather } from './Weather'

export const Widget = ({
  layout,
  widget,
}: {
  layout: Widgets
  widget: WidgetType
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.uuid })
  const style = {
    // transform: CSS.Transform.toString(transform), //이동 모션과 관련된 부분
    // transition, //전환 동작과 관련된 부분 https://docs.dndkit.com/presets/sortable/usesortable#transition-1
    gridColumn: `${
      widget.pos.v[0] + 1 + '/' + (widget.pos.v[0] + widget.size.v[0] + 1)
    }`,
    gridRow: `${
      widget.pos.v[1] + 1 + '/' + (widget.pos.v[1] + widget.size.v[1] + 1)
    }`,
    border: 'solid 1px black',
  }
  const selectWidget = () => {
    switch (widget.name) {
      case 'weather':
        return <Weather widgetData={widget}></Weather>
      default:
        return <div>{widget.name}</div> //추후 위젯 추가
    }
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {selectWidget()}
    </div>
  )
}
