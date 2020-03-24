import React from 'react'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'
import Layout from '../components/Layout'
/**
 * Example following -
 * [XState - An introduction - Finite State Machines in React - Toggle](https://www.youtube.com/watch?v=iDZxjJYMOUQ)
 */

const toggleMachine = new Machine({
  id: 'toggleMachine',
  devTools: true,
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'active',
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
      },
    },
  },
})

const Toggle = () => {
  const [current, send] = useMachine(toggleMachine, { devTools: true })

  return (
    <Layout>
      <button
        type="button"
        onClick={() => {
          send('TOGGLE')
        }}
      >
        Toggle
      </button>

      {current.matches('active') && <span>We are active</span>}
      {current.matches('inactive') && <span>We are inactive</span>}
    </Layout>
  )
}
export default Toggle
