import React from 'react'
import { ToggleProvider } from './ToggleMachine'
import { DataProvider } from './DataMachine'

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  )
}
// This context provider allows to add multiple contexts in the root of the app
function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<ToggleProvider />, <DataProvider />]}>
      {children}
    </ProviderComposer>
  )
}

export default ContextProvider
