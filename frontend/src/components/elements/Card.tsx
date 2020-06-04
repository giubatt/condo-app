import React from 'react'

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ' + className}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
