import React, { ReactNode } from 'react'
// import styled from '@emotion/styled'

export interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return <div className="bg-gray-600">{children}</div>
}

export default Layout
