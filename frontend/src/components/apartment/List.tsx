import React from 'react'
import { Edit, Trash2 } from 'react-feather'

export type Apartment = {
  id: string
  number: number
  block: string
}

export interface Props {
  items?: Apartment[]
  selectedId?: string
  onDelete: (id: string) => void
  onEdit: (arg0: Apartment) => void
  onOpenApartment: (id: string) => void
}

const List: React.FC<Props> = ({
  items,
  selectedId,
  onDelete,
  onEdit,
  onOpenApartment,
}) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden -mr-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Apartamento
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Bloco
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items?.map(({ id, number, block }) => (
            <tr
              key={id}
              className={`cursor-pointer ${
                selectedId === id ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => onOpenApartment(id)}
            >
              <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-sm leading-5 text-gray-800">
                  {number}
                </span>
              </td>
              <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-sm leading-5 text-gray-800">{block}</span>
              </td>
              <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200 flex justify-end">
                <button className="text-gray-600 hover:text-gray-900">
                  <Edit
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit({ id, number, block })
                    }}
                  />
                </button>
                <button className="text-gray-600 hover:text-gray-900 pl-2">
                  <Trash2
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(id)
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List
