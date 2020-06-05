import React from 'react'
import LabelInput from 'src/components/elements/LabelInput'
import Modal from 'src/components/elements/Modal'
import { useForm } from 'react-hook-form'

export type ApartmentFormInputs = {
  number: number
  block: string
}

export interface Props {
  isOpen: boolean
  isEdit: boolean
  onCancel: () => void
  onConfirm: (arg0: ApartmentFormInputs) => void
  defaultValues?: ApartmentFormInputs
}

const ApartmentForm: React.FC<Props> = ({
  isOpen,
  isEdit,
  onConfirm,
  onCancel,
  defaultValues,
}) => {
  const { register, handleSubmit, errors } = useForm<ApartmentFormInputs>({
    defaultValues,
  })

  return (
    <Modal
      confirmButtonText="Salvar"
      title={isEdit ? 'Editar Apartamento' : 'Adicionar Apartamento'}
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={handleSubmit(onConfirm)}
    >
      <form onSubmit={handleSubmit(onConfirm)}>
        <div className="mb-4">
          <LabelInput
            id="number"
            name="number"
            type="number"
            placeholder="Preencha o número"
            label="Número"
            error={errors?.number?.message as string}
            ref={register({ required: 'Preencha o número do apartamento' })}
          />
        </div>
        <div className="mb-6">
          <LabelInput
            id="block"
            name="block"
            type="text"
            placeholder="Preencha o bloco"
            label="Block"
            error={errors?.block?.message as string}
            ref={register({ required: 'Preencha o bloco do apartamento' })}
          />
        </div>
        <button type="submit" className="absolute hidden"></button>
      </form>
    </Modal>
  )
}

export default ApartmentForm
