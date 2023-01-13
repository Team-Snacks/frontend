import { StoreWidgets, Widget, Widgets } from 'common'
import { pos, size } from 'vec2'

export const layoutDummy: Widgets = [
  // {
  //   duuid: 'weather01',
  //   name: 'weather',
  //   pos: pos(2, 1),
  //   size: size(2, 2),
  //   data: JSON.parse('{"aa" : "bb"}'),
  // },
  {
    duuid: 'memo02',
    name: 'memo',
    pos: pos(2, 0),
    size: size(1, 1),
    data: undefined,
  },
  // {
  //   duuid: 'weather03',
  //   name: 'weather',
  //   pos: pos(3, 0),
  //   size: size(1, 1),
  //   data: JSON.parse('{"aa" : "bb"}'),
  // },
  {
    duuid: 'ascii04',
    name: 'ascii',
    pos: pos(4, 1),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  // {
  //   duuid: 'todo05',
  //   name: 'todo',
  //   pos: pos(4, 2),
  //   size: size(1, 1),
  //   data: JSON.parse('{"aa" : "bb"}'),
  // },
  {
    duuid: 'memo06',
    name: 'memo',
    pos: pos(0, 2),
    size: size(1, 1),
    data: undefined,
  },
  {
    duuid: 'timer07',
    name: 'timer',
    pos: pos(1, 2),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
]

export const widgetDummy: Widget = {
  duuid: 'weather01',
  name: 'weather',
  pos: pos(0, 0),
  size: size(1, 1),
  data: JSON.parse('{"aa" : "bb"}'),
}

// 이런 모양입니다
// [1][2][2][ ][ ]
// [3][5][ ][4][4]
// [3][ ][ ][4][4]
export const mock: Widgets = [
  {
    duuid: 'weather01',
    name: 'weather',
    pos: pos(0, 0),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    duuid: 'memo02',
    name: 'memo',
    pos: pos(1, 0),
    size: size(2, 1),
    data: undefined,
  },
  {
    duuid: 'weather03',
    name: 'weather',
    pos: pos(0, 1),
    size: size(1, 2),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    duuid: 'ascii04',
    name: 'ascii',
    pos: pos(3, 1),
    size: size(2, 2),
    data: JSON.parse('{"aa" : "bb"}'),
  },
  {
    duuid: 'todo05',
    name: 'todo',
    pos: pos(1, 1),
    size: size(1, 1),
    data: JSON.parse('{"aa" : "bb"}'),
  },
]
export const mock1: Widgets = [
  { ...mock[0], pos: pos(1, 1) },
  mock[1],
  mock[2],
  mock[3],
  { ...mock[4], pos: pos(0, 0) },
]
export const mock2: Widgets = [
  { ...mock[0], pos: pos(2, 2) },
  mock[1],
  mock[2],
  mock[3],
  mock[4],
]
export const mock3: Widgets = [
  mock[0],
  { ...mock[1], pos: pos(2, 0) },
  mock[2],
  mock[3],
  mock[4],
]
export const mock4: Widgets = [
  mock[0],
  mock[1],
  { ...mock[2], pos: pos(2, 1) },
  mock[3],
  mock[4],
]
export const mock5: Widgets = [
  mock[0],
  mock[1],
  mock[2],
  { ...mock[3], pos: pos(3, 0) },
  mock[4],
]
export const mock6: Widgets = [
  mock[0],
  mock[1],
  mock[2],
  mock[3],
  { ...mock[4], pos: pos(2, 1) },
]

export const storeDummy: StoreWidgets = [
  {
    name: 'memo',
    description: '간단한 메모를 할 수 있습니다',
    image: 'https://picsum.photos/200',
  },
  // {
  //   name: 'weather',
  //   description: '날씨 정보를 보여줍니다',
  //   image: 'https://picsum.photos/200',
  // },
  // {
  //   name: 'todo',
  //   description: '할 일을 체크할 수 있습니다',
  //   image: 'https://picsum.photos/200',
  // },
  {
    name: 'timer',
    description: '타이머를 설정할 수 있습니다',
    image: 'https://picsum.photos/200',
  },
  {
    name: 'ascii',
    description: '아스키 코드 표를 참조합니다',
    image: 'https://picsum.photos/200',
  },
]
