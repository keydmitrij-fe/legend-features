import "./ForecastPage.scss"
import Title from "antd/es/typography/Title"
import { Select, DatePicker } from "antd"
import type { DatePickerProps } from "antd"
import ForecastGraph from "../../components/ForecastGraph/ForecastGraph"
import products from "../../mocks/products"
import { useState } from "react"
import type { Product } from "../../types/forecast"
import type { Dayjs } from "dayjs"

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month()
const disabled12MonthsDate: DatePickerProps["disabledDate"] = (
  current,
  { from, type }
) => {
  if (from) {
    const minDate = from.add(-11, "months")
    const maxDate = from.add(11, "months")

    switch (type) {
      case "year":
        return (
          current.year() < minDate.year() || current.year() > maxDate.year()
        )

      default:
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        )
    }
  }

  return false
}

const { RangePicker } = DatePicker

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

const isEmptyArray = (arr: any[]): boolean => {
  return arr.length === 0
}

const ForecastPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])

  const getMonthsByIndex = (from: number, to: number): string[] => {
    return MONTHS.filter((_, index) => index >= from && index <= to)
  }

  return (
    <div className="forecast">
      <Title level={3}>Forecast Page</Title>
      <div className="forecast__button-container container">
        <Select
          onChange={(selectedProductsIds: Product["id"][]) => {
            const selectedItems = products.filter((item) =>
              selectedProductsIds.includes(item.id)
            )
            setSelectedProducts(selectedItems)
          }}
          placeholder="Товары"
          style={{ minWidth: "13ch" }}
          mode="multiple"
          maxCount={5}
          maxTagCount={1}
          options={products.map((product) => {
            return {
              value: product.id,
              label: product.name,
            }
          })}
        ></Select>
        <RangePicker
          format="MMM YYYY"
          disabledDate={disabled12MonthsDate}
          placeholder={["С", "До"]}
          picker="month"
          onChange={(e) => {
            if (e && e[0] && e[1]) {
              const from = e?.[0]?.month()
              const to = e?.[1]?.month()
              const months = getMonthsByIndex(from, to)
              setSelectedMonths(months)
            }
          }}
        ></RangePicker>
      </div>
      <div className="forecast__graph-container container">
        {!isEmptyArray(selectedMonths) && !isEmptyArray(selectedProducts) && (
          <ForecastGraph
            graphItems={selectedProducts}
            months={selectedMonths}
          />
        )}
        {(isEmptyArray(selectedMonths) || isEmptyArray(selectedProducts)) && (
          <p className="forecast__graph-container__alert-text">
            Выберите товары и промежуток времени!
          </p>
        )}
      </div>
    </div>
  )
}

export default ForecastPage
