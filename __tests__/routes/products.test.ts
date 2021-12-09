import request from 'supertest'

import app from './../../src/app'
import {
  productsRepository
} from './../../src/repositories'
import { productsInterface } from './../../src/repositories/ProductsRepository'

declare global {
  namespace jest {
    interface Matchers<R> {
      toValidateProducts(): R;
    }
  }
}

expect.extend({
  toValidateProducts(received: Array<productsInterface>) {
    received.forEach(product => {
      expect(product).toHaveProperty('id')

      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('photo')
      expect(product).toHaveProperty('description')
    })

    return {
      message: () => 'all products have all properties',
      pass: true
    }
  }
})

describe('Routes', () => {
  describe('Products Tests', () => {
    test('create product', async () => {
      const name = 'TV LG 55 polegadas'
      const photo = 'https://images-submarino.b2w.io/produtos/01/00/img/3397039/7/3397039703_1GG.jpg'
      const description = 'um texto longo explicando os detalhes do produto'

      const createProduct = await request(app)
        .post('/products')
        .send({ name, photo, description })

      expect(createProduct.status).toBe(201)
      expect(createProduct.body.message).toBe('product created successful!')
    })

    test('get list of products', async () => {
      const page = 1
      const numberOfItems = 10
      const productsRequest = await request(app)
        .get(`/products?page=${page}&numberOfItems=${numberOfItems}`)

      expect(productsRequest.status).toBe(200)
      expect(productsRequest.body.data).toValidateProducts()
    })

    test('update product', async () => {
      const name = 'TV LG 72 polegadas'
      const productsRequest = await request(app)
        .get('/products')
      const productID = Number(productsRequest.body.data[0].id)

      const updateProduct = await request(app)
        .put(`/products/${productID}`)
        .send({
          name: name
        })

      expect(updateProduct.status).toBe(200)
      expect(updateProduct.body.message).toBe('product updated successful!')
    })
    
    test('update product', async () => {
      const productsRequest = await request(app)
        .get('/products')
      const productID = Number(productsRequest.body.data[0].id)

      const deleteProduct = await request(app)
        .delete(`/products/${productID}`)

      expect(deleteProduct.status).toBe(200)
      expect(deleteProduct.body.message).toBe('product delete successful!')
    })
  })
})
