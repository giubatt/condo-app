import React from 'react'
import Card from 'src/components/elements/Card'
import LoginForm from 'src/components/auth/LoginForm'

const Login: React.FC = () => {
  return (
    <div className="container w-full h-full mx-auto max-w-xs flex justify-center items-center">
      <Card title="Login">
        <LoginForm onSubmit={console.log}></LoginForm>
      </Card>
    </div>
  )
}

export default Login
