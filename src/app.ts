import express from 'express'
import cors from 'cors'
import http from 'http'
import { errors } from 'celebrate'

import routes from './routes'

const app = express()
const PORT = !process.env.PORT ? 3333 :  process.env.PORT

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['*'],
  exposedHeaders: ['Authorization', 'Content-Type', 'Content-Disposition', 'Access-Control-Allow-Headers', 'Origin', 'Accept', 'X-Requested-With', 'filename'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}))
app.use(express.json())

app.use(routes)

// celebrate errors
app.use(errors())

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })

export default app