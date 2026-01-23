import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography, Input, Select } from "antd"
import { useState } from "react"
import { Product } from "../../types/Comparison"
import { SearchOutlined } from "@ant-design/icons"
import { debounce } from "../../utils/debounce"

const { Title, Text } = Typography

const ComparisonPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsMock)

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredProducts(productsMock)
      return
    }

    const filteredData = productsMock.filter((item) => {
      const containsOnlyNumbers = value.match(`^[1-9]*$`)
      if (containsOnlyNumbers) {
        const matchedSku = String(item.sku).match(value)?.input
        if (matchedSku) {
          return +matchedSku === item.sku
        }
      } else if (typeof value === "string") {
        const matchedName = item.name.match(value)?.input
        if (matchedName) {
          return matchedName === item.name
        }
      }
    })

    setFilteredProducts(filteredData)
  }

  const handleSearchDebounced = debounce(handleSearch, 200)

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
          <Input
            suffix={<SearchOutlined />}
            onChange={(e) => handleSearchDebounced(e.currentTarget.value)}
            type="string"
            placeholder="Введите артикул или название товара"
            size="large"
          />
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
