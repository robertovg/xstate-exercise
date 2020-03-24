import React from 'react'
import styled from 'styled-components'
import logo from '../logo.svg'
import Layout from '../components/Layout'

const Wrapper = styled.div`
  text-align: center;

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
function OriginalApp({ what }) {
  // Optional chain check
  const optionalVariable = what?.works ?? `works`
  return (
    <Layout>
      <Wrapper>
        <header className="App-header">
          <h1>XState Examples</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>optional chaining: {optionalVariable}</p>
        </header>
      </Wrapper>
    </Layout>
  )
}

export default OriginalApp
