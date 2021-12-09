import { Request, Response } from 'express'

import { productsRepository } from './../repositories'
import { errorHandler } from './../utils/handleError'

export default class ProductsController {
  private setoffSetValue = (page: number, numberOfItems: number) => {
    if (page === 1) {
      return 0
    } else {
      return (page - 1) * numberOfItems
    }
  }

  public create = async (req: Request, res: Response) => {
    const {
      name,
      photo,
      description
    } = req.body

    return await productsRepository.create({
      name: String(name),
      photo: String(photo),
      description: String(description)
    })
      .then(() => {
        return res.status(201).json({
          message: 'product created successful!'
        })
      })
      .catch((error) => {
        return errorHandler(error, res)
      })
  }

  public index = async (req: Request, res: Response) => {
    const {
      numberOfItems,
      page
    } = req.query

    const limit = !!Number(numberOfItems) ? Number(numberOfItems) : undefined
    const offset = !!Number(page) ? this.setoffSetValue(Number(page), Number(numberOfItems)) : 0 

    return await productsRepository.index({
      limit,
      offset
    })
      .then(products => {
        return res.status(200).json({
          data: products
        })
      })
      .catch((error) => {
        return errorHandler(error, res)
      })
  }

  public update = async (req: Request, res: Response) => {
    const { id } = req.params
    const {
      name,
      photo,
      description
    } = req.body

    return await productsRepository.update({ 
      id: Number(id),
      payload: {
        name: String(name) !== 'undefined' ? String(name) : undefined,
        photo: String(photo) !== 'undefined' ? String(photo) : undefined,
        description: String(description) !== 'undefined' ? String(description) : undefined,
      }
    })
      .then(() => {
        return res.status(200).json({
          message: 'product updated successful!'
        })
      })
      .catch((error) => {
        return errorHandler(error, res)
      })
  }

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params

    return await productsRepository.delete({ id: Number(id) })
      .then(() => {
        return res.status(200).json({
          message: 'product delete successful!'
        })
      })
      .catch((error) => {
        return errorHandler(error, res)
      })
  }
}