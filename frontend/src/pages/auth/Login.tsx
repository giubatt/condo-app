import React from 'react'
import TitledCard from 'src/components/elements/TitledCard'
import Alert from 'src/components/elements/Alert'
import LoginForm from 'src/components/auth/LoginForm'

import { LOGIN } from 'src/graphql/mutations'
import { useMutation } from 'urql'
import { useHistory } from 'react-router-dom'

const Login: React.FC = () => {
  const history = useHistory()
  const [loginResult, login] = useMutation(LOGIN)

  return (
    <div className="container w-full h-full mx-auto max-w-xs flex justify-center items-center">
      <TitledCard title="Login">
        {loginResult?.error?.message.includes('InvalidCredentials') && (
          <Alert
            className="mb-3"
            title="Email ou senha inválidos."
            description="Tente novamente ou se cadastre."
          />
        )}
        <LoginForm
          onSubmit={async ({ email, password }): Promise<void> => {
            const { data, error } = await login({ email, password })
            if (data?.login) {
              localStorage.setItem('authToken', data.login)
              history.push('/dashboard')
            } else {
              if (error?.message.includes('InvalidCredentials')) {
              }
            }
          }}
        />
      </TitledCard>
    </div>
  )
}

export default Login
