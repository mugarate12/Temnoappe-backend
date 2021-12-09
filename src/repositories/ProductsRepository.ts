import { Knex } from 'knex'

import { AppError } from './../utils/handleError'
const connection: Knex<any, unknown[]> = require('./../database')
const { PRODUCTS_TABLE_NAME } = require('./../database/types')

export interface productsInterface {
  id: number
  name: string,
  photo: string,
  description: string
}

interface createProductInterface {
  name: string,
  photo: string,
  description: string
}

interface indexProductsInterface {
  limit?: number,
  offset?: number
}

interface updateProductPayloadInterface {
  name?: string,
  photo?: string,
  description?: string
}

interface updateProductInterface {
  id: number,
  payload: updateProductPayloadInterface
}

interface deleteProductInterface {
  id: number
}

export default class ProductsRepository {
  private reference = () => connection<productsInterface>(PRODUCTS_TABLE_NAME)

  public create = async ({ name, photo, description}: createProductInterface) => {
    return await this.reference()
      .insert({ name, photo, description })
      .then(() => {
        return true
      })
      .catch(error => {
        throw new AppError('Database Error', 406, error.message, true)
      })
  }

  public index = async ({}: indexProductsInterface) => {
    return await this.reference()
      .select('*')
      .then(products => products)
      .catch(error => {
        throw new AppError('Database Error', 406, error.message, true)
      })
  }

  public update = async ({ id, payload } : updateProductInterface) => {
    let query = this.reference()
    let updatePayload: updateProductPayloadInterface = {}

    if (!!payload.name) {
      updatePayload.name = payload.name
    }
    
    if (!!payload.photo) {
      updatePayload.photo = payload.photo
    }
    
    if (!!payload.description) {
      updatePayload.description = payload.description
    }

    return await query 
      .update({ ...updatePayload })
      .where({ id: id })
      .then(() => {
        return true
      })
      .catch(error => {
        throw new AppError('Database Error', 406, error.message, true)
      })
  }

  public delete = async ({ id }: deleteProductInterface) => {
    return await this.reference()
      .where('id', '=', id)
      .delete()
      .then(() => {
        return true
      })
      .catch(error => {
        throw new AppError('Database Error', 406, error.message, true)
      })
  }
}

