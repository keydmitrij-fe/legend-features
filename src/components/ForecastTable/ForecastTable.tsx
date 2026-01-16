import { Table, type TableProps } from "antd"
import {
  Product,
  RedistributionPlan,
  WarehouseStock,
} from "../../types/forecast"
import { Warehouse, WAREHOUSES } from "../../mocks/products"
import { useEffect, useState } from "react"
import { ColumnsType } from "antd/es/table"

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

  return <Table<DataType> {...props} columns={columns} dataSource={data} />
}

export default ForecastTable
