import React from 'react'

export interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: 'simple' | 'outline'
}

const Button: React.FC<Props> = ({
  children,
  className,
  variant = 'simple',
  ...props
}) => {
  const buttonClasses = {
    simple:
      'bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
    outline:
      'bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded',
  }[variant]

  return (
    <button className={`${buttonClasses} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
