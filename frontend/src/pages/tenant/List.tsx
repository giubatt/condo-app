import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { useModals } from 'src/utils/hooks'
import { GET_APARTMENT_TENANTS } from 'src/graphql/queries'
import {
  REMOVE_TENANT,
  CREATE_TENANT,
  UPDATE_TENANT,
} from 'src/graphql/mutations'
import Modal from 'src/components/elements/Modal'

import TenantList from 'src/components/tenant/List'
import TenantFormModal, {
  TenantFormInputs,
} from 'src/components/tenant/FormModal'
import Button from 'src/components/elements/Button'
import { getDateString } from 'src/utils/date'

const List: React.FC = () => {
  type ModalTypes = 'confirmDelete' | 'apartmentForm'
  const { openModalId, modalProps, openModal, closeModal } = useModals<
    ModalTypes
  >()
  const { apartmentId } = useParams()

  const [_createRes, createTenant] = useMutation(CREATE_TENANT)
  const [_updateRes, updateTenant] = useMutation(UPDATE_TENANT)
  const [_removeRes, removeTenant] = useMutation(REMOVE_TENANT)
  const [{ data, fetching }] = useQuery({
    query: GET_APARTMENT_TENANTS,
    variables: { apartmentId },
    requestPolicy: 'cache-and-network',
  })

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-gray-700 text-2xl font-bold">Moradores</h1>
        <Button onClick={() => openModal('apartmentForm', {})}>
          Adicionar
        </Button>
      </div>
      {fetching ? (
        'Loading'
      ) : (
        <TenantList
          items={data?.getApartmentTenants}
          onDelete={(id) => openModal('confirmDelete', { id })}
          onEdit={(tenant) =>
            openModal('apartmentForm', {
              id: tenant.id,
              isEdit: true,
              defaultValues: {
                ...tenant,
                dateOfBirth: getDateString(tenant?.dateOfBirth),
              },
            })
          }
        />
      )}
      {openModalId === 'confirmDelete' && (
        <Modal
          title="Excluir morador"
          isOpen
          onCancel={closeModal}
          onConfirm={async () => {
            await removeTenant({ id: modalProps.id })
            closeModal()
          }}
        >
          Deseja mesmo excluir este morador?
        </Modal>
      )}

      {openModalId === 'apartmentForm' && (
        <TenantFormModal
          isOpen
          onCancel={closeModal}
          onConfirm={async ({
            name,
            cpf,
            email,
            phone,
            primary,
            dateOfBirth,
          }) => {
            if (modalProps?.isEdit) {
              await updateTenant({
                id: modalProps.id,
                name,
                cpf,
                email,
                phone,
                primary,
                dateOfBirth,
              })
            } else {
              await createTenant({
                name,
                cpf,
                email,
                phone,
                primary,
                dateOfBirth,
                apartmentId,
              })
            }
            closeModal()
          }}
          isEdit={modalProps?.isEdit as boolean}
          defaultValues={modalProps?.defaultValues as TenantFormInputs}
        />
      )}
    </>
  )
}

export default List
