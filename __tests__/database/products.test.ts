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

describe('Database', () => {
  describe('Products Tests', () => {
    test('create product', async () => {
      const name = 'TV LG 55 polegadas'
      const photo = 'https://images-submarino.b2w.io/produtos/01/00/img/3397039/7/3397039703_1GG.jpg'
      const description = 'um texto longo explicando os detalhes do produto'

      const createProduct = await productsRepository.create({ name, photo, description })

      expect(createProduct).toBe(true)
    })

    test('get list of products ', async () => {
      const products = await productsRepository.index({})

      expect(products).toValidateProducts()
    })
    
    test('get list of products with paginate', async () => {
      const products = await productsRepository.index({
        limit: 10,
        offset: 0
      })

      expect(products).toValidateProducts()
    })

    test('update product', async () => {
      const name = 'TV LG 30 polegadas'
      const products = await productsRepository.index({})

      const updateProduct = await productsRepository.update({
        id: products[0].id,
        payload: {
          name
        }
      })

      expect(updateProduct).toBe(true)
    })

    test('delete product', async () => {
      const products = await productsRepository.index({})

      const deleteProduct = await productsRepository.delete({ id: products[0].id })

      expect(deleteProduct).toBe(true)
    })
  })
})