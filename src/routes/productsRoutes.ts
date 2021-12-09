import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { productsController } from './../controllers'

export default function productsRoutes(router: Router) {
  router.post('/products', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      photo: Joi.string().required(),
      description: Joi.string().required()
    })
  }), productsController.create)

  router.get('/products', celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().optional().min(1),
      numberOfItems: Joi.number().optional().min(1)
    })
  }), productsController.index)

  router.put('/products/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().optional(),
      photo: Joi.string().optional(),
      description: Joi.string().optional()
    })
  }), productsController.update)

  router.delete('/products/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }), productsController.delete)
}