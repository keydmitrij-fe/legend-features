import { Table, Checkbox, Drawer, Button, type TableProps } from "antd"
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
  const [selectedProducts, setSelectedProducts] = useState<DataType[]>()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
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
    if (!selectedProducts) {
      setSelectedProducts(data)
    }
  }, [products])

  return (
    <div>
      <div className="forecast-table__action-buttons__container">
        <Button className="forecast-table__action-buttons">
          Перераспределить остатки
        </Button>
        <Button className="forecast-table__action-buttons">
          Скачать Excel
        </Button>
        <Button
          onClick={() => {
            setIsDrawerOpen(true)
          }}
          className="forecast-table__action-buttons"
        >
          Настроить таблицу
        </Button>
        <Drawer
          open={isDrawerOpen}
          closable={{ "aria-label": "Close Button" }}
          onClose={() => setIsDrawerOpen(false)}
        >
          {products?.map((product) => (
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.2rem" }}>
              <Checkbox onChange={() => {}} defaultChecked={true}></Checkbox>
              <p>{product.name}</p>
            </div>
          ))}
        </Drawer>
      </div>
      <div className="forecast-table__content-container">
        <Table<DataType>
          {...props}
          columns={columns}
          dataSource={selectedProducts}
        />
      </div>
    </div>
  )
}

export default ForecastTable
