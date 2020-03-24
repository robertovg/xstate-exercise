/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'
import styled from 'styled-components'
import { percentage, minutes, seconds } from '../util/time'
import 'reset-css/reset.css'
import Layout from '../components/Layout'

const VideoControllerWrapper = styled.div`
  display: block;
  font-size: 18px;

  video {
    max-width: 100%;
    margin-bottom: -3px;
  }

  button {
    background: #a8dba8;
    padding: 0.25rem 0.5rem;
    border: none;
    cursor: pointer;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
  }

  .elapsed {
    width: 100%;
    height: 5px;
  }
  .elapsed-bar {
    transition: width 0.5 ease;
    height: 5px;
    background-color: #629460;
  }

  .timer {
    display: inline-block;
    margin-left: 5px;
  }
`

/**
 * Video State Machine
 */

const videoMachine = Machine({
  id: 'video',
  initial: 'loading',
  devTools: true,

  context: {
    video: null,
    duration: 0,
    elapsed: 0,
  },

  states: {
    loading: {
      on: {
        LOADED: {
          target: 'ready',
          actions: ['setVideo'],
        },
        FAIL: 'failure',
      },
    },
    ready: {
      initial: 'paused',
      states: {
        paused: {
          on: {
            PLAY: {
              target: 'playing',
              actions: ['setElapsed', 'playVideo'],
            },
          },
        },
        playing: {
          on: {
            TIMING: {
              target: 'playing',
              actions: 'setElapsed',
            },
            PAUSE: {
              target: 'paused',
              actions: ['setElapsed', 'pauseVideo'],
            },
            END: 'ended',
          },
        },
        ended: {
          on: {
            PLAY: {
              target: 'playing',
              actions: 'restartVideo',
            },
          },
        },
      },
    },
    failure: {
      type: 'final',
    },
  },
})

/**
 * Action functions
 */

const setVideo = assign({
  video: (_context, event) => event.video,
  duration: (_context, event) => event.video.duration,
})

const setElapsed = assign({
  elapsed: (context, _event) => context.video.currentTime,
})

const playVideo = (context, _event) => {
  context.video.play()
}

const pauseVideo = (context, _event) => {
  context.video.pause()
}

const restartVideo = (context, _event) => {
  context.video.currentTime = 0
  context.video.play()
}

/**
 * Components
 */

/**
 * Example following -
 * [XState - Data Loading Service - Finite State Machines in React
](https://www.youtube.com/watch?v=XaHk9vhmus4)
 */
const VideoController = () => {
  const ref = React.useRef(null)
  const [current, send] = useMachine(videoMachine, {
    actions: { setVideo, setElapsed, playVideo, pauseVideo, restartVideo },
  })
  const { duration, elapsed } = current.context

  return (
    <Layout>
      <VideoControllerWrapper className="container">
        <video
          ref={ref}
          onCanPlay={() => {
            send('LOADED', { video: ref.current })
          }}
          onTimeUpdate={() => {
            send('TIMING')
          }}
          onEnded={() => {
            send('END')
          }}
          onError={() => {
            send('FAIL')
          }}
        >
          <source src="/fox.mp4" type="video/mp4" />
        </video>

        {['paused', 'playing', 'ended'].some(subState => current.matches({ ready: subState })) && (
          <div>
            <ElapsedBar elapsed={elapsed} duration={duration} />
            <Buttons current={current} send={send} />
            <Timer elapsed={elapsed} duration={duration} />
          </div>
        )}
      </VideoControllerWrapper>
    </Layout>
  )
}

const Buttons = ({ current, send }) => {
  if (current.matches({ ready: 'playing' })) {
    return (
      <button
        type="button"
        onClick={() => {
          send('PAUSE')
        }}
      >
        Pause
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        send('PLAY')
      }}
    >
      Play
    </button>
  )
}

const ElapsedBar = ({ elapsed, duration }) => (
  <div className="elapsed">
    <div className="elapsed-bar" style={{ width: `${percentage(duration, elapsed)}%` }} />
  </div>
)

const Timer = ({ elapsed, duration }) => (
  <span className="timer">
    {minutes(elapsed)}:{seconds(elapsed)} of {minutes(duration)}:{seconds(duration)}
  </span>
)
export default VideoController
