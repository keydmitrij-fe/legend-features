import { Table, Checkbox, Drawer, Button, type TableProps } from "antd"
import {
  Product,
  RedistributionPlan,
  WarehouseContent,
} from "../../types/forecast"
import { WAREHOUSES } from "../../mocks/products"
import { useEffect, useRef, useState } from "react"
import { ColumnsType } from "antd/es/table"
import "./ForecastTable.scss"
import { setLabels } from "react-chartjs-2/dist/utils"

type ForecastTableType = TableProps<DataType> & {
  products?: Product[]
  redistributionPlans: RedistributionPlan[]
}

type DataType = {
  key: string
  productName: Product["name"]
  productId: Product["id"]
} & WarehouseContent

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
      const result: DataType = {
        key: product.name,
        productName: product.name,
        productId: product.id,
        Екатеринбург: 0,
        Калининград: 0,
        Краснодар: 0,
        Москва: 0,
        Новосибирск: 0,
        Спб: 0,
        Тверь: 0,
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
          {products?.map((product) => {
            if (!selectedProducts) return
            const isInSelectedProducts = selectedProducts?.some(
              (item) => item.productId === product.id,
            )
            return (
              <div
                key={product.id}
                style={{ display: "flex", gap: "0.5rem", padding: "0.2rem" }}
              >
                <Checkbox
                  onChange={() => {
                    if (isInSelectedProducts) {
                      setSelectedProducts((prev) => {
                        return prev?.filter(
                          (item) => item.productId !== product.id,
                        )
                      })
                    } else {
                      setSelectedProducts((prev) => {
                        if (!prev) return
                        const newState = structuredClone(prev)
                        const currentItem = data.find(
                          (item) => item.productId === product.id,
                        )
                        if (currentItem) {
                          newState.push(currentItem)
                        }

                        return newState
                      })
                    }
                  }}
                  checked={isInSelectedProducts}
                ></Checkbox>
                <p>{product.name}</p>
              </div>
            )
          })}
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
