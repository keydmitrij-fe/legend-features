import { Table, Button, type TableProps } from "antd"
import { Product, RedistributionPlan } from "../../types/forecast"
import { WAREHOUSES } from "../../mocks/products"
import { useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table"
import "./ForecastTable.scss"

type ForecastTableType = TableProps<DataType> & {
  products?: Product[]
  redistributionPlans: RedistributionPlan[]
}

type WarehouseNames = {
  [K in (typeof WAREHOUSES)[number]["name"]]: number
}

type DataType = {
  key: string
  name: Product["name"]
} & WarehouseNames

const warehouseColumns = WAREHOUSES.map((warehouse) => ({
  title: warehouse.name,
  dataIndex: warehouse.name,
  key: warehouse.name,
}))

const columns: ColumnsType<DataType> = [
  { title: "Название товара", dataIndex: "name", key: "name" },
  ...warehouseColumns,
]

const ForecastTable: React.FC<ForecastTableType> = ({
  products,
  redistributionPlans,
  ...props
}) => {
  const [data, setData] = useState<DataType[]>([])
  useEffect(() => {
    if (!products) return

    const data: DataType[] = products?.map((product) => {
      const result: any = {
        key: product.name,
        name: product.name,
      }

      product.stocks.forEach((stock) => {
        const warehouseName = stock.name
        const quantity: number = stock.stock
        result[warehouseName] = quantity
      })

      return result
    })

    setData(data)
  }, [products])

  return (
    <div className="forecast-table__container">
      <div className="forecast-table__action-buttons__container">
        <Button className="forecast-table__action-buttons">
          Перераспределить остатки
        </Button>
        <Button className="forecast-table__action-buttons">
          Скачать Excel
        </Button>
        <Button className="forecast-table__action-buttons">
          Настроить таблицу
        </Button>
      </div>
      <Table<DataType> {...props} columns={columns} dataSource={data} />
    </div>
  )
}

export default ForecastTable
