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
import { Product } from "../../types/forecast"

Chart.register(
  LineController,
  LineElement,
  PointElement,
  Legend,
  CategoryScale,
  LinearScale
)

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const LINE_COLORS = ["#a29bfe", "#00b894", "#636e72", "#74b9ff", "#fab1a0"]

type ForecastGraphType = {
  graphItems: Product[]
}

const chartOptions = Chart.defaults
chartOptions.elements.line.cubicInterpolationMode = "monotone"

const ForecastGraph: React.FC<ForecastGraphType> = ({ graphItems }) => {
  const usedColors: string[] = []

  const getRandomColorFromPool = () => {
    const poolLength = LINE_COLORS.length
    const colorIndex = Math.floor(Math.random() * poolLength)
    if (usedColors.includes(LINE_COLORS[colorIndex])) {
      getRandomColorFromPool()
    }
    usedColors.push(LINE_COLORS[colorIndex])
    return LINE_COLORS[colorIndex]
  }

  return (
    <>
      <Line
        options={{ plugins: { legend: { display: false } } }}
        data={{
          labels: MONTHS,
          datasets: graphItems.map((product): ChartDataset<"line"> => {
            return {
              label: product.name,
              data: Object.values(product.sales),
              borderColor: [...LINE_COLORS],
            }
          }),
        }}
      ></Line>
    </>
  )
}

export default ForecastGraph
