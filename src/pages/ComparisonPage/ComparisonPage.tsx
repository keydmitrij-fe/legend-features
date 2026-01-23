import { productsMock } from "../../mocks/comparison"
import "./ComparisonPage.scss"
import ProductCard from "../../components/ProductCard/ProductCard"
import { Typography, Input, Button } from "antd"
import { useState } from "react"
import { Product } from "../../types/Comparison"
import { SearchOutlined } from "@ant-design/icons"
import { debounce } from "../../utils/debounce"

const { Title, Text } = Typography

const MAX_ITEMS_IN_COMPARISON = 5

const ComparisonPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productsMock)

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const handleProductSelect = (id: number) => {
    const isAlreadySelected = selectedProducts.find((item) => item.id === id)
    if (selectedProducts.length === MAX_ITEMS_IN_COMPARISON) return
    if (isAlreadySelected) return

    let itemIndex: number
    const item = filteredProducts.find((item, index) => {
      itemIndex = index
      return item.id === id
    })
    if (item) {
      setSelectedProducts((prev) => {
        const newState = [...prev]
        newState.push(item)
        return newState
      })
      setFilteredProducts((prev) => {
        const newState = [...prev]
        newState.splice(itemIndex, 1)
        return newState
      })
    }
  }

  const handleProductDelete = (id: number) => {
    if (selectedProducts.length === 0) return
  }

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
  const isSelectDisabled = selectedProducts.length >= MAX_ITEMS_IN_COMPARISON

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
        <div className="comparison__top-items__controls">
          <Button
            className="comparison__items__selected_compare"
            size="large"
            variant="solid"
            color="purple"
          >
            Сравнить карточки
          </Button>
        </div>
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
          <div className="comparison__items__available-cards">
            {filteredProducts.map((product) => (
              <ProductCard
                selectDisabled={isSelectDisabled}
                id={product.id}
                handleProductSelect={handleProductSelect}
                handleProductDelete={handleProductDelete}
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                sku={product.sku}
                selected={false}
              />
            ))}
          </div>
        </div>
        <div className="comparison__items__selected">
          <div className="comparison__items__selected__subcontrol-container">
            <Text className="comparison__items__selected__quantity">
              Карточки для сравнения: {selectedProducts.length} из{" "}
              {MAX_ITEMS_IN_COMPARISON}
            </Text>
            <Button
              className="comparison__items__selected__remove-cards"
              variant="link"
              color="red"
            >
              Удалить все карточки и сравнения
            </Button>
          </div>
          <div className="comparison__items__selected-cards">
            {selectedProducts.map((product) => (
              <ProductCard
                selectDisabled={isSelectDisabled}
                id={product.id}
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                sku={product.sku}
                selected={true}
                handleProductDelete={handleProductDelete}
                handleProductSelect={handleProductSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparisonPage
