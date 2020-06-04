import React from 'react'
import TitledCard from 'src/components/elements/TitledCard'
import RegisterForm from 'src/components/auth/RegisterForm'

import { REGISTER } from 'src/graphql/mutations'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'

const Register: React.FC = () => {
  const history = useHistory()
  const [registerResult, register] = useMutation(REGISTER)

  return (
    <div className="container w-full h-full mx-auto max-w-xs flex justify-center items-center">
      <TitledCard title="Cadastro">
        <RegisterForm
          onSubmit={async ({ email, password }): Promise<void> => {
            const { data } = await register({ email, password })
            if (data) {
              localStorage.setItem('authToken', data.login)
              history.push('/dashboard')
            }
          }}
        ></RegisterForm>
      </TitledCard>
    </div>
  )
}

export default Register
