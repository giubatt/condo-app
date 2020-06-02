import React from 'react'
import Card from 'src/components/elements/Card'
import RegisterForm from 'src/components/auth/RegisterForm'

const Register: React.FC = () => {
  return (
    <div className="container w-full h-full mx-auto max-w-xs flex justify-center items-center">
      <Card title="Cadastro">
        <RegisterForm onSubmit={console.log}></RegisterForm>
      </Card>
    </div>
  )
}

export default Register
