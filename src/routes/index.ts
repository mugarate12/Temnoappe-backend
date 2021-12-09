import { Router } from 'express'

import productsRoutes from './productsRoutes'

const router = Router()

router.get('/', (req, res) => {
  return res.status(201).json({
    message: 'ok'
  })
})

productsRoutes(router)

export default router