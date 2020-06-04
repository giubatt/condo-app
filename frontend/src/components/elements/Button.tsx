import React from 'react'

const Button: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = ({ children, className, ...props }) => {
  return (
    <button
      className={
        'bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
