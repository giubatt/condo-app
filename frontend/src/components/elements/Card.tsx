import React from 'react'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

const Card: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-white text-3xl mb-4 font-bold">{title}</h1>
      <div
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

export default Card
