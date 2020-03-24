import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { Machine, assign } from 'xstate'

// Mock data
const allData = new Array(25).fill(0).map((_val, i) => i + 1)
const perPage = 10

// Data Creation
const DataContext = createContext(null)

// Creating the Data Context Provider, will be used just on the Context Provider
// We also add protection against bad reloads with using `useMemo`
export const DataProvider = ({ children }) => {
  const dataMachine = new Machine({
    id: 'dataMachine',
    initial: 'loading',
    context: {
      data: [],
    },
    states: {
      loading: {
        invoke: {
          id: 'dataLoader',
          src: (context, _event) => {
            return (callback, _onEvent) => {
              setTimeout(() => {
                const { data } = context
                const newData = allData.slice(data.length, data.length + perPage)
                const hasMore = newData.length === perPage

                if (hasMore) {
                  callback({ type: 'DONE_MORE', newData })
                } else {
                  callback({ type: 'DONE_COMPLETE', newData })
                }
              }, 1000)
            }
          },
        },
        on: {
          DONE_MORE: {
            target: 'more',
            actions: assign({
              data: ({ data }, { newData = [] }) => [...data, ...newData],
            }),
          },
          DONE_COMPLETE: {
            target: 'complete',
            actions: assign({
              data: ({ data }, { newData = [] }) => [...data, ...newData],
            }),
          },
          FAIL: 'failure',
        },
      },
      more: {
        on: {
          LOAD: 'loading',
        },
      },
      complete: { type: 'final' },
      failure: { type: 'final' },
    },
  })
  const [current, send] = useMachine(dataMachine, { devTools: true })
  return <DataContext.Provider value={{ current, send }}>{children}</DataContext.Provider>
}

// Custom Hook to expose the context without having to deal with
export const useDataContext = () => {
  const filterContext = useContext(DataContext)
  return filterContext
}
