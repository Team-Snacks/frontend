export type AsciiRow = { val: string; desc: string }
const special = [
  { val: 'NUL(\\0)', desc: 'null character' },
  { val: 'SOH', desc: 'start of heading' },
  { val: 'STX', desc: 'start of text' },
  { val: 'ETX', desc: 'end of text' },
  { val: 'EOT', desc: 'end of transmission' },
  { val: 'ENQ', desc: 'enquiry' },
  { val: 'ACK', desc: 'acknowledge' },
  { val: 'BEL(\\a)', desc: 'bell' },
  { val: 'BS(\\b)', desc: 'backspace' },
  { val: 'HT(\\t)', desc: 'horizontal tab' },
  { val: 'LF(\\n)', desc: 'new line' },
  { val: 'VT(\\v)', desc: 'vertical tab' },
  { val: 'FF(\\f)', desc: 'form feed' },
  { val: 'CR(\\r)', desc: 'carriage ret' },
  { val: 'SO', desc: 'shift out' },
  { val: 'SI', desc: 'shift in' },
  { val: 'DLE', desc: 'data link escape' },
  { val: 'DC1', desc: 'device control 1' },
  { val: 'DC2', desc: 'device control 2' },
  { val: 'DC3', desc: 'device control 3' },
  { val: 'DC4', desc: 'device control 4' },
  { val: 'NAK', desc: 'negative ack.' },
  { val: 'SYN', desc: 'synchronous idle' },
  { val: 'ETB', desc: 'end of trans. blk' },
  { val: 'CAN', desc: 'cancel' },
  { val: 'EM', desc: 'end of medium' },
  { val: 'SUB', desc: 'substitute' },
  { val: 'ESC', desc: 'escape' },
  { val: 'FS', desc: 'file separator' },
  { val: 'GS', desc: 'group separator' },
  { val: 'RS', desc: 'record separator' },
  { val: 'US', desc: 'unit separator' },
  { val: 'SPACE', desc: 'space character' },
]
const alpha = Array.from(Array(26)).map((_, i) => i + 65)
const lowerCase = alpha.map(x => String.fromCharCode(x + 32))
const upperCase = alpha.map(x => String.fromCharCode(x))
const printable = [
  ...'!"#$%&\'()*+,-./0123456789:;<=>?@'.split(''),
  ...upperCase,
  ...'[]^_`'.split(''),
  ...lowerCase,
  ...'{|}~'.split(''),
  'DEL',
].map(val => ({ val, desc: `character ${val}` }))
export const asciiTable: AsciiRow[] = [...special, ...printable]
