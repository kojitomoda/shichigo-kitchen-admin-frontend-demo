import type { Product } from '../../types/product'
import { applyPagination } from '../../utils/apply-pagination'
import { deepCopy } from '../../utils/deep-copy'
import { data as da } from './data'

type GetProductsRequest = {
  filters?: {
    name?: string
    category?: string[]
    status?: string[]
    inStock?: boolean
  }
  page?: number
  rowsPerPage?: number
}

type GetProductsResponse = Promise<{
  data: Product[]
  count: number
}>

class ProductsApi {
  getProducts(request: GetProductsRequest = {}): GetProductsResponse {
    const { filters, page, rowsPerPage } = request

    let data = deepCopy(da) as Product[]
    let count = data.length

    if (typeof filters !== 'undefined') {
      data = data.filter((product) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase())

          if (!nameMatched) {
            return false
          }
        }

        // It is possible to select multiple category options
        if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
          const categoryMatched = filters.category.includes(product.category)

          if (!categoryMatched) {
            return false
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(product.status)

          if (!statusMatched) {
            return false
          }
        }

        // Present only if filter required
        if (typeof filters.inStock !== 'undefined') {
          const stockMatched = product.inStock === filters.inStock

          if (!stockMatched) {
            return false
          }
        }

        return true
      })
      count = data.length
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage)
    }

    return Promise.resolve({
      data,
      count,
    })
  }
}

export const productsApi = new ProductsApi()
