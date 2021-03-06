import React from 'react'
import { useRoutes } from 'hookrouter'
import OriginalApp from './pages/OriginalApp'
import routesDefinition from './util/routesDefinition'
import Toggle from './pages/Toggle'
import Layout from './components/Layout'
import DataLoader from './pages/DataLoader'
import VideoController from './pages/VideoController'
import ContextProvider from './globalState/ContextProvider'

const NotFoundPage = () => {
  return (
    <Layout>
      <h1>404 Page not found</h1>
    </Layout>
  )
}
const routes = {
  [routesDefinition.home.path]: () => <OriginalApp />,
  [routesDefinition.toggle.path]: () => <Toggle />,
  [routesDefinition.dataLoader.path]: () => <DataLoader />,
  [routesDefinition.videoController.path]: () => <VideoController />,
}

const App = () => {
  const routeResult = useRoutes(routes)
  return <ContextProvider>{routeResult || <NotFoundPage />}</ContextProvider>
}

export default App
