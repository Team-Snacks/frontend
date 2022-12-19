import { ActionIcon, Group, NumberInput, Title } from '@mantine/core'
import { IconPlayerPause, IconPlayerPlay, IconPlayerStop } from '@tabler/icons'
import { useState } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const pad2 = (n: number) => (n < 10 ? `0${n}` : n)

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const [minutes, seconds] = [
    Math.floor(remainingTime / 60),
    remainingTime % 60,
  ].map(pad2)

  return (
    <Title>
      {minutes}:{seconds}
    </Title>
  )
}

type Status = 'setup' | 'running' | 'paused' | 'finished'

export const Timer = () => {
  const [status, setStatus] = useState<Status>('setup')
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const input = (
    <>
      <Group align='center'>
        <NumberInput
          size='xl'
          variant='unstyled'
          label='Minutes'
          min={0}
          max={59}
          value={minutes}
          onChange={v => {
            if (typeof v === 'number') {
              setMinutes(v)
            }
          }}
        />
        <NumberInput
          size='xl'
          variant='unstyled'
          label='Seconds'
          min={0}
          max={59}
          value={seconds}
          onChange={v => {
            if (typeof v === 'number') {
              setSeconds(v)
            }
          }}
        />
      </Group>
      <ActionIcon onClick={() => setStatus('running')}>
        <IconPlayerPlay />
      </ActionIcon>
    </>
  )

  const pauseButton = (
    <ActionIcon onClick={() => setStatus('paused')}>
      <IconPlayerPause />
    </ActionIcon>
  )
  const unpauseButton = (
    <ActionIcon onClick={() => setStatus('running')}>
      <IconPlayerPlay />
    </ActionIcon>
  )

  const timer = (
    <>
      <CountdownCircleTimer
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
      <Group>
        {status === 'paused' ? unpauseButton : pauseButton}
        <ActionIcon onClick={() => setStatus('setup')}>
          <IconPlayerStop />
        </ActionIcon>
      </Group>
    </>
  )

  return status === 'setup' ? input : timer
}
