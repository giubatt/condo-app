import React from 'react'
// import styled from '@emotion/styled'

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, ...props }) => {
  return (
    <button
      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
