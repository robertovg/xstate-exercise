import React from 'react'
import { useRoutes } from 'hookrouter'
import OriginalApp from './pages/OriginalApp'

const NotFoundPage = () => {
  return <h1>404 Page not found</h1>
}
const routes = {
  '/': () => <OriginalApp />,
}

const App = () => {
  const routeResult = useRoutes(routes)

  return routeResult || <NotFoundPage />
}

export default App
