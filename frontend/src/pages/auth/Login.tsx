import React from 'react'
import TitledCard from 'src/components/elements/TitledCard'
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
        <LoginForm
          onSubmit={async ({ email, password }): Promise<void> => {
            const { data } = await login({ email, password })
            if (data) {
              localStorage.setItem('authToken', data.login)
              history.push('/dashboard')
            }
          }}
        ></LoginForm>
      </TitledCard>
    </div>
  )
}

export default Login
