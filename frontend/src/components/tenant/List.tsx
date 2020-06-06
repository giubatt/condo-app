import React from 'react'
import { Edit, Trash2, Star } from 'react-feather'

export type Tenant = {
  id: string
  cpf: string
  email: string
  name: string
  primary: boolean
  dateOfBirth?: string
  phone?: string
  apartmentId: string
}

export interface Props {
  items?: Tenant[]
  onDelete: (id: string) => void
  onEdit: (arg0: Tenant) => void
}

const List: React.FC<Props> = ({ items, onDelete, onEdit }) => {
  return (
    <div className="overflow-y-auto -mr-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email / Telefone
            </th>
            <th className="px-3 py-3 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items?.map(
            ({
              id,
              name,
              cpf,
              email,
              phone,
              primary,
              dateOfBirth,
              apartmentId,
            }) => (
              <tr key={id} className="hover:bg-gray-100">
                <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="flex items-center">
                    {primary && <Star className="mr-2 text-yellow-400" />}
                    <span className="text-sm leading-5 text-gray-800">
                      {name}
                    </span>
                  </div>
                </td>

                <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div>
                    <div className="text-sm leading-5 font-medium text-gray-900 mb-1">
                      {email}
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      {phone}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200 ">
                  <div className="flex justify-end">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit({
                            id,
                            name,
                            cpf,
                            email,
                            phone,
                            primary,
                            dateOfBirth,
                            apartmentId,
                          })
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
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default List
