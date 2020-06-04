import React from 'react'
import LabelInput from 'src/components/elements/LabelInput'
import Button from 'src/components/elements/Button'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  password: string
}

export interface Props {
  onSubmit: (arg0: Inputs) => void
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <LabelInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          error={errors?.email?.message as string}
          ref={register({ required: 'Campo obrigatório' })}
        />
      </div>
      <div className="mb-6">
        <LabelInput
          id="password"
          name="password"
          type="password"
          placeholder="****************"
          label="Password"
          error={errors?.password?.message as string}
          ref={register({ required: 'Campo obrigatório' })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link
          className="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800"
          to="/login"
        >
          Voltar
        </Link>
        <Button type="submit">Cadastrar</Button>
      </div>
    </form>
  )
}

export default LoginForm
