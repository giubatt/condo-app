import app from './app'
import { PORT } from './utils/secrets'

app.listen({ port: process.env.PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`))
