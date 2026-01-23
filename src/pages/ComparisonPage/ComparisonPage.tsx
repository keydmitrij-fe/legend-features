import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography, Input, Select } from "antd"
import { useState } from "react"
import { Product } from "../../types/Comparison"
import { SearchOutlined } from "@ant-design/icons"
import { DefaultOptionType } from "antd/es/select"

const { Title, Text } = Typography

type searchModes = "name" | "sku"

const searchSelectValues: DefaultOptionType[] = [
  { value: "name", label: "Поиск по названию" },
  { value: "sku", label: "Поиск по артикулу" },
]

const ComparisonPage: React.FC = () => {
  const [searchMode, setSearchMode] = useState<searchModes>("name")
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsMock)

  const handleSearchMode = (mode: searchModes) => {
    setSearchMode(mode)
  }

  const handleSearch = (value: string, mode: searchModes) => {
    if (!value) {
      setFilteredProducts(productsMock)
      return
    }
    const filteredData = productsMock.filter((item) => {
      if (mode === "sku") {
        const matchedSku = String(item.sku).match(value)?.input
        if (matchedSku) {
          return +matchedSku === item.sku
        }
      } else {
        const matchedName = String(item.name).match(value)?.input
        if (matchedName) {
          return matchedName === item.name
        }
      }
    })

    setFilteredProducts(filteredData)
  }

  return (
    <div className="comparison">
      <div className="comparison__top-items">
        <div className="comparison__top-items__info">
          <Title className="comparison--title">Сравнение карточек</Title>
          <Text className="comparison--text">
            Чтобы сравнить карточки, выберите от 2 до 5 карточек любых
            продавцов, нажав на кнопку "Добавить" - карточки обьединятся в
            группу для сравнения
          </Text>
        </div>
        <div className="comparison__top-items__controls"></div>
      </div>
      <div className="comparison--items">
        <div className="comparison__items__available">
          <Select
            defaultValue={searchSelectValues[0]}
            options={searchSelectValues}
            onChange={(value) => {
              const valueStringified = String(value)
              function isSearchMode(str: string): str is searchModes {
                if (str === "name" || str === "sku") {
                  return true
                }
                return false
              }
              if (isSearchMode(valueStringified)) {
                handleSearchMode(valueStringified)
              }
            }}
          ></Select>
          {searchMode === "name" ? (
            <Input
              suffix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.currentTarget.value, "name")}
              type="string"
              placeholder="Введите название товара"
              size="large"
            />
          ) : (
            <Input
              suffix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.currentTarget.value, "sku")}
              type="number"
              placeholder="Введите артикул товара"
              size="large"
            />
          )}
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              sku={product.sku}
              selected={false}
            />
          ))}
        </div>
        <div className="comparison__items__selected">
          {productsMock.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              sku={product.sku}
              selected={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComparisonPage
