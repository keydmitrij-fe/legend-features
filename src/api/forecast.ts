import { Product } from "../types/forecast"
import products from "../mocks/products"

export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products)
    }, 5000)
  })
}
