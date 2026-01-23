import { DailyMetrics } from "../types/Comparison"
import { Product } from "../types/Comparison"

const PRODUCT_CATALOG = [
  {
    name: "Майка хлопковая базовая",
    sku: 482901312,
    imageUrl: "https://picsum.photos/seed/tshirt1/300/300",
  },
  {
    name: "Джинсы прямые синие",
    sku: 591838127,
    imageUrl: "https://picsum.photos/seed/jeans1/300/300",
  },
  {
    name: "Худи оверсайз с капюшоном",
    sku: 267912049,
    imageUrl: "https://picsum.photos/seed/hoodie1/300/300",
  },
  {
    name: "Кроссовки повседневные",
    sku: 728043921,
    imageUrl: "https://picsum.photos/seed/sneakers1/300/300",
  },
  {
    name: "Рубашка льняная летняя",
    sku: 181506722,
    imageUrl: "https://picsum.photos/seed/shirt1/300/300",
  },
  {
    name: "Куртка демисезонная",
    sku: 510245384,
    imageUrl: "https://picsum.photos/seed/jacket1/300/300",
  },
  {
    name: "Шорты спортивные",
    sku: 273421389,
    imageUrl: "https://picsum.photos/seed/shorts1/300/300",
  },
  {
    name: "Свитер шерстяной",
    sku: 825692501,
    imageUrl: "https://picsum.photos/seed/sweater1/300/300",
  },
  {
    name: "Платье повседневное",
    sku: 191838974,
    imageUrl: "https://picsum.photos/seed/dress1/300/300",
  },
  {
    name: "Брюки чинос",
    sku: 624395830,
    imageUrl: "https://picsum.photos/seed/chinos1/300/300",
  },
]

const generateDates = (days: number): string[] => {
  const dates: string[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString().slice(0, 10))
  }

  return dates
}

const generateDailyMetrics = (date: string): DailyMetrics => {
  const impressions = Math.floor(Math.random() * 5000 + 1000)
  const visits = Math.floor(impressions * (Math.random() * 0.15 + 0.05))
  const addToCart = Math.floor(visits * (Math.random() * 0.3))
  const orders = Math.floor(addToCart * (Math.random() * 0.7))
  const buyouts = Math.floor(orders * (Math.random() * 0.9))
  const canceled = orders - buyouts

  return {
    date,
    impressions,
    visits,
    ctr: +((visits / impressions) * 100).toFixed(2),
    addToCart,
    cartConversion: +((addToCart / visits) * 100).toFixed(2),
    ordersCount: orders,
    ordersAmount: orders * (Math.random() * 2000 + 500),
    orderConversion: +((orders / addToCart) * 100).toFixed(2),
    buyoutsCount: buyouts,
    buyoutsAmount: buyouts * (Math.random() * 2000 + 500),
    buyoutRate: +((buyouts / (buyouts + canceled)) * 100).toFixed(2),
    canceledCount: canceled,
    canceledAmount: canceled * (Math.random() * 2000 + 500),
    avgSearchPosition: +(Math.random() * 50 + 1).toFixed(1),
  }
}

export const productsMock: Product[] = PRODUCT_CATALOG.map((product, index) => {
  const dates = generateDates(60)

  return {
    id: index + 1,
    name: product.name,
    sku: product.sku,
    imageUrl: product.imageUrl,
    metricsHistory: dates.map(generateDailyMetrics),
  }
})
