export interface Product {
  id: number
  name: string
  sku: number
  imageUrl: string
  metricsHistory: DailyMetrics[]
}

export interface DailyMetrics {
  date: string // ISO: YYYY-MM-DD
  impressions: number // показы
  visits: number // перешли в карточку
  ctr: number // CTR (%)
  addToCart: number // добавили в корзину
  cartConversion: number // конверсия в корзину (%)
  ordersCount: number // заказали товаров
  ordersAmount: number // заказали на сумму
  orderConversion: number // конверсия в заказ (%)
  buyoutsCount: number // выкупили товаров
  buyoutsAmount: number // выкупили на сумму
  buyoutRate: number // процент выкупа (%)
  canceledCount: number // отменили товаров
  canceledAmount: number // отменили на сумму
  avgSearchPosition: number // средняя позиция в поиске
}
export type MetricKey = keyof DailyMetrics
