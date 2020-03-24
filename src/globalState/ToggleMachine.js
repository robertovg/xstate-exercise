import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { Machine } from 'xstate'

// Toggle Creation
const ToggleContext = createContext(null)

// Creating the Toggle Context Provider, will be used just on the Context Provider
// We also add protection against bad reloads with using `useMemo`
export const ToggleProvider = ({ children }) => {
  const toggleMachine = new Machine({
    id: 'toggleMachine',
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
  const [current, send] = useMachine(toggleMachine, { devTools: true })
  return <ToggleContext.Provider value={{ current, send }}>{children}</ToggleContext.Provider>
}

// Custom Hook to expose the context without having to deal with
export const useToggleContext = () => {
  const filterContext = useContext(ToggleContext)
  return filterContext
}
