import { ActionIcon, Group, NumberInput, Title } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from '@tabler/icons'
import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const pad2 = (n: number) => (n < 10 ? `0${n}` : n)

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const minutes = pad2(Math.floor(remainingTime / 60))
  const seconds = pad2(remainingTime % 60)

  return (
    <Title>
      {minutes}:{seconds}
    </Title>
  )
}

type Status = 'setup' | 'running' | 'paused' | 'finished'

const numInput = (label: string, value: number, fn: (v: number) => void) => (
  <NumberInput
    size='xl'
    styles={{ input: { width: '4rem' } }}
    label={label}
    rightSectionWidth={1}
    min={0}
    max={59}
    value={value}
    onChange={v => {
      if (typeof v === 'number') {
        fn(v)
      }
    }}
    onPointerDown={e => e.stopPropagation()}
    onKeyDown={e => e.stopPropagation()}
  />
)

export const Timer = () => {
  const [status, setStatus] = useState<Status>('setup')
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)

  const PauseButton = () => (
    <ActionIcon
      onClick={() => setStatus('paused')}
      onPointerDown={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
    >
      <IconPlayerPause />
    </ActionIcon>
  )
  const UnpauseButton = () => (
    <ActionIcon
      onClick={() => setStatus('running')}
      onPointerDown={e => e.stopPropagation()}
      onKeyDown={e => e.stopPropagation()}
      style={{ display: 'inline-block' }}
    >
      <IconPlayerPlay />
    </ActionIcon>
  )

  const input = (
    <div>
      <Group position='center' style={{ height: '140px' }}>
        {numInput('minutes', minutes, setMinutes)}
        {numInput('seconds', seconds, setSeconds)}
      </Group>
      <Group position='center'>
        <UnpauseButton />
      </Group>
    </div>
  )

  const timer = (
    <div>
      <Group position='center' style={{ height: '140px' }}>
        <CountdownCircleTimer
          size={140}
          isPlaying={status === 'running'}
          duration={60 * minutes + seconds}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 6, 3, 0]}
          onComplete={() => {
            setStatus('finished')
            return { shouldRepeat: false }
          }}
        >
          {renderTime}
        </CountdownCircleTimer>
      </Group>
      <Group position='center'>
        {status === 'paused' ? <UnpauseButton /> : <PauseButton />}
        <ActionIcon
          onClick={() => setStatus('setup')}
          onPointerDown={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
        >
          <IconPlayerStop />
        </ActionIcon>
      </Group>
    </div>
  )

  return status === 'setup' ? input : timer
}
