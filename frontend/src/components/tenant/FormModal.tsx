import React from 'react'
import LabelInput from 'src/components/elements/LabelInput'
import Modal from 'src/components/elements/Modal'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const FormSchema = yup.object().shape({
  cpf: yup
    .string()
    .matches(
      /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{3}\d{3}\d{3}\d{2}$)/,
      'CPF inválido',
    )
    .required('Obrigatório'),
  email: yup.string().email('Email inválido').required('Obrigatório'),
  name: yup.string().required('Obrigatório'),
  primary: yup.boolean().required('Obrigatório'),
  dateOfBirth: yup
    .string()
    .matches(/\d\d\d\d[-/]\d\d[-/]\d\d/, 'Data inválida')
    .required('Obrigatório'),
  phone: yup.string().required('Obrigatório'),
})

export type TenantFormInputs = {
  cpf: string
  email: string
  name: string
  primary: boolean
  dateOfBirth?: Date
  phone?: string
}

export interface Props {
  isOpen: boolean
  isEdit: boolean
  onCancel: () => void
  onConfirm: (arg0: TenantFormInputs) => void
  defaultValues?: TenantFormInputs
}

const TenantFormModal: React.FC<Props> = ({
  isOpen,
  isEdit,
  onConfirm,
  onCancel,
  defaultValues,
}) => {
  const { register, handleSubmit, errors, watch } = useForm<TenantFormInputs>({
    defaultValues,
    validationSchema: FormSchema,
  })
  console.log(errors, watch())

  return (
    <Modal
      confirmButtonText="Salvar"
      title={isEdit ? 'Editar Morador' : 'Adicionar Morador'}
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={handleSubmit(onConfirm)}
    >
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onConfirm)}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-1/2 px-3 mb-0">
            <LabelInput
              id="name"
              name="name"
              type="text"
              placeholder="Preencha o nome"
              label="Nome *"
              error={errors?.name?.message as string}
              ref={register}
            />
          </div>
          <div className="w-1/2 px-3">
            <LabelInput
              id="cpf"
              name="cpf"
              type="text"
              placeholder="Preencha o cpf"
              label="CPF *"
              error={errors?.cpf?.message as string}
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-1/2 px-3 mb-0">
            <LabelInput
              id="email"
              name="email"
              type="email"
              placeholder="Preencha o email"
              label="Email *"
              error={errors?.email?.message as string}
              ref={register}
            />
          </div>
          <div className="w-1/2 px-3">
            <LabelInput
              id="phone"
              name="phone"
              type="text"
              placeholder="Preencha o telefone"
              label="Telefone"
              error={errors?.phone?.message as string}
              ref={register}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-1/2 px-3 mb-0">
            <LabelInput
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              placeholder="Preencha o email"
              label="Data de nascimento *"
              error={errors?.dateOfBirth?.message as string}
              ref={register}
            />
          </div>
          <div className="w-1/2 px-3 flex items-center">
            <label className="block text-gray-500 font-bold">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="primary"
                name="primary"
                ref={register}
              />
              <span className="text-sm">Morador responsável</span>
            </label>
          </div>
        </div>

        <button type="submit" className="absolute hidden"></button>
      </form>
    </Modal>
  )
}

export default TenantFormModal
