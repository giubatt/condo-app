import React from 'react'
import Card from 'src/components/elements/Card'
import Button from 'src/components/elements/Button'
import ApartmentList from 'src/components/apartment/List'
import styled from '@emotion/styled'

import { GET_APARTMENTS } from 'src/graphql/queries'
import { useQuery } from 'urql'

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
  const [{ data, fetching, error }] = useQuery({
    query: GET_APARTMENTS,
  })

  return (
    <div className="container w-full h-full mx-autoflex justify-center items-center">
      <Layout className="gap-8 h-screen py-32">
        <StyledCard>
          <div className="flex justify-between mb-4">
            <h1 className="text-gray-700 text-2xl font-bold">Apartamentos</h1>
            <Button>Adicionar</Button>
          </div>
          {fetching ? 'Loading' : <ApartmentList items={data?.getApartments} />}
        </StyledCard>
        <StyledCard>{children}</StyledCard>
      </Layout>
    </div>
  )
}

export default Dashboard
