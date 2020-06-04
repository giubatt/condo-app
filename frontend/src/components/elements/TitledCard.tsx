import React from 'react'
import Card from 'src/components/elements/Card'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const TitledCard: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <div className="flex flex-col">
      {title && <h1 className="text-white text-3xl mb-4 font-bold">{title}</h1>}
      <Card {...props}>{children}</Card>
    </div>
  )
}

export default TitledCard
