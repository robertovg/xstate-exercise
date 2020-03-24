import React from 'react'
import Layout from '../components/Layout'
import { useDataContext } from '../globalState/DataMachine'

/**
 * Example following -
 * [XState - Data Loading Service - Finite State Machines in React
](https://www.youtube.com/watch?v=XaHk9vhmus4)
 */
const DataLoader = () => {
  const { current, send } = useDataContext()
  const { data } = current.context

  return (
    <Layout>
      <ul>
        {data.map(row => (
          <li key={row} style={{ background: 'orange' }}>
            {row}
          </li>
        ))}

        {current.matches('loading') && <li>Loading...</li>}

        {current.matches('more') && (
          <li style={{ background: 'green' }}>
            <button
              type="button"
              onClick={() => {
                send('LOAD')
              }}
            >
              Load More
            </button>
          </li>
        )}
      </ul>
    </Layout>
  )
}

export default DataLoader
