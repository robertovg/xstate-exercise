import React from 'react'
import { A } from 'hookrouter'
import styled from 'styled-components'
import routesDefinition from '../util/routesDefinition'

const routes = Object.values(routesDefinition)

const Wrapper = styled.div`
  ul {
    list-style: none;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-evenly;
    li {
      padding: 1rem;
    }
  }
  main {
    color: #fff;
    background-color: #282c34;
    min-height: 100vh;
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: center;
  }
`
const Layout = ({ children }) => {
  return (
    <Wrapper>
      <nav>
        <ul>
          {routes.map(({ path, linkName }) => (
            <li key={path}>
              <A href={path}>{linkName}</A>
            </li>
          ))}
        </ul>
      </nav>
      <main>{children}</main>
    </Wrapper>
  )
}

export default Layout
