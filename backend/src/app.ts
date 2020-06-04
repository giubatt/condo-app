import express from 'express'
import { graphqlServer } from './graphql/server'
import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/secrets'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const app = express()
graphqlServer.applyMiddleware({ app })

export default app
