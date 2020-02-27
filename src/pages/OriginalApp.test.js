import React from 'react'
import { render } from '@testing-library/react'
import OriginalApp from './OriginalApp'

test('renders learn react link', () => {
  const { getByText } = render(<OriginalApp />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
