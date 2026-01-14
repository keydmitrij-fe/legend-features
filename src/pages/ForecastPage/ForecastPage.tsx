import "./ForecastPage.scss"
import Title from "antd/es/typography/Title"
import { Select, DatePicker, Typography } from "antd"
import type { DatePickerProps } from "antd"
import ForecastGraph from "../../components/ForecastGraph/ForecastGraph"
import { useState } from "react"
import { isEmptyArray } from "../../utils/array"
import type { Product } from "../../types/forecast"
import type { Dayjs } from "dayjs"
import { getProducts } from "../../api/forecast"
import { useQuery } from "@tanstack/react-query"
import { getMonthsByIndex } from "../../utils/date"
import { DefaultOptionType } from "antd/es/select"

const { RangePicker } = DatePicker
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

const forecastSelectValues: DefaultOptionType[] = [
  { value: "0", label: "Выкл" },
  { value: "1", label: "1 месяц" },
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
]

const ForecastPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedMonths, setSelectedMonths] = useState<string[]>([])
  const { Text } = Typography

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })

  return (
    <div className="forecast">
      <Title level={3}>Forecast Page</Title>
      <div className="forecast__button-container container">
        <Text>Прогноз</Text>
        <Select
          popupMatchSelectWidth={false}
          defaultValue={forecastSelectValues[0]}
          options={forecastSelectValues}
        ></Select>
        <Select
          onChange={(selectedProductsIds: Product["id"][]) => {
            if (products) {
              const selectedItems = products.filter((item) =>
                selectedProductsIds.includes(item.id)
              )
              setSelectedProducts(selectedItems)
            }
          }}
          placeholder="Товары"
          loading={isLoading}
          popupMatchSelectWidth={false}
          style={{ minWidth: "13ch" }}
          mode="multiple"
          maxCount={5}
          maxTagCount={1}
          options={products?.map((product) => {
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
