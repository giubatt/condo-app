import app from './app'
import { PORT } from './utils/secrets'
import { graphqlServer } from './graphql/server'

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`))
