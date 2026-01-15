import type { ChartDataset } from "chart.js"
import { Line } from "react-chartjs-2"
import {
  LineController,
  LineElement,
  PointElement,
  Legend,
  Chart,
  CategoryScale,
  LinearScale,
} from "chart.js"
import { MonthsRange, Product } from "../../types/forecast"
import { getMonthsByIndex } from "../../utils/date"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  Legend,
  CategoryScale,
  LinearScale
)

type Forecast = {
  show: boolean
  duration: number
}

const LINE_COLORS = ["#a29bfe", "#00b894", "#636e72", "#74b9ff", "#fab1a0"]

type ForecastGraphType = {
  graphItems: Product[]
  monthsRange: MonthsRange
  forecast?: Forecast
}

const chartOptions = Chart.defaults
chartOptions.elements.line.cubicInterpolationMode = "monotone"

const ForecastGraph: React.FC<ForecastGraphType> = ({
  graphItems,
  monthsRange,
  forecast,
}) => {
  const [from, to] = [...monthsRange]
  let months = getMonthsByIndex(from, to)

  // If there is forecast to be shown, update months to display
  if (forecast?.show) {
    const forecastMonths = getMonthsByIndex(0, forecast.duration - 1)
    const decoratedForecastMonths = forecastMonths.map(
      (month) => month.slice(0) + "*"
    )
    const monthsWithForecast = months.concat(decoratedForecastMonths)
    months = monthsWithForecast
  }

  const getDatasetToShow = (): ChartDataset<"line">[] => {
    return graphItems.map((product): ChartDataset<"line"> => {
      let data: [string, any][]
      const lowerCaseMonths = months.map((month) => month.toLowerCase())
      const productEntries = Object.entries(product.sales)
      const productEntriesToShow = productEntries.filter((item) => {
        const productSalesMonth = item[0]
        return lowerCaseMonths.includes(productSalesMonth)
      })

      data = productEntriesToShow

      if (forecast) {
        const productForecastEntries = Object.entries(product.forecast)
        const productForecastEntriesToShow = productForecastEntries.splice(
          0,
          forecast.duration
        )

        data = productEntriesToShow.concat(productForecastEntriesToShow)
      }

      const salesData = data.map((item) => item[1])

      return {
        label: product.name,
        data: salesData,
        borderColor: [...LINE_COLORS],
        segment: {
          borderDash(ctx) {
            if (forecast) {
              const firstForecastPoint =
                salesData.length - forecast.duration - 1
              const lastForecastPoint = salesData.length - 1
              const getRangeFromPoints = (
                from: number,
                to: number
              ): number[] => {
                const arr: number[] = []
                for (let i = from; i < to; i++) {
                  arr.push(i)
                }
                return arr
              }
              const forecastRange = getRangeFromPoints(
                firstForecastPoint,
                lastForecastPoint
              )
              if (forecastRange.includes(ctx.p0DataIndex)) {
                return [10, 10]
              }
            }
          },
        },
      }
    })
  }

  return (
    <>
      <Line
        options={{ plugins: { legend: { display: false } } }}
        data={{
          labels: months,
          datasets: getDatasetToShow(),
        }}
      ></Line>
    </>
  )
}

export default ForecastGraph
