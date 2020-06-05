import React from 'react'
import Card from 'src/components/elements/Card'
import Button from 'src/components/elements/Button'
import Modal from 'src/components/elements/Modal'
import ApartmentList from 'src/components/apartment/List'
import ApartmentFormModal, {
  ApartmentFormInputs,
} from 'src/components/apartment/ApartmentFormModal'
import styled from '@emotion/styled'

import { GET_APARTMENTS } from 'src/graphql/queries'
import {
  CREATE_APARTMENT,
  REMOVE_APARTMENT,
  UPDATE_APARTMENT,
} from 'src/graphql/mutations'
import { useQuery, useMutation } from 'urql'
import { useModals } from 'src/utils/hooks'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`

const StyledCard = styled(Card)`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 0;
`

const Dashboard: React.FC = ({ children }) => {
  type ModalTypes = 'confirmDelete' | 'apartmentForm'
  const { openModalId, modalProps, openModal, closeModal } = useModals<
    ModalTypes
  >()

  const [_removeRes, removeApartment] = useMutation(REMOVE_APARTMENT)
  const [_createRes, createApartment] = useMutation(CREATE_APARTMENT)
  const [_updateRes, updateApartment] = useMutation(UPDATE_APARTMENT)
  const [{ data, fetching, error }] = useQuery({
    query: GET_APARTMENTS,
  })

  return (
    <div className="container w-full h-full mx-autoflex justify-center items-center">
      <Layout className="gap-8 h-screen py-32">
        <StyledCard>
          <div className="flex justify-between mb-4">
            <h1 className="text-gray-700 text-2xl font-bold">Apartamentos</h1>
            <Button onClick={() => openModal('apartmentForm', {})}>
              Adicionar
            </Button>
          </div>
          {fetching ? (
            'Loading'
          ) : (
            <ApartmentList
              items={data?.getApartments}
              onDelete={(id) => openModal('confirmDelete', { id })}
              onEdit={({ id, block, number }) =>
                openModal('apartmentForm', {
                  id,
                  isEdit: true,
                  defaultValues: { block, number },
                })
              }
            />
          )}
        </StyledCard>
        <StyledCard>{children}</StyledCard>
      </Layout>
      {openModalId === 'confirmDelete' && (
        <Modal
          title="Excluir apartamento"
          isOpen
          onCancel={closeModal}
          onConfirm={async () => {
            await removeApartment({ id: modalProps.id })
            closeModal()
          }}
        >
          Deseja mesmo excluir este apartamento?
        </Modal>
      )}

      {openModalId === 'apartmentForm' && (
        <ApartmentFormModal
          isOpen
          onCancel={closeModal}
          onConfirm={async ({ block, number }) => {
            if (modalProps?.isEdit) {
              await updateApartment({
                id: modalProps.id,
                block,
                number: Number(number),
              })
            } else {
              await createApartment({
                block,
                number: Number(number),
              })
            }
            closeModal()
          }}
          isEdit={modalProps?.isEdit as boolean}
          defaultValues={modalProps?.defaultValues as ApartmentFormInputs}
        />
      )}
    </div>
  )
}

export default Dashboard
