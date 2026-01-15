import { RedistributionPlan } from "../types/forecast"
import products from "./products"

export const getRedistributionPlans = (): RedistributionPlan[] => {
  return products.map((product) => {
    const totalStock = product.stocks.reduce((sum, s) => sum + s.stock, 0)
    const avgStock = Math.floor(totalStock / product.stocks.length)

    const adjustments = product.stocks.map((stock, index) => {
      let suggested
      if (index % 2 === 0) {
        suggested = Math.max(5, stock.stock - Math.floor(stock.stock * 0.3)) // Убираем 30%
      } else {
        suggested = stock.stock + Math.floor(avgStock * 0.2) // Добавляем 20% от среднего
      }

      return {
        warehouseId: stock.id,
        warehouseName: stock.name,
        currentStock: stock.stock,
        suggestedStock: suggested,
        diff: suggested - stock.stock,
      }
    })

    return {
      productId: product.id,
      adjustments,
    }
  })
}

export const redistributionMockData = getRedistributionPlans()
