import React from 'react'
import Layout from '../components/Layout'
import { useToggleContext } from '../globalState/ToggleMachine'
/**
 * Example following -
 * [XState - An introduction - Finite State Machines in React - Toggle](https://www.youtube.com/watch?v=iDZxjJYMOUQ)
 */

const Toggle = () => {
  const { send, current } = useToggleContext()
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
