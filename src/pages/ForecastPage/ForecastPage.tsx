import "./ForecastPage.scss"
import Title from "antd/es/typography/Title"
import { Select, DatePicker, Typography, Spin } from "antd"
import type { DatePickerProps } from "antd"
import ForecastGraph from "../../components/ForecastGraph/ForecastGraph"
import { useEffect, useState } from "react"
import { isEmptyArray } from "../../utils/array"
import type { MonthsRange, Product } from "../../types/forecast"
import type { Dayjs } from "dayjs"
import { getProducts } from "../../api/forecast"
import { useQuery } from "@tanstack/react-query"
import { DefaultOptionType } from "antd/es/select"
import ForecastTable from "../../components/ForecastTable/ForecastTable"
import { redistributionMockData } from "../../mocks/redistribution"

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

const { Text } = Typography

const ForecastPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [selectedMonthsRange, setSelectedMonthsRange] = useState<MonthsRange>()
  const [prevMonthsSelection, setPrevMonthsSelection] = useState<MonthsRange>()
  const [showForecast, setShowForecast] = useState<boolean>(false)
  const [forecastDuration, setForecastDuration] = useState<number>(0)

  useEffect(() => {
    if (!showForecast) {
      setPrevMonthsSelection(selectedMonthsRange)
    }
  }, [selectedMonthsRange])

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
          onChange={(value) => {
            if (+value === 0) {
              setShowForecast(false)
              setForecastDuration(+value)
              setSelectedMonthsRange(prevMonthsSelection)
              return
            }
            setShowForecast(true)
            setForecastDuration(+value)
            setSelectedMonthsRange([0, 11])
          }}
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
          allowEmpty
          disabled={showForecast}
          placeholder={["С", "До"]}
          picker="month"
          allowClear={false}
          onChange={(value) => {
            if (value && value[0] && value[1]) {
              const fromMonth = value?.[0]?.month()
              const toMonth = value?.[1]?.month()
              setSelectedMonthsRange([fromMonth, toMonth])
            }
          }}
        ></RangePicker>
      </div>

      <div className="forecast__graph-container container">
        {selectedMonthsRange && !isEmptyArray(selectedProducts) && (
          <ForecastGraph
            graphItems={selectedProducts}
            monthsRange={selectedMonthsRange}
            forecast={{ show: showForecast, duration: forecastDuration }}
          />
        )}
        {(!selectedMonthsRange || isEmptyArray(selectedProducts)) && (
          <p className="forecast__graph-container__alert-text">
            Выберите товары и промежуток времени!
          </p>
        )}
      </div>
      <div className="forecast__table-container container">
        <ForecastTable
          loading={isLoading}
          products={products}
          redistributionPlans={redistributionMockData}
        />
      </div>
    </div>
  )
}

export default ForecastPage
