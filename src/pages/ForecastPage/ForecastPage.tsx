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

const ForecastPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

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
          disabledDate={disabled12MonthsDate}
          placeholder={["С", "До"]}
          picker="month"
        ></RangePicker>
      </div>
      <div className="forecast__graph-container container">
        <ForecastGraph graphItems={selectedProducts} />
      </div>
    </div>
  )
}

export default ForecastPage
