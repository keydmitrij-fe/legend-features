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
  forecast: Partial<MonthlySales>
}

export type MonthsRange = [number, number] // [From, To]
