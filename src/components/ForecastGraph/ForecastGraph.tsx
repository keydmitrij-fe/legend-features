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
import { formToJSON } from "axios"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  Legend,
  CategoryScale,
  LinearScale
)

const LINE_COLORS = ["#a29bfe", "#00b894", "#636e72", "#74b9ff", "#fab1a0"]

type ForecastGraphType = {
  graphItems: Product[]
  monthsRange: MonthsRange
  showForecast?: boolean
  forecastLength?: number
}

const chartOptions = Chart.defaults
chartOptions.elements.line.cubicInterpolationMode = "monotone"

const ForecastGraph: React.FC<ForecastGraphType> = ({
  graphItems,
  monthsRange,
  showForecast = false,
  forecastLength,
}) => {
  const [from, to] = [...monthsRange]
  const months = getMonthsByIndex(from, to)

  const getMonthsToShow = () => {
    if (!showForecast) {
      return months
    }

    const forecastMonths = "placeholder!"
    const monthsWithForecast = "months + forecastMonths"
  }

  return (
    <>
      <Line
        options={{ plugins: { legend: { display: false } } }}
        data={{
          labels: getMonthsToShow(),
          datasets: graphItems.map((product): ChartDataset<"line"> => {
            const lowerCaseMonths = months.map((month) => month.toLowerCase())

            const productEntriesToShow: [string, number][] = Object.entries(
              product.sales
            ).filter((item) => lowerCaseMonths.includes(item[0]))
            return {
              label: product.name,
              data: productEntriesToShow.map((item) => item[1]),
              borderColor: [...LINE_COLORS],
            }
          }),
        }}
      ></Line>
    </>
  )
}

export default ForecastGraph
