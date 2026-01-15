import { Table, TableProps } from "antd"
import {
  Product,
  RedistributionPlan,
  WarehouseStock,
} from "../../types/forecast"
import { WAREHOUSES } from "../../mocks/products"

type ForecastTableType = {
  products?: Product[]
  redistributionPlans?: RedistributionPlan[]
}

type DataType = {
  key: string
  name: Product["name"]
  stocks: WarehouseStock[]
}

const ForecastTable: React.FC<ForecastTableType> = ({
  products,
  redistributionPlans,
}) => {
  // const columns: TableProps<DataType>["columns"] = products?.map((product) => {
  //   return {
  //     title: product.name,
  //     dataIndex: product.id,
  //     key: product.id,
  //   }
  // })

  const warehouseColumns = WAREHOUSES.map((name) => ({
    title: name,
    dataIndex: name,
    key: name,
  }))

  const columns: TableProps<DataType>["columns"] = [
    { title: "Товар" },
    ...warehouseColumns,
  ]

  return <Table<DataType> columns={columns} />
}

export default ForecastTable
