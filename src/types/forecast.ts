export interface MonthlySales {
  jan: number
  feb: number
  mar: number
  apr: number
  may: number
  jun: number
  jul: number
  aug: number
  sep: number
  oct: number
  nov: number
  dec: number
}

export interface Product {
  id: number
  name: string
  sales: MonthlySales
  forecast: Omit<MonthlySales, "jul" | "aug" | "sep" | "oct" | "nov" | "dec">
  stocks: WarehouseStock[]
}

export interface WarehouseStock {
  id: number
  name: string
  stock: number
}

export interface StockAdjustment {
  warehouseId: number
  warehouseName: string
  currentStock: number // Было
  suggestedStock: number // Станет
  diff: number // Разница (положительная — добавить, отрицательная — убрать)
}

export interface RedistributionPlan {
  productId: number
  adjustments: StockAdjustment[]
}

export type MonthsRange = [number, number] // [From, To]
