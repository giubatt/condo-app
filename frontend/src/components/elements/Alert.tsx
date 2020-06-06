import React from 'react'

export interface Props {
  className: string
  title: string
  description: string
}

const Alert: React.FC<Props> = ({ className, title, description }) => {
  return (
    <div
      className={
        'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ' +
        className
      }
      role="alert"
    >
      <strong className="font-bold">{title}</strong>{' '}
      <span className="block sm:inline">{description}</span>
    </div>
  )
}

export default Alert
